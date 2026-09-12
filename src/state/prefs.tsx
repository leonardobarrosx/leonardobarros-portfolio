import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { gsap } from "../lib/gsap";
import { content, LANGS, type Lang } from "../data/content";
import { applyTheme, DEFAULT_THEME, isThemeId, LS_THEME, type ThemeId } from "../data/themes";

/* Persisted preferences: language, motion and colour theme. Read once, written on change. */
const LS_LANG = "lb:lang";
const LS_MOTION = "lb:motion";

function read(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}
function write(key: string, v: string) {
  try { localStorage.setItem(key, v); } catch { /* private mode etc. */ }
}

const systemReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Module-level flag so non-React code (GSAP hooks) can check it at mount time. */
export const motion = { enabled: !systemReduced && read(LS_MOTION) !== "off" };

const CODES = LANGS.map((l) => l.code);
function initialLang(): Lang {
  const saved = read(LS_LANG) as Lang | null;
  if (saved && CODES.includes(saved)) return saved;
  const nav = (navigator.language || "en").toLowerCase().slice(0, 2) as Lang;
  return CODES.includes(nav) ? nav : "en";
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
  t: (typeof content)["en"];
}

const Ctx = createContext<Prefs | null>(null);

let themeTimer = 0;

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [motionOn, setMotionOn] = useState(motion.enabled);
  const [theme, setThemeState] = useState<ThemeId>(initialTheme);

  useEffect(() => { document.documentElement.lang = LANGS.find((l) => l.code === lang)?.html ?? "en"; }, [lang]);
  // The bootstrap in <head> already set data-theme; this keeps the meta colour and listeners in sync.
  useEffect(() => { applyTheme(theme); }, [theme]);

  const setLang = useCallback((l: Lang) => {
    if (l === lang) return;
    write(LS_LANG, l);
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
    const root = document.documentElement;
    if (motion.enabled) {
      // Every colour on the page eases to the new palette for half a second.
      root.classList.add("is-theming");
      window.clearTimeout(themeTimer);
      themeTimer = window.setTimeout(() => root.classList.remove("is-theming"), 650);
    }
    setThemeState(id);
  }, []);

  const value = useMemo<Prefs>(
    () => ({ lang, setLang, motionOn, toggleMotion, theme, setTheme, t: content[lang] }),
    [lang, setLang, motionOn, toggleMotion, theme, setTheme],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePrefs() {
  const v = useContext(Ctx);
  if (!v) throw new Error("usePrefs outside PrefsProvider");
  return v;
}
