import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, lenisRef } from "../lib/gsap";
import { motion, usePrefs } from "../state/prefs";
import { useReveal } from "../hooks/useReveal";
import { Label } from "./Label";
import type { Work as WorkItem } from "../data/content";

function Poster({ w, onOpen }: { w: WorkItem; onOpen: (id: string) => void }) {
  const el = useRef<HTMLButtonElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (!motion.enabled || !el.current) return;
    const r = el.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el.current, { rotateY: px * 6, rotateX: -py * 6, duration: 0.6, ease: "power3.out", transformPerspective: 900 });
  };
  const onLeave = () => el.current && gsap.to(el.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "power3.out" });

  return (
    <button
      type="button"
      className={`poster poster--${w.variant} ${w.tall ? "poster--tall" : ""}`}
      ref={el}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={() => onOpen(w.id)}
      data-reveal="clip"
      data-cursor="view"
      aria-haspopup="dialog"
    >
      <div className="poster__meta mono"><span>{w.kind}</span><span>{w.year}</span></div>
      <h3 className="poster__title display">{w.title.map((s) => <span key={s}>{s}</span>)}</h3>
      <span className="poster__jp jp vertical" aria-hidden="true">{w.jp}</span>
      <div className="poster__foot mono"><span>{w.stack}</span><span className="desc">{w.desc}</span></div>
      <span className="poster__deco" aria-hidden="true" />
      {w.href && <span className="poster__arrow" aria-hidden="true">↗</span>}
    </button>
  );
}

function CaseSheet({ work, onClose }: { work: WorkItem | null; onClose: () => void }) {
  const { t } = usePrefs();
  const panel = useRef<HTMLDivElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState<WorkItem | null>(null);

  // Keep the last work rendered while sliding out.
  useEffect(() => { if (work) setShown(work); }, [work]);

  // CSS keeps the panel off-screen before hydration; hand the transform over to GSAP once.
  useLayoutEffect(() => {
    if (panel.current) gsap.set(panel.current, { x: 0, xPercent: 100 });
  }, []);

  useLayoutEffect(() => {
    if (!panel.current || !backdrop.current) return;
    const open = !!work;
    document.body.classList.toggle("is-locked", open);
    lenisRef.current?.[open ? "stop" : "start"]();
    if (!motion.enabled) {
      gsap.set(panel.current, { xPercent: open ? 0 : 100 });
      gsap.set(backdrop.current, { opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" });
      return;
    }
    if (open) {
      gsap.timeline()
        .to(backdrop.current, { opacity: 1, pointerEvents: "auto", duration: 0.4 }, 0)
        .to(panel.current, { xPercent: 0, duration: 0.8, ease: "power4.inOut" }, 0)
        .from(".sheet__body > *", { y: 24, opacity: 0, duration: 0.6, ease: "power3.out", stagger: 0.06 }, 0.35);
    } else {
      gsap.timeline()
        .to(panel.current, { xPercent: 100, duration: 0.6, ease: "power4.inOut" }, 0)
        .to(backdrop.current, { opacity: 0, pointerEvents: "none", duration: 0.4 }, 0.1);
    }
  }, [work]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const w = shown;
  return (
    <>
      <div className="sheet-backdrop" ref={backdrop} onClick={onClose} aria-hidden="true" />
      <aside className="sheet" ref={panel} role="dialog" aria-modal="true" aria-hidden={!work} aria-label={w?.title.join(" ")}>
        {w && (
          <>
            <div className="sheet__top mono">
              <span>{w.kind} · {w.year}</span>
              <button className="sheet__close mono" onClick={onClose}>{t.sheet.close} ✕</button>
            </div>
            <div className="sheet__body">
              <span className="sheet__jp jp">{w.jp}</span>
              <h3 className="sheet__title display">{w.title.map((s) => <span key={s}>{s}</span>)}</h3>
              <p className="sheet__long">{w.long}</p>
              <dl className="sheet__facts mono">
                <b>{t.sheet.year}</b><span>{w.year}</span>
                <b>{t.sheet.type}</b><span>{w.kind}</span>
                <b>{t.sheet.stack}</b><span>{w.stack}</span>
              </dl>
            </div>
            <div className="sheet__foot">
              {w.href
                ? <a className="btn" href={w.href} target="_blank" rel="noreferrer">{t.sheet.open} ↗</a>
                : <span className="mono muted">{t.sheet.private}</span>}
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export function Work() {
  const { t } = usePrefs();
  const root = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  useReveal(root);

  // Deep link: #work/<id> opens the sheet; keeps the URL in sync.
  useEffect(() => {
    const fromHash = () => {
      const m = location.hash.match(/^#work\/([a-z0-9-]+)$/);
      setOpenId(m && t.works.some((w) => w.id === m[1]) ? m[1] : null);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [t]);

  const open = useCallback((id: string) => { history.replaceState(null, "", `#work/${id}`); setOpenId(id); }, []);
  const close = useCallback(() => { history.replaceState(null, "", "#work"); setOpenId(null); }, []);

  // Grid skews with scroll velocity, posters drift at different speeds.
  useLayoutEffect(() => {
    if (!root.current || !motion.enabled) return;
    const ctx = gsap.context(() => {
      const lenis = lenisRef.current;
      const skew = gsap.quickTo(grid.current, "skewY", { duration: 0.5, ease: "power3" });
      const onScroll = (e: { velocity: number }) => skew(gsap.utils.clamp(-2.5, 2.5, e.velocity * 0.03));
      lenis?.on("scroll", onScroll);
      gsap.utils.toArray<HTMLElement>(".poster").forEach((p, i) => {
        gsap.to(p, { y: i % 3 === 1 ? -28 : 16, ease: "none", scrollTrigger: { trigger: p, start: "top bottom", end: "bottom top", scrub: 1.2 } });
      });
      return () => lenis?.off("scroll", onScroll);
    }, root);
    return () => ctx.revert();
  }, [t]);

  return (
    <section className="section" id="work" ref={root}>
      <div className="wrap">
        <Label n="03" text={t.labels.work} jp="作品" />
        <div className="work__grid" ref={grid}>
          {t.works.map((w) => <Poster w={w} key={w.id} onOpen={open} />)}
        </div>
      </div>
      <CaseSheet work={t.works.find((w) => w.id === openId) ?? null} onClose={close} />
    </section>
  );
}
