# leonardobarros-portfolio

Personal portfolio of Leonardo Barros, Full-Stack & Mobile Developer.

Editorial poster aesthetic: cream paper, poster red, coffee-toned darks, condensed display type and katakana accents. Built with Vite, React and TypeScript; animations with GSAP (ScrollTrigger, SplitText) and Lenis smooth scroll.

## Run locally

```bash
npm install
npm run dev
```

`npm run build` outputs to `dist/`. The site is deployed to GitHub Pages by the workflow in `.github/workflows/deploy.yml` on every push to `main`.

## Structure

- `src/data/content.ts` — all copy (bio, services, work, experience, stack). Edit this to update the site.
- `src/components/` — one component per section.
- `src/styles/global.css` — design tokens and all styles.
- `src/assets/photo.jpg` — profile photo.
