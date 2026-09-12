import { useLayoutEffect, useRef } from "react";
import { gsap, SplitText, reduced } from "../lib/gsap";
import { useReveal } from "../hooks/useReveal";
import { meta } from "../data/content";

export function Contact() {
  const root = useRef<HTMLElement>(null);
  const btn = useRef<HTMLAnchorElement>(null);
  useReveal(root);

  useLayoutEffect(() => {
    if (!root.current || reduced) return;
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>(".contact__title .line");
      const chars = lines.flatMap((l) => new SplitText(l, { type: "chars", charsClass: "char" }).chars);
      gsap.from(chars, {
        yPercent: 120,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.025,
        scrollTrigger: { trigger: ".contact__title", start: "top 80%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // Magnetic pull on the main CTA.
  const onMove = (e: React.PointerEvent) => {
    if (reduced || !btn.current) return;
    const r = btn.current.getBoundingClientRect();
    gsap.to(btn.current, {
      x: (e.clientX - (r.left + r.width / 2)) * 0.25,
      y: (e.clientY - (r.top + r.height / 2)) * 0.25,
      duration: 0.5,
      ease: "power3.out",
    });
  };
  const onLeave = () => btn.current && gsap.to(btn.current, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });

  const year = new Date().getFullYear();
  return (
    <section className="section section--dark contact" id="contact" ref={root}>
      <div className="container">
        <div className="label mono"><span>06 / Contact</span><span>連絡</span></div>
      </div>
      <div className="container">
        <h2 className="contact__title display">
          <span className="line">Let's</span>
          <span className="line">talk.</span>
        </h2>
        <div className="contact__jp jp" data-reveal>話しましょう</div>
        <div className="contact__body">
          <p className="contact__note" data-reveal>
            Open to full-time roles in development, data or IT operations, remote or hybrid. Freelance too.
            Portuguese native, English C2. Based in {meta.location}, UTC−3.
          </p>
          <div className="contact__links" data-reveal>
            <a className="btn" href={`mailto:${meta.email}`} ref={btn} onPointerMove={onMove} onPointerLeave={onLeave}>
              {meta.email} <span aria-hidden="true">↗</span>
            </a>
            <div className="contact__small mono">
              <a href={meta.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={meta.github} target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <footer className="footer mono">
          <span>© {year} {meta.name}</span>
          <span>{meta.location} · {meta.coords}</span>
          <span>Vite · React · GSAP · Lenis</span>
        </footer>
      </div>
    </section>
  );
}
