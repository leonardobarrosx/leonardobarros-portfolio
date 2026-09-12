import { useLayoutEffect, useRef } from "react";
import { gsap, reduced } from "../lib/gsap";
import { marquee } from "../data/content";

export function Marquee() {
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!track.current || reduced) return;
    const ctx = gsap.context(() => {
      // The track holds two identical halves; slide one half's width and loop.
      const tween = gsap.to(track.current, {
        xPercent: -50,
        duration: 28,
        ease: "none",
        repeat: -1,
      });
      // Nudge speed with scroll velocity for a bit of life.
      let last = window.scrollY;
      const onScroll = () => {
        const v = Math.min(Math.abs(window.scrollY - last) / 40, 3);
        last = window.scrollY;
        gsap.to(tween, { timeScale: 1 + v, duration: 0.3, overwrite: true, onComplete: () => gsap.to(tween, { timeScale: 1, duration: 1.2 }) });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    });
    return () => ctx.revert();
  }, []);

  const items = [...marquee, ...marquee];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track" ref={track}>
        {items.map((t, i) => (
          <span className={`marquee__item ${/[\u3040-\u30ff\u4e00-\u9faf]/.test(t) ? "jp" : ""}`} key={i}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
