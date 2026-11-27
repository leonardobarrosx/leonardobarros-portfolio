import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { gsap, lenisRef, ScrollTrigger, SplitText } from "../lib/gsap";
import { motion, usePrefs } from "../state/prefs";
import { decode } from "../lib/decode";
import { longTitle, shared, type Work as WorkItem } from "../data/content";
import { Scrollbar } from "./Scrollbar";
import { Lightbox } from "./Lightbox";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { shotsFor, type Shot } from "../data/shots";
import { captionFor } from "../data/captions";
import { caseLabels, caseThemes, type CaseTheme } from "../data/caseStudy";
import "../styles/case-study.css";

interface Props {
  works: WorkItem[];
  /** Index of the open case, -1 when closed. */
  index: number;
  /** Where the clicked poster was, so the panel can open out of it (null for deep links). */
  origin: DOMRect | null;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}

const pad = (n: number) => String(n).padStart(2, "0");
/** Breaks the overview at the sentence end nearest its middle, so it reads as two short paragraphs. */
function paragraphs(text: string): string[] {
  if (text.length < 280) return [text];
  const cuts: number[] = [];
  const re = /[.!?]\s+|[。！？]/g;
  for (let m = re.exec(text); m; m = re.exec(text)) cuts.push(m.index + m[0].length);
  const inner = cuts.filter((c) => c < text.length - 1);
  if (!inner.length) return [text];
  const at = inner.reduce((a, b) => (Math.abs(b - text.length / 2) < Math.abs(a - text.length / 2) ? b : a));
  return [text.slice(0, at).trim(), text.slice(at).trim()];
}
const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/** The site's own look, for projects that have no brand of their own yet. */
const SITE_THEME: CaseTheme = {
  bg: "#efe9df", fg: "#141110", muted: "#6f655c", accent: "#e3301c", onAccent: "#ffffff", chrome: "#ffffff", card: "#e6dfd3",
  stage: "#e3301c", onStage: "#141110", dark: "#1e1512", onDark: "#efe9df", accentDark: "#ff8a78",
  palette: ["#e3301c", "#141110", "#efe9df", "#1e1512", "#1fb6a8"],
  fonts: [{ family: "Anton", role: "display", upper: true }, { family: "Inter", weight: 400, role: "ui" }, { family: "IBM Plex Mono", weight: 400, role: "data" }],
};

function themeVars(th: CaseTheme): CSSProperties {
  return {
    "--cs-bg": th.bg, "--cs-fg": th.fg, "--cs-muted": th.muted, "--cs-accent": th.accent,
    "--cs-accent-text": th.accentText ?? th.accent, "--cs-on-accent": th.onAccent, "--cs-chrome": th.chrome,
    "--cs-card": th.card, "--cs-stage": th.stage, "--cs-on-stage": th.onStage, "--cs-dark": th.dark,
    "--cs-on-dark": th.onDark, "--cs-accent-dark": th.accentDark,
  } as CSSProperties;
}

