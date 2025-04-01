# www 🌐✨

**The** Storacha documentation _website._

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. Make changes and the preview site will update automatically.

Run the linter before committing to catch errors

```bash
pnpm lint
```

## Website

Built on next, the pages live in `src/app`. See https://nextjs.org/docs/app

## Docs

Add pages as markdown with .md extension to `src/pages`

The path to the file is used as the URL, e.g. `src/pages/w3cli.mdx` -> `/w3cli`.

The `_meta.json` in the directory defines the order of links in the sidebar and the values set their link text.

Update the `_meta.json` file in the directory when you add a new page. There should be one in each sub-directory.


`src/pages/_meta.json`
```json
{
  "index": "Welcome",
  "w3cli": "Command line",
  "w3up-client": "JS Client",
  "concepts": "Concepts",
  "pail": {
    "display": "hidden",
    "title": "future tech"
  },
  "specs": {
    "href": "https://github.com/storacha/specs",
    "title": "Specs"
  }
}
```

In the above:
-  `"pail"` is a hidden section, allowing us to add docs that we don't want to publish yet.
- `"specs"` adds a sidebar link to the github repo, there is no associated markdown file here.

Docs section is built on nextra. See https://nextra.site/docs/guide/organize-files for more.

### Links

To link to other pages using the root relative URL in a standard markdown link. To link to the w3cli.md from the quickstart page, you would include:

**quickstart.md**
```md
[try the w3cli](/w3cli)
```

### Images

To show an image you compress the image ready for use on the web, then save it to `/src/pages/docs` in the same directory as the markdown file that you want to show it in then add a markdown link to your .md doc:

**quickstart.md**
```md
![screenshot of console uploads list](/console-uploads-list.png)
```
