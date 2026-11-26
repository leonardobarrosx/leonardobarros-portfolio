/**
 * The toolbox, grouped. Items are language-neutral (product names); group titles live in i18n.
 * Kept to what is worth defending in an interview: the case studies carry the rest of the proof.
 * Order matters: it is the reading order on the page.
 */
import type { PixelName } from "./pixels";

export type ToolGroupId = "languages" | "web" | "services" | "data" | "delivery";

export interface ToolGroup { id: ToolGroupId; icon: PixelName; items: string[] }

export const toolbox: ToolGroup[] = [
  { id: "languages", icon: "laptop", items: ["TypeScript", "Go", "Python", "Java", "SQL"] },
  { id: "web", icon: "cursor", items: ["React", "Vite + SWC", "Tailwind CSS", "TanStack Query"] },
  { id: "services", icon: "chip", items: ["Spring Boot", "Apache Camel", "Go (Gin)", "Django", "REST / OpenAPI", "JWT / OAuth 2.0"] },
  { id: "data", icon: "floppy", items: ["PostgreSQL", "Oracle", "Redis"] },
  { id: "delivery", icon: "monitor", items: ["Docker", "Linux", "GitHub Actions", "Playwright", "Vitest / Jest"] },
];
