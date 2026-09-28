import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { gsap } from "../lib/gsap";
import { contentFor, loadContent, LANGS, type Lang } from "../data/content";
import { loadFontsFor } from "../lib/fonts";
import { applyTheme, DEFAULT_THEME, isThemeId, LS_SCHEME, LS_THEME, systemScheme, type Scheme, type ThemeId } from "../data/themes";
import type { Content } from "../data/content";

/* Persisted preferences: language, motion and colour theme. Read once, written on change. */
const LS_LANG = "lb:lang";
const LS_MOTION = "lb:motion";
/** Set once the colour question has been shown (answered or skipped). */
export const LS_ASKED = "lb:asked";

export function read(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}
export function write(key: string, v: string) {
  try { localStorage.setItem(key, v); } catch { /* private mode etc. */ }
}

const systemReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Module-level flag so non-React code (GSAP hooks) can check it at mount time. */
export const motion = { enabled: !systemReduced && read(LS_MOTION) !== "off" };

const CODES = LANGS.map((l) => l.code);
function initialLang(): Lang {
  // `?lang=pt` wins (shared links, hreflang), then the saved choice, then the browser
  const fromUrl = new URLSearchParams(location.search).get("lang") as Lang | null;
  if (fromUrl && CODES.includes(fromUrl)) { write(LS_LANG, fromUrl); return fromUrl; }
  const saved = read(LS_LANG) as Lang | null;
  if (saved && CODES.includes(saved)) return saved;
  const nav = (navigator.language || "en").toLowerCase().slice(0, 2) as Lang;
  return CODES.includes(nav) ? nav : "en";
}

function initialScheme(): Scheme {
  const saved = read(LS_SCHEME);
  return saved === "dark" || saved === "light" ? saved : systemScheme();
}

function initialTheme(): ThemeId {
  const saved = read(LS_THEME);
  return isThemeId(saved) ? saved : DEFAULT_THEME;
}

interface Prefs {
  lang: Lang;
  setLang: (l: Lang) => void;
  motionOn: boolean;
  toggleMotion: () => void;
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
  scheme: Scheme;
  toggleScheme: () => void;
  /** Try a theme on without saving it (hover); `null` restores the chosen one. */
  previewTheme: (id: ThemeId | null) => void;
  t: Content;
}

const Ctx = createContext<Prefs | null>(null);

let themeTimer = 0;
/** Every colour on the page eases to the new palette for half a second. */
function ease() {
  if (!motion.enabled) return;
  const root = document.documentElement;
  root.classList.add("is-theming");
  window.clearTimeout(themeTimer);
  themeTimer = window.setTimeout(() => root.classList.remove("is-theming"), 650);
}

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  // English is bundled; another saved language arrives a moment later, behind the preloader.
  const [t, setT] = useState<Content>(() => contentFor(initialLang()) ?? contentFor("en")!);
  const [motionOn, setMotionOn] = useState(motion.enabled);
  const [theme, setThemeState] = useState<ThemeId>(initialTheme);
  const [scheme, setSchemeState] = useState<Scheme>(initialScheme);

  useEffect(() => {
    let alive = true;
    loadFontsFor(lang);
    loadContent(lang).then((c) => {
      if (!alive) return;
      setT(c);
      document.documentElement.lang = LANGS.find((l) => l.code === lang)?.html ?? "en";
      document.title = c.seo.title;
      document.querySelector('meta[name="description"]')?.setAttribute("content", c.seo.description);
    });
    return () => { alive = false; };
  }, [lang]);
  // The bootstrap in <head> already set data-theme; this keeps the meta colour and listeners in sync.
  useEffect(() => { applyTheme(theme, scheme); }, [theme, scheme]);
  // Follow the system while the visitor has not chosen a side.
  useEffect(() => {
    if (read(LS_SCHEME)) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSchemeState(mq.matches ? "dark" : "light");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const setLang = useCallback((l: Lang) => {
    if (l === lang) return;
    write(LS_LANG, l);
    void loadContent(l); // start fetching while the crossfade runs
    const main = document.querySelector("main");
    if (!motion.enabled || !main) { setLangState(l); return; }
    // Crossfade the page content around the remount.
    gsap.to(main, { opacity: 0, y: 8, duration: 0.25, ease: "power2.in", onComplete: () => {
      setLangState(l);
      requestAnimationFrame(() => gsap.fromTo(main, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", clearProps: "all" }));
    } });
  }, [lang]);

  const toggleMotion = useCallback(() => {
    const next = !motion.enabled;
    motion.enabled = next;
    write(LS_MOTION, next ? "on" : "off");
    setMotionOn(next);
  }, []);

  const setTheme = useCallback((id: ThemeId) => {
    write(LS_THEME, id);
    write(LS_ASKED, "1"); // whoever picks a theme has answered the colour question
    ease();
    setThemeState(id);
  }, []);

  const previewTheme = useCallback((id: ThemeId | null) => {
    ease();
    applyTheme(id ?? theme, scheme);
  }, [theme, scheme]);

  const toggleScheme = useCallback(() => {
    setSchemeState((s) => {
      const next: Scheme = s === "dark" ? "light" : "dark";
      write(LS_SCHEME, next);
      ease();
      return next;
    });
  }, []);

  const value = useMemo<Prefs>(
    () => ({ lang, setLang, motionOn, toggleMotion, theme, setTheme, scheme, toggleScheme, previewTheme, t }),
    [lang, setLang, motionOn, toggleMotion, theme, setTheme, scheme, toggleScheme, previewTheme, t],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePrefs() {
  const v = useContext(Ctx);
  if (!v) throw new Error("usePrefs outside PrefsProvider");
  return v;
}
