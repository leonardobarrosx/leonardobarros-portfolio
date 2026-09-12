import { useLayoutEffect, useRef } from "react";
import { gsap, lenisRef } from "../lib/gsap";
import { motion, usePrefs } from "../state/prefs";

export function Marquee() {
  const { t } = usePrefs();
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!track.current || !motion.enabled) return;
    const ctx = gsap.context(() => {
      const tween = gsap.to(track.current, { xPercent: -50, duration: 30, ease: "none", repeat: -1 });
      // Speed follows scroll velocity, then relaxes back.
      const onScroll = (e: { velocity: number }) => {
        const v = Math.min(Math.abs(e.velocity) / 12, 4);
        gsap.to(tween, { timeScale: 1 + v, duration: 0.2, overwrite: true, onComplete: () => gsap.to(tween, { timeScale: 1, duration: 1.4 }) });
      };
      const lenis = lenisRef.current;
      lenis?.on("scroll", onScroll);
      return () => lenis?.off("scroll", onScroll);
    });
    return () => ctx.revert();
  }, []);

  const items = [...t.marquee, ...t.marquee];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track" ref={track}>
        {items.map((s, i) => (
          <span className={`marquee__item ${/[\u3040-\u30ff\u4e00-\u9faf]/.test(s) ? "jp" : ""}`} key={i}>{s}</span>
        ))}
      </div>
    </div>
  );
}
