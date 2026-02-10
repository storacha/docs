'use client'

import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { useConfig } from 'nextra-theme-docs'

function getRawBase(repo: string) {
  const m = repo.match(/github\.com\/([^/]+)\/([^/]+)(?:\/tree\/([^/]+))?/)
  return m ? `https://raw.githubusercontent.com/${m[1]}/${m[2]}/${m[3] || 'main'}/src/pages` : null
}

async function fetchMarkdown(path: string, base: string) {
  const p = (path.split('?')[0].replace(/\/+$/, '') || '/index')
  const urls = p === '/index' || !p
    ? [`${base}/index.mdx`, `${base}/index.md`]
    : [`${base}${p}.mdx`, `${base}${p}.md`, `${base}${p}/index.mdx`, `${base}${p}/index.md`]
  for (const url of urls) {
    const r = await fetch(url)
    if (r.ok) return r.text()
  }
  throw new Error('Not found')
}

function strip(raw: string) {
  return raw
    .replace(/^---[\s\S]*?---\s*\n?/, '')
    .replace(/^import\s+[\s\S]*?from\s+['"][^'"]*['"]\s*;?\s*$/gm, '')
    .replace(/^export\s+\w+\s+.*$/gm, '')
    .trim()
}

export function CopyAsMarkdown() {
  const router = useRouter()
  const config = useConfig()
  const [s, setS] = useState<'idle' | 'loading' | 'copied' | 'error'>('idle')

  const onClick = useCallback(async () => {
    const base = getRawBase(config.docsRepositoryBase || 'https://github.com/storacha/docs/tree/main')
    if (!base) return setS('error')
    setS('loading')
    try {
      const raw = await fetchMarkdown(router.asPath, base)
      await navigator.clipboard.writeText(strip(raw))
      setS('copied')
    } catch {
      setS('error')
    }
    setTimeout(() => setS('idle'), 2000)
  }, [router.asPath, config.docsRepositoryBase])

  const label = { idle: 'Copy as Markdown', loading: 'Loading...', copied: 'Copied', error: 'Failed' }[s]

  const CopyIcon = () => (
    <svg className="nx-w-4 nx-h-4 nx-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  )

  const CheckIcon = () => (
    <svg className="nx-w-4 nx-h-4 nx-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={s === 'loading'}
      className="fixed bottom-6 right-6 z-50 nx-flex nx-items-center nx-gap-2 nx-rounded-lg nx-px-3 nx-py-2 nx-text-sm nx-bg-gray-200 nx-text-gray-900 hover:nx-bg-gray-300 dark:nx-bg-gray-200 dark:nx-text-black dark:hover:nx-bg-gray-300 nx-transition-colors disabled:nx-opacity-50"
      title="Copy page as markdown"
    >
      {s === 'copied' ? <CheckIcon /> : <CopyIcon />}
      {label}
    </button>
  )
}
