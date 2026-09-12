import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { themeBootstrap, themeCss } from "./src/data/themes";

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

// Served from GitHub Pages at /leonardobarros-portfolio/
export default defineConfig({
  plugins: [react(), themes()],
  base: "/leonardobarros-portfolio/",
});
