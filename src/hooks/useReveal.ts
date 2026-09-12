import { useLayoutEffect, type RefObject } from "react";
import { gsap, ScrollTrigger, SplitText, reduced } from "../lib/gsap";

/**
 * Inside `root`:
 *  - [data-reveal]  fades/slides up when it enters the viewport
 *  - [data-split]   splits into lines and slides each line up from a mask
 */
export function useReveal(root: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useLayoutEffect(() => {
    const el = root.current;
    if (!el || reduced) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((node) => {
        gsap.to(node, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 88%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((node) => {
        const split = new SplitText(node, { type: "lines", linesClass: "split-line" });
        const inner = new SplitText(split.lines, { type: "lines" });
        gsap.from(inner.lines, {
          yPercent: 110,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: { trigger: node, start: "top 85%", once: true },
        });
      });
    }, el);
    ScrollTrigger.refresh();
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
