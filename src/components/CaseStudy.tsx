import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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
 * Full-screen case study: the poster grows into a cover that stays pinned on the left while the
 * spread (facts, overview, highlights, deliverables, stack, next project) scrolls on the right.
 * Prev/next slide the spread sideways in place; the cover keeps its shape and changes colour.
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
  const main = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const lastId = useRef<string | null>(null);
  const dir = useRef<1 | -1>(1);
  const busy = useRef(false);
  const closing = useRef(false);

  // Step with a direction-aware exit first, then let the parent swap the project.
  const step = useCallback((d: 1 | -1) => {
    if (busy.current || !main.current) return;
    dir.current = d;
    if (!motion.enabled) { onStep(d); return; }
    busy.current = true;
    gsap.timeline({ onComplete: () => { busy.current = false; onStep(d); } })
      .to(main.current, { x: d * -36, opacity: 0, duration: 0.3, ease: "power2.in" }, 0)
      .to(".case__heroin, .case__hero .poster__deco, .case__jp", { opacity: 0, duration: 0.25 }, 0);
  }, [onStep]);

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
    if (target && target.bottom > -200 && target.top < window.innerHeight + 200) {
      // the cover shrinks back into its poster while the spread fades away
      const from = h.getBoundingClientRect();
      gsap.set(h, { position: "fixed", top: from.top, left: from.left, width: from.width, height: from.height, zIndex: 3, margin: 0 });
      tl.to(".case__heroin", { opacity: 0, duration: 0.2 }, 0)
        .to([main.current, ".case__bar", ".case__cta"], { opacity: 0, duration: 0.3 }, 0)
        .to(h, { top: target.top, left: target.left, width: target.width, height: target.height, duration: 0.7, ease: "power4.inOut" }, 0.05)
        .to(el, { backgroundColor: "rgba(0,0,0,0)", duration: 0.45, ease: "power2.in" }, 0.25)
        .to(h, { opacity: 0, duration: 0.18 }, 0.64);
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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shown, onClose, step]);

  // The cover's deco and kanji drift with the spread's scroll.
  useEffect(() => {
    const el = root.current, h = hero.current;
    if (!shown || !el || !h || !motion.enabled) return;
    const onScroll = () => h.style.setProperty("--p", Math.min(1, el.scrollTop / 900).toFixed(3));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [shown]);

  // Open / switch animation.
  useLayoutEffect(() => {
    const el = root.current, h = hero.current, s = slot.current, m = main.current;
    if (!shown || !el || !h || !s || !m) return;
    const switching = lastId.current !== null && lastId.current !== shown.id;
    lastId.current = shown.id;
    el.scrollTop = 0;
    h.style.setProperty("--p", "0");
    closeBtn.current?.focus({ preventScroll: true });
    if (!motion.enabled) { gsap.set([el, m, h, ".case__bar", ".case__cta", ".case__heroin"], { clearProps: "all" }); return; }

    const ctx = gsap.context(() => {
      // a reopen can interrupt the exit: start from clean inline styles
      gsap.set([el, m, h, ".case__bar", ".case__cta", ".case__heroin", ".case__hero .poster__deco", ".case__jp"], { clearProps: "all" });
      const split = new SplitText(h.querySelectorAll(".case__title .line"), { type: "chars", charsClass: "char" });
      const d = dir.current;
      const tl = gsap.timeline();
      let at = 0; // when the content starts coming in
      if (switching) {
        tl.fromTo(m, { x: d * 48, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: "power3.out", clearProps: "transform,opacity" }, 0)
          .fromTo([".case__hero .poster__deco", ".case__jp", ".case__heroin"], { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: 0.05, clearProps: "opacity" }, 0.05);
      } else {
        at = 0.5;
        tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.35, clearProps: "opacity" }, 0)
          .fromTo(".case__heroin", { opacity: 0 }, { opacity: 1, duration: 0.3, clearProps: "opacity" }, 0.55)
          .fromTo(".case__cta", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, clearProps: "all" }, 1);
        const to = s.getBoundingClientRect();
        if (origin) {
          // the cover grows out of the poster into its slot
          gsap.set(h, { position: "fixed", top: origin.top, left: origin.left, width: origin.width, height: origin.height, zIndex: 3, margin: 0 });
          tl.to(h, { top: to.top, left: to.left, width: to.width, height: to.height, duration: 0.95, ease: "power4.inOut", onComplete: () => gsap.set(h, { clearProps: "position,top,left,width,height,zIndex,margin" }) }, 0);
        } else {
          tl.fromTo(h, { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out", clearProps: "all" }, 0.1);
        }
      }
      // spread: blocks slide in with a soft blur, hairlines draw, rows and chips follow
      tl.fromTo(m.children, { x: 40, opacity: 0, filter: "blur(8px)" }, { x: 0, opacity: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out", stagger: 0.07, clearProps: "all" }, at)
        .fromTo(".case__facts div", { "--w": 0 }, { "--w": 1, duration: 0.9, ease: "power3.inOut", stagger: 0.06 }, at + 0.1)
        .from(".case__list li", { y: 14, opacity: 0, duration: 0.6, ease: "power3.out", stagger: 0.06 }, at + 0.35)
        .from(".case__main .chips li", { scale: 0.86, opacity: 0, duration: 0.5, ease: "back.out(1.8)", stagger: 0.025 }, at + 0.45)
        .from(split.chars, { yPercent: 110, rotate: 2, duration: 1, ease: "power4.out", stagger: 0.03 }, switching ? 0.1 : 0.6)
        .from(".case__roles > *", { y: 10, opacity: 0, duration: 0.5, stagger: 0.05 }, switching ? 0.35 : 0.9);
      if (bar.current) tl.add(decode(bar.current, bar.current.dataset.text || "", 0.9), switching ? 0 : 0.5);
    }, el);
    return () => ctx.revert();
  }, [shown, origin]);

  if (!shown) return null;
  const w = shown;
  const n = shownIndex;

  return (
    <div className="case" ref={root} data-lenis-prevent role="dialog" aria-modal="true" aria-label={w.title.join(" ")}>
      <div className="case__bar mono">
        <span ref={bar} data-text={`${pad(n + 1)} / ${pad(works.length)} · ${w.kind} · ${w.year}`}>{pad(n + 1)} / {pad(works.length)} · {w.kind} · {w.year}</span>
        <span className="case__bar-title" aria-hidden="true">{w.title.join(" ")}</span>
        <span className="case__bar-right">
          <span className="case__keys" aria-hidden="true"><button type="button" onClick={() => step(-1)} aria-label={t.sheet.prev}>←</button><button type="button" onClick={() => step(1)} aria-label={t.sheet.next}>→</button></span>
          <button type="button" className="case__close" onClick={onClose} ref={closeBtn} data-cursor="link">{t.sheet.close} ✕</button>
        </span>
      </div>

      <div className="case__grid wrap">
        <aside className="case__side">
          <div className="case__slot" ref={slot}>
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
          <div className="case__cta">
            {w.href
              ? <a className="btn btn--sm" href={w.href} target="_blank" rel="noreferrer" data-cursor="link">{t.sheet.open} ↗</a>
              : <span className="mono muted">{t.sheet.private}</span>}
          </div>
        </aside>

        <div className="case__main" ref={main}>
          <dl className="case__facts mono">
            <div><dt>{t.sheet.year}</dt><dd>{w.year}</dd></div>
            <div><dt>{t.sheet.type}</dt><dd>{w.kind}</dd></div>
            <div><dt>{t.sheet.role}</dt><dd>{w.role.join(" · ")}</dd></div>
            <div><dt>{t.sheet.stack}</dt><dd>{w.stack}</dd></div>
          </dl>
          <section className="case__sec">
            <h4 className="mono"><span>01</span>{t.sheet.overview}</h4>
            <p className="case__lead serif-i">{w.desc}</p>
            <p className="case__long">{w.long}</p>
          </section>
          <section className="case__sec">
            <h4 className="mono"><span>02</span>{t.sheet.did}</h4>
            <ol className="case__list">
              {w.highlights.map((h, i) => <li key={h}><span className="mono">{pad(i + 1)}</span><p>{h}</p></li>)}
            </ol>
          </section>
          <section className="case__sec">
            <h4 className="mono"><span>03</span>{t.sheet.deliverables}</h4>
            <ul className="chips">{w.deliverables.map((d) => <li key={d}>{d}</li>)}</ul>
          </section>
          <section className="case__sec">
            <h4 className="mono"><span>04</span>{t.sheet.stack}</h4>
            <ul className="chips chips--stack">{w.stackList.map((d) => <li key={d}>{d}</li>)}</ul>
          </section>
          {next && prev && (
            <div className="case__foot">
              <button type="button" className="case__prev mono" onClick={() => step(-1)} data-cursor="link">← {t.sheet.prev} · {prev.title.join(" ")}</button>
              <button type="button" className={`case__next poster--${next.variant}`} onClick={() => step(1)} data-cursor="view" aria-label={`${t.sheet.next}: ${next.title.join(" ")}`}>
                <span className="mono">{t.sheet.next} — {pad((n + 1) % works.length + 1)} / {pad(works.length)}</span>
                <span className="case__next-title display">{next.title.join(" ")}</span>
                <span className="case__next-jp jp" aria-hidden="true">{next.jp}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
