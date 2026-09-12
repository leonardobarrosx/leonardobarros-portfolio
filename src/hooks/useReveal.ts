import { useLayoutEffect, type RefObject } from "react";
import { gsap, ScrollTrigger, SplitText } from "../lib/gsap";
import { motion } from "../state/prefs";

/**
 * Inside `root`:
 *  - [data-reveal]        fades/slides up on enter (add data-delay="0.1" to offset)
 *  - [data-reveal="clip"] wipes in from the bottom (posters, images)
 *  - [data-split]         splits into lines and slides each line out of a mask
 *  - .label__rule         draws in from the left
 */
export function useReveal(root: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    if (!motion.enabled) {
      el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((n) => { n.style.opacity = "1"; n.style.transform = "none"; n.style.clipPath = "none"; });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((node) => {
        const clip = node.dataset.reveal === "clip";
        const delay = Number(node.dataset.delay || 0);
        gsap.fromTo(
          node,
          clip ? { clipPath: "inset(100% 0 0 0)", y: 40 } : { opacity: 0, y: 28 },
          {
            ...(clip ? { clipPath: "inset(0% 0 0 0)", y: 0 } : { opacity: 1, y: 0 }),
            duration: clip ? 1.3 : 1,
            delay,
            ease: clip ? "power4.out" : "power3.out",
            scrollTrigger: { trigger: node, start: "top 90%", once: true },
          },
        );
      });
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((node) => {
        const outer = new SplitText(node, { type: "lines", linesClass: "split-line" });
        const inner = new SplitText(outer.lines, { type: "lines" });
        gsap.from(inner.lines, {
          yPercent: 110,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.07,
          scrollTrigger: { trigger: node, start: "top 88%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>(".label__rule").forEach((rule) => {
        gsap.from(rule, { scaleX: 0, duration: 1.2, ease: "power4.out", scrollTrigger: { trigger: rule, start: "top 92%", once: true } });
      });
    }, el);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [root]);
}
