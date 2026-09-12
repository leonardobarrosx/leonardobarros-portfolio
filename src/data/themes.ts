/**
 * One theme per hue. Every colour the site uses derives from these tokens, so a theme is just a set
 * of custom properties scoped to `html[data-theme=…]`. The CSS is generated from this file at build
 * time (see vite.config.ts) and the saved choice is applied before first paint, so there is no flash.
 * `split` is the second colour of the hero's chromatic trail; `text` is the accent when used as text
 * on paper (some hues need a darker tone there to stay readable); `deco` paints the decorative blocks
 * (ink poster stripes, the photo corner); it only differs from the accent in the monochrome theme.
 */
export type ThemeId = "violet" | "red" | "orange" | "amber" | "green" | "teal" | "blue" | "pink" | "ink";

export interface Theme {
  id: ThemeId;
  tokens: Record<string, string>;
}

function rgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

function make(id: ThemeId, c: {
  accent: string; deep: string; light: string; text?: string; split: string;
  paper: string; paper2: string; ink: string; ink2: string;
  d900: string; d800: string; d700: string; soft: string; mute: string; deco?: string;
}): Theme {
  return {
    id,
    tokens: {
      "--paper": c.paper, "--paper-2": c.paper2, "--paper-rgb": rgb(c.paper),
      "--ink": c.ink, "--ink-2": c.ink2, "--ink-rgb": rgb(c.ink),
      "--accent": c.accent, "--accent-deep": c.deep, "--accent-light": c.light, "--accent-text": c.text ?? c.accent,
      "--accent-rgb": rgb(c.accent), "--accent-light-rgb": rgb(c.light), "--split": c.split,
      "--plum-900": c.d900, "--plum-800": c.d800, "--plum-700": c.d700,
      "--lilac": c.soft, "--mute": c.mute, "--deco": c.deco ?? c.accent,
      "--line": `rgba(${rgb(c.ink)}, 0.14)`, "--line-dark": `rgba(${rgb(c.paper)}, 0.18)`,
    },
  };
}

export const THEMES: Theme[] = [
  // the house palette: warm cream, red ink, coffee darks
  make("red", { accent: "#e3301c", deep: "#b8230f", light: "#ff8a78", split: "#1fb6a8", paper: "#efe9df", paper2: "#e6dfd3", ink: "#141110", ink2: "#2b2521", d900: "#1e1512", d800: "#2a1d18", d700: "#3b2a21", soft: "#c8b6a3", mute: "#6f655c" }),
  make("orange", { accent: "#f2600f", deep: "#c44b06", light: "#ffb07a", text: "#c44b06", split: "#16b3c9", paper: "#f3ede4", paper2: "#eae2d6", ink: "#171210", ink2: "#2d2521", d900: "#1d1511", d800: "#2b1e17", d700: "#3d2c22", soft: "#cdb9a5", mute: "#6f6359" }),
  make("amber", { accent: "#d99a00", deep: "#a87400", light: "#ffd66b", text: "#9a6a00", split: "#3b6cf0", paper: "#f4f0e4", paper2: "#ebe5d5", ink: "#17140f", ink2: "#2c271f", d900: "#1c1810", d800: "#292316", d700: "#3b3320", soft: "#d0c4a6", mute: "#6e675a" }),
  make("green", { accent: "#1f9d55", deep: "#15753e", light: "#7fe0a8", text: "#15753e", split: "#f0508f", paper: "#ebf1ec", paper2: "#dfe8e1", ink: "#10181a", ink2: "#24302b", d900: "#121b16", d800: "#1b2820", d700: "#2a3a31", soft: "#b9cfc0", mute: "#62716a" }),
  make("teal", { accent: "#0f9bb0", deep: "#0b7486", light: "#7ee0ee", text: "#0b7486", split: "#f25c3c", paper: "#eaf1f2", paper2: "#dde8ea", ink: "#0f1719", ink2: "#22302f", d900: "#10191c", d800: "#182428", d700: "#26353a", soft: "#b6cbd0", mute: "#5f7075" }),
  make("blue", { accent: "#2457e6", deep: "#1a41b3", light: "#9db6ff", split: "#ff6a3d", paper: "#eceef5", paper2: "#e0e4ef", ink: "#111421", ink2: "#262a3a", d900: "#131628", d800: "#1c2038", d700: "#2b3050", soft: "#b9c0da", mute: "#656b82" }),
  // cool paper, violet ink, plum darks
  make("violet", { accent: "#6f2ff2", deep: "#5620c9", light: "#b39cff", split: "#1fd1c8", paper: "#eeeaf3", paper2: "#e3ddeb", ink: "#16121c", ink2: "#2b2534", d900: "#1a1322", d800: "#251a30", d700: "#37283f", soft: "#c6bbd6", mute: "#6c6577" }),
  make("pink", { accent: "#e0298a", deep: "#b21c6b", light: "#ff9ad0", split: "#22c7c0", paper: "#f4ebf0", paper2: "#ecdfe7", ink: "#1a1016", ink2: "#2f2229", d900: "#20121a", d800: "#2d1a25", d700: "#432a37", soft: "#d6b8c8", mute: "#745f6a" }),
  // monochrome: type and painted elements share one ink; greys keep the posters apart
  make("ink", { accent: "#121212", deep: "#000000", light: "#d6d6d6", text: "#121212", split: "#8a8a8a", paper: "#f1f0ee", paper2: "#e3e1dd", ink: "#121212", ink2: "#2a2a2a", d900: "#171717", d800: "#4a4a4a", d700: "#333333", soft: "#bdbdbd", mute: "#666666", deco: "#4a4a4a" }),
];

export const THEME_IDS = THEMES.map((t) => t.id);
export const DEFAULT_THEME: ThemeId = "red";
export const LS_THEME = "lb:theme";

export function isThemeId(v: unknown): v is ThemeId {
  return typeof v === "string" && (THEME_IDS as string[]).includes(v);
}

/** CSS for every theme, injected into index.html at build time. */
export function themeCss(): string {
  return THEMES.map((t) => `html[data-theme="${t.id}"]{${Object.entries(t.tokens).map(([k, v]) => `${k}:${v}`).join(";")}}`).join("\n");
}

/** Inline bootstrap: restores the saved theme before the first paint. */
export function themeBootstrap(): string {
  const papers = Object.fromEntries(THEMES.map((t) => [t.id, t.tokens["--paper"]]));
  return `(function(){try{var t=localStorage.getItem("${LS_THEME}"),p=${JSON.stringify(papers)};if(t&&p[t]){document.documentElement.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",p[t]);}}catch(e){}})();`;
}

/** The favicon in the theme's colours (same drawing as public/favicon.svg). */
function favicon(t: Theme) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="${t.tokens["--paper"]}"/><circle cx="40" cy="26" r="16" fill="${t.tokens["--accent"]}"/><text x="6" y="56" font-family="Impact, Anton, sans-serif" font-size="30" fill="${t.tokens["--ink"]}">LB</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function applyTheme(id: ThemeId) {
  const t = THEMES.find((x) => x.id === id) ?? THEMES[0];
  const root = document.documentElement;
  root.dataset.theme = t.id;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", t.tokens["--paper"]);
  document.querySelector<HTMLLinkElement>('link[rel="icon"]')?.setAttribute("href", favicon(t));
  window.dispatchEvent(new CustomEvent("lb:theme", { detail: t }));
}
