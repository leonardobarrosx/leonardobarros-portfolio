/**
 * The full toolbox, grouped. Items are language-neutral (product names); group titles live in i18n.
 * Order matters: it is the reading order on the page.
 */
export type ToolGroupId =
  | "languages" | "frontend" | "mobile" | "backend" | "data" | "messaging" | "testing" | "security"
  | "observability" | "performance" | "accessibility" | "automation" | "reporting" | "validation"
  | "cloud" | "design" | "methods";

export interface ToolGroup { id: ToolGroupId; jp: string; items: string[] }

export const toolbox: ToolGroup[] = [
  { id: "languages", jp: "言語", items: ["TypeScript", "JavaScript (ES2023+)", "Python", "Go", "C#", "PHP", "Dart", "SQL (PostgreSQL, Oracle PL/SQL)", "HTML5", "CSS3 / Sass", "Bash / PowerShell", "VB6 (legacy)"] },
  { id: "frontend", jp: "前面", items: ["React", "Vite", "Angular", "Vue", "Tailwind CSS", "shadcn/ui", "Radix UI", "Redux Toolkit", "Zustand", "React Router", "TanStack Query", "React Hook Form", "GSAP", "Lenis", "WebGL / GLSL shaders", "CSS Grid & Flexbox", "Responsive & mobile-first"] },
  { id: "mobile", jp: "携帯", items: ["Flutter", "Dart", "Material 3", "Riverpod / Provider", "Firebase Auth", "Cloud Firestore", "Firebase Cloud Messaging", "Push notifications", "Deep links", "Offline-first (SQLite / sqflite)", "App signing & releases", "Google Play publishing (certified)"] },
  { id: "backend", jp: "背面", items: ["Node.js", "Express", "Django", "Django REST Framework", "Go (net/http, Gin)", "Laravel", "ASP.NET Core / .NET", "REST APIs", "OpenAPI / Swagger", "WebSockets", "Webhooks", "JWT auth", "Background jobs & cron", "File uploads & object storage"] },
  { id: "data", jp: "資料", items: ["PostgreSQL", "Oracle", "SQLite", "MongoDB Atlas", "Cloud Firestore", "Redis", "Supabase", "Prisma", "Django ORM", "Eloquent", "Entity Framework", "Migrations & seeding", "Indexing & query tuning", "Backups & restores"] },
  { id: "messaging", jp: "通信", items: ["Webhooks", "WebSockets / Socket.IO", "Redis Pub/Sub", "BullMQ (queues)", "RabbitMQ", "Twilio (SMS, WhatsApp)", "WhatsApp Business API", "Firebase Cloud Messaging", "Transactional email (SMTP, Resend, SendGrid)", "Google APIs (Sheets, Drive, Calendar, Maps)", "OAuth 2.0 / Google Sign-In", "Payments (Stripe, Mercado Pago, Pix)", "s4e"] },
  { id: "testing", jp: "試験", items: ["Jest", "Vitest", "React Testing Library", "Cypress", "Playwright", "Pytest", "PHPUnit", "xUnit", "Flutter widget tests", "Postman / Insomnia", "ESLint", "Prettier", "TypeScript strict mode", "Code review", "UAT & homologation", "Conventional Commits"] },
  { id: "security", jp: "安全", items: ["OAuth 2.0 / OIDC", "JWT & refresh tokens", "RBAC & permissions", "bcrypt / argon2", "Helmet & CORS", "Rate limiting", "CSRF / XSS protection", "Input sanitisation", "Row Level Security (Postgres, Supabase)", "HTTPS / TLS (Let's Encrypt)", "Secrets management (.env, GitHub Secrets)", "OWASP Top 10", "2FA / MFA", "LGPD / GDPR basics", "Dependency audits (npm audit, Dependabot)"] },
  { id: "observability", jp: "観測", items: ["Sentry", "Structured logging (Pino, Winston, Serilog)", "Health checks", "Uptime monitoring", "Alerting (Slack, Telegram, email)", "Prometheus + Grafana", "OpenTelemetry (basics)", "Nginx & access logs", "C# / .NET telemetry agents", "NOC dashboards & SLAs", "Incident tracking & post-mortems"] },
  { id: "performance", jp: "速度", items: ["Redis caching", "HTTP caching (Cache-Control, ETag)", "CDN (Cloudflare, Vercel Edge)", "Code splitting & lazy loading", "Tree shaking & bundle analysis", "Image optimisation (WebP, AVIF, srcset)", "gzip / Brotli", "Lighthouse & Core Web Vitals", "DB indexing & query optimisation", "Connection pooling", "Memoisation & virtualisation", "Debounce / throttle"] },
  { id: "accessibility", jp: "配慮", items: ["WCAG 2.2 AA", "Semantic HTML", "ARIA", "Keyboard navigation & focus management", "Colour contrast", "prefers-reduced-motion", "Screen readers (NVDA, VoiceOver)", "axe DevTools", "Lighthouse a11y", "i18n / l10n (this site ships in 7 languages)", "Inclusive forms & error states"] },
  { id: "automation", jp: "自動", items: ["n8n", "GitHub Actions (CI/CD)", "Cron & scheduled jobs", "ETL pipelines", "Web scraping (Playwright, BeautifulSoup)", "Python / TypeScript / Go scripting", "LLM APIs (Claude, OpenAI, Gemini)", "AI-agent workflows", "Google Apps Script", "Telegram & Slack bots", "Document generation (PDF, Excel)"] },
  { id: "reporting", jp: "報告", items: ["SQL analytics", "pandas", "Excel / Google Sheets (pivots, Power Query)", "Power BI", "Looker Studio", "KPI & SLA design", "Automated report generation & distribution", "openpyxl / ReportLab", "Data validation & reconciliation", "Executive dashboards"] },
  { id: "validation", jp: "検証", items: ["Zod", "Yup", "React Hook Form", "Pydantic", "DRF serializers", "Laravel Form Requests", "FluentValidation (.NET)", "JSON Schema", "Brazilian document masks (CPF, CNPJ, CEP)", "Sanitisation", "Schema-first API contracts", "Error handling & feedback states"] },
  { id: "cloud", jp: "基盤", items: ["Docker", "Docker Compose", "Nginx", "Linux (Ubuntu, Debian)", "VPS (DigitalOcean)", "Vercel", "Render", "Firebase Hosting", "Supabase", "GitHub Pages", "Cloudflare (DNS, CDN)", "Google Cloud (Firebase)", "AWS S3 / EC2 (basics)", "Windows Server & Active Directory", "Git / GitHub"] },
  { id: "design", jp: "意匠", items: ["Figma (design systems, prototyping)", "Adobe Illustrator", "Photoshop", "InDesign", "After Effects", "Branding & identity", "Typography & grids", "Motion design (GSAP, Lottie)", "Pixel art & sprites", "Micro-interactions", "UX research & flows", "Wireframing"] },
  { id: "methods", jp: "手法", items: ["Agile / Scrum", "Kanban", "SDLC", "Requirements analysis", "Technical documentation", "Git flow", "Jira / Trello / Notion", "ITIL-style support & ITAM", "WMS / DMS (Winthor, Fusion)", "CRM administration", "Stakeholder communication", "English C2"] },
];
