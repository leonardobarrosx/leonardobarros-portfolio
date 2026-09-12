export type Lang = "en" | "pt";
export type Variant = "red" | "paper" | "coffee" | "ink";

export interface Work {
  id: string;
  title: string[];
  jp: string;
  year: string;
  kind: string;
  stack: string;
  desc: string;
  long: string;
  role: string[];
  deliverables: string[];
  highlights: string[];
  stackList: string[];
  variant: Variant;
  href?: string;
  tall?: boolean;
}

export interface Content {
  meta: {
    role: string;
    roleJp: string;
    tagline: string;
    statement: [string, string, string]; // before em, em, after em
    location: string;
    volume: string;
  };
  nav: { work: string; about: string; experience: string; contact: string; menu: string; close: string; motion: string; on: string; off: string };
  labels: { about: string; services: string; work: string; experience: string; stack: string; contact: string };
  marquee: string[];
  about: { quote: string; paragraphs: string[]; facts: [string, string][]; valuesTitle: string; values: { title: string; text: string }[]; offTitle: string; off: string };
  services: { n: string; title: string; jp: string; text: string }[];
  works: Work[];
  sheet: { year: string; type: string; stack: string; open: string; private: string; close: string; role: string; overview: string; did: string; deliverables: string; prev: string; next: string };
  xp: { visit: string; period: string; location: string; type: string; open: string };
  experience: { id: string; years: string; period: string; type: string; role: string; org: string; where: string; note: string; site?: string; logo?: "dental" | "polybalas" | "ipec" | "bemais"; bullets: string[] }[];
  orgsTitle: string;
  labelsExtra: { words: string; certs: string };
  testimonials: { name: string; role: string; quote: string; photo: "claudio" | "roger" }[];
  certs: { name: string; issuer: string; meta: string; id?: string; icon: "efset" | "cisco" | "google" | "connect" }[];
  credentials: string[];
  contact: { title: [string, string]; jp: string; note: string; copy: string; copied: string; top: string };
}

export const shared = {
  name: "Leonardo Barros",
  first: "Leonardo",
  last: "Barros",
  nameJp: "レオナルド・バロス",
  coords: "7.1195° S, 34.8450° W",
  timezone: "America/Fortaleza",
  email: "xleonardobarros@gmail.com",
  linkedin: "https://www.linkedin.com/in/leonardobarrosx",
  github: "https://github.com/leonardobarrosx",
  stack: [
    "React", "TypeScript", "Flutter", "Node.js", "Python", "Go", "C#", "Laravel",
    "Angular", "Vue", "Django", "PostgreSQL", "Oracle", "MongoDB", "Firebase",
    "Tailwind", "n8n", "Docker", "Figma", "GSAP",
  ],
};

const worksBase = {
  zero: { id: "zero-state", title: ["Zero", "State"], jp: "零", year: "2025–", stack: "React · TypeScript · Flutter · Go · Supabase", stackList: ["React", "TypeScript", "Flutter", "Go", "Node.js", "PostgreSQL", "Supabase", "Tailwind", "Figma"], variant: "ink" as Variant, tall: true },
  argus: { id: "argus", title: ["Argus"], jp: "眼", year: "2026", stack: "Vite · TypeScript · Go · PostgreSQL · Flutter", stackList: ["Vite", "TypeScript", "Tailwind", "shadcn/ui", "Go", "PostgreSQL", "Flutter", "Supabase", "Render", "Vercel"], variant: "paper" as Variant },
  itam: { id: "itam", title: ["ITAM"], jp: "資産", year: "2025–26", stack: "React · TypeScript · Tailwind · Laravel · C#/.NET", stackList: ["React", "TypeScript", "Tailwind", "Laravel", "PHP", "C#/.NET", "REST API"], variant: "red" as Variant, tall: true },
  vesta: { id: "vesta", title: ["Vesta"], jp: "食", year: "2026", stack: "TypeScript · Go · Flutter", stackList: ["Vite", "TypeScript", "Tailwind", "shadcn/ui", "Go", "PostgreSQL", "Flutter", "Supabase", "Render", "Vercel"], variant: "paper" as Variant },
  metis: { id: "metis", title: ["Metis"], jp: "運用", year: "2025", stack: "Flutter · Go · Firebase", stackList: ["Flutter", "Dart", "Go", "Firebase"], variant: "red" as Variant },
  sidearm: { id: "sidearm", title: ["Side", "arm"], jp: "照準", year: "2025", stack: "Open source", stackList: ["Open source", "GitHub"], variant: "coffee" as Variant, href: "https://github.com/leonardobarrosx/sidearm" },
  vault: { id: "vault", title: ["Manhwa", "Vault"], jp: "書庫", year: "2026", stack: "Go · React", stackList: ["Go", "React", "TypeScript"], variant: "paper" as Variant },
  codebarx: { id: "codebarx", title: ["Code", "BarX"], jp: "符号", year: "2025", stack: "Python", stackList: ["Python"], variant: "ink" as Variant },
  soluna: { id: "soluna", title: ["Soluna"], jp: "月と太陽", year: "2020", stack: "VB6 · MMORPG engine", stackList: ["VB6", "Pixel art", "Animation"], variant: "coffee" as Variant },
};

