import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { usePrefs } from "../state/prefs";

type Mode = "" | "is-link" | "is-view" | "is-close" | "is-text" | "is-grab";

/**
 * The pointer itself: a dot that sits exactly under the real pointer and a ring that lags behind.
 *
 * The system cursor is hidden only while this is actually running, and only on a device with a fine
 * pointer and motion on, because a page with no cursor at all is a page nobody can use. The dot has
 * no easing on purpose: with the system cursor hidden, any lag on the dot reads as a slow site.
 * Modes stand in for what the system cursor would have told you: a bar over text, a grab handle on
 * the scrollbar, a bigger ring on anything clickable.
 */
export function Cursor() {
  const { motionOn } = usePrefs();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("");
  const [on, setOn] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!dot.current || !ring.current || !fine || !motionOn) return;

    const root = document.documentElement;
    root.classList.add("has-cursor");

    const dx = gsap.quickTo(dot.current, "x", { duration: 0.02, ease: "none" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.02, ease: "none" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.42, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.42, ease: "power3" });

    const TEXT = "p, h1, h2, h3, h4, li, dd, dt, blockquote, figcaption, span.jp, .mono, .serif-i";
    const modeFor = (t: Element | null): Mode => {
      if (!t) return "";
      if (t.closest("[data-cursor='view']")) return "is-view";
      if (t.closest("[data-cursor='close']")) return "is-close";
      if (t.closest(".sb, [data-cursor='grab']")) return "is-grab";
      if (t.closest("a, button, [data-cursor='link'], [role='button']")) return "is-link";
      // only call it text when the pointer is really over the glyphs, not the block around them
      const el = t.closest(TEXT);
      if (el && !el.closest("button, a")) {
        const sel = window.getSelection();
        if (sel) return "is-text";
      }
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
    // the system cursor comes back whenever focus leaves the page, so the user is never left blind
    const blur = () => { root.classList.remove("has-cursor"); setOn(false); };
    const focus = () => root.classList.add("has-cursor");

    window.addEventListener("pointermove", move);
    window.addEventListener("click", click);
    window.addEventListener("blur", blur);
    window.addEventListener("focus", focus);
    root.addEventListener("pointerleave", leave);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("click", click);
      window.removeEventListener("blur", blur);
      window.removeEventListener("focus", focus);
      root.removeEventListener("pointerleave", leave);
    };
  }, [motionOn]);

  return (
    <div className={`cursor ${mode} ${on ? "is-on" : ""}`} aria-hidden="true">
      <div className="cursor__dot" ref={dot} />
      <div className="cursor__ring" ref={ring}><span>{mode === "is-close" ? "✕" : "View"}</span></div>
    </div>
  );
}
