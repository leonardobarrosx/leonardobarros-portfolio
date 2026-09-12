import type { ThemeId } from "../themes";
import type { ToolGroupId } from "../toolbox";

export type Lang = "en" | "pt" | "es" | "de" | "ja" | "ko" | "zh";
export type Variant = "red" | "paper" | "coffee" | "ink";
export type WorkId = "zero" | "argus" | "itam" | "vesta" | "metis" | "sidearm" | "vault" | "codebarx" | "soluna";
export type XpId = "aec" | "dental" | "polybalas" | "ipec" | "unicesumar" | "sesds" | "army" | "freelance" | "bemais";

/** Translated strings for one project. Language-neutral fields live in `worksBase`. */
export interface WorkText {
  kind: string;
  desc: string;
  long: string;
  role: string[];
  deliverables: string[];
  highlights: string[];
}

/** Translated strings for one role. Language-neutral fields live in `xpBase`. */
export interface XpText {
  period: string;
  type: string;
  role: string;
  org: string;
  where: string;
  note: string;
  bullets: string[];
}

export interface CertText { name: string; issuer: string; meta: string }

/** Everything that changes with the language. */
export interface Strings {
  meta: { role: string; badge: string; statement: [string, string, string]; location: string };
  nav: { work: string; about: string; experience: string; contact: string; menu: string; close: string; motion: string; on: string; off: string; language: string; theme: string };
  themes: Record<ThemeId, string>;
  ask: { kicker: string; question: string; hint: string; thanks: string; skip: string };
  labels: { about: string; services: string; work: string; experience: string; stack: string; contact: string; words: string; certs: string; orgs: string; toolbox: string };
  toolbox: Record<ToolGroupId, string>;
  marquee: string[];
  about: { quote: string; paragraphs: string[]; facts: [string, string][]; valuesTitle: string; values: { title: string; text: string }[]; offTitle: string; off: string };
  services: { title: string; text: string }[];
  works: Record<WorkId, WorkText>;
  sheet: { year: string; type: string; stack: string; open: string; private: string; close: string; role: string; overview: string; did: string; deliverables: string; prev: string; next: string };
  xp: { visit: string; period: string; location: string; type: string; open: string };
  experience: Record<XpId, XpText>;
  testimonials: { name: string; role: string; quote: string; photo: "claudio" | "roger" }[];
  certs: [CertText, CertText, CertText, CertText, CertText, CertText];
  credentials: string[];
  contact: { title: [string, string]; note: string; copy: string; copied: string; top: string };
}
