import { readFile, readdir, writeFile } from 'node:fs/promises'
import { blogNavigation, blogStylesheet, blogStylesheetLink } from './blog_layout.mjs'

const publicDir = new URL('../public/', import.meta.url)
const blogDir = new URL('blog/', publicDir)
const homepage = 'https://www.cognisync.us/'
const blogCanonical = new URL('blog/', homepage).href
const compare = (a, b) => (a < b ? -1 : a > b ? 1 : 0)

function attributes(tag) {
  const entries = [...tag.matchAll(/([^\s=<>/]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)]
  return Object.fromEntries(entries.map(([, name, double, single, bare]) => [
    name.toLowerCase(), double ?? single ?? bare,
  ]))
}

function escapeMarkup(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;').replaceAll('"', '&quot;')
}

function escapeHtmlSource(value) {
  return value.replace(/&(?!(?:#\d+|#x[\da-f]+|[a-z][a-z\d]*);)/gi, '&amp;')
    .replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
}

function publicationDate(data) {
  for (const item of [data].flat()) {
    const date = item?.datePublished
    if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}(?:$|T)/.test(date)) {
      const day = date.slice(0, 10)
      const midnight = new Date(day)
      const hasZone = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(date)
      const timestamp = Date.parse(date === day || hasZone ? date : `${date}Z`)
      if (Number.isFinite(timestamp) && Number.isFinite(midnight.getTime())
        && midnight.toISOString().startsWith(day)) {
        return { day, timestamp }
      }
    }
    const dateInGraph = item?.['@graph'] && publicationDate(item['@graph'])
    if (dateInGraph) return dateInGraph
  }
}

async function readArticle(slug) {
  const path = new URL(`${encodeURIComponent(slug)}/index.html`, blogDir)
  const html = await readFile(path, 'utf8').catch(error => {
    if (error.code !== 'ENOENT') throw error
  })
  if (html === undefined) return

  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? ''
  const title = head.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1].trim()
  const description = [...head.matchAll(/<meta\b(?:[^>"']|"[^"]*"|'[^']*')*>/gi)]
    .map(([tag]) => attributes(tag))
    .find(meta => meta.name?.toLowerCase() === 'description')?.content?.trim()
  const canonical = [...head.matchAll(/<link\b(?:[^>"']|"[^"]*"|'[^']*')*>/gi)]
    .map(([tag]) => attributes(tag))
    .find(link => link.rel?.toLowerCase().split(/\s+/).includes('canonical'))
    ?.href?.trim().replace(/&(?:amp|#0*38|#x0*26);/gi, '&')
  if (!title || !description || !canonical) {
    throw new Error(`Missing title, description, or canonical in blog/${slug}/index.html`)
  }

  let date
  for (const [, tag, json] of head.matchAll(/(<script\b[^>]*>)([\s\S]*?)<\/script>/gi)) {
    if (attributes(tag).type?.toLowerCase() !== 'application/ld+json') continue
    date = publicationDate(JSON.parse(json))
    if (date) break
  }

  return { title, description, canonical, date }
}

function renderIndex(articles) {
  const entries = articles.map(({ title, description, canonical, date }) => `
  <article>
    <h2><a href="${escapeMarkup(canonical)}">${escapeHtmlSource(title)}</a></h2>
    <p>${escapeHtmlSource(description)}</p>${date ? `
    <time datetime="${date.day}">${date.day}</time>` : ''}
  </article>`).join('\n')

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CogniSync Blog | Automation, Integrations &amp; Custom AI</title>
  <meta name="description" content="Explore practical guides from CogniSync on workflow automation, system integrations, custom APIs, and AI.">
  <link rel="canonical" href="${blogCanonical}">
  ${blogStylesheetLink}
</head>
<body>
${blogNavigation}
<main class="blog-index">
  <h1>CogniSync Blog</h1>
  <p>Read about workflow automation, system integrations, and custom AI for your business.</p>
${entries}
</main>
</body>
</html>
`
}

function renderSitemap(articles) {
  const canonicals = articles.map(article => article.canonical).sort(compare)
  const entries = [blogCanonical, ...canonicals].map(canonical => `  <url>
    <loc>${escapeMarkup(canonical)}</loc>
  </url>`).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${homepage}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
${entries}
</urlset>
`
}

const slugs = (await readdir(blogDir, { withFileTypes: true }))
  .filter(entry => entry.isDirectory()).map(entry => entry.name).sort(compare)
const articles = (await Promise.all(slugs.map(readArticle))).filter(Boolean)
articles.sort((a, b) => (
  compare(b.date?.timestamp ?? -Infinity, a.date?.timestamp ?? -Infinity)
  || compare(a.canonical, b.canonical)
))

const check = process.argv.includes('--check')
for (const [name, expected] of [
  ['blog/blog.css', blogStylesheet],
  ['blog/index.html', renderIndex(articles)],
  ['sitemap.xml', renderSitemap(articles)],
]) {
  const path = new URL(name, publicDir)
  if (!check) {
    await writeFile(path, expected)
    console.log(`Generated public/${name}`)
    continue
  }

  const actual = await readFile(path).catch(error => {
    if (error.code !== 'ENOENT') throw error
  })
  if (!actual?.equals(Buffer.from(expected))) {
    console.error(`public/${name}: ${actual ? 'differs from generated output' : 'missing'}`)
    process.exitCode = 1
  } else {
    console.log(`Verified public/${name}`)
  }
}
