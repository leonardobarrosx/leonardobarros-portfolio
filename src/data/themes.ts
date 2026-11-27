/**
 * One theme per hue. Every colour the site uses derives from these tokens, so a theme is just a set
 * of custom properties scoped to `html[data-theme=…]`. The CSS is generated from this file at build
 * time (see vite.config.ts) and the saved choice is applied before first paint, so there is no flash.
 * `split` is the second colour of the hero's chromatic trail; `text` is the accent when used as text
 * on paper (some hues need a darker tone there to stay readable); `deco` paints the decorative blocks
 * (ink poster stripes, the photo corner); it only differs from the accent in the monochrome theme.
 */
export type ThemeId = "violet" | "red" | "orange" | "amber" | "green" | "teal" | "blue" | "pink" | "ink" | "campanha";

export interface Theme {
  id: ThemeId;
  /** Kept out of the swatch menu: reached only through the mark in About. */
  hidden?: boolean;
  tokens: Record<string, string>;
  /** Same palette, dark ground. Applied by the toggle or by prefers-color-scheme. */
  dark: Record<string, string>;
}

function rgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

function make(id: ThemeId, c: {
  hidden?: boolean;
  accent: string; deep: string; light: string; text?: string; split: string;
  paper: string; paper2: string; ink: string; ink2: string;
  d900: string; d800: string; d700: string; soft: string; mute: string; deco?: string;
}): Theme {
  const deco = c.deco ?? c.accent;
  return {
    id,
    hidden: c.hidden,
    dark: {
      "--paper": c.d900, "--paper-2": c.d800, "--paper-rgb": rgb(c.d900),
      "--ink": c.paper, "--ink-2": c.soft, "--ink-rgb": rgb(c.paper),
      "--accent": c.accent, "--accent-deep": c.deep, "--accent-light": c.light, "--accent-text": c.light,
      "--accent-rgb": rgb(c.accent), "--accent-light-rgb": rgb(c.light), "--split": c.split,
      "--plum-900": c.d900, "--plum-800": c.d800, "--plum-700": c.d700,
      "--lilac": c.soft, "--mute": c.soft, "--deco": deco === c.accent ? c.accent : c.soft,
      "--surface-dark": c.d700, "--on-dark": c.paper,
      "--surface-ink": c.d800, "--on-ink": c.light, "--on-accent": c.paper,
      "--line": `rgba(${rgb(c.paper)}, 0.16)`, "--line-dark": `rgba(${rgb(c.paper)}, 0.16)`,
      "color-scheme": "dark",
    },
    tokens: {
      "--paper": c.paper, "--paper-2": c.paper2, "--paper-rgb": rgb(c.paper),
      "--ink": c.ink, "--ink-2": c.ink2, "--ink-rgb": rgb(c.ink),
      "--accent": c.accent, "--accent-deep": c.deep, "--accent-light": c.light, "--accent-text": c.text ?? c.accent,
      "--accent-rgb": rgb(c.accent), "--accent-light-rgb": rgb(c.light), "--split": c.split,
      "--plum-900": c.d900, "--plum-800": c.d800, "--plum-700": c.d700,
      "--lilac": c.soft, "--mute": c.mute, "--deco": deco,
      "--surface-dark": c.d900, "--on-dark": c.paper,
      "--surface-ink": c.ink, "--on-ink": c.light, "--on-accent": c.paper,
      "--line": `rgba(${rgb(c.ink)}, 0.14)`, "--line-dark": `rgba(${rgb(c.paper)}, 0.18)`,
      "color-scheme": "light",
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
  // the hidden one: field green and gold, reached by saluting the infantry mark in About
  // sand paper, olive darks, azul-ferrete accent: the infantry's own colour, with gold left for the crown
  make("campanha", { hidden: true, accent: "#1d3a86", deep: "#13275e", light: "#93aee8", text: "#17306e", split: "#c8a04a", paper: "#e8e3d2", paper2: "#dcd6c0", ink: "#15170f", ink2: "#2b2f20", d900: "#141a12", d800: "#1e2719", d700: "#2c3724", soft: "#c3c7a9", mute: "#6d7158" }),
  // monochrome: type and painted elements share one ink; greys keep the posters apart
  make("ink", { accent: "#121212", deep: "#000000", light: "#d6d6d6", text: "#121212", split: "#8a8a8a", paper: "#f1f0ee", paper2: "#e3e1dd", ink: "#121212", ink2: "#2a2a2a", d900: "#171717", d800: "#4a4a4a", d700: "#333333", soft: "#bdbdbd", mute: "#666666", deco: "#4a4a4a" }),
];

export const THEME_IDS = THEMES.map((t) => t.id);
/** What the swatch menus offer; the campaign theme is not in here on purpose. */
export const VISIBLE_THEMES = THEMES.filter((t) => !t.hidden);
export const DEFAULT_THEME: ThemeId = "red";
export const LS_THEME = "lb:theme";
export const LS_SCHEME = "lb:scheme";

export type Scheme = "light" | "dark";

export function systemScheme(): Scheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function isThemeId(v: unknown): v is ThemeId {
  return typeof v === "string" && (THEME_IDS as string[]).includes(v);
}

const decl = (o: Record<string, string>) => Object.entries(o).map(([k, v]) => `${k}:${v}`).join(";");

/** CSS for every theme in both schemes, injected into index.html at build time. */
export function themeCss(): string {
  const light = THEMES.map((t) => `html[data-theme="${t.id}"]{${decl(t.tokens)}}`).join("\n");
  const dark = THEMES.map((t) => `html[data-theme="${t.id}"][data-scheme="dark"]{${decl(t.dark)}}`).join("\n");
  const auto = THEMES.map((t) => `html[data-theme="${t.id}"]:not([data-scheme="light"]){${decl(t.dark)}}`).join("\n");
  return `${light}\n${dark}\n@media (prefers-color-scheme: dark){\n${auto}\n}`;
}

/** Inline bootstrap: restores the saved theme and scheme before the first paint. */
export function themeBootstrap(): string {
  const papers = Object.fromEntries(THEMES.map((t) => [t.id, [t.tokens["--paper"], t.dark["--paper"]]]));
  return `(function(){try{var d=document.documentElement,p=${JSON.stringify(papers)};` +
    `var t=localStorage.getItem("${LS_THEME}");if(t&&p[t])d.dataset.theme=t;else t="${DEFAULT_THEME}";` +
    `var s=localStorage.getItem("${LS_SCHEME}");if(s==="dark"||s==="light")d.dataset.scheme=s;` +
    `var dark=s==="dark"||(s!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);` +
    `var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",p[t][dark?1:0]);` +
    `}catch(e){}})();`;
}

/** The LAB mark (clean version, the one the brand book keeps for 16-32px) as a 64px alpha mask. */
const MARK_MASK = "data:image/png;base64,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";

/** The favicon in the theme's colours: the clean LAB mark in accent on the paper (same as public/favicon.svg). */
export function favicon(t: Theme, scheme: Scheme = "light") {
  const p = scheme === "dark" ? t.dark : t.tokens;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><mask id="m"><image width="64" height="64" href="${MARK_MASK}" xlink:href="${MARK_MASK}"/></mask><rect width="64" height="64" fill="${p["--paper"]}"/><rect width="64" height="64" fill="${p["--accent"]}" mask="url(#m)"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function applyTheme(id: ThemeId, scheme: Scheme) {
  const t = THEMES.find((x) => x.id === id) ?? THEMES[0];
  const root = document.documentElement;
  root.dataset.theme = t.id;
  root.dataset.scheme = scheme;
  const palette = scheme === "dark" ? t.dark : t.tokens;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", palette["--paper"]);
  document.querySelector<HTMLLinkElement>('link[rel="icon"]')?.setAttribute("href", favicon(t, scheme));
  window.dispatchEvent(new CustomEvent("lb:theme", { detail: t }));
}
