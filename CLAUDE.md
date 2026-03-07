# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # install dependencies (first time)
npm run dev        # local dev server at http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build locally
npm run deploy     # build + push to gh-pages branch (deploys to gordontsui.ca)
```

## Git Identity

Always use the personal GitHub account for this repo (configured in local `.git/config`).

## Project structure

```
index.html          # entry point
src/
  main.jsx          # React root — mounts <Portfolio />
  Portfolio.jsx     # entire site (single component file)
public/
  CNAME             # gordontsui.ca — required for GitHub Pages custom domain
  favicon.svg
vite.config.js
```

## Architecture

Everything lives in `src/Portfolio.jsx`:

- **`experiences` array** (top of file) — the only data source. Add, remove, or reorder entries here.
- **`ProjectVisual`** — canvas animation component. Runs a `requestAnimationFrame` loop; type is driven by the `visual` field on each entry (`"terrain"` = sine wave lines, `"dots"` = rippling dot grid, `"fluid"` = radial gradient blobs).
- **`SubItem`** — renders a single expandable row detail with staggered entrance animation.
- **`Portfolio`** (default export) — root component. Manages `hovered` state (entry id or null), custom cursor position, and entrance animation flag. Background color, accent color, and canvas visual all derive from the currently hovered entry.

## Styling

All styles are inline or in a `<style>` block inside `Portfolio`. CSS class names (`.pr`, `.ptitle`, `.pmeta`, etc.) are defined in that block. Hover effects for title shift, tag color, and sub-item expansion are handled via CSS classes toggled by `isHov`. Transition timings use `cubic-bezier(0.16,1,0.3,1)` throughout.

## Adding / editing experience entries

Each entry in the `experiences` array requires:
```js
{
  id: number,          // unique, used for hover state
  num: "01",           // display index string
  title: "...",        // company name (large italic heading)
  tags: ["Role"],      // small-caps metadata
  year: "YYYY–YYYY",
  desc: "...",         // shown on hover (right side)
  accent: "#RRGGBB",   // per-company accent color
  bg: "#RRGGBB",       // per-company background tint on hover
  visual: "terrain",   // "terrain" | "dots" | "fluid"
  subitems: [          // optional
    { label: "Feature", detail: "Description" },
  ],
}
```

## Deployment (GitHub Pages)

`npm run deploy` uses `gh-pages` to push the `dist/` folder to the `gh-pages` branch. The `public/CNAME` file is copied into `dist/` automatically by Vite, which tells GitHub Pages to serve from `gordontsui.ca`.

DNS setup (one-time, at your domain registrar):
- Add 4 A records pointing to GitHub's IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- Or a CNAME record: `www` → `<your-github-username>.github.io`
- In GitHub repo Settings → Pages: set source to the `gh-pages` branch

## Known TODOs

- "About" and "Contact" nav links are unwired placeholders
- GitHub, LinkedIn, Email footer links have no `href`
