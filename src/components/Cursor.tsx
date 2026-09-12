import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";

/** Red dot that follows the pointer; grows on links, becomes a "View" badge on posters. */
export function Cursor() {
  const el = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"" | "is-link" | "is-view">("");
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!el.current || window.matchMedia("(hover: none)").matches) return;
    const x = gsap.quickTo(el.current, "x", { duration: 0.35, ease: "power3" });
    const y = gsap.quickTo(el.current, "y", { duration: 0.35, ease: "power3" });
    const move = (e: PointerEvent) => {
      setOn(true);
      x(e.clientX);
      y(e.clientY);
      const t = e.target as HTMLElement;
      if (t.closest("[data-cursor='view']")) setMode("is-view");
      else if (t.closest("a, button, [data-cursor='link']")) setMode("is-link");
      else setMode("");
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div className={`cursor ${mode} ${on ? "is-on" : ""}`} ref={el} aria-hidden="true">
      <span>View</span>
    </div>
  );
}
