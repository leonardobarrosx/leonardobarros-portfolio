import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { gsap } from "../lib/gsap";
import { content, type Lang } from "../data/content";

/* Persisted preferences: language and motion. Read once, written on change. */
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

function initialLang(): Lang {
  const saved = read(LS_LANG);
  if (saved === "en" || saved === "pt") return saved;
  return navigator.language?.toLowerCase().startsWith("pt") ? "pt" : "en";
}

interface Prefs {
  lang: Lang;
  setLang: (l: Lang) => void;
  motionOn: boolean;
  toggleMotion: () => void;
  t: (typeof content)["en"];
}

const Ctx = createContext<Prefs | null>(null);

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [motionOn, setMotionOn] = useState(motion.enabled);

  useEffect(() => { document.documentElement.lang = lang === "pt" ? "pt-BR" : "en"; }, [lang]);

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

  const value = useMemo<Prefs>(() => ({ lang, setLang, motionOn, toggleMotion, t: content[lang] }), [lang, setLang, motionOn, toggleMotion]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePrefs() {
  const v = useContext(Ctx);
  if (!v) throw new Error("usePrefs outside PrefsProvider");
  return v;
}
