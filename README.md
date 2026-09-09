# kevzhu14.github.io

Personal site for Kevin Zhu — a single scrollable page with anchor navigation.
Plain HTML, CSS, and JavaScript. No framework, no build step, no dependencies.

Live at <https://kevzhu14.github.io>.

## Layout

```
index.html          the whole page (hero + 5 sections)
404.html            not-found page
assets/css/style.css
assets/js/main.js   scroll-spy, filters, expand/collapse, reveal-on-scroll
assets/img/         favicons, Open Graph card, portrait
robots.txt, sitemap.xml, .nojekyll
.github/workflows/pages.yml   uploads the repo to GitHub Pages on push to master
```

## Editing

Everything visible lives in `index.html`; edit the markup directly.

- **Add a research or teaching entry** — copy an existing `<li>` block. The
  `data-tags` attribute on the `<li>` controls which topic filters match it
  (`ml`, `drug`, `polymers`, `env`, `chem`).
- **Add a publication or talk** — copy an `<li>` in `#pubs-list` and set
  `data-tags` to `journal`, `oral`, or `poster`.
- **Colours and type** — the tokens at the top of `assets/css/style.css`
  (`:root`, plus the `prefers-color-scheme: dark` block).

## Portrait

The hero photo loads from `assets/img/kevin-zhu.jpg`. If that file is missing,
the page falls back to a "KZ" monogram automatically, so the layout never
breaks. Replace the file to change the photo — a square crop of about
800×800&nbsp;px works well.

## CV PDF

Drop the file at `assets/Kevin_Zhu_CV.pdf` and uncomment the CV link in the
hero `.links` block in `index.html`.

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```