const LOADED_FONTS = new Set<string>();
function loadCaseFonts(query?: string) {
  if (!query || LOADED_FONTS.has(query)) return;
  LOADED_FONTS.add(query);
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${query}&display=swap`;
  document.head.appendChild(link);
}

/** A screenshot in a browser window (or a phone, for mobile captures), the way the Figma presentations frame every screen. */
function Browser({ shot, alt, className = "", eager = false }: { shot: Shot; alt: string; className?: string; eager?: boolean }) {
  if (shot.phone) {
    return (
      <div className={`cs-phone ${className}`}>
        <img src={shot.src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" draggable={false} />
      </div>
    );
  }
  return (
    <div className={`cs-browser ${className}`}>
      <span className="cs-browser__bar" aria-hidden="true"><i /><i /><i /></span>
      <img src={shot.src} alt={alt} loading={eager || shot.motion ? "eager" : "lazy"} decoding="async" draggable={false} />
    </div>
  );
}

/**
 * Full-screen case study in the project's own colours and type, built like the Figma presentations:
 * hero with two tilted mockups, a stage band in the brand colour, the overview, the screens, a dark
 * engineering band, the visual system and a closing call. Prev/next swap the project in place.
 */
export function CaseStudy({ works, index, origin, onClose, onStep }: Props) {
  const work = index >= 0 ? works[index] : null;
  const [shown, setShown] = useState<WorkItem | null>(null);
  const shownIndex = shown ? works.findIndex((w) => w.id === shown.id) : -1;
  const next = shownIndex >= 0 ? works[(shownIndex + 1) % works.length] : null;
  const prev = shownIndex >= 0 ? works[(shownIndex - 1 + works.length) % works.length] : null;
  const { t, lang } = usePrefs();
  const L = caseLabels[lang] ?? caseLabels.en;

  const root = useRef<HTMLDivElement>(null);
  const dim = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const lastId = useRef<string | null>(null);
  const dir = useRef<1 | -1>(1);
  const busy = useRef(false);
  const closing = useRef(false);
  const [copied, setCopied] = useState(false);
  /** The screen open in the lightbox, -1 when none. */
  const [zoom, setZoom] = useState(-1);
  const closeZoom = useCallback(() => setZoom(-1), []);
  useFocusTrap(root, !!shown);

  const copyLink = useCallback(() => {
    if (!shown) return;
    const url = `${location.origin}${location.pathname}#work/${shown.id}`;
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }).catch(() => { /* clipboard blocked */ });
  }, [shown]);

  // Step with a direction-aware exit first, then let the parent swap the project.
  const step = useCallback((d: 1 | -1) => {
    if (busy.current || !body.current) return;
    dir.current = d;
    if (!motion.enabled) { onStep(d); return; }
    busy.current = true;
    gsap.to(body.current, { x: d * -48, opacity: 0, duration: 0.32, ease: "power2.in", onComplete: () => { busy.current = false; onStep(d); } });
  }, [onStep]);

  // Mount on open; on close, play the exit first and unmount after.
  useEffect(() => {
    if (work) { closing.current = false; setShown(work); return; }
    if (!shown || closing.current) return;
    closing.current = true;
    const el = root.current, pn = panel.current;
    const poster = document.querySelector<HTMLElement>(`[data-work="${shown.id}"]`);
    const done = () => { setShown(null); poster?.focus({ preventScroll: true }); };
    if (!motion.enabled || !el || !pn) { done(); return; }
    const tl = gsap.timeline({ onComplete: done });
    const target = poster?.getBoundingClientRect();
    tl.to(".case__bar, .cs-body", { opacity: 0, duration: 0.25 }, 0);
    if (target && target.bottom > 0 && target.top < window.innerHeight) {
      // the panel folds back into the poster it came from
      tl.to(pn, { clipPath: insetFor(pn, target), duration: 0.7, ease: "power4.inOut" }, 0.05)
        .to(dim.current, { opacity: 0, duration: 0.45 }, 0.3)
        .to(pn, { opacity: 0, duration: 0.18 }, 0.62);
    } else {
      tl.to(pn, { y: 40, opacity: 0, duration: 0.4, ease: "power2.in" }, 0)
        .to(dim.current, { opacity: 0, duration: 0.4 }, 0.1);
    }
    return () => { tl.kill(); };
  }, [work, shown]);

  // Lock the page behind the case while it is up.
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

  useEffect(() => { if (shown) loadCaseFonts(caseThemes[shown.id]?.load); }, [shown]);
  useEffect(() => { setZoom(-1); }, [shown?.id]);

  // Open / switch animation, then the scroll-driven reveals inside the panel.
  useLayoutEffect(() => {
    const el = root.current, pn = panel.current, b = body.current;
    if (!shown || !el || !pn || !b) return;
    const switching = lastId.current !== null && lastId.current !== shown.id;
    lastId.current = shown.id;
    pn.scrollTop = 0;
    closeBtn.current?.focus({ preventScroll: true });
    if (!motion.enabled) { gsap.set([pn, dim.current, b, ".case__bar"], { clearProps: "all" }); return; }

    const ctx = gsap.context(() => {
      // a reopen can interrupt the exit: start from clean inline styles
      gsap.set([pn, dim.current, b, ".case__bar"], { clearProps: "all" });
      const split = new SplitText(el.querySelectorAll(".cs-hero__title .line"), { type: "words,chars", charsClass: "char" });
      const d = dir.current;
      const tl = gsap.timeline();
      let at = 0;
      if (switching) {
        tl.fromTo(b, { x: d * 56, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: "power3.out", clearProps: "transform,opacity" }, 0);
      } else {
        at = 0.45;
        tl.fromTo(dim.current, { opacity: 0 }, { opacity: 1, duration: 0.45, clearProps: "opacity" }, 0)
          .fromTo(".case__bar", { opacity: 0 }, { opacity: 1, duration: 0.5, clearProps: "opacity" }, 0.45);
        if (origin) {
          // the panel opens out of the poster that was clicked
          tl.fromTo(pn, { clipPath: insetFor(pn, origin) }, { clipPath: "inset(0px 0px 0px 0px round 6px)", duration: 0.9, ease: "power4.inOut", clearProps: "clipPath" }, 0);
        } else {
          tl.fromTo(pn, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", clearProps: "all" }, 0.05);
        }
      }
      // hero: the title rises letter by letter, the copy follows, the mockups drop in tilted
      tl.from(split.chars, { yPercent: 110, rotate: 3, duration: 1, ease: "power4.out", stagger: 0.025 }, at)
        .from(".cs-hero__tag, .cs-hero__kind, .cs-hero__desc, .cs-hero__cta", { y: 24, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.07 }, at + 0.2)
        .from(".cs-hero__shots > *", { y: 140, opacity: 0, rotate: 0, duration: 1.2, ease: "expo.out", stagger: 0.12 }, at + 0.1)
        .fromTo(".cs-hero__meta", { "--w": 0 }, { "--w": 1, duration: 1, ease: "power3.inOut" }, at + 0.3)
        .from(".cs-hero__meta > div", { y: 16, opacity: 0, duration: 0.6, ease: "power3.out", stagger: 0.06 }, at + 0.45);
      if (bar.current) tl.add(decode(bar.current, bar.current.dataset.text || "", 0.9), switching ? 0 : 0.5);

      const sc = { scroller: pn };
      // hero mockups drift apart as the page scrolls past them
      gsap.to(".cs-hero__shots > :first-child", { yPercent: -10, ease: "none", scrollTrigger: { ...sc, trigger: ".cs-hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".cs-hero__shots > :nth-child(2)", { yPercent: 14, ease: "none", scrollTrigger: { ...sc, trigger: ".cs-hero", start: "top top", end: "bottom top", scrub: true } });
      // stage: the window grows into place and the kanji slides behind it
      gsap.fromTo(".cs-stage .cs-browser", { scale: 0.84, y: 60 }, { scale: 1, y: 0, ease: "none", scrollTrigger: { ...sc, trigger: ".cs-stage", start: "top bottom", end: "center center", scrub: 0.6 } });
      gsap.fromTo(".cs-stage__jp", { xPercent: -12 }, { xPercent: 8, ease: "none", scrollTrigger: { ...sc, trigger: ".cs-stage", start: "top bottom", end: "bottom top", scrub: true } });
      // section heads, paragraphs and closing lines rise once as they come in
      gsap.utils.toArray<HTMLElement>(".cs-reveal", el).forEach((node) => {
        gsap.from(node, { y: 40, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { ...sc, trigger: node, start: "top 90%", once: true } });
      });
      // screens unmask from the bottom and settle their zoom
      gsap.utils.toArray<HTMLElement>(".cs-shots figure", el).forEach((fig, i) => {
        gsap.timeline({ scrollTrigger: { ...sc, trigger: fig, start: "top 92%", once: true } })
          .from(fig, { clipPath: "inset(18% 0% 0% 0%)", y: 50, opacity: 0, duration: 1, ease: "power3.out", delay: (i % 2) * 0.1 })
          .from(fig.querySelector("img"), { scale: 1.08, duration: 1.4, ease: "power3.out" }, "<");
      });
      // engineering rows draw their rule, then the number and text slide in
      gsap.utils.toArray<HTMLElement>(".cs-eng__list li", el).forEach((li) => {
        gsap.timeline({ scrollTrigger: { ...sc, trigger: li, start: "top 90%", once: true } })
          .fromTo(li, { "--w": 0 }, { "--w": 1, duration: 0.9, ease: "power3.inOut" })
          .from(li.children, { x: -24, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.08 }, 0.15);
      });
      gsap.utils.toArray<HTMLElement>(".cs-chips", el).forEach((list) => {
        gsap.from(list.children, { scale: 0.8, opacity: 0, duration: 0.5, ease: "back.out(1.8)", stagger: 0.03, scrollTrigger: { ...sc, trigger: list, start: "top 92%", once: true } });
      });
      gsap.from(".cs-swatch", { scaleY: 0, transformOrigin: "50% 100%", duration: 0.9, ease: "expo.out", stagger: 0.07, scrollTrigger: { ...sc, trigger: ".cs-palette", start: "top 88%", once: true } });
      gsap.from(".cs-font", { y: 50, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.1, scrollTrigger: { ...sc, trigger: ".cs-fonts", start: "top 90%", once: true } });
      ScrollTrigger.refresh();
    }, el);
    return () => ctx.revert();
  }, [shown, origin]);

  if (!shown) return null;
  const w = shown;
  const n = shownIndex;
  const th = caseThemes[w.id] ?? SITE_THEME;
  const shots = shotsFor(w.id);
  const still = shots.filter((s) => !s.motion);
  const wide = still.filter((s) => !s.phone);
  const pick = (name?: string, fallback = 0) => (name && still.find((s) => s.name === name)) || still[fallback] || shots[0];
  const heroA = still.length ? pick(th.heroA, 0) : undefined;
  const heroB = still.length > 1 ? pick(th.heroB, 1) : undefined;
  const stage = wide.length ? (wide.find((s) => s.name === th.stageShot) ?? wide[0]) : undefined;
  const alt = (s: Shot, i: number) => captionFor(w.id, s.name, lang) ?? `${w.title.join(" ")} — ${i + 1}/${shots.length}`;
  const fontName = (f: NonNullable<CaseTheme["fonts"]>[number]) => f.family === "system-ui" ? "System UI" : f.family;
  const fontLabel = { display: L.display, ui: L.ui, data: L.data };
  const counter = `${pad(n + 1)} / ${pad(works.length)} · ${w.kind} · ${w.year}`;

  return (
    <div className="case cs" ref={root} style={themeVars(th)} data-lenis-prevent role="dialog" aria-modal="true" aria-label={w.title.join(" ")}>
      {/* the page shows through around the panel; clicking it closes, like the ✕ */}
      <div className="case__dim" ref={dim} onClick={onClose} data-cursor="close" aria-hidden="true" />
      <div className="case__panel" ref={panel}>
        <div className="case__bar mono">
          <span ref={bar} data-text={counter} aria-hidden="true">{counter}</span>
          <span className="sr-only">{counter}</span>
          <span className="case__bar-title" aria-hidden="true">{w.title.join(" ")}</span>
          <span className="case__bar-right">
            <span className="case__keys"><button type="button" onClick={() => step(-1)} aria-label={t.sheet.prev}>←</button><button type="button" onClick={() => step(1)} aria-label={t.sheet.next}>→</button></span>
            <button type="button" className="case__copy" onClick={copyLink} data-cursor="link">{copied ? `${t.contact.copied} ✓` : t.sheet.copy}</button>
            <button type="button" className="case__close" onClick={onClose} ref={closeBtn} data-cursor="link">{t.sheet.close} ✕</button>
          </span>
        </div>

        <div className="cs-body" ref={body} key={w.id}>
          {/* Hero */}
          <header className={`cs-hero${heroA ? "" : " cs-hero--text"}`}>
            <div className="cs-hero__top mono"><span>{shared.name} — {L.study} {pad(n + 1)}</span><span>{w.kind} · {w.year}</span></div>
            <div className="cs-hero__grid">
              <div className="cs-hero__copy">
                <span className="cs-hero__tag mono">{w.role[0] ?? L.study}</span>
                <h2 className={`cs-hero__title display${longTitle(w.title) ? " cs-hero__title--long" : ""}`}>{w.title.map((s) => <span className="line" key={s}>{s}</span>)}</h2>
                <p className="cs-hero__kind serif-i">{w.kind}</p>
                <p className="cs-hero__desc">{w.desc}</p>
                <div className="cs-hero__cta">
                  {w.href && <a className="cs-btn cs-btn--solid" href={w.href} target="_blank" rel="noreferrer" data-cursor="link">{t.sheet.open} ↗</a>}
                  {w.repo && <a className="cs-btn" href={w.repo} target="_blank" rel="noreferrer" data-cursor="link">{t.sheet.code} ↗</a>}
                  {w.href && <span className="mono cs-host">{host(w.href)}</span>}
                  {!w.href && !w.repo && <span className="mono cs-host">{t.sheet.private}</span>}
                </div>
              </div>
              {heroA && (
                <div className="cs-hero__shots" aria-hidden="true">
                  <Browser shot={heroA} alt="" className="cs-browser--a" eager />
                  {heroB && <Browser shot={heroB} alt="" className={heroB.phone ? "cs-phone--b" : "cs-browser--b"} eager />}
                </div>
              )}
            </div>
            <dl className="cs-hero__meta">
              <div><dt className="mono">{t.sheet.year}</dt><dd>{w.year}</dd></div>
              <div><dt className="mono">{t.sheet.type}</dt><dd>{w.kind}</dd></div>
              <div><dt className="mono">{t.sheet.role}</dt><dd>{w.role.join(" · ")}</dd></div>
              <div><dt className="mono">{t.sheet.stack}</dt><dd>{w.stack}</dd></div>
            </dl>
          </header>

          {/* Stage */}
          {stage && (
            <section className="cs-stage" aria-label={w.title.join(" ")}>
              <span className="cs-stage__jp jp" aria-hidden="true">{w.jp}</span>
              <button type="button" className="cs-shot cs-shot--stage" onClick={() => setZoom(shots.indexOf(stage))} data-cursor="view" aria-label={alt(stage, shots.indexOf(stage))}><Browser shot={stage} alt={alt(stage, still.indexOf(stage))} /></button>
            </section>
          )}

          {/* Overview */}
          <section className="cs-sec cs-overview">
            <div className="cs-head cs-reveal"><span className="mono">{t.sheet.overview}</span></div>
            <div className="cs-overview__body">
              <p className="cs-overview__lead serif-i cs-reveal">{w.desc}</p>
              <div className="cs-overview__text">{paragraphs(w.long).map((para) => <p className="cs-reveal" key={para}>{para}</p>)}</div>
            </div>
          </section>

          {/* Screens */}
          {shots.length > 0 && (
            <section className="cs-sec cs-screens">
              <div className="cs-head cs-reveal"><span className="mono">{t.sheet.screens}</span><h3 className="display">{L.screensTitle}</h3></div>
              <div className="cs-shots">
                {shots.map((s, i) => {
                  const caption = captionFor(w.id, s.name, lang);
                  return (
                    <figure key={s.src} className={s.motion ? "is-motion" : s.phone ? "is-phone" : undefined}>
                      <button type="button" className="cs-shot" onClick={() => setZoom(i)} data-cursor="view" aria-label={`${t.sheet.screens} ${pad(i + 1)} — ${alt(s, i)}`}><Browser shot={s} alt={alt(s, i)} /></button>
                      {caption && <figcaption><span className="mono">{pad(i + 1)}</span>{caption}</figcaption>}
                    </figure>
                  );
                })}
              </div>
            </section>
          )}

          {/* Engineering */}
          <section className="cs-eng">
            <div className="cs-head cs-reveal"><span className="mono">{L.engineering}</span><h3 className="display">{L.engTitle}</h3></div>
            <ol className="cs-eng__list">
              {w.highlights.map((h, i) => <li key={h}><span className="display">{pad(i + 1)}</span><p>{h}</p></li>)}
            </ol>
            <div className="cs-eng__cols">
              <div><h4 className="mono">{t.sheet.deliverables}</h4><ul className="cs-chips">{w.deliverables.map((d) => <li key={d}>{d}</li>)}</ul></div>
              <div><h4 className="mono">{t.sheet.stack}</h4><ul className="cs-chips cs-chips--mono">{w.stackList.map((d) => <li key={d}>{d}</li>)}</ul></div>
            </div>
          </section>

          {/* Visual system */}
          <section className="cs-sec cs-visual">
            <div className="cs-head cs-reveal"><span className="mono">{L.visual}</span><h3 className="display">{L.visualTitle}</h3></div>
            <ul className="cs-palette">
              {th.palette.map((c) => <li key={c}><span className="cs-swatch" style={{ background: c }} /><span className="mono">{c.toUpperCase()}</span></li>)}
            </ul>
            {th.fonts && th.fonts.length > 0 && (
              <ul className="cs-fonts">
                {th.fonts.map((f) => (
                  <li className="cs-font" key={`${f.family}-${f.weight ?? 400}-${f.role}`}>
                    <span className="cs-font__aa" style={{ fontFamily: f.family === "system-ui" ? "system-ui, sans-serif" : `"${f.family}", var(--font-body)`, fontWeight: f.weight ?? 400, textTransform: f.upper ? "uppercase" : undefined }}>Aa</span>
                    <span className="cs-font__name">{fontName(f)}{f.weight ? ` ${f.weight}` : ""}</span>
                    <span className="mono">{fontLabel[f.role]}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Closing */}
          <section className="cs-close">
            <p className="cs-close__title display cs-reveal">{L.closeTitle}</p>
            <p className="cs-close__note serif-i cs-reveal">{L.closeNote}</p>
            <div className="cs-close__cta cs-reveal">
              <a className="cs-btn cs-btn--solid" href={`mailto:${shared.email}`} data-cursor="link">{L.email}</a>
              <a className="cs-btn" href={shared.linkedin} target="_blank" rel="noreferrer" data-cursor="link">LinkedIn ↗</a>
            </div>
            {next && prev && (
              <div className="cs-close__nav">
                <button type="button" className="cs-prev mono" onClick={() => step(-1)} data-cursor="link">← {t.sheet.prev} · {prev.title.join(" ")}</button>
                <button type="button" className="cs-next" onClick={() => step(1)} data-cursor="view" aria-label={`${L.next}: ${next.title.join(" ")}`}>
                  <span className="mono">{L.next} — {pad((n + 1) % works.length + 1)} / {pad(works.length)}</span>
                  <span className="cs-next__title display">{next.title.join(" ")} →</span>
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
      <Scrollbar target={panel} className="sb--case" />
      <Lightbox
        shots={shots}
        index={zoom}
        title={w.title.join(" ")}
        alt={alt}
        caption={(s) => captionFor(w.id, s.name, lang)}
        labels={{ prev: t.sheet.prev, next: t.sheet.next, close: t.sheet.close }}
        onIndex={setZoom}
        onClose={closeZoom}
      />
    </div>
  );
}

/** clip-path inset that crops the panel down to a viewport rectangle (the poster). */
function insetFor(pn: HTMLElement, r: DOMRect): string {
  const p = pn.getBoundingClientRect();
  const top = Math.max(0, r.top - p.top), left = Math.max(0, r.left - p.left);
  const right = Math.max(0, p.right - r.right), bottom = Math.max(0, p.bottom - r.bottom);
  return `inset(${top}px ${right}px ${bottom}px ${left}px round 6px)`;
}
