import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { writeFileSync } from "node:fs";
import { themeBootstrap, themeCss } from "./src/data/themes";

/**
 * The public address of the site. Vercel serves it from the domain root, so the base is "/" and the
 * canonical, the social tags, the sitemap and the robots file are all written from this one value.
 * Set VITE_SITE_URL in the project settings when the final domain is in place.
 */
const SITE = (process.env.VITE_SITE_URL ?? "https://leonardobarros.vercel.app").replace(/\/+$/, "");
const BASE = process.env.VITE_BASE ?? "/";
const LANGS: [string, string][] = [["en", "en"], ["pt", "pt-BR"], ["es", "es"], ["de", "de"], ["ja", "ja"], ["ko", "ko"], ["zh", "zh-CN"]];

const TITLE = "Leonardo Barros — Full-Stack & Mobile Developer";
const DESC = "Full-Stack & Mobile Developer and UI/UX designer in João Pessoa, Brazil. Ten years building web, mobile and data products with React, Flutter, TypeScript, Node.js, Python, Go and C#.";

/** Emits the per-theme tokens and the localStorage bootstrap into <head>, so the saved theme paints first. */
function themes(): Plugin {
  return {
    name: "lb-themes",
    transformIndexHtml: () => [
      { tag: "style", attrs: { id: "lb-themes" }, children: themeCss(), injectTo: "head" },
      { tag: "script", children: themeBootstrap(), injectTo: "head" },
    ],
  };
}

/** Everything that depends on the final address: canonical, hreflang, social cards, JSON-LD. */
function siteMeta(): Plugin {
  return {
    name: "lb-site-meta",
    transformIndexHtml: () => [
      { tag: "link", attrs: { rel: "canonical", href: `${SITE}/` }, injectTo: "head" },
      { tag: "link", attrs: { rel: "alternate", hreflang: "x-default", href: `${SITE}/` }, injectTo: "head" },
      ...LANGS.map(([code, tag]) => ({
        tag: "link", attrs: { rel: "alternate", hreflang: tag, href: `${SITE}/?lang=${code}` }, injectTo: "head" as const,
      })),
      { tag: "meta", attrs: { property: "og:url", content: `${SITE}/` }, injectTo: "head" },
      { tag: "meta", attrs: { property: "og:image", content: `${SITE}/og.png` }, injectTo: "head" },
      { tag: "meta", attrs: { name: "twitter:image", content: `${SITE}/og.png` }, injectTo: "head" },
      {
        tag: "script",
        attrs: { type: "application/ld+json" },
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Leonardo Barros",
          jobTitle: "Full-Stack & Mobile Developer",
          description: "Full-Stack & Mobile Developer and UI/UX designer with ten years in tech.",
          url: `${SITE}/`,
          image: `${SITE}/og.png`,
          email: "mailto:xleonardobarros@gmail.com",
          address: { "@type": "PostalAddress", addressLocality: "João Pessoa", addressRegion: "PB", addressCountry: "BR" },
          knowsLanguage: ["pt-BR", "en"],
          sameAs: ["https://www.linkedin.com/in/leonardobarrosx", "https://github.com/leonardobarrosx"],
        }),
        injectTo: "head",
      },
    ],
  };
}

/** robots.txt and sitemap.xml, written at build time so they always carry the current address. */
function crawlFiles(): Plugin {
  let out = "dist";
  return {
    name: "lb-crawl-files",
    configResolved(cfg) { out = cfg.build.outDir; },
    closeBundle() {
      const today = new Date().toISOString().slice(0, 10);
      const alts = LANGS.map(([code, tag]) => `    <xhtml:link rel="alternate" hreflang="${tag}" href="${SITE}/?lang=${code}"/>`).join("\n");
      const urls = ["", ...LANGS.map(([code]) => `?lang=${code}`)].map((q) =>
        `  <url>\n    <loc>${SITE}/${q}</loc>\n    <lastmod>${today}</lastmod>\n${alts}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/"/>\n  </url>`).join("\n");
      writeFileSync(`${out}/sitemap.xml`,
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`);
      writeFileSync(`${out}/robots.txt`, `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
    },
  };
}

export default defineConfig({
  plugins: [react(), themes(), siteMeta(), crawlFiles()],
  base: BASE,
  build: { assetsInlineLimit: 2048 },
});

export { TITLE, DESC };
