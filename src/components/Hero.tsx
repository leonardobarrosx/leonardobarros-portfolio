import { useLayoutEffect, useRef } from "react";
import { gsap, SplitText, reduced } from "../lib/gsap";
import { meta } from "../data/content";

export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!ready || !root.current || reduced) return;
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>(".hero__title .line");
      const splits = lines.map((l) => new SplitText(l, { type: "chars", charsClass: "char" }));
      const chars = splits.flatMap((s) => s.chars);

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(chars, { yPercent: 120, rotate: 4, duration: 1.4, stagger: 0.03 }, 0)
        .to(".hero__sun", { scale: 1, duration: 1.6, ease: "expo.out" }, 0.2)
        .from(".hero__jp", { opacity: 0, y: -20, duration: 1 }, 0.6)
        .from(".hero__meta > *, .hero__foot > *", { opacity: 0, y: 12, duration: 0.9, stagger: 0.08 }, 0.5)
        .from(".hero__statement", { opacity: 0, y: 24, duration: 1 }, 0.9);

      // Gentle parallax as the hero scrolls away.
      gsap.to(".hero__title", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero__sun", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section className="hero container" id="top" ref={root}>
      <div className="hero__meta mono">
        <span>{meta.volume}</span>
        <span>{meta.location} · {meta.coords}</span>
        <span>{meta.role}</span>
      </div>

      <div className="hero__body">
        <div className="hero__jp jp vertical" aria-hidden="true">
          {meta.nameJp} — {meta.roleJp}
        </div>
        <h1 className="hero__title display">
          <span className="line">{meta.first}</span>
          <span className="line">{meta.last}</span>
        </h1>
        <div className="hero__sun" aria-hidden="true" />
        <p className="hero__statement">
          Ten years building software that <em className="serif-i">works</em> and looks the part.
          Web, mobile, data and the glue in between.
        </p>
      </div>

      <div className="hero__foot mono">
        <span className="hero__scroll">
          <i /> Scroll
        </span>
        <span>{meta.tagline}</span>
      </div>
    </section>
  );
}
