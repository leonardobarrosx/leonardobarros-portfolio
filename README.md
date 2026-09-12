# leonardobarros-portfolio

Personal portfolio of Leonardo Barros, Full-Stack & Mobile Developer.

Editorial poster aesthetic on a 12-column grid: cool paper, violet ink, plum darks, condensed display type and katakana accents. Built with Vite, React and TypeScript; animations with GSAP (ScrollTrigger, SplitText) and Lenis smooth scroll.

## Features

- Seven languages (EN, PT-BR, ES, DE, JA, KO, ZH) detected from the browser and persisted in `localStorage`
- Motion toggle (persisted) that also honours `prefers-reduced-motion`
- Nine colour themes (red by default, then orange, amber, green, teal, blue, violet, pink, ink) from the swatch menu in the nav; persisted and applied before first paint. First-time visitors get asked their favourite colour by a small card once they start scrolling; hovering a swatch previews the theme, picking one keeps it
- Intro plays once per session (`sessionStorage`)
- Case studies open as a full-screen spread that grows out of the poster, with prev/next and deep links (`#work/<id>`)
- Custom cursor, scroll progress, smooth anchors, full-screen mobile menu

## Run locally

```bash
npm install
npm run dev
```

`npm run build` outputs to `dist/`. The site is deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Structure

- `src/data/i18n/<lang>.ts` — all copy per language; `src/data/content.ts` merges it with the language-neutral bases (project ids, years, stacks, logos, links). Edit these to update the site.
- `src/state/prefs.tsx` — language, motion and theme preferences.
- `src/data/themes.ts` — the colour themes as CSS tokens (the per-theme CSS and the no-flash bootstrap are generated from it in `vite.config.ts`).
- `src/data/toolbox.ts` — the grouped skills list in the Stack section (group titles live in the i18n files).
- `src/components/` — one component per section.
- `src/styles/global.css` — design tokens, grid and all styles.
- `src/assets/` — photos, company logos and certification icons.
