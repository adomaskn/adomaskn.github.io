# adomaskn.github.io

Personal portfolio website hosted on GitHub Pages.

## Overview

- Main landing page: `index.html`
- Static assets: `public/`, `assets/`, `css/`, `js/`
- Build output: `dist/`
- Build tool: Vite

## Language Navigation

The site supports language persistence through a `lang` query parameter:

- `?lang=en`
- `?lang=lt`

Main page behavior:

- Reads language from URL (`lang`) first
- Falls back to `localStorage` (`site_lang`)
- Defaults to `en` if not set
- Preserves language when navigating to project links like:
  - `https://adomaskn.github.io/virtual-gallery/?lang=...`
  - `https://adomaskn.github.io/car-showroom/?lang=...`

## Development

Install dependencies:

```bash
npm install
```

Run local dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Deployment Notes

- `dist/` is generated from `npm run build`.
- This repository hosts the portfolio site at `https://adomaskn.github.io/`.
- Project apps like `virtual-gallery` and `car-showroom` are linked as separate pages/apps under the same GitHub Pages domain.
