import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

/** Shared Lenis instance (set by useLenis) so components can scrollTo / read velocity. */
export const lenisRef: { current: Lenis | null } = { current: null };

export function scrollToHash(hash: string) {
  const el = document.querySelector<HTMLElement>(hash);
  if (!el) return;
  if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: -72, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export { gsap, ScrollTrigger, SplitText };
