import { useLayoutEffect, useRef, useState } from "react";
import { gsap, SplitText, lenisRef, scrollToHash } from "../lib/gsap";
import { motion, usePrefs } from "../state/prefs";
import { shared } from "../data/content";
import { decode } from "../lib/decode";
import { Landmarks } from "./Landmarks";
import { useProximity } from "../hooks/useProximity";
import { LiquidSun } from "./LiquidSun";

export function Hero({ ready }: { ready: boolean }) {
  const { t } = usePrefs();
  const root = useRef<HTMLElement>(null);
  const [distort, setDistort] = useState(false);
  useProximity(root, ".hero__title .char", distort, 260, { split: true });

  useLayoutEffect(() => {
    if (!ready || !root.current) return;
    const el = root.current;
    if (!motion.enabled) {
      gsap.set(el.querySelector(".hero__sun"), { scale: 1 });
      el.querySelector(".hero__title")?.classList.add("is-live");
      return;
    }
    const ctx = gsap.context(() => {
      const title = el.querySelector<HTMLElement>(".hero__title")!;
      const lines = gsap.utils.toArray<HTMLElement>(".hero__title .line");
      const chars = lines.flatMap((l) => new SplitText(l, { type: "chars", charsClass: "char" }).chars);
      const role = el.querySelector<HTMLElement>(".scramble")!;
      const sun = el.querySelector<HTMLElement>(".hero__sun")!;

      // ---- intro
      gsap.timeline({ defaults: { ease: "power4.out" } })
        .from(chars, { yPercent: 110, rotate: 3, duration: 1.3, stagger: 0.03 }, 0.1)
        .to(sun, { scale: 1, duration: 1.6, ease: "elastic.out(1, 0.55)" }, 0.35)
        .from(".hero__jp", { opacity: 0, y: -16, duration: 1 }, 0.7)
        .from(".hero__meta > *, .hero__foot > *", { opacity: 0, y: 10, duration: 0.8, stagger: 0.06 }, 0.6)
        .add(decode(role, t.meta.role, 1.6), 0.8)
        .from(".hero__statement", { opacity: 0, y: 18, duration: 0.9 }, 1)
        .from(".hero__badge", { opacity: 0, scale: 0.6, duration: 0.9, ease: "back.out(1.6)" }, 1.1)
        .add(() => { title.classList.add("is-live"); setDistort(true); });

      // ---- pointer: depth layers follow the cursor with inertia
      const layers: [string, number][] = [[".hero__title", 8], [".hero__statement", 5], [".hero__role", 5], [".hero__sun", 26]];
      const movers = layers.map(([sel, depth]) => ({ depth, x: gsap.quickTo(sel, "x", { duration: 1.1, ease: "power3" }), y: gsap.quickTo(sel, "y", { duration: 1.1, ease: "power3" }) }));
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
        movers.forEach((m) => { m.x(nx * m.depth * 2); m.y(ny * m.depth * 2); });
      };
      const onLeave = () => movers.forEach((m) => { m.x(0); m.y(0); });
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);

      // ---- scroll: parallax exit, letters drift apart, skew with velocity, badge spins faster
      const st = { trigger: el, start: "top top", end: "bottom top", scrub: true };
      const mid = (chars.length - 1) / 2;
      gsap.to(chars, { x: (i: number) => (i - mid) * 14, ease: "none", scrollTrigger: st });
      gsap.to(".hero__body", { yPercent: 10, scale: 0.96, transformOrigin: "left top", ease: "none", scrollTrigger: st });
      gsap.to(sun, { yPercent: -30, ease: "none", scrollTrigger: st });
      gsap.to(".hero__jp", { yPercent: -40, ease: "none", scrollTrigger: st });
      const badgeSpin = gsap.to(".hero__badge svg", { rotation: 360, duration: 18, repeat: -1, ease: "none" });
      const skew = gsap.quickTo(title, "skewX", { duration: 0.5, ease: "power3" });
      const onScroll = (e: { velocity: number }) => {
        skew(gsap.utils.clamp(-8, 8, e.velocity * 0.06));
        gsap.to(badgeSpin, { timeScale: 1 + Math.min(Math.abs(e.velocity) / 8, 5), duration: 0.2, overwrite: true, onComplete: () => gsap.to(badgeSpin, { timeScale: 1, duration: 1.2 }) });
      };
      const lenis = lenisRef.current;
      lenis?.on("scroll", onScroll);

      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
        lenis?.off("scroll", onScroll);
      };
    }, el);
    return () => ctx.revert();
  }, [ready, t]);

  const [pre, em, post] = t.meta.statement;
  const badgeText = `${shared.name} • ${t.meta.badge} • `;

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero__inner">
      <div className="hero__meta mono">
        <span>{t.meta.volume}</span>
        <Landmarks />
        <span>{t.meta.role}</span>
      </div>

      <div className="hero__body grid">
        <div className="hero__jp jp vertical" aria-hidden="true">{shared.nameJp} — {t.meta.roleJp}</div>
        <h1 className="hero__title display">
          <span className="line">{shared.first}</span>
          <span className="line">{shared.last}</span>
        </h1>
        <LiquidSun area={root} />
        <div className="hero__role mono">
          <span className="scramble" aria-label={t.meta.role}>{t.meta.role}</span>
        </div>
        <p className="hero__statement">{pre}<em className="serif-i">{em}</em>{post}</p>
        <button className="hero__badge" type="button" onClick={() => scrollToHash("#about")} aria-label="Scroll to about">
          <svg viewBox="0 0 120 120">
            <defs><path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" /></defs>
            <text textLength="288" lengthAdjust="spacing"><textPath href="#badge-circle" textLength="288" lengthAdjust="spacing">{badgeText}</textPath></text>
          </svg>
          <span aria-hidden="true">↓</span>
        </button>
      </div>

      <div className="hero__foot mono">
        <span className="hero__scroll"><i /> Scroll</span>
        <span>{t.meta.tagline}</span>
      </div>
      </div>
    </section>
  );
}
