import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { motion } from "../state/prefs";
import { shared } from "../data/content";
import { usePrefs } from "../state/prefs";

const GLYPHS = ["レ", "オ", "ナ", "ル", "ド", "バ", "ロ", "ス"];
const SS_KEY = "lb:intro";

function seenThisSession() {
  try { return sessionStorage.getItem(SS_KEY) === "1"; } catch { return false; }
}

/** Full intro on the first visit of a session; a short fade on later loads. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const { t } = usePrefs();
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [glyph, setGlyph] = useState(GLYPHS[0]);
  const [skip] = useState(() => !motion.enabled || seenThisSession());

  useEffect(() => {
    if (skip) {
      onDone();
      return;
    }
    document.body.classList.add("is-loading");
    const state = { n: 0 };
    let g = 0;
    const glyphTimer = window.setInterval(() => { g = (g + 1) % GLYPHS.length; setGlyph(GLYPHS[g]); }, 80);

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.classList.remove("is-loading");
        try { sessionStorage.setItem(SS_KEY, "1"); } catch { /* ignore */ }
        onDone();
      },
    });
    tl.to(state, { n: 100, duration: 1.5, ease: "power2.inOut", onUpdate: () => setCount(Math.round(state.n)) })
      .to(bar.current, { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, 0)
      .add(() => { window.clearInterval(glyphTimer); setGlyph(shared.nameJp); })
      .to(root.current, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "+=0.2");

    return () => { window.clearInterval(glyphTimer); tl.kill(); document.body.classList.remove("is-loading"); };
  }, [onDone, skip]);

  if (skip) return null;

  return (
    <div className="loader" ref={root} aria-hidden="true">
      <div className="loader__top mono"><span>{shared.name}</span><span>{t.meta.volume}</span></div>
      <div className="loader__jp jp">{glyph}</div>
      <div className="loader__bottom">
        <span className="mono">{t.meta.location}</span>
        <span className="loader__count">{count}<small>%</small></span>
      </div>
      <div className="loader__bar" ref={bar} />
    </div>
  );
}
