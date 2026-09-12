import { useLayoutEffect, useRef } from "react";
import { gsap, SplitText } from "../lib/gsap";
import { motion, usePrefs } from "../state/prefs";
import { shared } from "../data/content";

const KATA = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワ";

/** Resolve katakana noise into the final string, left to right. */
function scramble(el: HTMLElement, text: string, duration = 1.2) {
  const state = { p: 0 };
  return gsap.to(state, {
    p: 1, duration, ease: "power2.out",
    onUpdate: () => {
      const n = Math.floor(state.p * text.length);
      let out = text.slice(0, n);
      for (let i = n; i < text.length; i++) out += text[i] === " " ? " " : KATA[Math.floor(Math.random() * KATA.length)];
      el.textContent = out;
    },
    onComplete: () => { el.textContent = text; },
  });
}

export function Hero({ ready }: { ready: boolean }) {
  const { t } = usePrefs();
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!ready || !root.current) return;
    const el = root.current;
    if (!motion.enabled) {
      gsap.set(el.querySelector(".hero__sun"), { scale: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>(".hero__title .line");
      const chars = lines.flatMap((l) => new SplitText(l, { type: "chars", charsClass: "char" }).chars);
      const role = el.querySelector<HTMLElement>(".scramble")!;

      gsap.timeline({ defaults: { ease: "power4.out" } })
        .from(chars, { yPercent: 110, rotate: 3, duration: 1.3, stagger: 0.03 }, 0)
        .to(".hero__sun", { scale: 1, duration: 1.5, ease: "expo.out" }, 0.2)
        .from(".hero__jp", { opacity: 0, y: -16, duration: 1 }, 0.6)
        .from(".hero__meta > *, .hero__foot > *", { opacity: 0, y: 10, duration: 0.8, stagger: 0.06 }, 0.5)
        .add(scramble(role, t.meta.role, 1.1), 0.7)
        .from(".hero__statement", { opacity: 0, y: 18, duration: 0.9 }, 0.9);

      // Parallax as the hero scrolls away.
      const st = { trigger: el, start: "top top", end: "bottom top", scrub: true };
      gsap.to(".hero__title", { yPercent: 14, ease: "none", scrollTrigger: st });
      gsap.to(".hero__sun", { yPercent: -24, ease: "none", scrollTrigger: st });
      gsap.to(".hero__statement, .hero__role", { y: 28, ease: "none", scrollTrigger: st });
    }, el);
    return () => ctx.revert();
  }, [ready, t]);

  const [pre, em, post] = t.meta.statement;

  return (
    <section className="hero wrap" id="top" ref={root}>
      <div className="hero__meta mono">
        <span>{t.meta.volume}</span>
        <span>{t.meta.location} · {shared.coords}</span>
        <span>{t.meta.role}</span>
      </div>

      <div className="hero__body grid">
        <div className="hero__jp jp vertical" aria-hidden="true">{shared.nameJp} — {t.meta.roleJp}</div>
        <h1 className="hero__title display">
          <span className="line">{shared.first}</span>
          <span className="line">{shared.last}</span>
        </h1>
        <div className="hero__sun" aria-hidden="true" />
        <div className="hero__role mono">
          <span className="scramble" aria-label={t.meta.role}>{t.meta.role}</span>
        </div>
        <p className="hero__statement">{pre}<em className="serif-i">{em}</em>{post}</p>
      </div>

      <div className="hero__foot mono">
        <span className="hero__scroll"><i /> Scroll</span>
        <span>{t.meta.tagline}</span>
      </div>
    </section>
  );
}
