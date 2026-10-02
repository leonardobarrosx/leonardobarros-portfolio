# leonardobarros-portfolio

Personal portfolio of Leonardo Barros, Full-Stack & Mobile Developer.

Editorial poster aesthetic on a 12-column grid: warm paper, red ink, coffee darks, condensed display type and katakana accents. Built with Vite, React and TypeScript; animations with GSAP (ScrollTrigger, SplitText), Lenis smooth scroll and a few WebGL shaders.

## Features

- Seven languages (EN, PT-BR, ES, DE, JA, KO, ZH) detected from the browser and persisted in `localStorage`; `?lang=xx` picks one directly. Only English ships in the bundle, the rest arrive as their own chunk
- Nine colour themes (red by default, then orange, amber, green, teal, blue, violet, pink, ink) from the swatch menu in the nav; persisted and applied before first paint. First-time visitors get asked their favourite colour by a small card once they start scrolling; hovering a swatch previews the theme, picking one keeps it
- Dark and light schemes for every theme: follows `prefers-color-scheme`, with a toggle that is remembered
- Motion toggle (persisted) that also honours `prefers-reduced-motion`
- Pointer work: a custom cursor, letters that bend toward the pointer with a chromatic split, a WebGL disc in the hero and a WebGL ripple on the photo
- A click lands like a soft shot: a ring at the pointer, a chromatic kick through the display type near it, a nudge on the small pieces around, and a stone dropped in the disc and the photo. Up to four waves travel at once in each shader, so clicking again layers another instead of restarting the last
- Case studies open in a panel that grows out of the poster (cover pinned left, spread scrolling right), with prev/next, copy link, click-outside to close and deep links (`#work/<id>`); roles open the same way from the experience list (`#experience/<id>`)
- Intro plays once per session (`sessionStorage`)
- Custom scrollbars (hairline track, accent thumb, draggable) for the page and the panels on pointer devices
- Education block, an "open to work" badge in the nav, a 404 page, print styles
- Share-ready: Open Graph / Twitter card with a rendered `og.png`, canonical + `hreflang` for the seven languages, JSON-LD Person, sitemap, robots, web manifest and PNG icons; title and description follow the active language
- CV download (EN/PT) in the nav, the mobile menu and the contact section
- Privacy-friendly analytics hook (Cloudflare Web Analytics, no cookies): set `VITE_ANALYTICS_TOKEN` to switch it on
- Accessibility: skip link, focus trapped inside dialogs and handed back on close, decorative decoding text hidden from assistive tech, AA contrast across the themes

## Run locally

```bash
npm install
npm run dev
```

`npm run build` outputs to `dist/`, `npm run lint` runs ESLint.

## Deploy

The site is served from Vercel at the domain root. `vercel.json` carries the build command, the
output directory and the cache headers; import the repository in Vercel and it picks everything up.

One setting matters: `VITE_SITE_URL`. The canonical link, the `hreflang` set, the social cards, the
JSON-LD, `robots.txt` and `sitemap.xml` are all generated at build time from it in `vite.config.ts`,
so point it at the final domain in the Vercel project settings and everything follows.

`.github/workflows/deploy.yml` is still there as a GitHub Pages fallback but only runs when started
by hand. For Pages you would also need `VITE_BASE=/leonardobarros-portfolio/` at build time.

## Structure

- `src/data/i18n/<lang>.ts` — all copy per language; `src/data/content.ts` merges it with the language-neutral bases (project ids, years, stacks, logos, links). Edit these to update the site.
- `src/state/prefs.tsx` — language, motion, theme and scheme preferences.
- `src/data/themes.ts` — the colour themes as CSS tokens, light and dark (the per-theme CSS and the no-flash bootstrap are generated from it in `vite.config.ts`).
- `src/data/toolbox.ts` — the grouped skills list in the Stack section (group titles live in the i18n files).
- `src/components/` — one component per section, plus the shaders (`LiquidSun`, `DistortImage`) and the pointer pieces (`Cursor`, `Shot`, `Scrollbar`).
- `src/styles/global.css` — design tokens, grid and all styles.
- `src/assets/` — photos, company logos and certification icons.
- `public/` — CV files, icons, the social image, robots and sitemap.

## Credits

The infantry insignia in the About section is the vector drawing by
[Diego Biavati](https://commons.wikimedia.org/wiki/File:Distintivo_da_Arma_de_Infantaria_-_Ex%C3%A9rcito_Brasileiro.svg)
on Wikimedia Commons, used under CC BY-SA 4.0 and recoloured with the site's tokens.
