import type { Lang, Variant, WorkId, XpId, Strings } from "./i18n/types";
import { en } from "./i18n/en";
import { pt } from "./i18n/pt";
import { es } from "./i18n/es";
import { de } from "./i18n/de";
import { ja } from "./i18n/ja";
import { ko } from "./i18n/ko";
import { zh } from "./i18n/zh";

export type { Lang, Variant };

export const LANGS: { code: Lang; name: string; html: string }[] = [
  { code: "en", name: "English", html: "en" },
  { code: "pt", name: "Português", html: "pt-BR" },
  { code: "es", name: "Español", html: "es" },
  { code: "de", name: "Deutsch", html: "de" },
  { code: "ja", name: "日本語", html: "ja" },
  { code: "ko", name: "한국어", html: "ko" },
  { code: "zh", name: "中文", html: "zh-CN" },
];

export const shared = {
  name: "Leonardo Barros",
  first: "Leonardo",
  last: "Barros",
  nameJp: "レオナルド・バロス",
  roleJp: "フルスタック開発者",
  tagline: "React • Flutter • TypeScript • Node.js • Python • Go • C# | UI/UX Design",
  volume: "Vol. 01 — 2026",
  timezone: "America/Fortaleza",
  email: "xleonardobarros@gmail.com",
  linkedin: "https://www.linkedin.com/in/leonardobarrosx",
  github: "https://github.com/leonardobarrosx",
  stack: ["React", "TypeScript", "Flutter", "Node.js", "Python", "Go", "C#", "Laravel", "Angular", "Vue", "Django", "Express", "PostgreSQL", "Oracle", "MongoDB", "Redis", "Firebase", "Supabase", "Tailwind", "n8n", "Docker", "Nginx", "GitHub Actions", "Jest", "Cypress", "Figma", "Illustrator", "GSAP"],
};

/** João Pessoa landmarks; decimal degrees rendered as DMS by the Landmarks component. */
export const landmarks: { name: string; lat: number; lng: number }[] = [
  { name: "Farol do Cabo Branco", lat: -7.14861, lng: -34.79667 },
  { name: "Ponta do Seixas", lat: -7.1553, lng: -34.7934 },
  { name: "Estação Cabo Branco", lat: -7.1500, lng: -34.7985 },
  { name: "Praia de Tambaú", lat: -7.1195, lng: -34.8228 },
  { name: "Parque Solon de Lucena", lat: -7.1195, lng: -34.8790 },
  { name: "Centro Histórico", lat: -7.1167, lng: -34.8828 },
  { name: "Praia do Bessa", lat: -7.0810, lng: -34.8330 },
];

export function toDMS(lat: number, lng: number): string {
  const f = (v: number, pos: string, neg: string) => {
    const a = Math.abs(v);
    const d = Math.floor(a);
    const m = Math.floor((a - d) * 60);
    const s = ((a - d) * 60 - m) * 60;
    return `${d}°${String(m).padStart(2, "0")}'${s.toFixed(1).padStart(4, "0")}"${v < 0 ? neg : pos}`;
  };
  return `${f(lat, "N", "S")} ${f(lng, "E", "W")}`;
}

/* ---------- language-neutral bases ---------- */

const worksBase: Record<WorkId, { id: string; title: string[]; jp: string; year: string; stack: string; stackList: string[]; variant: Variant; href?: string; tall?: boolean }> = {
  zero: { id: "zero-state", title: ["Zero", "State"], jp: "零", year: "2025–", stack: "React · TypeScript · Flutter · Go · Supabase", stackList: ["React", "TypeScript", "Flutter", "Go", "Node.js", "PostgreSQL", "Supabase", "Tailwind", "Figma"], variant: "ink", tall: true },
  argus: { id: "argus", title: ["Argus"], jp: "眼", year: "2026", stack: "Vite · TypeScript · Go · PostgreSQL · Flutter", stackList: ["Vite", "TypeScript", "Tailwind", "shadcn/ui", "Go", "PostgreSQL", "Flutter", "Supabase", "Render", "Vercel"], variant: "paper" },
  itam: { id: "itam", title: ["ITAM"], jp: "資産", year: "2025–26", stack: "React · TypeScript · Tailwind · Laravel · C#/.NET", stackList: ["React", "TypeScript", "Tailwind", "Laravel", "PHP", "C#/.NET", "REST API"], variant: "red", tall: true },
  vesta: { id: "vesta", title: ["Vesta"], jp: "食", year: "2026", stack: "TypeScript · Go · Flutter", stackList: ["Vite", "TypeScript", "Tailwind", "shadcn/ui", "Go", "PostgreSQL", "Flutter", "Supabase", "Render", "Vercel"], variant: "paper" },
  metis: { id: "metis", title: ["Metis"], jp: "運用", year: "2025", stack: "Flutter · Go · Firebase", stackList: ["Flutter", "Dart", "Go", "Firebase"], variant: "red" },
  sidearm: { id: "sidearm", title: ["Side", "arm"], jp: "照準", year: "2025", stack: "Open source", stackList: ["Open source", "GitHub"], variant: "coffee", href: "https://github.com/leonardobarrosx/sidearm" },
  vault: { id: "vault", title: ["Manhwa", "Vault"], jp: "書庫", year: "2026", stack: "Go · React", stackList: ["Go", "React", "TypeScript"], variant: "paper" },
  codebarx: { id: "codebarx", title: ["Code", "BarX"], jp: "符号", year: "2025", stack: "Python", stackList: ["Python"], variant: "ink" },
  soluna: { id: "soluna", title: ["Soluna"], jp: "月と太陽", year: "2020", stack: "VB6 · MMORPG engine", stackList: ["VB6", "Pixel art", "Animation"], variant: "coffee" },
};
const WORK_ORDER: WorkId[] = ["zero", "argus", "itam", "vesta", "metis", "sidearm", "vault", "codebarx", "soluna"];

