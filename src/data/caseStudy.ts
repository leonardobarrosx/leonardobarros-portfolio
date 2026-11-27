import type { Lang } from "./i18n/types";

/**
 * The look of each case study: every project is presented in its own brand colours and type, the
 * way the Figma presentations are. Keyed by the work's `id`. A project without an entry falls back
 * to the site's own tokens.
 */
export interface CaseTheme {
  bg: string; fg: string; muted: string;
  accent: string; accentText?: string; onAccent: string;
  chrome: string; card: string;
  stage: string; onStage: string;
  dark: string; onDark: string; accentDark: string;
  palette: string[];
  fonts?: { family: string; weight?: number; role: "display" | "ui" | "data"; upper?: boolean }[];
  /** Google Fonts families to fetch when the case opens, for the type specimens. */
  load?: string;
  /** Shot names for the hero's two mockups and the stage, when the defaults are not the best views. */
  heroA?: string; heroB?: string; stageShot?: string;
}

export const caseThemes: Record<string, CaseTheme> = {
  vesta: {
    bg: "#fcfbfe", fg: "#0f0e13", muted: "#64748b", accent: "#fa1e4e", onAccent: "#ffffff", chrome: "#f3f1ee", card: "#f5f2fb",
    stage: "#fa1e4e", onStage: "#0f0e13", dark: "#020617", onDark: "#f8fafc", accentDark: "#ff5c7c",
    palette: ["#fa1e4e", "#ff2d55", "#020617", "#f5f2fb", "#25d366"],
    fonts: [{ family: "Inter", weight: 800, role: "display" }, { family: "Inter", weight: 400, role: "ui" }, { family: "Sora", weight: 700, role: "display" }],
    load: "Sora:wght@700",
    heroA: "01-landing", heroB: "12-m-garcom-mesas", stageShot: "05-painel",
  },
  argus: {
    bg: "#f6f8fc", fg: "#0f172a", muted: "#64748b", accent: "#1769ff", onAccent: "#ffffff", chrome: "#ffffff", card: "#eaf0fb",
    stage: "#1769ff", onStage: "#ffffff", dark: "#001f5c", onDark: "#eef4ff", accentDark: "#8db0ff",
    palette: ["#1769ff", "#001f5c", "#f6f8fc", "#d9dce4", "#0f172a"],
    fonts: [{ family: "Plus Jakarta Sans", weight: 700, role: "display" }, { family: "Plus Jakarta Sans", weight: 400, role: "ui" }],
    load: "Plus+Jakarta+Sans:wght@400;700",
    heroA: "01-landing", heroB: "17-m-ia", stageShot: "12-assistente-ia",
  },
  "meu-chamado": {
    bg: "#f6f9f7", fg: "#0b1f16", muted: "#5b6b63", accent: "#0e5e3a", onAccent: "#ffffff", chrome: "#ffffff", card: "#e7f0eb",
    stage: "#0e5e3a", onStage: "#ffffff", dark: "#0b4a2d", onDark: "#eef7f2", accentDark: "#f5c518",
    palette: ["#0e5e3a", "#0b4a2d", "#e5408a", "#22b8d9", "#f5c518"],
    fonts: [{ family: "system-ui", weight: 700, role: "display" }, { family: "system-ui", weight: 400, role: "ui" }],
    heroA: "01-landing", heroB: "09-m-landing", stageShot: "04-painel",
  },
  motor: {
    bg: "#f8f5f0", fg: "#1f1613", muted: "#7b6d66", accent: "#e3301c", onAccent: "#ffffff", chrome: "#ffffff", card: "#ece6dd",
    stage: "#1f1613", onStage: "#e3301c", dark: "#1f1613", onDark: "#f8f5f0", accentDark: "#ff8a78",
    palette: ["#e3301c", "#1f1613", "#f8f5f0", "#1f9d55", "#7b6d66"],
    fonts: [{ family: "Anton", role: "display", upper: true }, { family: "Inter", weight: 400, role: "ui" }, { family: "IBM Plex Mono", weight: 400, role: "data" }],
    heroA: "01-inicio", heroB: "02-pix-valor", stageShot: "01-inicio",
  },
  ninho: {
    bg: "#fff8f3", fg: "#2a2320", muted: "#7a6a62", accent: "#f26b3a", onAccent: "#ffffff", chrome: "#ffffff", card: "#fdeee4",
    stage: "#ff8a5c", onStage: "#3a3248", dark: "#3a3248", onDark: "#fff2ea", accentDark: "#ffb58f",
    palette: ["#ff8a5c", "#fff2ea", "#3a3248", "#f5efd7", "#d7b7b1"],
    fonts: [{ family: "Nunito", weight: 800, role: "display" }, { family: "Nunito", weight: 400, role: "ui" }],
    load: "Nunito:wght@400;800",
    heroA: "01-landing", heroB: "08-m-visao-geral", stageShot: "03-visao-geral",
  },
  soluna: {
    bg: "#15171a", fg: "#ece4d2", muted: "#9a9389", accent: "#e0b45a", accentText: "#e0b45a", onAccent: "#15171a", chrome: "#24272b", card: "#1f2226",
    stage: "#273d36", onStage: "#e0b45a", dark: "#0d0e10", onDark: "#ece4d2", accentDark: "#e0b45a",
    palette: ["#3a4e47", "#594e4d", "#1d1d20", "#e0b45a", "#c83a3a"],
    heroA: "01-vila", heroB: "03-editor-mapa", stageShot: "06-ruinas",
  },
  cutucanois: {
    bg: "#1b1326", fg: "#f3ece2", muted: "#b9ae9e", accent: "#8a4bff", accentText: "#b38cff", onAccent: "#ffffff", chrome: "#2a2140", card: "#2a2140",
    stage: "#843cfc", onStage: "#1b1326", dark: "#120b1c", onDark: "#f3ece2", accentDark: "#b38cff",
    palette: ["#843cfc", "#201530", "#705841", "#5c5671", "#b9ae9e"],
    heroA: "01-casa", heroB: "02-aparencia", stageShot: "01-casa",
  },
  vault: {
    bg: "#0b0c10", fg: "#ece9ee", muted: "#958c98", accent: "#b5718f", accentText: "#d39ab4", onAccent: "#0b0c10", chrome: "#1a1920", card: "#16151c",
    stage: "#321e27", onStage: "#d39ab4", dark: "#040508", onDark: "#ece9ee", accentDark: "#d39ab4",
    palette: ["#080a0e", "#321e27", "#77566a", "#3f4159", "#d1d0d1"],
    heroA: "01-inicio", heroB: "02-catalogo", stageShot: "02-catalogo",
  },
  codebarx: {
    bg: "#efefef", fg: "#1d1e24", muted: "#627986", accent: "#249ccc", onAccent: "#ffffff", chrome: "#ffffff", card: "#e2e4e7",
    stage: "#1d1e24", onStage: "#249ccc", dark: "#1d1e24", onDark: "#efefef", accentDark: "#5cc4ee",
    palette: ["#1d1e24", "#efefef", "#627986", "#249ccc"],
    heroA: "01-lote", heroB: "02-inicio", stageShot: "01-lote",
  },
};

