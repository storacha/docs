import { highlight } from '@/lib/shiki'
import { Lang, Theme } from 'shiki'

const clientExample = `
import * as Client from '@storacha/client'
import { filesFromPaths } from 'files-from-path'

const client = await Client.create()

// first time setup!
if (!Object.keys(client.accounts()).length) {
  // waits for you to click the link in your email to verify your identity
  const account = await client.login('you@example.org')
  // create a space for your uploads and authorize the Storacha Gateway by default
  const space = await client.createSpace('lets-go', {
    account, // associate this space with your account & configure recovery
  })
  // save the space to the store, and set as "current"
  await space.save()
}

// content-address your files
const files = await filesFromPaths(['./best-gifs'])
const root = await client.uploadDirectory(files)

console.log(root.toString()) // bafy...
`.trim()

export async function SyntaxHighlight ({code, theme = 'dracula-soft', lang = 'javascript'}: {code: string, theme?: Theme, lang?: Lang}) {
  const html = await highlight(code, theme, lang)
  return <div dangerouslySetInnerHTML={{ __html: html }} className='font-mono' />
}

export function CodeSample (props: {code: string, theme?: Theme, lang?: Lang}) {
  return (
    <div className='border-8 border-zinc-300/10 rounded-md p-4 pl-2 overflow-auto text-sm/relaxed sm:text-base/loose'>
      <SyntaxHighlight {...props} />
    </div>
  )
}

export function ClientExample () {
  return <CodeSample code={clientExample} />
}
