import { useLayoutEffect, useRef } from "react";
import { gsap, reduced } from "../lib/gsap";
import { useReveal } from "../hooks/useReveal";
import { works, type Work as WorkItem } from "../data/content";

function Poster({ w }: { w: WorkItem }) {
  const el = useRef<HTMLElement>(null);

  // Subtle 3D tilt following the pointer.
  const onMove = (e: React.PointerEvent) => {
    if (reduced || !el.current) return;
    const r = el.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el.current, { rotateY: px * 8, rotateX: -py * 8, duration: 0.6, ease: "power3.out", transformPerspective: 900 });
  };
  const onLeave = () => el.current && gsap.to(el.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "power3.out" });

  const inner = (
    <>
      <div className="poster__meta mono">
        <span>{w.kind}</span>
        <span>{w.year}</span>
      </div>
      <h3 className="poster__title display">
        {w.title.map((t) => <span key={t}>{t}</span>)}
      </h3>
      <span className="poster__jp jp vertical" aria-hidden="true">{w.jp}</span>
      <div className="poster__foot mono">
        <span>{w.stack}</span>
        <span className="desc">{w.desc}</span>
      </div>
      <span className="poster__deco" aria-hidden="true" />
      {w.href && <span className="poster__arrow" aria-hidden="true">↗</span>}
    </>
  );

  return (
    <article
      className={`poster poster--${w.variant} ${w.tall ? "poster--tall" : ""}`}
      ref={el}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      data-reveal
      data-cursor={w.href ? "view" : undefined}
    >
      {inner}
      {w.href && <a className="poster__link" href={w.href} target="_blank" rel="noreferrer" aria-label={`${w.title.join(" ")} on GitHub`} />}
    </article>
  );
}

export function Work() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  useLayoutEffect(() => {
    if (!root.current || reduced) return;
    const ctx = gsap.context(() => {
      // Alternate columns drift at different speeds for a loose, editorial scroll.
      gsap.utils.toArray<HTMLElement>(".poster").forEach((p, i) => {
        gsap.to(p, {
          y: (i % 3 === 1 ? -40 : 24),
          ease: "none",
          scrollTrigger: { trigger: p, start: "top bottom", end: "bottom top", scrub: 1.2 },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section container" id="work" ref={root}>
      <div className="label mono"><span>03 / Selected work</span><span>作品</span></div>
      <div className="work__grid">
        {works.map((w) => <Poster w={w} key={w.id} />)}
      </div>
    </section>
  );
}
