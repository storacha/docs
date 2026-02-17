'use client'

import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useConfig } from 'nextra-theme-docs'

const REPO_RE = /github\.com\/([^/]+)\/([^/]+)(?:\/tree\/([^/]+))?/
const DEFAULT_REPO = 'https://github.com/storacha/docs/tree/main'
const RESET_MS = 2000

type Status = 'idle' | 'loading' | 'copied' | 'error'

const LABELS: Record<Status, string> = {
  idle: 'Copy as Markdown',
  loading: 'Loading...',
  copied: 'Copied',
  error: 'Failed',
}

function getRawBase(repo: string) {
  const m = repo.match(REPO_RE)
  return m
    ? `https://raw.githubusercontent.com/${m[1]}/${m[2]}/${m[3] || 'main'}/src/pages`
    : null
}

function candidateUrls(path: string, base: string) {
  const p = path.split('?')[0].replace(/\/+$/, '') || '/index'
  return p === '/index'
    ? [`${base}/index.mdx`, `${base}/index.md`]
    : [`${base}${p}.mdx`, `${base}${p}.md`, `${base}${p}/index.mdx`, `${base}${p}/index.md`]
}

async function fetchMarkdown(path: string, base: string, signal?: AbortSignal) {
  const results = await Promise.allSettled(
    candidateUrls(path, base).map((url) => fetch(url, { signal }).then((r) => (r.ok ? r.text() : Promise.reject())))
  )
  const hit = results.find((r): r is PromiseFulfilledResult<string> => r.status === 'fulfilled')
  if (!hit) throw new Error('Not found')
  return hit.value
}

function strip(raw: string) {
  return raw
    .replace(/^---[\s\S]*?---\s*\n?/, '')
    .replace(/^import\s[\s\S]*?from\s+['"][^'"]*['"];?\s*$/gm, '')
    .replace(/^export\s+\w+\s+.*$/gm, '')
    .trim()
}

const iconClass = 'nx-w-4 nx-h-4 nx-shrink-0'

const CopyIcon = () => (
  <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
)

const CheckIcon = () => (
  <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

export function CopyAsMarkdown() {
  const router = useRouter()
  const { docsRepositoryBase } = useConfig()
  const [status, setStatus] = useState<Status>('idle')
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const abortRef = useRef<AbortController>()

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current)
      abortRef.current?.abort()
    }
  }, [])

  const resetAfterDelay = useCallback((s: Status) => {
    setStatus(s)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setStatus('idle'), RESET_MS)
  }, [])

  const onClick = useCallback(async () => {
    const base = getRawBase(docsRepositoryBase || DEFAULT_REPO)
    if (!base) return resetAfterDelay('error')

    abortRef.current?.abort()
    const ac = new AbortController()
    abortRef.current = ac

    setStatus('loading')
    try {
      const raw = await fetchMarkdown(router.asPath, base, ac.signal)
      await navigator.clipboard.writeText(strip(raw))
      resetAfterDelay('copied')
    } catch {
      if (!ac.signal.aborted) resetAfterDelay('error')
    }
  }, [router.asPath, docsRepositoryBase, resetAfterDelay])

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={status === 'loading'}
      className="fixed bottom-6 right-6 z-50 nx-flex nx-items-center nx-gap-2 nx-rounded-lg nx-px-3 nx-py-2 nx-text-sm nx-bg-gray-200 nx-text-gray-900 hover:nx-bg-gray-300 dark:nx-bg-gray-200 dark:nx-text-black dark:hover:nx-bg-gray-300 nx-transition-colors disabled:nx-opacity-50"
      title="Copy page as markdown"
    >
      {status === 'copied' ? <CheckIcon /> : <CopyIcon />}
      {LABELS[status]}
    </button>
  )
}
