# legal-md

Render Markdown legal documents on any website. Export your DOCX to Markdown, host the file, add two script tags and a div. Done.

Built for legal docs (terms of service, privacy policies, DPAs) that come from lawyers as DOCX files and need to live on a website.

## Usage

Add a div with the `data-md-content` attribute pointing to your `.md` file:

```html
<div data-md-content="https://your-cdn.com/terms-of-use.md"></div>
```

Add the scripts before `</body>`:

```html
<script src="https://cdn.jsdelivr.net/npm/marked@15.0.7/marked.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Michael-Schwartz-is/legal-md/legal-md.js"></script>
```

(Optional) Add table styles if your site doesn't style `<table>` elements:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Michael-Schwartz-is/legal-md/legal-md.css">
```

That's it. Your site's existing CSS styles everything.

## What It Does

- Fetches a `.md` file and converts it to standard HTML tags (`h1`, `h2`, `p`, `table`, `ul`, etc.)
- Your site's CSS takes over from there
- All links open in a new tab
- Supports tables, bold, italic, strikethrough (GitHub Flavored Markdown)
- Multiple documents on one page — just add more divs

## Auto-Fixes for DOCX Exports

DOCX-to-Markdown exports are messy. The script automatically fixes:

- **Multiple H1s** — only the first `#` stays as H1, the rest become H2
- **Code blocks from indentation** — legal sub-clauses indented with 4+ spaces won't turn into code blocks
- **Tab characters in headings** — strips tabs that DOCX converters insert

## Webflow

Works the same way:

1. Add a div element, give it the custom attribute `data-md-content` with the URL to your `.md` file
2. Paste the script tags in the page's custom code (before `</body>`)
3. Optionally add the CSS link in the `<head>` custom code

## Files

| File | Size | What it does |
|------|------|-------------|
| `legal-md.js` | ~1.5KB | Fetches, cleans, and renders Markdown |
| `legal-md.css` | ~0.4KB | Optional table styles |

## License

MIT
