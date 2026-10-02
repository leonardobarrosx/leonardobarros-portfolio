import { useEffect } from "react";
import { gsap } from "../lib/gsap";
import { usePrefs } from "../state/prefs";

/** How far the shock reaches, in pixels. */
const REACH = 320;

/**
 * A click lands like a soft shot: a muzzle ring at the pointer, a chromatic split that runs through
 * the display type near it, and a nudge on the small pieces around. Letters are shocked through the
 * `--ox`/`--oy` variables the proximity effect already drives, never through transforms, because the
 * hero's letters are already carrying the scroll and the pointer tweens and two owners of one
 * transform is how animation starts stuttering.
 */
export function Shot() {
  const { motionOn } = usePrefs();

  useEffect(() => {
    if (!motionOn || window.matchMedia("(hover: none)").matches) return;

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 || !e.isPrimary) return;
      const x = e.clientX, y = e.clientY;

      // the ring
      const ring = document.createElement("span");
      ring.className = "shot";
      ring.style.left = `${x}px`;
      ring.style.top = `${y}px`;
      document.body.appendChild(ring);
      gsap.timeline({ onComplete: () => ring.remove() })
        .fromTo(ring, { scale: 0.1, opacity: 0.9 }, { scale: 1, opacity: 0, duration: 0.6, ease: "power3.out" })
        .fromTo(ring.style, { borderWidth: "2px" }, { borderWidth: "0.5px", duration: 0.6, ease: "power2.out" }, 0);

      // display type: a chromatic kick that decays back to rest
      const chars = document.querySelectorAll<HTMLElement>(".hero__title .char, .contact__title .char");
      chars.forEach((c) => {
        const r = c.getBoundingClientRect();
        if (r.bottom < -REACH || r.top > window.innerHeight + REACH) return;
        const dx = r.left + r.width / 2 - x, dy = r.top + r.height / 2 - y;
        const d = Math.hypot(dx, dy);
        if (d > REACH) return;
        const k = (1 - d / REACH) ** 2;
        const state = { v: 14 * k };
        const ux = d > 0.001 ? dx / d : 0, uy = d > 0.001 ? dy / d : 0;
        gsap.to(state, {
          v: 0, duration: 0.9, ease: "elastic.out(1, 0.45)",
          onUpdate: () => {
            c.style.setProperty("--ox", (ux * state.v).toFixed(2));
            c.style.setProperty("--oy", (uy * state.v).toFixed(2));
          },
        });
      });

      // small pieces: pushed away and pulled back
      const bits = document.querySelectorAll<HTMLElement>(".stack__word, .tool, .chips li, .edu li, .cert, .values h4, .marquee__item");
      bits.forEach((b) => {
        const r = b.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        const dx = r.left + r.width / 2 - x, dy = r.top + r.height / 2 - y;
        const d = Math.hypot(dx, dy);
        if (d > REACH) return;
        const k = (1 - d / REACH) ** 2 * 18;
        gsap.fromTo(b, { x: (dx / (d || 1)) * k, y: (dy / (d || 1)) * k },
          { x: 0, y: 0, duration: 1.1, ease: "elastic.out(1, 0.4)", overwrite: "auto", clearProps: "transform" });
      });

      // the hero disc takes the hit too
      window.dispatchEvent(new CustomEvent("lb:shot", { detail: { x, y } }));
    };

    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [motionOn]);

  return null;
}
