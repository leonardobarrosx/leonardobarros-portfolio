/**
 * The toolbox, grouped. Items are language-neutral (product names); group titles live in i18n.
 * Kept to what is worth defending in an interview: the case studies carry the rest of the proof.
 * Order matters: it is the reading order on the page.
 */
export type ToolGroupId = "languages" | "web" | "services" | "data" | "delivery";

export interface ToolGroup { id: ToolGroupId; jp: string; items: string[] }

export const toolbox: ToolGroup[] = [
  { id: "languages", jp: "言語", items: ["TypeScript", "Go", "Python", "Java", "SQL"] },
  { id: "web", jp: "前面", items: ["React", "Vite + SWC", "Tailwind CSS", "TanStack Query"] },
  { id: "services", jp: "背面", items: ["Spring Boot", "Apache Camel", "Go (Gin)", "Django", "REST / OpenAPI", "JWT / OAuth 2.0"] },
  { id: "data", jp: "資料", items: ["PostgreSQL", "Oracle", "Redis"] },
  { id: "delivery", jp: "配信", items: ["Docker", "Linux", "GitHub Actions", "Playwright", "Vitest / Jest"] },
];
