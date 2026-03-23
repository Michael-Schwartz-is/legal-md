# legal-md

Render Markdown legal documents on any website. Drop in two script tags and a div — your site's CSS handles the rest.

Built for legal docs (terms of service, privacy policies, DPAs) that come from lawyers as DOCX files and need to live on a website without custom formatting for every paragraph.

## Quick Start

1. Add a div anywhere on your page with the `data-md-content` attribute pointing to your `.md` file:

```html
<div data-md-content="https://your-cdn.com/terms-of-use.md"></div>
```

2. Add the scripts before `</body>`:

```html
<script src="https://cdn.jsdelivr.net/npm/marked@15.0.7/marked.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/micherwa/legal-md/legal-md.js"></script>
```

3. (Optional) Add table styles if your site doesn't style `<table>` elements:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/micherwa/legal-md/legal-md.css">
```

That's it. The script fetches the Markdown file, converts it to HTML, and injects it into the div. Your site's existing CSS styles the headings, paragraphs, lists, and links. The optional CSS file only adds table borders and padding.

## How It Works

- Uses [marked.js](https://github.com/markedjs/marked) to parse Markdown into standard HTML tags (`h1`, `h2`, `p`, `table`, `ul`, etc.)
- Your site's CSS takes over from there
- All links automatically open in a new tab
- Supports GitHub Flavored Markdown (tables, bold, italic, strikethrough)
- Scoped to `[data-md-content]` — won't interfere with the rest of your site
- Multiple documents on one page? Just add more divs with different `data-md-content` values

## Preparing Your Markdown

Legal docs exported from DOCX often have formatting issues. Common fixes:

- **Heading hierarchy**: Only one `#` (H1) for the title. Sections should be `##` (H2), sub-sections `###` (H3)
- **Numbered sub-sections**: Use explicit numbering like `**1.1**` instead of Markdown ordered lists, since legal docs need `clause.sub-clause` format (e.g., 5.1, 5.2)
- **Indentation**: Lines indented with 4+ spaces become code blocks in Markdown. Use 3 spaces max for list nesting, or remove indentation entirely
- **Tables**: Merged cells from DOCX don't translate to Markdown. Split them into separate tables with the right number of columns
- **Body text on heading lines**: Split `## 9. Title. Body text here...` into the heading on one line and the body text on the next

## Files

| File | What it does |
|------|-------------|
| `legal-md.js` | Fetches and renders Markdown into `[data-md-content]` divs |
| `legal-md.css` | Optional table styles for sites that don't style `<table>` |
| `example.md` | Sample legal doc for testing |
| `index.html` | Demo page |

## License

MIT
