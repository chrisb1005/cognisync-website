export const blogStylesheetLink = '<link rel="stylesheet" href="/blog/blog.css">'

export const blogNavigation = `<a class="skip-link" href="#blog-content">Skip to content</a>
<nav class="blog-nav" aria-label="Site navigation">
  <a href="/">Home</a>
  <a href="/#contact">Contact</a>
</nav>
<div id="blog-content" tabindex="-1"></div>`

export const blogStylesheet = `:root {
  color-scheme: dark;
  --page: #0d0d1a;
  --surface: #1a1a2e;
  --heading: #f5f5fa;
  --text: #e8e8ed;
  --muted: #d0d0df;
  --accent: #ff6b00;
  --gutter: clamp(1rem, 5vw, 3rem);
}

body {
  margin: 0;
  background: var(--page);
  color: var(--text);
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  line-height: 1.65;
}

main, .blog-nav {
  max-inline-size: 68ch;
  margin-inline: auto;
  padding-inline: var(--gutter);
}

main {
  padding-block: clamp(1.5rem, 4vw, 3rem) var(--gutter);
  overflow-wrap: anywhere;
}

.blog-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  padding-block: 1rem;
}

a {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 0.18em;
}

a:hover {
  text-decoration-thickness: 0.15em;
}

:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
}

.skip-link {
  position: absolute;
  inset-block-start: 0.5rem;
  inset-inline-start: var(--gutter);
  padding: 0.5rem 0.75rem;
  background: var(--surface);
  z-index: 1;
}

.skip-link:not(:focus) {
  clip-path: inset(50%);
}

h1, h2, h3, h4, h5, h6 {
  color: var(--heading);
  line-height: 1.2;
  margin-block: 1.5em 0.5em;
}

h1 {
  font-size: clamp(2rem, 1.5rem + 2.5vw, 3.5rem);
  margin-block-start: 0;
}

h2 { font-size: clamp(1.4rem, 1.2rem + 1vw, 2rem); }
h3 { font-size: clamp(1.15rem, 1.05rem + 0.5vw, 1.45rem); }

p, ul, ol, pre, blockquote, table { margin-block: 0 1.25em; }
ul, ol { padding-inline-start: 1.5em; }
li + li { margin-block-start: 0.35em; }
li > ul, li > ol { margin-block-end: 0; }

.blog-index article {
  margin-block-start: 1.25rem;
  padding: clamp(1rem, 3vw, 1.5rem);
  background: var(--surface);
  border-radius: 0.5rem;
}

.blog-index article h2 { margin-block-start: 0; }
time { color: var(--muted); }

code, pre, blockquote, th { background: var(--surface); }

code, pre {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.9em;
}

code { padding: 0.1em 0.25em; }
pre { overflow-x: auto; padding: 1rem; }
pre code { padding: 0; font-size: inherit; }

blockquote {
  margin-inline: 0;
  padding: 1rem;
  border-inline-start: 0.25rem solid var(--accent);
}

blockquote > :last-child { margin-block-end: 0; }

table { inline-size: 100%; border-collapse: collapse; }
th, td {
  padding: clamp(0.25rem, 2vw, 0.75rem);
  border: 1px solid var(--muted);
  text-align: start;
}

@media (prefers-reduced-motion: reduce) {
  :root { scroll-behavior: auto; }
}
`
