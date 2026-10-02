import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { motion, usePrefs } from "../state/prefs";

export type Org = { name: string; src: string; site: string; tall?: boolean };

/** Pixels per second the rail drifts when nobody is touching it. */
const SPEED = 36;
/** Past this much travel a press is a drag, and the click that follows it is not a pick. */
const SLOP = 6;

const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/**
 * The organisations as an endless rail.
 *
 * It drifts on its own, waits while the pointer is over it so a logo can be read, and follows a
 * drag in either direction, keeping the throw's momentum when the pointer lets go. Position is one
 * number of pixels wrapped over the width of a single set, so the copies after the first are only
 * there to fill the rail and are kept out of the accessibility tree.
 *
 * Picking a logo names the organisation and offers its site, which opens in its own tab. With
 * motion off the whole thing is a plain wrapped list, and picking still works.
 */
export function Orgs({ title, orgs, visit, close }: { title: string; orgs: Org[]; visit: string; close: string }) {
  const root = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);

  const [sets, setSets] = useState(2);
  const [active, setActive] = useState<Org | null>(null);
  const [still, setStill] = useState(false);
  const [grabbing, setGrabbing] = useState(false);
  // through the context, so flipping the motion toggle tears the rail down instead of leaving it running
  const { motionOn: live } = usePrefs();

  const offset = useRef(0);
  const vel = useRef(-SPEED);
  const span = useRef(0);
  const paused = useRef(false);
  const dragged = useRef(false);
  const drag = useRef<{ id: number; x: number; from: number; moved: number; lastX: number; lastT: number; v: number } | null>(null);

  useEffect(() => { paused.current = still || !!active; }, [still, active]);

  // ---- the rail itself: measure one set, fill the width, then drift
  useEffect(() => {
    if (!live || !track.current || !rail.current) return;
    const el = track.current, railEl = rail.current;

    const measure = () => {
      const set = el.querySelector<HTMLElement>(".orgs__set");
      if (!set) return;
      const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
      span.current = set.offsetWidth + gap;
      if (span.current > 0) {
        const need = Math.max(2, Math.ceil(railEl.offsetWidth / span.current) + 1);
        setSets((n) => (n === need ? n : need));
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(railEl);
    const first = el.querySelector<HTMLElement>(".orgs__set");
    if (first) ro.observe(first);

    const tick = (_t: number, dt: number) => {
      const d = Math.min(dt, 48) / 1000;
      if (!drag.current) {
        const want = paused.current ? 0 : -SPEED;
        // easing into the wanted speed is what lets a throw carry before the drift takes over again
        vel.current += (want - vel.current) * Math.min(1, d * 3.4);
        offset.current += vel.current * d;
      }
      if (span.current > 0) gsap.set(el, { x: gsap.utils.wrap(-span.current, 0, offset.current) });
    };
    gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); ro.disconnect(); };
  }, [live, orgs]);

  // ---- drag. No pointer capture: it would retarget the click and the logos would stop being pickable.
  useEffect(() => {
    if (!live) return;
    const move = (e: PointerEvent) => {
      const d = drag.current;
      if (!d || e.pointerId !== d.id) return;
      const now = performance.now();
      d.moved = Math.max(d.moved, Math.abs(e.clientX - d.x));
      d.v = ((e.clientX - d.lastX) / Math.max(1, now - d.lastT)) * 1000;
      d.lastX = e.clientX; d.lastT = now;
      offset.current = d.from + (e.clientX - d.x);
    };
    const up = (e: PointerEvent) => {
      const d = drag.current;
      if (!d || e.pointerId !== d.id) return;
      drag.current = null;
      dragged.current = d.moved > SLOP;
      // a stale sample would fling the rail on a slow release, so only a fresh one counts
      vel.current = performance.now() - d.lastT < 90 ? gsap.utils.clamp(-2400, 2400, d.v) : 0;
      setGrabbing(false);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [live]);

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!live || e.button !== 0 || !e.isPrimary) return;
    dragged.current = false;
    drag.current = { id: e.pointerId, x: e.clientX, from: offset.current, moved: 0, lastX: e.clientX, lastT: performance.now(), v: 0 };
    setGrabbing(true);
  };

  const pick = useCallback((o: Org) => {
    if (dragged.current) return;
    setActive((cur) => (cur?.name === o.name ? null : o));
  }, []);

  // ---- the card: escape or a press outside closes it
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); };
    const outside = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setActive(null); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", outside);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", outside);
    };
  }, [active]);

  useEffect(() => {
    if (!active || !card.current || !motion.enabled) return;
    gsap.fromTo(card.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" });
  }, [active]);

  const items = (o: Org, mute: boolean) => (
    <li key={o.name} className={o.tall ? "is-tall" : undefined}>
      <button
        type="button"
        className={`orgs__item${active?.name === o.name ? " is-active" : ""}`}
        onClick={() => pick(o)}
        onFocus={() => setStill(true)}
        onBlur={() => setStill(false)}
        tabIndex={mute ? -1 : undefined}
        aria-expanded={mute ? undefined : active?.name === o.name}
        title={o.name}
        data-cursor="link"
      >
        <img src={o.src} alt={o.name} loading="lazy" draggable={false} />
      </button>
    </li>
  );

  return (
    <div className="orgs" data-reveal ref={root}>
      <span className="mono muted">{title}</span>

      {live ? (
        <div
          className={`orgs__rail${grabbing ? " is-dragging" : ""}`}
          ref={rail}
          data-cursor="grab"
          onPointerDown={onDown}
          onPointerEnter={() => setStill(true)}
          onPointerLeave={() => setStill(false)}
        >
          <div className="orgs__track" ref={track}>
            {Array.from({ length: sets }, (_, s) => (
              <ul className="orgs__set" key={s} aria-hidden={s > 0 || undefined}>
                {orgs.map((o) => items(o, s > 0))}
              </ul>
            ))}
          </div>
        </div>
      ) : (
        <ul className="orgs__set orgs__set--static">{orgs.map((o) => items(o, false))}</ul>
      )}

      {active && (
        <div className="orgs__card" ref={card}>
          <img src={active.src} alt="" draggable={false} />
          <span className="orgs__card-id">
            <b>{active.name}</b>
            <a className="mono" href={active.site} target="_blank" rel="noreferrer">{visit} · {host(active.site)} ↗</a>
          </span>
          <button type="button" className="orgs__card-x" onClick={() => setActive(null)} aria-label={close}>✕</button>
        </div>
      )}
    </div>
  );
}
