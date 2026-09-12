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
  sheet: { year: string; type: string; stack: string; open: string; private: string; close: string };
  experience: { years: string; role: string; org: string; where: string; note: string }[];
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
  zero: { id: "zero-state", title: ["Zero", "State"], jp: "零", year: "2025–", stack: "React · TypeScript · Flutter · Go · Supabase", variant: "ink" as Variant, tall: true },
  argus: { id: "argus", title: ["Argus"], jp: "眼", year: "2026", stack: "Vite · TypeScript · Go · PostgreSQL · Flutter", variant: "paper" as Variant },
  itam: { id: "itam", title: ["ITAM"], jp: "資産", year: "2025–26", stack: "React · TypeScript · Tailwind · Laravel · C#/.NET", variant: "red" as Variant, tall: true },
  vesta: { id: "vesta", title: ["Vesta"], jp: "食", year: "2026", stack: "TypeScript", variant: "paper" as Variant },
  metis: { id: "metis", title: ["Metis"], jp: "運用", year: "2025", stack: "Flutter · Go · Firebase", variant: "red" as Variant },
  sidearm: { id: "sidearm", title: ["Side", "arm"], jp: "照準", year: "2025", stack: "Open source", variant: "coffee" as Variant, href: "https://github.com/leonardobarrosx/sidearm" },
  vault: { id: "vault", title: ["Manhwa", "Vault"], jp: "書庫", year: "2026", stack: "Go · React", variant: "paper" as Variant },
  codebarx: { id: "codebarx", title: ["Code", "BarX"], jp: "符号", year: "2025", stack: "Python", variant: "ink" as Variant },
  soluna: { id: "soluna", title: ["Soluna"], jp: "月と太陽", year: "2020", stack: "VB6 · MMORPG engine", variant: "coffee" as Variant },
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
      { ...worksBase.zero, kind: "Software studio", desc: "My studio and product lab. ARGUS and VESTA were born here.", long: "ZERO STATE is the umbrella for my independent product work: branding and product strategy, UI/UX, full-stack and mobile development, cloud delivery. It has shipped two complete products, ARGUS and VESTA, and a growing set of internal tools and automations." },
      { ...worksBase.argus, kind: "Optical management", desc: "One workflow for optical stores, from prescription to delivery.", long: "ARGUS centralizes the daily operation of optical stores: patients, prescriptions, service orders, lab production, deliveries, inventory, sales and CRM in a single flow. Vite + TypeScript + Tailwind on the web, Flutter on mobile, a Go API on PostgreSQL, Supabase, deployed on Render and Vercel." },
      { ...worksBase.itam, kind: "IT asset management", desc: "Asset platform for a dental clinic network.", long: "A React + TypeScript + Tailwind SPA on top of a Laravel REST API, managing assets, contracts and approval flows. A C#/.NET telemetry agent collects PC hardware data and sends it over HTTP to a web approval queue, where a technician validates each record before it enters the inventory." },
      { ...worksBase.vesta, kind: "Restaurant platform", desc: "Tables, orders, kitchen, cashier and reports in one flow.", long: "VESTA connects service, kitchen, cashier, reports, inventory and mobile workflows into a single ecosystem. Brand, UI/UX, web app, mobile app, Go back-end and cloud deployment, all built as one product." },
      { ...worksBase.metis, kind: "Operations platform", desc: "Modular management platform for operational control.", long: "A modular platform for operational control with a Flutter front-end, a Go back-end and Firebase infrastructure. Each module can be switched on per client." },
      { ...worksBase.sidearm, kind: "Open source", desc: "A pocket coach for Valorant players.", long: "A small companion app for Valorant players: agent tips, map callouts and routines to warm up before ranked. Public on GitHub." },
      { ...worksBase.vault, kind: "Desktop tool", desc: "Local media catalogue in a single Go binary.", long: "A local catalogue browser and organised downloader with a Go back-end and an embedded React UI, shipped as one binary with no external dependencies." },
      { ...worksBase.codebarx, kind: "Utility", desc: "CODE128 and CODE39 barcode generator.", long: "A custom barcode generator for CODE128 and CODE39, written in Python for labelling and internal logistics use." },
      { ...worksBase.soluna, kind: "Game engine", desc: "My own 2D MMORPG engine. The one that started it all.", long: "A 2D MMORPG engine in the Eclipse/Crystalshire lineage, built to run an online RPG for friends. Sprite art, pixel art and animation done by hand. This is where programming started for me." },
    ],
    sheet: { year: "Year", type: "Type", stack: "Stack", open: "Open on GitHub", private: "Private project", close: "Close" },
    experience: [
      { years: "2026 —", role: "Senior Planning & Data Intelligence Analyst", org: "AeC", where: "Remote", note: "Automated reporting, data validation and the liaison between operations and technology." },
      { years: "2025 — 26", role: "Mid-Level IT Analyst", org: "Dental Center", where: "João Pessoa", note: "On-site support, an IT asset platform, billing automation and a CRM migration." },
      { years: "2023 — 25", role: "IT Analyst", org: "Polybalas", where: "João Pessoa", note: "Logistics systems, Oracle SQL routines, dashboards and internal tools." },
      { years: "2023", role: "Technology Researcher", org: "Ipec", where: "Curitiba", note: "Nationwide corporate IT survey for CGI.br's CETIC.br." },
      { years: "2022", role: "Commercial Analyst", org: "UniCesumar", where: "Curitiba", note: "Lead routines, partnerships and CRM reporting." },
      { years: "2019 — 21", role: "Graphic Designer", org: "Paraíba State Dept. of Public Security", where: "João Pessoa", note: "Art direction, illustration and editorial layout." },
      { years: "2017", role: "Officer Aspirant", org: "Brazilian Army", where: "João Pessoa", note: "Reserve Officer Training Course (NPOR)." },
      { years: "2016 —", role: "Full-Stack Developer & Designer", org: "Freelance", where: "Remote", note: "Web, mobile and automation for small businesses and creators." },
      { years: "2015 — 17", role: "Customer Service & Cashier", org: "BeMais Supermarkets", where: "João Pessoa", note: "Front-line customer service and register closing." },
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
      { ...worksBase.zero, kind: "Estúdio de software", desc: "Meu estúdio e laboratório de produto. ARGUS e VESTA nasceram aqui.", long: "ZERO STATE é o guarda-chuva do meu trabalho independente de produto: branding e estratégia, UI/UX, desenvolvimento full-stack e mobile, entrega em nuvem. Já saíram dele dois produtos completos, ARGUS e VESTA, e um conjunto crescente de ferramentas internas e automações." },
      { ...worksBase.argus, kind: "Gestão para óticas", desc: "Um fluxo só para óticas, da receita à entrega.", long: "ARGUS centraliza a operação diária de óticas: pacientes, receitas, ordens de serviço, produção do laboratório, entregas, estoque, vendas e CRM num único fluxo. Vite + TypeScript + Tailwind na web, Flutter no mobile, API em Go sobre PostgreSQL, Supabase, publicado em Render e Vercel." },
      { ...worksBase.itam, kind: "Gestão de ativos de TI", desc: "Plataforma de ativos para uma rede de clínicas.", long: "SPA em React + TypeScript + Tailwind sobre uma API REST em Laravel, gerenciando ativos, contratos e fluxos de aprovação. Um agente de telemetria em C#/.NET coleta dados de hardware dos PCs e envia via HTTP para uma fila de aprovação web, onde um técnico valida cada registro antes de entrar no inventário." },
      { ...worksBase.vesta, kind: "Plataforma para restaurantes", desc: "Mesas, pedidos, cozinha, caixa e relatórios num fluxo só.", long: "VESTA conecta salão, cozinha, caixa, relatórios, estoque e fluxos mobile em um único ecossistema. Marca, UI/UX, app web, app mobile, back-end em Go e deploy em nuvem, tudo construído como um produto só." },
      { ...worksBase.metis, kind: "Plataforma de operações", desc: "Plataforma modular de gestão para controle operacional.", long: "Plataforma modular para controle operacional com front-end em Flutter, back-end em Go e infraestrutura Firebase. Cada módulo pode ser ligado por cliente." },
      { ...worksBase.sidearm, kind: "Open source", desc: "Um coach de bolso para jogadores de Valorant.", long: "Um app companheiro para jogadores de Valorant: dicas de agente, callouts de mapa e rotinas de aquecimento antes da ranqueada. Público no GitHub." },
      { ...worksBase.vault, kind: "Ferramenta desktop", desc: "Catálogo local de mídia em um único binário Go.", long: "Navegador de catálogo local e downloader organizado, com back-end em Go e UI em React embutida, distribuído como um único binário sem dependências externas." },
      { ...worksBase.codebarx, kind: "Utilitário", desc: "Gerador de códigos de barras CODE128 e CODE39.", long: "Gerador de códigos de barras CODE128 e CODE39 feito em Python para etiquetagem e uso interno em logística." },
      { ...worksBase.soluna, kind: "Engine de jogo", desc: "Minha própria engine de MMORPG 2D. A que começou tudo.", long: "Engine de MMORPG 2D na linhagem Eclipse/Crystalshire, feita pra rodar um RPG online com os amigos. Sprite art, pixel art e animação feitos à mão. Foi aqui que a programação começou pra mim." },
    ],
    sheet: { year: "Ano", type: "Tipo", stack: "Stack", open: "Abrir no GitHub", private: "Projeto privado", close: "Fechar" },
    experience: [
      { years: "2026 —", role: "Analista Sênior de Planejamento e Inteligência de Dados", org: "AeC", where: "Remoto", note: "Relatórios automatizados, validação de dados e a ponte entre operação e tecnologia." },
      { years: "2025 — 26", role: "Analista de TI Pleno", org: "Dental Center", where: "João Pessoa", note: "Suporte presencial, plataforma de ativos de TI, automação de cobrança e migração de CRM." },
      { years: "2023 — 25", role: "Analista de TI", org: "Polybalas", where: "João Pessoa", note: "Sistemas logísticos, rotinas Oracle SQL, dashboards e ferramentas internas." },
      { years: "2023", role: "Pesquisador de Tecnologia", org: "Ipec", where: "Curitiba", note: "Pesquisa corporativa de TI em todo o país para o CETIC.br (CGI.br)." },
      { years: "2022", role: "Analista Comercial", org: "UniCesumar", where: "Curitiba", note: "Rotinas de leads, parcerias e relatórios em CRM." },
      { years: "2019 — 21", role: "Designer Gráfico", org: "Secretaria de Segurança da Paraíba", where: "João Pessoa", note: "Direção de arte, ilustração e diagramação." },
      { years: "2017", role: "Aspirante a Oficial", org: "Exército Brasileiro", where: "João Pessoa", note: "Núcleo de Preparação de Oficiais da Reserva (NPOR)." },
      { years: "2016 —", role: "Desenvolvedor Full-Stack & Designer", org: "Freelance", where: "Remoto", note: "Web, mobile e automação para pequenos negócios e criadores." },
      { years: "2015 — 17", role: "Atendimento e Operador de Caixa", org: "BeMais Supermercados", where: "João Pessoa", note: "Atendimento de frente de loja e fechamento de caixa." },
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
