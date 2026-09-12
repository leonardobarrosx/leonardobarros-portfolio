import { useLayoutEffect, useRef, useState } from "react";
import { useProximity } from "../hooks/useProximity";
import { gsap, SplitText, scrollToHash } from "../lib/gsap";
import { motion, usePrefs } from "../state/prefs";
import { useReveal } from "../hooks/useReveal";
import { Label } from "./Label";
import { shared } from "../data/content";
import { Landmarks } from "./Landmarks";

export function Contact() {
  const { t } = usePrefs();
  const root = useRef<HTMLElement>(null);
  const btn = useRef<HTMLAnchorElement>(null);
  const [copied, setCopied] = useState(false);
  const title = useRef<HTMLHeadingElement>(null);
  useReveal(root);
  useProximity(title, ".char", true, 220);

  useLayoutEffect(() => {
    if (!root.current || !motion.enabled) return;
    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray<HTMLElement>(".contact__title .line").flatMap((l) => new SplitText(l, { type: "chars", charsClass: "char" }).chars);
      gsap.from(chars, { yPercent: 110, duration: 1.1, ease: "power4.out", stagger: 0.02, scrollTrigger: { trigger: ".contact__title", start: "top 82%", once: true }, onComplete: () => title.current?.classList.add("is-live") });
    }, root);
    return () => ctx.revert();
  }, [t]);

  const onMove = (e: React.PointerEvent) => {
    if (!motion.enabled || !btn.current) return;
    const r = btn.current.getBoundingClientRect();
    gsap.to(btn.current, { x: (e.clientX - (r.left + r.width / 2)) * 0.22, y: (e.clientY - (r.top + r.height / 2)) * 0.22, duration: 0.5, ease: "power3.out" });
  };
  const onLeave = () => btn.current && gsap.to(btn.current, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });

  const copy = async () => {
    try { await navigator.clipboard.writeText(shared.email); setCopied(true); window.setTimeout(() => setCopied(false), 1800); } catch { /* clipboard blocked */ }
  };

  const year = new Date().getFullYear();
  return (
    <section className="section section--dark" id="contact" ref={root}>
      <div className="wrap">
        <Label n="07" text={t.labels.contact} jp="連絡" />
        <div className="grid">
          <h2 className="contact__title display" ref={title}>
            <span className="line">{t.contact.title[0]}</span>
            <span className="line">{t.contact.title[1]}</span>
          </h2>
          <div className="contact__jp jp" data-reveal>{t.contact.jp}</div>
          <p className="contact__note" data-reveal>{t.contact.note}</p>
          <div className="contact__links" data-reveal>
            <a className="btn" href={`mailto:${shared.email}`} ref={btn} onPointerMove={onMove} onPointerLeave={onLeave}>{shared.email} <span aria-hidden="true">↗</span></a>
            <div className="contact__small mono">
              <button onClick={copy}>{copied ? t.contact.copied + " ✓" : t.contact.copy}</button>
              <a href={shared.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={shared.github} target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
        </div>
        <footer className="footer mono">
          <span>© {year} {shared.name}</span>
          <Landmarks interval={6000} />
          <a href="#top" onClick={(e) => { e.preventDefault(); scrollToHash("#top"); }}>{t.contact.top} ↑</a>
        </footer>
      </div>
    </section>
  );
}
