import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, lenisRef } from "../lib/gsap";
import { motion } from "../state/prefs";

/** Right-hand slide-in panel with backdrop. Children are rendered by the caller; keep them mounted while closing. */
export function Sheet({ open, onClose, label, children }: { open: boolean; onClose: () => void; label?: string; children: ReactNode }) {
  const panel = useRef<HTMLElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);

  // CSS parks the panel off-screen before hydration; hand the transform to GSAP once (percent, not px).
  useLayoutEffect(() => {
    if (panel.current) gsap.set(panel.current, { x: 0, xPercent: 100 });
  }, []);

  useLayoutEffect(() => {
    if (!panel.current || !backdrop.current) return;
    document.body.classList.toggle("is-locked", open);
    lenisRef.current?.[open ? "stop" : "start"]();
    if (!motion.enabled) {
      gsap.set(panel.current, { xPercent: open ? 0 : 100 });
      gsap.set(backdrop.current, { opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" });
      return;
    }
    const ctx = gsap.context(() => {
      if (open) {
        gsap.timeline()
          .to(backdrop.current, { opacity: 1, pointerEvents: "auto", duration: 0.4 }, 0)
          .to(panel.current, { xPercent: 0, duration: 0.8, ease: "power4.inOut" }, 0)
          .from(".sheet__body > *", { y: 24, opacity: 0, duration: 0.6, ease: "power3.out", stagger: 0.06, clearProps: "all" }, 0.35);
      } else {
        gsap.timeline()
          .to(panel.current, { xPercent: 100, duration: 0.6, ease: "power4.inOut" }, 0)
          .to(backdrop.current, { opacity: 0, pointerEvents: "none", duration: 0.4 }, 0.1);
      }
    }, panel);
    return () => ctx.revert();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      <div className="sheet-backdrop" ref={backdrop} onClick={onClose} aria-hidden="true" />
      <aside className="sheet" ref={panel} role="dialog" aria-modal="true" aria-hidden={!open} aria-label={label}>
        {children}
      </aside>
    </>
  );
}

/** Returns the last non-null value so panel content stays put while it slides out. */
export function useSticky<T>(value: T | null): T | null {
  const last = useRef<T | null>(null);
  if (value) last.current = value;
  return value ?? last.current;
}
