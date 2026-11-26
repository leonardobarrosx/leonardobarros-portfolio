import { useLayoutEffect, useRef } from "react";
import { gsap, lenisRef } from "../lib/gsap";
import { motion, usePrefs } from "../state/prefs";
import { Pixel } from "./lab/Pixel";
import type { PixelName } from "../data/pixels";
import { toBin } from "../lib/hex";

/** Sprites that sit between the words, in turn. */
const SEPARATORS: PixelName[] = ["gamepad", "laptop", "floppy", "heart", "chip", "cursor", "coffee", "joystick", "pen", "coin"];

/**
 * Two crossed bands, like tape across the page: the words on the accent band with sprites between
 * them, and behind it an ink band running the same words in binary the other way.
 */
export function Marquee() {
  const { t } = usePrefs();
  const track = useRef<HTMLDivElement>(null);
  const back = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!track.current || !motion.enabled) return;
    const ctx = gsap.context(() => {
      const tween = gsap.to(track.current, { xPercent: -50, duration: 30, ease: "none", repeat: -1 });
      const rev = gsap.fromTo(back.current, { xPercent: -50 }, { xPercent: 0, duration: 60, ease: "none", repeat: -1 });
      // Speed follows scroll velocity, then relaxes back.
      const onScroll = (e: { velocity: number }) => {
        const v = Math.min(Math.abs(e.velocity) / 12, 4);
        [tween, rev].forEach((tw) => gsap.to(tw, { timeScale: 1 + v, duration: 0.2, overwrite: true, onComplete: () => gsap.to(tw, { timeScale: 1, duration: 1.4 }) }));
      };
      const lenis = lenisRef.current;
      lenis?.on("scroll", onScroll);
      return () => lenis?.off("scroll", onScroll);
    });
    return () => ctx.revert();
  }, []);

  const items = [...t.marquee, ...t.marquee, ...t.marquee, ...t.marquee];
  const bits = toBin(t.marquee.join(" "));
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__back mono"><div className="marquee__track" ref={back}><span>{bits}</span><span>{bits}</span></div></div>
      <div className="marquee__front">
        <div className="marquee__track" ref={track}>
          {items.map((s, i) => (
            <span className="marquee__item" key={i}>{s}<Pixel name={SEPARATORS[i % SEPARATORS.length]} className="marquee__px" /></span>
          ))}
        </div>
      </div>
    </div>
  );
}
