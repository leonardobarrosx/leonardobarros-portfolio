export const meta = {
  name: "Leonardo Barros",
  first: "Leonardo",
  last: "Barros",
  nameJp: "レオナルド・バロス",
  role: "Full-Stack & Mobile Developer",
  roleJp: "フルスタック開発者",
  tagline: "React • Flutter • TypeScript • Node.js • Python • Go • C# | UI/UX Design",
  statement:
    "Ten years building software that works and looks the part. Web, mobile, data and the glue in between.",
  location: "João Pessoa, Brazil",
  coords: "7.1195° S, 34.8450° W",
  timezone: "America/Fortaleza",
  email: "xleonardobarros@gmail.com",
  linkedin: "https://www.linkedin.com/in/leonardobarrosx",
  github: "https://github.com/leonardobarrosx",
  volume: "Vol. 01 — 2026",
};

export const marquee = [
  "Full-Stack",
  "フルスタック",
  "Mobile",
  "モバイル",
  "UI/UX",
  "デザイン",
  "Data",
  "データ",
  "Automation",
  "自動化",
];

export const about = {
  quote: "I care about how things look and how they feel to use, not just whether they work.",
  paragraphs: [
    "Ten years in tech, most of it wearing more than one hat. Freelance full-stack and mobile developer since 2016, IT analyst at a wholesale distributor and at a dental clinic network, and today a planning and data intelligence analyst at AeC, where I automate and validate the reporting behind a large contact-center operation.",
    "I got into all of this through games. I learned English as a kid translating patch notes for a blog, then taught myself to program by building tools for the games I played and, eventually, my own online RPG. The design and illustration side comes from the same place.",
  ],
  facts: [
    ["Based", "João Pessoa, BR"],
    ["Since", "2016"],
    ["Languages", "PT native · EN C2"],
    ["Status", "Open to work"],
  ],
};

export const services = [
  {
    n: "01",
    title: "Build",
    jp: "構築",
    text: "Web (React, TypeScript, Angular, Vue), mobile (Flutter), back-ends (Node.js, Python/Django, Go, PHP/Laravel, C#/.NET), REST APIs and third-party integrations.",
  },
  {
    n: "02",
    title: "Data",
    jp: "データ",
    text: "SQL (Oracle, PostgreSQL), dashboards and reporting in Python, ETL and validation routines, and Excel/Sheets modeling when that's the right tool for the job.",
  },
  {
    n: "03",
    title: "Run",
    jp: "運用",
    text: "On-site and remote IT support, asset management, CRM migrations, automation with n8n, and the documentation that keeps all of it sane.",
  },
  {
    n: "04",
    title: "Design",
    jp: "デザイン",
    text: "Figma and the Adobe suite. Design systems, branding, illustration and motion, with accessibility from the start.",
  },
];

export type Variant = "red" | "paper" | "coffee" | "ink";

export interface Work {
  id: string;
  title: string[];
  jp: string;
  year: string;
  kind: string;
  stack: string;
  desc: string;
  variant: Variant;
  href?: string;
  tall?: boolean;
}

export const works: Work[] = [
  {
    id: "itam",
    title: ["ITAM"],
    jp: "資産",
    year: "2025–26",
    kind: "IT asset management",
    stack: "React · TypeScript · Tailwind · Laravel · C#/.NET",
    desc: "IT asset management for a dental clinic network: contracts, approval flows and a telemetry agent that reports hardware over HTTP.",
    variant: "red",
    tall: true,
  },
  {
    id: "vesta",
    title: ["Vesta"],
    jp: "食",
    year: "2026",
    kind: "SaaS",
    stack: "TypeScript",
    desc: "Restaurant management, from the kitchen to the books.",
    variant: "paper",
  },
  {
    id: "metis",
    title: ["Metis"],
    jp: "運用",
    year: "2025",
    kind: "Operations platform",
    stack: "Flutter · Go · Firebase",
    desc: "Modular management platform for operational control.",
    variant: "coffee",
  },
  {
    id: "sidearm",
    title: ["Side", "arm"],
    jp: "照準",
    year: "2025",
    kind: "Open source",
    stack: "Valorant pocket coach",
    desc: "A pocket coach for Valorant players.",
    variant: "ink",
    href: "https://github.com/leonardobarrosx/sidearm",
    tall: true,
  },
  {
    id: "vault",
    title: ["Manhwa", "Vault"],
    jp: "書庫",
    year: "2026",
    kind: "Desktop tool",
    stack: "Go · React",
    desc: "Local media catalogue with an embedded React UI, shipped as a single Go binary.",
    variant: "paper",
  },
  {
    id: "codebarx",
    title: ["Code", "BarX"],
    jp: "符号",
    year: "2025",
    kind: "Utility",
    stack: "Python",
    desc: "CODE128 and CODE39 barcode generator.",
    variant: "ink",
  },
  {
    id: "soluna",
    title: ["Soluna"],
    jp: "月と太陽",
    year: "2020",
    kind: "Game engine",
    stack: "2D MMORPG engine",
    desc: "My own 2D MMORPG engine. The one that started it all, sort of.",
    variant: "red",
  },
];

export const experience = [
  { years: "2026 —", role: "Senior Planning & Data Intelligence Analyst", org: "AeC", where: "Remote" },
  { years: "2025 — 26", role: "Mid-Level IT Analyst", org: "Dental Center", where: "João Pessoa" },
  { years: "2023 — 25", role: "IT Analyst", org: "Polybalas", where: "João Pessoa" },
  { years: "2023", role: "Technology Researcher", org: "Ipec", where: "Curitiba" },
  { years: "2022", role: "Commercial Analyst", org: "UniCesumar", where: "Curitiba" },
  { years: "2019 — 21", role: "Graphic Designer", org: "Paraíba State Dept. of Public Security", where: "João Pessoa" },
  { years: "2017", role: "Officer Aspirant", org: "Brazilian Army", where: "João Pessoa" },
  { years: "2016 —", role: "Full-Stack Developer & Designer", org: "Freelance", where: "Remote" },
  { years: "2015 — 17", role: "Customer Service & Cashier", org: "BeMais Supermarkets", where: "João Pessoa" },
];

export const stack = [
  "React", "TypeScript", "Flutter", "Node.js", "Python", "Go", "C#", "Laravel",
  "Angular", "Vue", "Django", "PostgreSQL", "Oracle", "MongoDB", "Firebase",
  "Tailwind", "n8n", "Docker", "Figma", "GSAP",
];

export const credentials = [
  "English C2 (EF SET 72/100)",
  "Cisco Cyber Threat Management",
  "Google Play Store Listing",
];