/** Labels only the case study uses; kept here so they load with its chunk. */
interface CaseLabels {
  study: string; screensTitle: string; engineering: string; engTitle: string;
  visual: string; visualTitle: string; display: string; ui: string; data: string;
  closeTitle: string; closeNote: string; email: string; next: string;
}
export const caseLabels: Record<Lang, CaseLabels> = {
  en: { study: "Case study", screensTitle: "The product, screen by screen.", engineering: "Engineering", engTitle: "Under the interface.", visual: "Visual system", visualTitle: "Its own palette and type.", display: "Headings", ui: "Interface", data: "Numbers and data", closeTitle: "Liked the project?", closeNote: "Let's talk about your team.", email: "Send an email", next: "Next case" },
  pt: { study: "Estudo de case", screensTitle: "O produto, tela por tela.", engineering: "Engenharia", engTitle: "Por baixo da interface.", visual: "Sistema visual", visualTitle: "Paleta e tipografia próprias.", display: "Títulos", ui: "Interface", data: "Valores e dados", closeTitle: "Gostou do projeto?", closeNote: "Vamos conversar sobre a sua vaga.", email: "Mandar um e-mail", next: "Próximo case" },
  es: { study: "Caso de estudio", screensTitle: "El producto, pantalla a pantalla.", engineering: "Ingeniería", engTitle: "Debajo de la interfaz.", visual: "Sistema visual", visualTitle: "Paleta y tipografía propias.", display: "Títulos", ui: "Interfaz", data: "Cifras y datos", closeTitle: "¿Te gustó el proyecto?", closeNote: "Hablemos de tu vacante.", email: "Enviar un correo", next: "Siguiente caso" },
  de: { study: "Fallstudie", screensTitle: "Das Produkt, Ansicht für Ansicht.", engineering: "Engineering", engTitle: "Unter der Oberfläche.", visual: "Visuelles System", visualTitle: "Eigene Farben und Schrift.", display: "Überschriften", ui: "Oberfläche", data: "Zahlen und Daten", closeTitle: "Gefällt Ihnen das Projekt?", closeNote: "Sprechen wir über Ihre Stelle.", email: "E-Mail schreiben", next: "Nächstes Projekt" },
  ja: { study: "ケーススタディ", screensTitle: "画面ごとに見るプロダクト。", engineering: "エンジニアリング", engTitle: "インターフェースの裏側。", visual: "ビジュアルシステム", visualTitle: "独自の配色と書体。", display: "見出し", ui: "インターフェース", data: "数値とデータ", closeTitle: "気に入りましたか？", closeNote: "ポジションについて話しましょう。", email: "メールを送る", next: "次のケース" },
  ko: { study: "케이스 스터디", screensTitle: "화면으로 보는 제품.", engineering: "엔지니어링", engTitle: "인터페이스 아래에서.", visual: "비주얼 시스템", visualTitle: "고유한 색과 서체.", display: "제목", ui: "인터페이스", data: "숫자와 데이터", closeTitle: "프로젝트가 마음에 드셨나요?", closeNote: "채용 포지션에 대해 이야기해요.", email: "이메일 보내기", next: "다음 케이스" },
  zh: { study: "案例研究", screensTitle: "逐屏看产品。", engineering: "工程", engTitle: "界面之下。", visual: "视觉系统", visualTitle: "专属的配色与字体。", display: "标题", ui: "界面", data: "数字与数据", closeTitle: "喜欢这个项目吗？", closeNote: "聊聊你的职位吧。", email: "发送邮件", next: "下一个案例" },
};