const xpBase: Record<XpId, { id: XpId; years: string; site?: string; logo?: "dental" | "polybalas" | "ipec" | "bemais" }> = {
  aec: { id: "aec", years: "2026 —", site: "https://www.aec.com.br" },
  dental: { id: "dental", years: "2025 — 26", site: "https://www.dentalcenter.com.br", logo: "dental" },
  polybalas: { id: "polybalas", years: "2023 — 25", site: "https://polybalas.com.br", logo: "polybalas" },
  ipec: { id: "ipec", years: "2023", site: "https://www.ipec-inteligencia.com", logo: "ipec" },
  unicesumar: { id: "unicesumar", years: "2022", site: "https://www.unicesumar.edu.br" },
  sesds: { id: "sesds", years: "2019 — 21", site: "https://paraiba.pb.gov.br" },
  army: { id: "army", years: "2017", site: "https://www.eb.mil.br" },
  freelance: { id: "freelance", years: "2016 —" },
  bemais: { id: "bemais", years: "2015 — 17", site: "https://bemais.com.br", logo: "bemais" },
};
const XP_ORDER: XpId[] = ["aec", "dental", "polybalas", "ipec", "unicesumar", "sesds", "army", "freelance", "bemais"];

const certBase: { icon: "efset" | "cisco" | "google" | "connect"; id?: string }[] = [
  { icon: "efset" },
  { icon: "cisco", id: "f13d1ee4-445d-4b4c-babf-aeee86c895c5" },
  { icon: "google", id: "143822560" },
  { icon: "google", id: "130967854" },
  { icon: "google", id: "130962867" },
  { icon: "connect" },
];
const serviceJp = ["構築", "データ", "運用", "デザイン"];

/* ---------- assembled shape used by the components ---------- */

export type Work = (typeof worksBase)[WorkId] & Strings["works"][WorkId];
export type Experience = (typeof xpBase)[XpId] & Strings["experience"][XpId];

export interface Content {
  meta: Strings["meta"] & { roleJp: string; tagline: string; volume: string };
  nav: Strings["nav"];
  themes: Strings["themes"];
  ask: Strings["ask"];
  labels: Strings["labels"];
  marquee: string[];
  about: Strings["about"];
  services: { n: string; title: string; jp: string; text: string }[];
  works: Work[];
  sheet: Strings["sheet"];
  xp: Strings["xp"];
  experience: Experience[];
  orgsTitle: string;
  labelsExtra: { words: string; certs: string; toolbox: string };
  toolbox: Strings["toolbox"];
  testimonials: Strings["testimonials"];
  certs: { icon: "efset" | "cisco" | "google" | "connect"; id?: string; name: string; issuer: string; meta: string }[];
  credentials: string[];
  contact: Strings["contact"] & { jp: string };
}

function assemble(s: Strings): Content {
  return {
    meta: { ...s.meta, roleJp: shared.roleJp, tagline: shared.tagline, volume: shared.volume },
    nav: s.nav,
    themes: s.themes,
    ask: s.ask,
    labels: s.labels,
    marquee: s.marquee,
    about: s.about,
    services: s.services.map((sv, i) => ({ n: `0${i + 1}`, jp: serviceJp[i], ...sv })),
    works: WORK_ORDER.map((id) => ({ ...worksBase[id], ...s.works[id] })),
    sheet: s.sheet,
    xp: s.xp,
    experience: XP_ORDER.map((id) => ({ ...xpBase[id], ...s.experience[id] })),
    orgsTitle: s.labels.orgs,
    labelsExtra: { words: s.labels.words, certs: s.labels.certs, toolbox: s.labels.toolbox },
    toolbox: s.toolbox,
    testimonials: s.testimonials,
    certs: certBase.map((c, i) => ({ ...c, ...s.certs[i] })),
    credentials: s.credentials,
    contact: { ...s.contact, jp: "話しましょう" },
  };
}

const strings: Record<Lang, Strings> = { en, pt, es, de, ja, ko, zh };
export const content: Record<Lang, Content> = Object.fromEntries(
  (Object.keys(strings) as Lang[]).map((l) => [l, assemble(strings[l])]),
) as Record<Lang, Content>;
