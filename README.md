# legal-md

Render Markdown files on any website. Add a few tags, point to a `.md` file, done.

We built this for legal docs (terms of service, privacy policies, DPAs) that come from lawyers as DOCX files and need to live on a website — but it works for any Markdown content.

## Setup

### 1. Add the scripts and table styles

Paste in your site's global custom code. In Webflow, this goes in **Project Settings > Custom Code**.

In the `<head>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Michael-Schwartz-is/legal-md/legal-md.css">
```

Before `</body>`:

```html
<script src="https://cdn.jsdelivr.net/npm/marked@15.0.7/marked.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Michael-Schwartz-is/legal-md/legal-md.js"></script>
```

### 2. Add a div with the attribute

Add a div element on the page where you want the document to render. Give it a custom attribute:

- **Attribute name:** `data-md-content`
- **Attribute value:** the URL to your `.md` file

To test that everything works before adding your own file, use our sample:

```html
<div data-md-content="https://cdn.jsdelivr.net/gh/Michael-Schwartz-is/legal-md/example.md"></div>
```

Once it renders, swap the URL for your own hosted `.md` file.

### 3. Apply your rich text styles (optional)

If your site has a rich text class (like Webflow's Rich Text element used for blog posts), apply that same class to the div. The rendered Markdown will inherit all the typography, spacing, and heading styles already defined for your content pages — so it looks consistent with the rest of your site without any extra CSS work.

In Webflow, this means giving the div the same class as your Rich Text element (e.g., `w-richtext` or whatever custom class you've set up for blog/content styling).

### 4. Host your Markdown file

You'll need a `.md` file to point to. If your document is in Google Docs or Word, you can export it as Markdown — in Google Docs go to **File > Download > Markdown (.md)**. For Word files, open them in Google Docs first, then export. Don't worry about the export being messy — the script cleans up common formatting issues automatically.

Once you have your `.md` file, host it somewhere with a public URL. Some simple options:

| Service | Best for | How |
|---------|----------|-----|
| **Pastebin** | Quick and easy | Paste your Markdown at [pastebin.com](https://pastebin.com), set syntax to "None", create. Use the "raw" URL |
| **Dropbox** | Non-technical teams | Upload the file, create a shared link. Change `dl=0` to `dl=1` at the end of the URL |
| **Google Drive** | Already using Google Docs | Upload the `.md` file, share as "Anyone with the link", use `https://drive.google.com/uc?export=download&id={FILE_ID}` |
| **GitHub Gist** | Developers | Create a gist at [gist.github.com](https://gist.github.com), paste content, click "Raw" to get the URL |
| **Cloudflare R2** | Production sites | Upload to a bucket, enable public access |

## What It Does

- Fetches a `.md` file and converts it to standard HTML tags (`h1`, `h2`, `p`, `table`, `ul`, etc.)
- Your site's existing CSS styles everything
- All links open in a new tab
- Supports tables, bold, italic, strikethrough (GitHub Flavored Markdown)
- Multiple documents on one page — just add more divs

## Auto-Fixes for DOCX Exports

DOCX-to-Markdown exports are messy. The script automatically fixes common issues:

- **Multiple H1s** — only the first `#` stays as H1, the rest become H2
- **Code blocks from indentation** — sub-clauses indented with 4+ spaces won't turn into code blocks
- **Tab characters in headings** — strips tabs that DOCX converters insert

## Files

| File | Size | What it does |
|------|------|-------------|
| `legal-md.js` | ~1.5KB | Fetches, cleans, and renders Markdown |
| `legal-md.css` | ~0.4KB | Table styles (borders, padding, striped rows) |

## License

MIT
