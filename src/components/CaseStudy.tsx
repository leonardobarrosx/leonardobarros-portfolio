import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, lenisRef, SplitText } from "../lib/gsap";
import { motion, usePrefs } from "../state/prefs";
import { decode } from "../lib/decode";
import type { Work as WorkItem } from "../data/content";

interface Props {
  works: WorkItem[];
  /** Index of the open case, -1 when closed. */
  index: number;
  /** Where the clicked poster was, so the cover can grow out of it (null for deep links). */
  origin: DOMRect | null;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Full-screen case study. The poster's cover grows into the page header, the title reveals letter by
 * letter, and the rest of the spread fades in as it scrolls. Prev/next crossfade inside the same page.
 */
export function CaseStudy({ works, index, origin, onClose, onStep }: Props) {
  const work = index >= 0 ? works[index] : null;
  const [shown, setShown] = useState<WorkItem | null>(null);
  const shownIndex = shown ? works.findIndex((w) => w.id === shown.id) : -1;
  const next = shownIndex >= 0 ? works[(shownIndex + 1) % works.length] : null;
  const prev = shownIndex >= 0 ? works[(shownIndex - 1 + works.length) % works.length] : null;
  const { t } = usePrefs();

  const root = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLDivElement>(null);
  const slot = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const lastId = useRef<string | null>(null);
  const closing = useRef(false);

  // Mount on open; on close, play the exit first and unmount after.
  useEffect(() => {
    if (work) { closing.current = false; setShown(work); return; }
    if (!shown || closing.current) return;
    closing.current = true;
    const el = root.current, h = hero.current;
    const poster = document.querySelector<HTMLElement>(`[data-work="${shown.id}"]`);
    const done = () => { setShown(null); poster?.focus({ preventScroll: true }); };
    if (!motion.enabled || !el || !h) { done(); return; }
    const tl = gsap.timeline({ onComplete: done });
    const target = poster?.getBoundingClientRect();
    const barEl = el.querySelector(".case__bar");
    if (target && el.scrollTop < 240) {
      // shrink the cover back into its poster while the spread fades away
      const from = h.getBoundingClientRect();
      gsap.set(h, { position: "fixed", top: from.top, left: from.left, width: from.width, height: from.height, zIndex: 3 });
      tl.to(h.querySelector(".case__heroin"), { opacity: 0, duration: 0.25 }, 0)
        .to(h, { top: target.top, left: target.left, width: target.width, height: target.height, duration: 0.7, ease: "power4.inOut" }, 0.05)
        .to([page.current, barEl], { opacity: 0, duration: 0.35 }, 0)
        .to(el, { backgroundColor: "rgba(0,0,0,0)", duration: 0.5 }, 0.2)
        .to(h, { opacity: 0, duration: 0.2 }, 0.62);
    } else {
      tl.to(el, { opacity: 0, duration: 0.4, ease: "power2.in" });
    }
    return () => { tl.kill(); };
  }, [work, shown]);

  // Lock the page behind the spread while it is up.
  useEffect(() => {
    if (!shown) return;
    document.body.classList.add("is-locked");
    lenisRef.current?.stop();
    return () => { document.body.classList.remove("is-locked"); lenisRef.current?.start(); };
  }, [shown]);

  useEffect(() => {
    if (!shown) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shown, onClose]);

  // Open / switch animation.
  useLayoutEffect(() => {
    const el = root.current, h = hero.current, s = slot.current, p = page.current;
    if (!shown || !el || !h || !s || !p) return;
    const switching = lastId.current !== null && lastId.current !== shown.id;
    lastId.current = shown.id;
    el.scrollTop = 0;
    closeBtn.current?.focus({ preventScroll: true });

    // reveals inside the scroller
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }), { root: el, threshold: 0.12 });
    el.querySelectorAll("[data-cr]").forEach((n) => io.observe(n));

    if (!motion.enabled) {
      el.querySelectorAll("[data-cr]").forEach((n) => n.classList.add("is-in"));
      gsap.set([el, p, h, ".case__heroin"], { clearProps: "all" });
      return () => io.disconnect();
    }

