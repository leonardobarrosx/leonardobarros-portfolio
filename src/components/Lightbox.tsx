import { useCallback, useEffect, useLayoutEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { gsap } from "../lib/gsap";
import { motion, usePrefs } from "../state/prefs";
import type { Shot } from "../data/shots";

const pad = (n: number) => String(n).padStart(2, "0");
const FOCUSABLE = "button:not([disabled]), a[href]";

interface Props {
  shots: Shot[];
  /** The screen on show, -1 when closed. */
  index: number;
  title: string;
  alt: (s: Shot, i: number) => string;
  caption: (s: Shot) => string | undefined;
  labels: { prev: string; next: string; close: string };
  onIndex: (i: number) => void;
  onClose: () => void;
}

/**
 * The project's screens at full size, over the case study instead of a new tab. Arrows, the keyboard
 * (← → Home End Esc), a swipe or the thumbnails move between them; focus stays inside until it closes.
 */
export function Lightbox({ shots, index, title, alt, caption, labels, onIndex, onClose }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const prevIndex = useRef(-1);
  const leaving = useRef(false);
  const open = index >= 0;
  const { motionOn } = usePrefs();
  const count = shots.length;

  const go = useCallback((d: 1 | -1) => { if (count > 1) onIndex((index + d + count) % count); }, [index, count, onIndex]);

  const close = useCallback(() => {
    if (leaving.current) return;
    const el = root.current;
    if (!motion.enabled || !el) { onClose(); return; }
    leaving.current = true;
    gsap.to(el, { opacity: 0, duration: 0.25, ease: "power2.in", onComplete: () => { leaving.current = false; onClose(); } });
  }, [onClose]);

  // Remember who opened it, hand focus back when it closes.
  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus({ preventScroll: true });
    return () => { opener.current?.focus({ preventScroll: true }); };
  }, [open]);

  // Keys are handled here first (capture), so the case study underneath does not also step or close.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      const el = root.current;
      if (!el) return;
      let handled = true;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Home") onIndex(0);
      else if (e.key === "End") onIndex(count - 1);
      else if (e.key === "Tab") {
        const items = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((n) => n.getClientRects().length > 0);
        const at = items.indexOf(document.activeElement as HTMLElement);
        const next = e.shiftKey ? (at <= 0 ? items.length - 1 : at - 1) : (at + 1) % items.length;
        items[next]?.focus();
      } else handled = false;
      if (handled) { e.preventDefault(); e.stopImmediatePropagation(); }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [open, close, go, onIndex, count]);

  // Neighbours load ahead, so stepping never waits on the network.
  useEffect(() => {
    if (!open || count < 2) return;
    [index + 1, index - 1].forEach((i) => { const s = shots[(i + count) % count]; if (s.video) return; const img = new Image(); img.src = s.src; });
  }, [open, index, count, shots]);

  // Open: the backdrop fades and the screen rises. Step: the screen slides in from the side it came from.
  useLayoutEffect(() => {
    const el = root.current;
    if (!open || !el) { prevIndex.current = -1; return; }
    const from = prevIndex.current;
    prevIndex.current = index;
    el.querySelector<HTMLElement>(".lb__thumbs .is-current")?.scrollIntoView({ block: "nearest", inline: "center" });
    if (!motion.enabled) return;
    const ctx = gsap.context(() => {
      if (from < 0) {
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out", clearProps: "opacity" });
        gsap.from(".lb__frame", { y: 40, scale: 0.96, opacity: 0, duration: 0.7, ease: "expo.out", clearProps: "all" });
        gsap.from(".lb__top, .lb__foot", { opacity: 0, y: 12, duration: 0.5, delay: 0.15, ease: "power3.out", clearProps: "all" });
      } else if (from !== index) {
        const wrap = (index - from + count) % count;
        const d = wrap === 1 ? 1 : wrap === count - 1 ? -1 : index > from ? 1 : -1;
        gsap.fromTo(".lb__frame", { x: d * 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.55, ease: "power3.out", clearProps: "all" });
      }
    }, el);
    return () => ctx.revert();
  }, [open, index, count]);

  // Touch: a sideways swipe steps.
  const start = useRef<{ x: number; y: number } | null>(null);
  const onDown = (e: ReactPointerEvent) => { if (e.pointerType !== "mouse") start.current = { x: e.clientX, y: e.clientY }; };
  const onUp = (e: ReactPointerEvent) => {
    const s = start.current;
    start.current = null;
    if (!s) return;
    const dx = e.clientX - s.x, dy = e.clientY - s.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) go(dx < 0 ? 1 : -1);
  };

  if (!open || !shots[index]) return null;
  const shown = index;
  const shot = shots[shown];
  const text = caption(shot);

  return (
    <div className="lb" ref={root} role="dialog" aria-modal="true" aria-label={`${title} — ${pad(shown + 1)} / ${pad(count)}`}>
      <div className="lb__dim" onClick={close} aria-hidden="true" />
      <div className="lb__top mono">
        <span className="lb__count" aria-live="polite">{pad(shown + 1)} / {pad(count)}</span>
        <span className="lb__title">{title}</span>
        <button type="button" className="lb__close" onClick={close} ref={closeBtn} data-cursor="link">{labels.close} ✕</button>
      </div>

      <div className="lb__stage" onPointerDown={onDown} onPointerUp={onUp} onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
        {count > 1 && <button type="button" className="lb__nav lb__nav--prev" onClick={() => go(-1)} aria-label={labels.prev} data-cursor="link"><span aria-hidden="true">←</span></button>}
        <figure className={`lb__frame${shot.phone ? " lb__frame--phone" : ""}${shot.video ? " lb__frame--video" : ""}`} key={shot.src}>
          {!shot.phone && <span className="lb__bar" aria-hidden="true"><i /><i /><i /></span>}
          {shot.video
            ? <video key={`${shot.src}-${motionOn}`} src={shot.src} aria-label={alt(shot, shown)} autoPlay={motionOn} loop muted playsInline preload="auto" disablePictureInPicture />
            : <img src={shot.src} alt={alt(shot, shown)} decoding="async" draggable={false} />}
        </figure>
        {count > 1 && <button type="button" className="lb__nav lb__nav--next" onClick={() => go(1)} aria-label={labels.next} data-cursor="link"><span aria-hidden="true">→</span></button>}
      </div>

      <div className="lb__foot">
        <p className="lb__caption">{text ?? alt(shot, shown)}</p>
        {count > 1 && (
          <div className="lb__thumbs">
            {shots.map((s, i) => (
              <button type="button" key={s.src} className={`${i === shown ? "is-current" : ""}${s.phone ? " is-phone" : ""}`} onClick={() => onIndex(i)} aria-label={`${pad(i + 1)} — ${alt(s, i)}`} aria-current={i === shown ? "true" : undefined}>
                {s.video
                  ? <video src={`${s.src}#t=0.1`} muted playsInline preload="metadata" aria-hidden="true" tabIndex={-1} />
                  : <img src={s.src} alt="" loading="lazy" decoding="async" draggable={false} />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
