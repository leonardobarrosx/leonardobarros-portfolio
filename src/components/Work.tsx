import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, lenisRef } from "../lib/gsap";
import { motion, usePrefs } from "../state/prefs";
import { useReveal } from "../hooks/useReveal";
import { useCharWave } from "../hooks/useCharWave";
import { Label } from "./Label";
import { Sheet, useSticky } from "./Sheet";
import { decode } from "../lib/decode";
import type { Work as WorkItem } from "../data/content";

function Poster({ w, onOpen }: { w: WorkItem; onOpen: (id: string) => void }) {
  const el = useRef<HTMLButtonElement>(null);
  const wave = useCharWave(".poster__title");

  const onMove = (e: React.PointerEvent) => {
    if (!motion.enabled || !el.current) return;
    const r = el.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el.current, { rotateY: px * 6, rotateX: -py * 6, duration: 0.6, ease: "power3.out", transformPerspective: 900 });
    // the decoration "flows" toward the pointer
    gsap.to(el.current.querySelector(".poster__deco"), { x: px * 24, y: py * 24, duration: 0.8, ease: "power3.out" });
  };
  const onLeave = () => {
    if (!el.current) return;
    gsap.to(el.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "power3.out" });
    gsap.to(el.current.querySelector(".poster__deco"), { x: 0, y: 0, duration: 0.8, ease: "power3.out" });
  };

  return (
    <button
      type="button"
      className={`poster poster--${w.variant} ${w.tall ? "poster--tall" : ""}`}
      ref={el}
      onPointerEnter={wave}
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

export function Work() {
  const { t } = usePrefs();
  const root = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  useReveal(root);

  // Deep link: #work/<id> opens the case study; the URL follows the panel.
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

  const index = t.works.findIndex((w) => w.id === openId);
  const step = useCallback((dir: 1 | -1) => {
    if (index < 0) return;
    const next = t.works[(index + dir + t.works.length) % t.works.length];
    const body = document.querySelector<HTMLElement>(".sheet--case .sheet__body");
    if (motion.enabled && body) {
      gsap.to(body, { opacity: 0, x: dir * -16, duration: 0.2, ease: "power2.in", onComplete: () => {
        open(next.id);
        gsap.fromTo(body, { opacity: 0, x: dir * 16 }, { opacity: 1, x: 0, duration: 0.45, ease: "power3.out", clearProps: "all" });
      } });
    } else open(next.id);
  }, [index, t.works, open]);

  // Arrow keys move between case studies while one is open.
  useEffect(() => {
    if (index < 0) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

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

  const current = index >= 0 ? t.works[index] : null;
  const w = useSticky(current);
  const topLine = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (current && topLine.current && motion.enabled) decode(topLine.current, topLine.current.dataset.text || "", 0.9);
  }, [current]);
  const shownIndex = w ? t.works.findIndex((x) => x.id === w.id) : 0;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="section" id="work" ref={root}>
      <div className="wrap">
        <Label n="03" text={t.labels.work} jp="作品" />
        <div className="work__grid" ref={grid}>
          {t.works.map((item) => <Poster w={item} key={item.id} onOpen={open} />)}
        </div>
      </div>
      <Sheet open={!!current} onClose={close} label={w?.title.join(" ")} className="sheet--case">
        {w && (
          <>
            <div className="sheet__top mono">
              <span ref={topLine} data-text={`${pad(shownIndex + 1)} / ${pad(t.works.length)} · ${w.kind} · ${w.year}`}>{pad(shownIndex + 1)} / {pad(t.works.length)} · {w.kind} · {w.year}</span>
              <button className="sheet__close mono" onClick={close}>{t.sheet.close} ✕</button>
            </div>
            <div className="sheet__body case">
              <div className={`case__cover poster poster--${w.variant}`} aria-hidden="true">
                <div className="poster__meta mono"><span>{w.kind}</span><span>{w.year}</span></div>
                <h3 className="poster__title display">{w.title.map((s) => <span key={s}>{s}</span>)}</h3>
                <span className="poster__jp jp vertical">{w.jp}</span>
                <span className="poster__deco" />
              </div>
              <div className="case__meta mono">
                <span><b>{t.sheet.year}</b> {w.year}</span>
                <span><b>{t.sheet.type}</b> {w.kind}</span>
                <span><b>{t.sheet.role}</b> {w.role.join(" · ")}</span>
              </div>
              <div className="case__block">
                <h4 className="mono muted">{t.sheet.overview}</h4>
                <p className="sheet__long">{w.long}</p>
              </div>
              <div className="case__block">
                <h4 className="mono muted">{t.sheet.did}</h4>
                <ul className="sheet__bullets">{w.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
              </div>
              <div className="case__block">
                <h4 className="mono muted">{t.sheet.deliverables}</h4>
                <ul className="chips">{w.deliverables.map((d) => <li key={d}>{d}</li>)}</ul>
              </div>
              <div className="case__block">
                <h4 className="mono muted">{t.sheet.stack}</h4>
                <ul className="chips chips--stack">{w.stackList.map((d) => <li key={d}>{d}</li>)}</ul>
              </div>
            </div>
            <div className="sheet__foot sheet__foot--case">
              <div className="case__nav">
                <button className="case__navbtn mono" onClick={() => step(-1)} aria-label={t.sheet.prev}>← {t.sheet.prev}</button>
                <button className="case__navbtn mono" onClick={() => step(1)} aria-label={t.sheet.next}>{t.sheet.next} →</button>
              </div>
              {w.href
                ? <a className="btn btn--sm" href={w.href} target="_blank" rel="noreferrer">{t.sheet.open} ↗</a>
                : <span className="mono muted">{t.sheet.private}</span>}
            </div>
          </>
        )}
      </Sheet>
    </section>
  );
}
