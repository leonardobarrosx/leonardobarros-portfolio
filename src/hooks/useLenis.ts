import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger, lenisRef } from "../lib/gsap";
import { motion } from "../state/prefs";

/** Smooth scroll wired into GSAP's ticker so ScrollTrigger stays in sync. */
export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled || !motion.enabled) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);
}
