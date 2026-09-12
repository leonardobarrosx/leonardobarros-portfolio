# leonardobarros-portfolio

Personal portfolio of Leonardo Barros, Full-Stack & Mobile Developer.

Editorial poster aesthetic on a 12-column grid: cool paper, violet ink, plum darks, condensed display type and katakana accents. Built with Vite, React and TypeScript; animations with GSAP (ScrollTrigger, SplitText) and Lenis smooth scroll.

## Features

- Bilingual (EN / PT-BR) with the choice persisted in `localStorage`
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

- `src/data/content.ts` — all copy in both languages (bio, services, work, experience, testimonials, certifications). Edit this to update the site.
- `src/state/prefs.tsx` — language and motion preferences.
- `src/components/` — one component per section.
- `src/styles/global.css` — design tokens, grid and all styles.
- `src/assets/` — photos, company logos and certification icons.
