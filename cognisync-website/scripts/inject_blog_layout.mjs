import { readFile, readdir, writeFile } from 'node:fs/promises'
import { blogNavigation, blogStylesheetLink } from './blog_layout.mjs'

const blogDir = new URL('../dist/blog/', import.meta.url)
const stylesheet = /<link\b(?=[^>]*\srel\s*=\s*(?:"stylesheet"|'stylesheet'|stylesheet(?=[\s/>])))(?=[^>]*\shref\s*=\s*(?:"\/blog\/blog\.css"|'\/blog\/blog\.css'|\/blog\/blog\.css(?=[\s>])))[^>]*>/i
const navMarker = '<nav class="blog-nav"'

const slugs = (await readdir(blogDir, { withFileTypes: true }))
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name)
  .sort()

for (const slug of slugs) {
  const path = new URL(`${encodeURIComponent(slug)}/index.html`, blogDir)
  const html = await readFile(path, 'utf8').catch(error => {
    if (error.code !== 'ENOENT') throw error
  })
  if (html === undefined) continue

  const headEnd = html.match(/<\/head\s*>/i)
  const afterHead = headEnd ? headEnd.index + headEnd[0].length : 0
  const bodyStart = html.slice(afterHead).match(/<body\b(?:[^>"']|"[^"]*"|'[^']*')*>/i)
  if (!headEnd || !bodyStart) {
    throw new Error(`dist/blog/${slug}/index.html: expected </head> followed by <body>`)
  }
  if (stylesheet.test(html.slice(0, headEnd.index)) || html.includes(navMarker)) continue

  const afterBodyStart = afterHead + bodyStart.index + bodyStart[0].length
  const updated = html.slice(0, headEnd.index) + blogStylesheetLink + '\n'
    + html.slice(headEnd.index, afterBodyStart) + '\n' + blogNavigation
    + html.slice(afterBodyStart)
  await writeFile(path, updated)
  console.log(`Styled dist/blog/${slug}/index.html`)
}
