import { useEffect, useRef, useState, type RefObject } from "react";
import { lenisRef } from "../lib/gsap";

/**
 * The site's own scrollbar: a hairline track with an accent thumb, draggable, click-to-jump.
 * Without `target` it mirrors the page (Lenis-driven window scroll); with one, that element's scroll.
 * Native scrollbars are hidden on pointer devices (global.css); on touch this renders nothing.
 */
export function Scrollbar({ target, className = "" }: { target?: RefObject<HTMLElement | null>; className?: string }) {
  const rail = useRef<HTMLDivElement>(null);
  const thumb = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const scroller = target?.current ?? null;
    const railEl = rail.current, thumbEl = thumb.current;
    if (!railEl || !thumbEl) return;

    const metrics = () => scroller
      ? { pos: scroller.scrollTop, max: scroller.scrollHeight - scroller.clientHeight, view: scroller.clientHeight, total: scroller.scrollHeight }
      : { pos: window.scrollY, max: document.documentElement.scrollHeight - window.innerHeight, view: window.innerHeight, total: document.documentElement.scrollHeight };

    let thumbH = 40;
    const render = () => {
      const m = metrics();
      if (m.max <= 4) { setHidden(true); return; }
      setHidden(false);
      const trackH = railEl.clientHeight;
      thumbH = Math.max(36, Math.round((m.view / m.total) * trackH));
      const y = (m.pos / m.max) * (trackH - thumbH);
      thumbEl.style.height = `${thumbH}px`;
      thumbEl.style.transform = `translateY(${y.toFixed(1)}px)`;
    };

    const scrollTo = (pos: number, smooth: boolean) => {
      const m = metrics();
      const y = Math.max(0, Math.min(m.max, pos));
      if (scroller) scroller.scrollTo({ top: y, behavior: smooth ? "smooth" : "auto" });
      else if (lenisRef.current) lenisRef.current.scrollTo(y, smooth ? { duration: 1 } : { immediate: true });
      else window.scrollTo({ top: y, behavior: smooth ? "smooth" : "auto" });
    };
    const posFromPointer = (clientY: number, grab: number) => {
      const r = railEl.getBoundingClientRect();
      const m = metrics();
      const ratio = (clientY - r.top - grab) / (r.height - thumbH);
      return ratio * m.max;
    };

    let grab = 0;
    const onDown = (e: PointerEvent) => {
      e.preventDefault();
      const t = thumbEl.getBoundingClientRect();
      const onThumb = e.clientY >= t.top && e.clientY <= t.bottom;
      grab = onThumb ? e.clientY - t.top : thumbH / 2;
      if (!onThumb) scrollTo(posFromPointer(e.clientY, grab), true);
      setDragging(true);
      railEl.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => { if (railEl.hasPointerCapture(e.pointerId)) scrollTo(posFromPointer(e.clientY, grab), false); };
    const onUp = (e: PointerEvent) => { if (railEl.hasPointerCapture(e.pointerId)) railEl.releasePointerCapture(e.pointerId); setDragging(false); };

    const src: HTMLElement | Window = scroller ?? window;
    src.addEventListener("scroll", render, { passive: true });
    window.addEventListener("resize", render);
    const ro = new ResizeObserver(render);
    ro.observe(scroller ?? document.body);
    ro.observe(railEl); // it is display:none until first shown; re-measure when it appears
    if (scroller) Array.from(scroller.children).forEach((c) => ro.observe(c));
    railEl.addEventListener("pointerdown", onDown);
    railEl.addEventListener("pointermove", onMove);
    railEl.addEventListener("pointerup", onUp);
    railEl.addEventListener("pointercancel", onUp);
    render();
    return () => {
      src.removeEventListener("scroll", render);
      window.removeEventListener("resize", render);
      ro.disconnect();
      railEl.removeEventListener("pointerdown", onDown);
      railEl.removeEventListener("pointermove", onMove);
      railEl.removeEventListener("pointerup", onUp);
      railEl.removeEventListener("pointercancel", onUp);
    };
  }, [target]);

  return (
    <div className={`sb ${className} ${hidden ? "is-hidden" : ""} ${dragging ? "is-dragging" : ""}`} ref={rail} aria-hidden="true">
      <div className="sb__track" />
      <div className="sb__thumb" ref={thumb} />
    </div>
  );
}
