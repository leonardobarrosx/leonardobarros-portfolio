/**
 * The toolbox, grouped. Items are language-neutral (product names); group titles live in i18n.
 * Kept to what is worth defending in an interview: the case studies carry the rest of the proof.
 * Order matters: it is the reading order on the page.
 */
export type ToolGroupId = "languages" | "web" | "services" | "data" | "delivery";

export interface ToolGroup { id: ToolGroupId; jp: string; items: string[] }

export const toolbox: ToolGroup[] = [
  { id: "languages", jp: "言語", items: ["TypeScript", "JavaScript", "Go", "Python", "C#", "Dart", "PHP", "SQL"] },
  { id: "web", jp: "前面", items: ["React", "Vite", "Tailwind CSS", "Redux Toolkit / Zustand", "TanStack Query", "Flutter", "Three.js", "GSAP", "WCAG 2.2 AA"] },
  { id: "services", jp: "背面", items: ["Node.js / Express", "Go (Gin)", "Django", "Laravel", "ASP.NET Core", "REST / OpenAPI", "WebSockets", "JWT / OAuth 2.0"] },
  { id: "data", jp: "資料", items: ["PostgreSQL", "Oracle", "MongoDB", "Redis", "Supabase", "Firebase", "Indexing & query tuning", "ETL & reporting"] },
  { id: "delivery", jp: "配信", items: ["Docker", "Nginx", "Linux", "GitHub Actions", "Vercel / Render", "Cloudflare", "Playwright / Cypress", "Jest / Vitest"] },
];