export const content: Record<Lang, Content> = {
  en: {
    meta: {
      role: "Full-Stack & Mobile Developer",
      roleJp: "フルスタック開発者",
      tagline: "React • Flutter • TypeScript • Node.js • Python • Go • C# | UI/UX Design",
      statement: ["Ten years building software that ", "works", " and looks the part. Web, mobile, data and the glue in between."],
      location: "João Pessoa, Brazil",
      volume: "Vol. 01 — 2026",
    },
    nav: { work: "Work", about: "About", experience: "Experience", contact: "Contact", menu: "Menu", close: "Close", motion: "Motion", on: "on", off: "off" },
    labels: { about: "About", services: "What I do", work: "Selected work", experience: "Experience", stack: "Stack", contact: "Contact" },
    marquee: ["Full-Stack", "フルスタック", "Mobile", "モバイル", "UI/UX", "デザイン", "Data", "データ", "Automation", "自動化"],
    about: {
      quote: "I care about how things look and how they feel to use, not just whether they work.",
      paragraphs: [
        "Ten years in tech, most of it wearing more than one hat. Freelance full-stack and mobile developer since 2016, IT analyst at a wholesale distributor and at a dental clinic network, and today a planning and data intelligence analyst at AeC, where I automate and validate the reporting behind a large contact-center operation.",
        "I got into all of this through games. I learned English as a kid translating patch notes for a blog, then taught myself to program by building tools for the games I played and, eventually, my own online RPG. The design and illustration side comes from the same place.",
        "In parallel, ZERO STATE is my software studio and product lab: ARGUS (optical management) and VESTA (restaurant operations) were born there, along with a growing set of internal tools and automations.",
      ],
      facts: [["Based", "João Pessoa, BR"], ["Since", "2016"], ["Languages", "PT native · EN C2"], ["Status", "Open to work"]],
      valuesTitle: "What I bring",
      values: [
        { title: "Care", text: "Responsibility and empathy walk together. I build things that protect the people using them, and I support the team before looking for credit." },
        { title: "Discipline", text: "A year in the Reserve Officer Training Course taught me that standards only make sense when you live them before asking others to." },
        { title: "Community", text: "From forums and guilds to today's squads: I do my best work when information circulates and the win is collective." },
        { title: "Learning", text: "Publishing notes, sharing prototypes and asking for feedback keeps me honest and speeds up everyone around me." },
      ],
      offTitle: "Off the clock",
      off: "Sketchbooks and pixel art, guitar and keyboard, calisthenics and swimming, a lot of sci-fi and fantasy, and games: Valorant, Warframe, Final Fantasy, Stardew Valley.",
    },
    services: [
      { n: "01", title: "Build", jp: "構築", text: "Web (React, TypeScript, Angular, Vue), mobile (Flutter), back-ends (Node.js, Python/Django, Go, PHP/Laravel, C#/.NET), REST APIs and third-party integrations." },
      { n: "02", title: "Data", jp: "データ", text: "SQL (Oracle, PostgreSQL), dashboards and reporting in Python, ETL and validation routines, and Excel/Sheets modeling when that's the right tool for the job." },
      { n: "03", title: "Run", jp: "運用", text: "On-site and remote IT support, asset management, CRM migrations, automation with n8n, and the documentation that keeps all of it sane." },
      { n: "04", title: "Design", jp: "デザイン", text: "Figma and the Adobe suite. Design systems, branding, illustration and motion, with accessibility from the start." },
    ],
    works: [
      { ...worksBase.zero, kind: "Software studio", role: ["Founder", "Product design", "Full-stack & mobile", "Brand"], deliverables: ["Product strategy", "Brand identity", "UI/UX", "Web & mobile apps", "Cloud deployment"], highlights: ["The umbrella for independent product work, from concept to cloud delivery.", "Two complete products shipped, ARGUS and VESTA, plus internal tools and automations.", "One design system and one stack reused across products to move fast."], desc: "My studio and product lab. ARGUS and VESTA were born here.", long: "ZERO STATE is the umbrella for my independent product work: branding and product strategy, UI/UX, full-stack and mobile development, cloud delivery. It has shipped two complete products, ARGUS and VESTA, and a growing set of internal tools and automations." },
      { ...worksBase.argus, kind: "Optical management", role: ["Product designer", "UI/UX", "Full-stack developer", "Mobile"], deliverables: ["Brand identity", "UI/UX design", "Web platform", "Mobile support", "Backend API", "Cloud deployment"], highlights: ["Patients, prescriptions, service orders, lab production, deliveries, inventory, sales and CRM in one workflow.", "Web app in Vite + TypeScript + Tailwind + shadcn/ui; mobile in Flutter.", "Go API on PostgreSQL with Supabase, deployed on Render and Vercel."], desc: "One workflow for optical stores, from prescription to delivery.", long: "ARGUS centralizes the daily operation of optical stores: patients, prescriptions, service orders, lab production, deliveries, inventory, sales and CRM in a single flow. Vite + TypeScript + Tailwind on the web, Flutter on mobile, a Go API on PostgreSQL, Supabase, deployed on Render and Vercel." },
      { ...worksBase.itam, kind: "IT asset management", role: ["UI/UX designer", "Front-end", "Back-end", "C# agent developer"], deliverables: ["Internal system design", "UI/UX", "Web platform", "Backend API", "C# telemetry agent", "Approval workflow"], highlights: ["React + TypeScript + Tailwind SPA over a Laravel REST API for assets, contracts and approval flows.", "A C#/.NET agent collects PC hardware data and posts it over HTTP to a validation queue.", "Every incoming record is checked by a technician before it enters the inventory."], desc: "Asset platform for a dental clinic network.", long: "A React + TypeScript + Tailwind SPA on top of a Laravel REST API, managing assets, contracts and approval flows. A C#/.NET telemetry agent collects PC hardware data and sends it over HTTP to a web approval queue, where a technician validates each record before it enters the inventory." },
      { ...worksBase.vesta, kind: "Restaurant platform", role: ["Product designer", "UI/UX", "Full-stack", "Mobile", "Backend"], deliverables: ["Brand identity", "UI/UX design", "Web platform", "Mobile app", "Backend API", "Cloud deployment"], highlights: ["Tables, orders, kitchen, cashier, reports and inventory connected in one flow.", "Web in Vite + TypeScript + Tailwind; mobile in Flutter.", "Go back-end on PostgreSQL and Supabase, deployed on Render and Vercel."], desc: "Tables, orders, kitchen, cashier and reports in one flow.", long: "VESTA connects service, kitchen, cashier, reports, inventory and mobile workflows into a single ecosystem. Brand, UI/UX, web app, mobile app, Go back-end and cloud deployment, all built as one product." },
      { ...worksBase.metis, kind: "Operations platform", role: ["Product design", "Mobile developer", "Backend"], deliverables: ["Flutter app", "Go API", "Firebase infrastructure"], highlights: ["Modular management platform for operational control.", "Flutter front-end with a Go back-end and Firebase infrastructure.", "Modules can be switched on per client."], desc: "Modular management platform for operational control.", long: "A modular platform for operational control with a Flutter front-end, a Go back-end and Firebase infrastructure. Each module can be switched on per client." },
      { ...worksBase.sidearm, kind: "Open source", role: ["Design", "Development"], deliverables: ["Open-source app"], highlights: ["A pocket coach for Valorant players.", "Public on GitHub, built for the community I play in."], desc: "A pocket coach for Valorant players.", long: "A small companion app for Valorant players: agent tips, map callouts and routines to warm up before ranked. Public on GitHub." },
      { ...worksBase.vault, kind: "Desktop tool", role: ["Design", "Development"], deliverables: ["Desktop tool", "Single Go binary"], highlights: ["Local catalogue browser and organised downloader.", "Go back-end with an embedded React UI, shipped as one binary with no external dependencies."], desc: "Local media catalogue in a single Go binary.", long: "A local catalogue browser and organised downloader with a Go back-end and an embedded React UI, shipped as one binary with no external dependencies." },
      { ...worksBase.codebarx, kind: "Utility", role: ["Development"], deliverables: ["Generator library"], highlights: ["Custom CODE128 and CODE39 barcode generator.", "Built in Python for labelling and internal logistics use."], desc: "CODE128 and CODE39 barcode generator.", long: "A custom barcode generator for CODE128 and CODE39, written in Python for labelling and internal logistics use." },
      { ...worksBase.soluna, kind: "Game engine", role: ["Code", "Pixel art", "Animation"], deliverables: ["2D MMORPG engine", "Sprites & animation", "A server for friends"], highlights: ["2D MMORPG engine in the Eclipse / Crystalshire lineage.", "Sprite art, pixel art and animation done by hand.", "Where programming started for me, between 2007 and 2012."], desc: "My own 2D MMORPG engine. The one that started it all.", long: "A 2D MMORPG engine in the Eclipse/Crystalshire lineage, built to run an online RPG for friends. Sprite art, pixel art and animation done by hand. This is where programming started for me." },
    ],
    sheet: { year: "Year", type: "Type", stack: "Stack", open: "Open on GitHub", private: "Private project", close: "Close", role: "Role", overview: "Overview", did: "What I did", deliverables: "Deliverables", prev: "Previous", next: "Next" },
    xp: { visit: "Visit website", period: "Period", location: "Location", type: "Type", open: "Details" },
    experience: [
      { id: "aec", years: "2026 —", period: "Apr 2026 – Present", type: "Full-time · Remote", role: "Senior Planning & Data Intelligence Analyst", org: "AeC", where: "Remote", site: "https://www.aec.com.br", note: "Automated reporting, data validation and the liaison between operations and technology.",
        bullets: [
          "Monitor contact-center operations: queues, skills, service levels, abandoned calls and other performance indicators.",
          "Manage the development and rollout of automated operational snapshot and performance reports: layouts, calculation rules, data sources, schedules and distribution workflows.",
          "Support integrations between APIs, operational databases and reporting solutions; validate automated results against real-time data.",
          "Functional testing, data validation and homologation before production; monitor automated deliveries and coordinate corrections.",
          "Liaison between Planning, Operations, Data Intelligence, Technology and external partners: requirements, incidents, technical adjustments and implementation status.",
        ] },
      { id: "dental", years: "2025 — 26", period: "Nov 2025 – Apr 2026", type: "Full-time · On-site", role: "Mid-Level IT Analyst", org: "Dental Center", where: "João Pessoa", site: "https://www.dentalcenter.com.br", logo: "dental", note: "On-site support, an IT asset platform, billing automation and a CRM migration.",
        bullets: [
          "Daily on-site support tickets (hardware, software, access) with rapid troubleshooting to minimize downtime.",
          "Architected an IT asset management platform: React + TypeScript + Tailwind SPA and a Laravel REST API for assets, contracts and approval flows.",
          "Built a C#/.NET telemetry agent that sends PC hardware data over HTTP to a web-based approval queue.",
          "Laravel webhook for a Twilio-based billing reminder workflow, connected to the s4e API.",
          "Dedicated internal page for ANS/IDSS results, replacing a legacy PDF redirect.",
          "Led the CRM unification: migrated the commercial team to Kommo CRM and decommissioned 2 redundant platforms.",
        ] },
      { id: "polybalas", years: "2023 — 25", period: "Nov 2023 – Nov 2025", type: "Full-time · On-site", role: "IT Analyst", org: "Polybalas", where: "João Pessoa", site: "https://polybalas.com.br", logo: "polybalas", note: "Logistics systems, Oracle SQL routines, dashboards and internal tools.",
        bullets: [
          "Logistics systems: Winthor WMS and Fusion DMS.",
          "Python dashboards and executive reports for logistics KPIs; data extraction, transformation and modeling for decision-making.",
          "Oracle SQL: queries, database management, automated extraction scripts and integration workflows.",
          "Excel and Google Sheets models and strategic spreadsheets for distribution tracking and performance control.",
          "Internal applications with Python/Django, React, Vue, Angular, TypeScript and Dart.",
        ] },
      { id: "ipec", years: "2023", period: "Mar 2023 – May 2023", type: "Temporary", role: "Technology Researcher", org: "Ipec", where: "Curitiba", site: "https://www.ipec-inteligencia.com", logo: "ipec", note: "Nationwide corporate IT survey for CGI.br's CETIC.br.",
        bullets: [
          "Applied CGI.br's CETIC.br corporate IT survey to map technology adoption across Brazilian companies.",
          "Coordinated phone interviews nationwide and on-site visits to IT teams in Paraná.",
          "Managed scheduling, response quality and data delivery within the 3-month contract.",
        ] },
      { id: "unicesumar", years: "2022", period: "May 2022 – Oct 2022", type: "Full-time", role: "Commercial Analyst", org: "UniCesumar", where: "Curitiba", site: "https://www.unicesumar.edu.br", note: "Lead routines, partnerships and CRM reporting.",
        bullets: [
          "Lead capture and conversion routines.",
          "Local partnerships and brand events.",
          "Simple reporting and follow-ups in CRM and Sheets.",
        ] },
      { id: "sesds", years: "2019 — 21", period: "Oct 2019 – Aug 2021", type: "Full-time", role: "Graphic Designer", org: "Paraíba State Dept. of Public Security", where: "João Pessoa", site: "https://paraiba.pb.gov.br", note: "Art direction, illustration and editorial layout.",
        bullets: [
          "Design and art direction for social media, digital illustration, mockups and audiovisual assets.",
          "Editorial layout for digital and print: magazines, banners, flyers.",
          "Adobe Illustrator, InDesign, Photoshop and After Effects, aligned with the institutional strategy.",
        ] },
      { id: "army", years: "2017", period: "Feb 2017 – Dec 2017", type: "Full-time", role: "Officer Aspirant", org: "Brazilian Army", where: "João Pessoa", site: "https://www.eb.mil.br", note: "Reserve Officer Training Course (NPOR).",
        bullets: [
          "Completed the Reserve Officer Training Course (NPOR): leadership, tactics, planning and administration.",
          "Intensive physical and military training; resilience, discipline and readiness under pressure.",
          "Vice president of the class association: events, coordination and commemorative products.",
        ] },
      { id: "freelance", years: "2016 —", period: "Aug 2016 – Present", type: "Freelance · Remote", role: "Full-Stack Developer & Designer", org: "Freelance", where: "Remote", note: "Web, mobile and automation for small businesses and creators.",
        bullets: [
          "End-to-end web and mobile solutions for SMBs and creators via Upwork, Workana and referrals.",
          "Front-end in React/Vite, Angular or Vue; back-ends in Node.js/Express, Python or Go; PostgreSQL, SQLite, MongoDB, Firebase and Redis.",
          "Flutter apps from prototype to production; n8n + Python/TypeScript/Go automations for SaaS/API integration, ETL and reporting.",
          "Branding, prototypes, design systems, illustration and motion.",
          "Git with feature branches, automated tests (Jest, Cypress, Pytest), CI/CD with GitHub Actions, Docker and Nginx.",
        ] },
      { id: "bemais", years: "2015 — 17", period: "Jan 2015 – Jan 2017", type: "Full-time", role: "Customer Service & Cashier", org: "BeMais Supermarkets", where: "João Pessoa", site: "https://bemais.com.br", logo: "bemais", note: "Front-line customer service and register closing.",
        bullets: [
          "Store-front role from young apprentice to cashier, with growing operational responsibility.",
          "Customer service and checkout with focus on speed during peak periods.",
          "Daily register closing with XML data extraction to verify amounts and find discrepancies.",
          "Cash routines (counting, deposits) and basic IT support for the department's computers and systems.",
        ] },
    ],
    orgsTitle: "Where I've worked",
    labelsExtra: { words: "Kind words", certs: "Certifications" },
    testimonials: [
      { name: "Claudio Augusto", role: "Back-end Developer", photo: "claudio", quote: "I worked with Barros at Polybalas and can confidently say he is one of the most complete and dedicated professionals I have met. He combines strong full-stack and mobile skills with clear UI/UX vision, delivering efficient, well-structured solutions." },
      { name: "Roger Barros", role: "IT Manager · Product Owner", photo: "roger", quote: "I had the pleasure of managing Leonardo at Polybalas. He is highly committed, technically strong, and consistently finds creative, efficient solutions. Beyond skills, he stands out for his character and collaboration." },
    ],
    certs: [
      { icon: "efset", name: "EF SET English Certificate", issuer: "EF SET", meta: "72/100 · C2 Proficient · May 2026" },
      { icon: "cisco", name: "Cyber Threat Management", issuer: "Cisco Networking Academy", meta: "Oct 2025", id: "f13d1ee4-445d-4b4c-babf-aeee86c895c5" },
      { icon: "google", name: "Google Play Academy · Store Listing", issuer: "Google", meta: "May 2025 – May 2028", id: "143822560" },
      { icon: "google", name: "Google Analytics Individual Qualification", issuer: "Google", meta: "Oct 2022 – Oct 2023", id: "130967854" },
      { icon: "google", name: "Google Ads · Measurement", issuer: "Google", meta: "Oct 2022 – Oct 2023", id: "130962867" },
      { icon: "connect", name: "Hardware/Software Technician", issuer: "Connect Courses", meta: "Jun 2016" },
    ],
    credentials: ["English C2 (EF SET 72/100)", "Cisco Cyber Threat Management", "Google Play Store Listing"],
    contact: {
      title: ["Let's", "talk."],
      jp: "話しましょう",
      note: "Open to full-time roles in development, data or IT operations, remote or hybrid. Freelance too. Portuguese native, English C2. Based in João Pessoa, Brazil, UTC−3.",
      copy: "Copy email",
      copied: "Copied",
      top: "Back to top",
    },
  },
  pt: {
    meta: {
      role: "Desenvolvedor Full-Stack & Mobile",
      roleJp: "フルスタック開発者",
      tagline: "React • Flutter • TypeScript • Node.js • Python • Go • C# | UI/UX Design",
      statement: ["Dez anos construindo software que ", "funciona", " e tem cara de produto. Web, mobile, dados e a cola entre eles."],
      location: "João Pessoa, Brasil",
      volume: "Vol. 01 — 2026",
    },
    nav: { work: "Trabalhos", about: "Sobre", experience: "Experiência", contact: "Contato", menu: "Menu", close: "Fechar", motion: "Animações", on: "on", off: "off" },
    labels: { about: "Sobre", services: "O que eu faço", work: "Trabalhos selecionados", experience: "Experiência", stack: "Stack", contact: "Contato" },
    marquee: ["Full-Stack", "フルスタック", "Mobile", "モバイル", "UI/UX", "デザイン", "Dados", "データ", "Automação", "自動化"],
    about: {
      quote: "Me importo com como as coisas ficam e como é usá-las, não só se funcionam.",
      paragraphs: [
        "Dez anos em tecnologia, quase sempre com mais de um chapéu. Desenvolvedor full-stack e mobile freelancer desde 2016, analista de TI numa distribuidora e numa rede de clínicas odontológicas, e hoje analista de planejamento e inteligência de dados na AeC, onde automatizo e valido os relatórios de uma grande operação de contact center.",
        "Entrei nisso tudo pelos games. Aprendi inglês traduzindo patch notes pra um blog, depois aprendi a programar fazendo ferramentas pros jogos que jogava e, no fim, meu próprio RPG online. O lado de design e ilustração vem do mesmo lugar.",
        "Em paralelo, o ZERO STATE é meu estúdio de software e laboratório de produto: o ARGUS (gestão para óticas) e o VESTA (operação de restaurantes) nasceram lá, junto com um conjunto crescente de ferramentas internas e automações.",
      ],
      facts: [["Base", "João Pessoa, PB"], ["Desde", "2016"], ["Idiomas", "PT nativo · EN C2"], ["Status", "Aberto a propostas"]],
      valuesTitle: "O que eu levo comigo",
      values: [
        { title: "Cuidado", text: "Responsabilidade e empatia andam juntas. Construo coisas que protegem quem usa e apoio o time antes de buscar crédito." },
        { title: "Disciplina", text: "O ano no NPOR mostrou que padrão só faz sentido quando você vive ele antes de cobrar dos outros." },
        { title: "Comunidade", text: "De fóruns e guildas às squads de hoje: rendo mais quando a informação circula e a vitória é coletiva." },
        { title: "Aprendizado", text: "Publicar notas, compartilhar protótipos e pedir feedback me mantém honesto e acelera quem está ao redor." },
      ],
      offTitle: "Fora do expediente",
      off: "Sketchbooks e pixel art, violão e teclado, calistenia e natação, muita ficção científica e fantasia, e games: Valorant, Warframe, Final Fantasy, Stardew Valley.",
    },
    services: [
      { n: "01", title: "Construir", jp: "構築", text: "Web (React, TypeScript, Angular, Vue), mobile (Flutter), back-ends (Node.js, Python/Django, Go, PHP/Laravel, C#/.NET), APIs REST e integrações com terceiros." },
      { n: "02", title: "Dados", jp: "データ", text: "SQL (Oracle, PostgreSQL), dashboards e relatórios em Python, rotinas de ETL e validação, e modelagem em Excel/Sheets quando é a ferramenta certa." },
      { n: "03", title: "Operar", jp: "運用", text: "Suporte de TI presencial e remoto, gestão de ativos, migrações de CRM, automação com n8n e a documentação que mantém tudo em ordem." },
      { n: "04", title: "Design", jp: "デザイン", text: "Figma e a suíte Adobe. Design systems, branding, ilustração e motion, com acessibilidade desde o início." },
    ],
    works: [
      { ...worksBase.zero, kind: "Estúdio de software", role: ["Fundador", "Design de produto", "Full-stack & mobile", "Marca"], deliverables: ["Estratégia de produto", "Identidade visual", "UI/UX", "Apps web e mobile", "Deploy em nuvem"], highlights: ["O guarda-chuva do meu trabalho independente de produto, do conceito à entrega em nuvem.", "Dois produtos completos lançados, ARGUS e VESTA, além de ferramentas internas e automações.", "Um design system e uma stack reaproveitados entre produtos para andar rápido."], desc: "Meu estúdio e laboratório de produto. ARGUS e VESTA nasceram aqui.", long: "ZERO STATE é o guarda-chuva do meu trabalho independente de produto: branding e estratégia, UI/UX, desenvolvimento full-stack e mobile, entrega em nuvem. Já saíram dele dois produtos completos, ARGUS e VESTA, e um conjunto crescente de ferramentas internas e automações." },
      { ...worksBase.argus, kind: "Gestão para óticas", role: ["Designer de produto", "UI/UX", "Desenvolvedor full-stack", "Mobile"], deliverables: ["Identidade visual", "Design de UI/UX", "Plataforma web", "Suporte mobile", "API back-end", "Deploy em nuvem"], highlights: ["Pacientes, receitas, ordens de serviço, produção do laboratório, entregas, estoque, vendas e CRM num fluxo só.", "App web em Vite + TypeScript + Tailwind + shadcn/ui; mobile em Flutter.", "API em Go sobre PostgreSQL com Supabase, publicada em Render e Vercel."], desc: "Um fluxo só para óticas, da receita à entrega.", long: "ARGUS centraliza a operação diária de óticas: pacientes, receitas, ordens de serviço, produção do laboratório, entregas, estoque, vendas e CRM num único fluxo. Vite + TypeScript + Tailwind na web, Flutter no mobile, API em Go sobre PostgreSQL, Supabase, publicado em Render e Vercel." },
      { ...worksBase.itam, kind: "Gestão de ativos de TI", role: ["Designer de UI/UX", "Front-end", "Back-end", "Desenvolvedor do agente C#"], deliverables: ["Desenho do sistema interno", "UI/UX", "Plataforma web", "API back-end", "Agente de telemetria em C#", "Fluxo de aprovação"], highlights: ["SPA em React + TypeScript + Tailwind sobre uma API REST em Laravel para ativos, contratos e fluxos de aprovação.", "Um agente em C#/.NET coleta dados de hardware dos PCs e envia via HTTP para uma fila de validação.", "Cada registro que chega é conferido por um técnico antes de entrar no inventário."], desc: "Plataforma de ativos para uma rede de clínicas.", long: "SPA em React + TypeScript + Tailwind sobre uma API REST em Laravel, gerenciando ativos, contratos e fluxos de aprovação. Um agente de telemetria em C#/.NET coleta dados de hardware dos PCs e envia via HTTP para uma fila de aprovação web, onde um técnico valida cada registro antes de entrar no inventário." },
      { ...worksBase.vesta, kind: "Plataforma para restaurantes", role: ["Designer de produto", "UI/UX", "Full-stack", "Mobile", "Back-end"], deliverables: ["Identidade visual", "Design de UI/UX", "Plataforma web", "App mobile", "API back-end", "Deploy em nuvem"], highlights: ["Mesas, pedidos, cozinha, caixa, relatórios e estoque conectados num fluxo só.", "Web em Vite + TypeScript + Tailwind; mobile em Flutter.", "Back-end em Go sobre PostgreSQL e Supabase, publicado em Render e Vercel."], desc: "Mesas, pedidos, cozinha, caixa e relatórios num fluxo só.", long: "VESTA conecta salão, cozinha, caixa, relatórios, estoque e fluxos mobile em um único ecossistema. Marca, UI/UX, app web, app mobile, back-end em Go e deploy em nuvem, tudo construído como um produto só." },
      { ...worksBase.metis, kind: "Plataforma de operações", role: ["Design de produto", "Desenvolvedor mobile", "Back-end"], deliverables: ["App Flutter", "API em Go", "Infraestrutura Firebase"], highlights: ["Plataforma modular de gestão para controle operacional.", "Front-end em Flutter com back-end em Go e infraestrutura Firebase.", "Módulos podem ser ligados por cliente."], desc: "Plataforma modular de gestão para controle operacional.", long: "Plataforma modular para controle operacional com front-end em Flutter, back-end em Go e infraestrutura Firebase. Cada módulo pode ser ligado por cliente." },
      { ...worksBase.sidearm, kind: "Open source", role: ["Design", "Desenvolvimento"], deliverables: ["App open source"], highlights: ["Um coach de bolso para jogadores de Valorant.", "Público no GitHub, feito para a comunidade em que eu jogo."], desc: "Um coach de bolso para jogadores de Valorant.", long: "Um app companheiro para jogadores de Valorant: dicas de agente, callouts de mapa e rotinas de aquecimento antes da ranqueada. Público no GitHub." },
      { ...worksBase.vault, kind: "Ferramenta desktop", role: ["Design", "Desenvolvimento"], deliverables: ["Ferramenta desktop", "Binário único em Go"], highlights: ["Navegador de catálogo local e downloader organizado.", "Back-end em Go com UI em React embutida, distribuído como um único binário sem dependências externas."], desc: "Catálogo local de mídia em um único binário Go.", long: "Navegador de catálogo local e downloader organizado, com back-end em Go e UI em React embutida, distribuído como um único binário sem dependências externas." },
      { ...worksBase.codebarx, kind: "Utilitário", role: ["Desenvolvimento"], deliverables: ["Biblioteca geradora"], highlights: ["Gerador de códigos de barras CODE128 e CODE39.", "Feito em Python para etiquetagem e uso interno em logística."], desc: "Gerador de códigos de barras CODE128 e CODE39.", long: "Gerador de códigos de barras CODE128 e CODE39 feito em Python para etiquetagem e uso interno em logística." },
      { ...worksBase.soluna, kind: "Engine de jogo", role: ["Código", "Pixel art", "Animação"], deliverables: ["Engine de MMORPG 2D", "Sprites e animação", "Um servidor para os amigos"], highlights: ["Engine de MMORPG 2D na linhagem Eclipse / Crystalshire.", "Sprite art, pixel art e animação feitos à mão.", "Onde a programação começou pra mim, entre 2007 e 2012."], desc: "Minha própria engine de MMORPG 2D. A que começou tudo.", long: "Engine de MMORPG 2D na linhagem Eclipse/Crystalshire, feita pra rodar um RPG online com os amigos. Sprite art, pixel art e animação feitos à mão. Foi aqui que a programação começou pra mim." },
    ],
    sheet: { year: "Ano", type: "Tipo", stack: "Stack", open: "Abrir no GitHub", private: "Projeto privado", close: "Fechar", role: "Papel", overview: "Visão geral", did: "O que eu fiz", deliverables: "Entregas", prev: "Anterior", next: "Próximo" },
    xp: { visit: "Visitar site", period: "Período", location: "Local", type: "Tipo", open: "Detalhes" },
    experience: [
      { id: "aec", years: "2026 —", period: "abr 2026 – atual", type: "Tempo integral · Remoto", role: "Analista Sênior de Planejamento e Inteligência de Dados", org: "AeC", where: "Remoto", site: "https://www.aec.com.br", note: "Relatórios automatizados, validação de dados e a ponte entre operação e tecnologia.",
        bullets: [
          "Monitoramento da operação de contact center: filas, skills, níveis de serviço, chamadas abandonadas e outros indicadores.",
          "Gestão do desenvolvimento e implantação de relatórios automatizados de snapshot operacional e performance: layouts, regras de cálculo, fontes de dados, agendamentos e distribuição.",
          "Apoio a integrações entre APIs, bancos operacionais e soluções de reporting; validação dos resultados automatizados contra dados em tempo real.",
          "Testes funcionais, validação de dados e homologação antes da produção; monitoramento das entregas automatizadas e coordenação de correções.",
          "Ponte entre Planejamento, Operações, Inteligência de Dados, Tecnologia e parceiros externos: requisitos, incidentes, ajustes técnicos e status de implementação.",
        ] },
      { id: "dental", years: "2025 — 26", period: "nov 2025 – abr 2026", type: "Tempo integral · Presencial", role: "Analista de TI Pleno", org: "Dental Center", where: "João Pessoa", site: "https://www.dentalcenter.com.br", logo: "dental", note: "Suporte presencial, plataforma de ativos de TI, automação de cobrança e migração de CRM.",
        bullets: [
          "Chamados presenciais diários (hardware, software e acessos) com troubleshooting rápido para minimizar indisponibilidades.",
          "Arquitetura de plataforma de gestão de ativos de TI: SPA em React + TypeScript + Tailwind e API REST em Laravel para ativos, contratos e fluxos de aprovação.",
          "Agente de telemetria em C#/.NET que envia dados de hardware dos PCs via HTTP para uma fila de aprovação web.",
          "Webhook em Laravel para a régua de cobrança via Twilio, conectada à API do s4e.",
          "Página interna dedicada ao resultado do IDSS (ANS), substituindo o redirecionamento legado para PDF.",
          "Liderança da unificação de CRM: migração do comercial para o Kommo CRM e desativação de 2 plataformas redundantes.",
        ] },
      { id: "polybalas", years: "2023 — 25", period: "nov 2023 – nov 2025", type: "Tempo integral · Presencial", role: "Analista de TI", org: "Polybalas", where: "João Pessoa", site: "https://polybalas.com.br", logo: "polybalas", note: "Sistemas logísticos, rotinas Oracle SQL, dashboards e ferramentas internas.",
        bullets: [
          "Sistemas logísticos: Winthor WMS e Fusion DMS.",
          "Dashboards em Python e relatórios executivos de KPIs logísticos; extração, transformação e modelagem de dados para apoio à decisão.",
          "Oracle SQL: consultas, administração de bases, scripts automatizados de extração e fluxos de integração.",
          "Modelos em Excel e Google Sheets e planilhas estratégicas para acompanhamento da distribuição e controle de performance.",
          "Aplicações internas com Python/Django, React, Vue, Angular, TypeScript e Dart.",
        ] },
      { id: "ipec", years: "2023", period: "mar 2023 – mai 2023", type: "Temporário", role: "Pesquisador de Tecnologia", org: "Ipec", where: "Curitiba", site: "https://www.ipec-inteligencia.com", logo: "ipec", note: "Pesquisa corporativa de TI em todo o país para o CETIC.br (CGI.br).",
        bullets: [
          "Aplicação da pesquisa corporativa CETIC.br (CGI.br) para mapear a adoção de tecnologia nas empresas brasileiras.",
          "Coordenação de entrevistas telefônicas em todo o país e visitas presenciais a equipes de TI no Paraná.",
          "Gestão de agendamentos, qualidade das respostas e entrega dos dados dentro do contrato de 3 meses.",
        ] },
      { id: "unicesumar", years: "2022", period: "mai 2022 – out 2022", type: "Tempo integral", role: "Analista Comercial", org: "UniCesumar", where: "Curitiba", site: "https://www.unicesumar.edu.br", note: "Rotinas de leads, parcerias e relatórios em CRM.",
        bullets: [
          "Rotinas de captação e conversão de leads.",
          "Parcerias locais e eventos de marca.",
          "Relatórios simples e follow-ups em CRM e Sheets.",
        ] },
      { id: "sesds", years: "2019 — 21", period: "out 2019 – ago 2021", type: "Tempo integral", role: "Designer Gráfico", org: "Secretaria de Segurança da Paraíba", where: "João Pessoa", site: "https://paraiba.pb.gov.br", note: "Direção de arte, ilustração e diagramação.",
        bullets: [
          "Design e direção de arte para redes sociais, ilustração digital, mockups e peças audiovisuais.",
          "Diagramação para materiais digitais e impressos: revistas, banners, flyers.",
          "Adobe Illustrator, InDesign, Photoshop e After Effects, alinhados à estratégia institucional.",
        ] },
      { id: "army", years: "2017", period: "fev 2017 – dez 2017", type: "Tempo integral", role: "Aspirante a Oficial", org: "Exército Brasileiro", where: "João Pessoa", site: "https://www.eb.mil.br", note: "Núcleo de Preparação de Oficiais da Reserva (NPOR).",
        bullets: [
          "Conclusão do NPOR: liderança, tática, planejamento e administração.",
          "Treinamento físico e militar intensivo; resiliência, disciplina e prontidão sob pressão.",
          "Vice-presidente do grêmio da turma: eventos, coordenação e produtos comemorativos.",
        ] },
      { id: "freelance", years: "2016 —", period: "ago 2016 – atual", type: "Freelance · Remoto", role: "Desenvolvedor Full-Stack & Designer", org: "Freelance", where: "Remoto", note: "Web, mobile e automação para pequenos negócios e criadores.",
        bullets: [
          "Soluções web e mobile ponta a ponta para PMEs e creators via Upwork, Workana e indicações.",
          "Front-end em React/Vite, Angular ou Vue; back-ends em Node.js/Express, Python ou Go; PostgreSQL, SQLite, MongoDB, Firebase e Redis.",
          "Apps Flutter do protótipo à produção; automações com n8n + Python/TypeScript/Go para integração SaaS/API, ETL e relatórios.",
          "Branding, protótipos, design systems, ilustração e motion.",
          "Git com feature branches, testes automatizados (Jest, Cypress, Pytest), CI/CD com GitHub Actions, Docker e Nginx.",
        ] },
      { id: "bemais", years: "2015 — 17", period: "jan 2015 – jan 2017", type: "Tempo integral", role: "Atendimento e Operador de Caixa", org: "BeMais Supermercados", where: "João Pessoa", site: "https://bemais.com.br", logo: "bemais", note: "Atendimento de frente de loja e fechamento de caixa.",
        bullets: [
          "Frente de loja, de Jovem Aprendiz a operador de caixa, com responsabilidades operacionais crescentes.",
          "Atendimento ao cliente e caixa com foco em agilidade nos períodos de pico.",
          "Fechamento diário de caixa com extração de dados (XML) para conferir valores e identificar divergências.",
          "Rotinas de numerário (contagem, depósitos) e suporte básico de TI aos computadores e sistemas do setor.",
        ] },
    ],
    orgsTitle: "Por onde passei",
    labelsExtra: { words: "Depoimentos", certs: "Certificações" },
    testimonials: [
      { name: "Claudio Augusto", role: "Desenvolvedor Back-end", photo: "claudio", quote: "Trabalhei com o Barros na Polybalas e posso afirmar que ele é um dos profissionais mais completos e dedicados que conheci. Ele combina forte capacidade técnica full-stack e mobile com visão clara de UI/UX e entrega soluções eficientes e bem estruturadas." },
      { name: "Roger Barros", role: "Gerente de TI · Product Owner", photo: "roger", quote: "Tive o prazer de ser gerente do Leonardo na Polybalas. Ele é altamente comprometido e tecnicamente forte, sempre buscando soluções criativas e eficientes. Além da competência, destaca-se pelo caráter e pela colaboração." },
    ],
    certs: [
      { icon: "efset", name: "EF SET English Certificate", issuer: "EF SET", meta: "72/100 · C2 Proficiente · mai 2026" },
      { icon: "cisco", name: "Cyber Threat Management", issuer: "Cisco Networking Academy", meta: "out 2025", id: "f13d1ee4-445d-4b4c-babf-aeee86c895c5" },
      { icon: "google", name: "Google Play Academy · Store Listing", issuer: "Google", meta: "mai 2025 – mai 2028", id: "143822560" },
      { icon: "google", name: "Google Analytics Individual Qualification", issuer: "Google", meta: "out 2022 – out 2023", id: "130967854" },
      { icon: "google", name: "Google Ads · Measurement", issuer: "Google", meta: "out 2022 – out 2023", id: "130962867" },
      { icon: "connect", name: "Técnico em Hardware/Software", issuer: "Connect Cursos", meta: "jun 2016" },
    ],
    credentials: ["Inglês C2 (EF SET 72/100)", "Cisco Cyber Threat Management", "Google Play Store Listing"],
    contact: {
      title: ["Vamos", "falar."],
      jp: "話しましょう",
      note: "Aberto a vagas full-time em desenvolvimento, dados ou operações de TI, remoto ou híbrido. Freelance também. Português nativo, inglês C2. Baseado em João Pessoa, Brasil, UTC−3.",
      copy: "Copiar e-mail",
      copied: "Copiado",
      top: "Voltar ao topo",
    },
  },
};
