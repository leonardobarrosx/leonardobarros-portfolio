import { useEffect, type RefObject } from "react";
import { gsap } from "../lib/gsap";
import { motion } from "../state/prefs";

/**
 * Letters inside `root` (matching `selector`) bend toward the pointer:
 * lift, skew and stretch scale with proximity, and relax when the pointer leaves.
 */
export function useProximity(root: RefObject<HTMLElement | null>, selector: string, enabled: boolean, radius = 240, opts: { split?: boolean } = {}) {
  useEffect(() => {
    const el = root.current;
    if (!el || !enabled || !motion.enabled || window.matchMedia("(hover: none)").matches) return;
    let chars: HTMLElement[] = [];
    let rects: DOMRect[] = [];
    let raf = 0;
    let last: { x: number; y: number } | null = null;
    let vel = { x: 0, y: 0 };
    let settle = 0;

    const measure = () => {
      chars = Array.from(el.querySelectorAll<HTMLElement>(selector));
      rects = chars.map((c) => c.getBoundingClientRect());
    };
    const apply = () => {
      raf = 0;
      if (!last) return;
      chars.forEach((c, i) => {
        const r = rects[i];
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dx = last!.x - cx, dy = last!.y - cy;
        const d = Math.hypot(dx, dy);
        const k = Math.max(0, 1 - d / radius);
        const e = k * k;
        gsap.to(c, { y: -22 * e, skewX: -(dx / radius) * 14 * e, scaleY: 1 + 0.16 * e, scaleX: 1 - 0.05 * e, duration: 0.55, ease: "power3.out", overwrite: "auto" });
        if (opts.split) {
          // chromatic trail only on the letters under the pointer, sized by how fast it moves
          c.style.setProperty("--ox", (gsap.utils.clamp(-12, 12, vel.x * 0.6) * e).toFixed(2));
          c.style.setProperty("--oy", (gsap.utils.clamp(-12, 12, vel.y * 0.6) * e).toFixed(2));
        }
      });
    };
    const relaxSplit = () => {
      if (!opts.split) return;
      chars.forEach((c) => gsap.to(c, { "--ox": 0, "--oy": 0, duration: 0.45, ease: "power3.out", overwrite: false }));
    };
    const move = (e: PointerEvent) => {
      last = { x: e.clientX, y: e.clientY };
      vel = { x: e.movementX, y: e.movementY };
      if (!raf) raf = requestAnimationFrame(apply);
      if (opts.split) { window.clearTimeout(settle); settle = window.setTimeout(relaxSplit, 100); }
    };
    const enter = () => measure();
    const leave = () => { last = null; gsap.to(chars, { y: 0, skewX: 0, scaleX: 1, scaleY: 1, duration: 0.9, ease: "elastic.out(1, 0.5)", overwrite: "auto" }); relaxSplit(); };

    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(settle);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      window.removeEventListener("resize", measure);
    };
  }, [root, selector, enabled, radius]);
}
