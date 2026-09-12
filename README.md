# leonardobarros-portfolio

Personal portfolio of Leonardo Barros, Full-Stack & Mobile Developer.

Editorial poster aesthetic on a 12-column grid: cool paper, violet ink, plum darks, condensed display type and katakana accents. Built with Vite, React and TypeScript; animations with GSAP (ScrollTrigger, SplitText) and Lenis smooth scroll.

## Features

- Seven languages (EN, PT-BR, ES, DE, JA, KO, ZH) detected from the browser and persisted in `localStorage`
- Motion toggle (persisted) that also honours `prefers-reduced-motion`
- Intro plays once per session (`sessionStorage`)
- Project details panel with deep links (`#work/<id>`)
- Custom cursor, scroll progress, smooth anchors, full-screen mobile menu

## Run locally

```bash
npm install
npm run dev
```

`npm run build` outputs to `dist/`. The site is deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Structure

- `src/data/i18n/<lang>.ts` — all copy per language; `src/data/content.ts` merges it with the language-neutral bases (project ids, years, stacks, logos, links). Edit these to update the site.
- `src/state/prefs.tsx` — language and motion preferences.
- `src/components/` — one component per section.
- `src/styles/global.css` — design tokens, grid and all styles.
- `src/assets/` — photos, company logos and certification icons.
