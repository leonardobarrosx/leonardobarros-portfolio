import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served from GitHub Pages at /leonardobarros-portfolio/
export default defineConfig({
  plugins: [react()],
  base: "/leonardobarros-portfolio/",
});