    const ctx = gsap.context(() => {
      // a reopen can interrupt the exit: start from clean inline styles
      gsap.set([el, p, h, ".case__bar", ".case__heroin"], { clearProps: "all" });
      const title = h.querySelector<HTMLElement>(".case__title")!;
      const split = new SplitText(title.querySelectorAll(".line"), { type: "chars", charsClass: "char" });
      const tl = gsap.timeline();
      if (switching) {
        tl.fromTo(p, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", clearProps: "all" }, 0.1)
          .fromTo(".case__heroin", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0);
      } else {
        tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.35 }, 0)
          .fromTo(p, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", clearProps: "all" }, 0.55)
          .fromTo(".case__heroin", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.55);
        const to = s.getBoundingClientRect();
        if (origin) {
          // the cover grows out of the poster into the header slot
          gsap.set(h, { position: "fixed", top: origin.top, left: origin.left, width: origin.width, height: origin.height, zIndex: 3 });
          tl.to(h, { top: to.top, left: to.left, width: to.width, height: to.height, duration: 0.95, ease: "power4.inOut", onComplete: () => gsap.set(h, { clearProps: "position,top,left,width,height,zIndex" }) }, 0);
        } else {
          tl.fromTo(h, { scale: 0.96, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out", clearProps: "all" }, 0.1);
        }
      }
      tl.from(split.chars, { yPercent: 110, rotate: 2, duration: 1, ease: "power4.out", stagger: 0.025 }, switching ? 0.05 : 0.6)
        .from(".case__roles > *", { y: 10, opacity: 0, duration: 0.5, stagger: 0.05 }, switching ? 0.3 : 0.9);
      if (bar.current) tl.add(decode(bar.current, bar.current.dataset.text || "", 0.9), switching ? 0 : 0.5);
    }, el);
    return () => { io.disconnect(); ctx.revert(); };
  }, [shown, origin]);

  if (!shown) return null;
  const w = shown;
  const n = shownIndex;
  const roleLine = w.role.join(" · ");

  return (
    <div className="case" ref={root} role="dialog" aria-modal="true" aria-label={w.title.join(" ")}>
      <div className="case__bar mono">
        <span ref={bar} data-text={`${pad(n + 1)} / ${pad(works.length)} · ${w.kind} · ${w.year}`}>{pad(n + 1)} / {pad(works.length)} · {w.kind} · {w.year}</span>
        <span className="case__bar-title" aria-hidden="true">{w.title.join(" ")}</span>
        <span className="case__bar-right">
          <span className="case__keys" aria-hidden="true">← →</span>
          <button type="button" className="case__close" onClick={onClose} ref={closeBtn} data-cursor="link">{t.sheet.close} ✕</button>
        </span>
      </div>

      <div className="case__slot wrap" ref={slot}>
        <div className={`case__hero poster poster--${w.variant}`} ref={hero}>
          <span className="poster__deco" aria-hidden="true" />
          <span className="poster__jp jp vertical case__jp" aria-hidden="true">{w.jp}</span>
          <div className="case__heroin">
            <div className="poster__meta mono"><span>{w.kind}</span><span>{w.year}</span></div>
            <h2 className="case__title display">{w.title.map((s) => <span className="line" key={s}>{s}</span>)}</h2>
            <ul className="case__roles mono">{w.role.map((r) => <li key={r}>{r}</li>)}</ul>
          </div>
        </div>
      </div>

      <div className="case__page" ref={page}>
        <dl className="case__facts wrap mono">
          <div><dt>{t.sheet.year}</dt><dd>{w.year}</dd></div>
          <div><dt>{t.sheet.type}</dt><dd>{w.kind}</dd></div>
          <div><dt>{t.sheet.role}</dt><dd>{roleLine}</dd></div>
          <div><dt>{t.sheet.stack}</dt><dd>{w.stack}</dd></div>
        </dl>

        <div className="case__body wrap">
          <section className="case__sec" data-cr>
            <h4 className="mono"><span>01</span>{t.sheet.overview}</h4>
            <div className="case__text">
              <p className="case__lead serif-i">{w.desc}</p>
              <p className="case__long">{w.long}</p>
            </div>
          </section>
          <section className="case__sec" data-cr>
            <h4 className="mono"><span>02</span>{t.sheet.did}</h4>
            <ol className="case__list">
              {w.highlights.map((h, i) => <li key={h}><span className="mono">{pad(i + 1)}</span><p>{h}</p></li>)}
            </ol>
          </section>
          <section className="case__sec case__sec--split" data-cr>
            <h4 className="mono"><span>03</span>{t.sheet.deliverables}</h4>
            <ul className="chips">{w.deliverables.map((d) => <li key={d}>{d}</li>)}</ul>
            <h4 className="mono"><span>04</span>{t.sheet.stack}</h4>
            <ul className="chips chips--stack">{w.stackList.map((d) => <li key={d}>{d}</li>)}</ul>
          </section>
          <div className="case__cta" data-cr>
            {w.href
              ? <a className="btn" href={w.href} target="_blank" rel="noreferrer" data-cursor="link">{t.sheet.open} ↗</a>
              : <span className="mono muted">{t.sheet.private}</span>}
          </div>
        </div>

        {next && prev && (
          <div className="case__foot">
            <button type="button" className="case__prev mono" onClick={() => onStep(-1)} data-cursor="link">← {t.sheet.prev} · {prev.title.join(" ")}</button>
            <button type="button" className={`case__next poster--${next.variant}`} onClick={() => onStep(1)} data-cursor="view" aria-label={`${t.sheet.next}: ${next.title.join(" ")}`}>
              <span className="mono">{t.sheet.next} — {pad((n + 1) % works.length + 1)} / {pad(works.length)}</span>
              <span className="case__next-title display">{next.title.join(" ")}</span>
              <span className="case__next-jp jp" aria-hidden="true">{next.jp}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
