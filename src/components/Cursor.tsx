import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";

/** Dot that snaps to the pointer plus a ring that lags behind; grows on links, "View" on posters, "✕" on dimmed backdrops. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"" | "is-link" | "is-view" | "is-close">("");
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!dot.current || !ring.current || window.matchMedia("(hover: none)").matches) return;
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });
    const modeFor = (t: Element | null) => {
      if (!t) return "";
      if (t.closest("[data-cursor='view']")) return "is-view";
      if (t.closest("[data-cursor='close']")) return "is-close";
      if (t.closest("a, button, [data-cursor='link']")) return "is-link";
      return "";
    };
    let last = { x: 0, y: 0 };
    const move = (e: PointerEvent) => {
      setOn(true);
      last = { x: e.clientX, y: e.clientY };
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
      setMode(modeFor(e.target as Element));
    };
    // After a click the element under the pointer may change (a panel opens); re-evaluate without waiting for movement.
    const click = () => { window.setTimeout(() => setMode(modeFor(document.elementFromPoint(last.x, last.y))), 80); };
    const leave = () => setOn(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("click", click);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("click", click); document.documentElement.removeEventListener("pointerleave", leave); };
  }, []);

  return (
    <div className={`cursor ${mode} ${on ? "is-on" : ""}`} aria-hidden="true">
      <div className="cursor__dot" ref={dot} />
      <div className="cursor__ring" ref={ring}><span>{mode === "is-close" ? "✕" : "View"}</span></div>
    </div>
  );
}
