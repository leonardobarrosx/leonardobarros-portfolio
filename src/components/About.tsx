import { useLayoutEffect, useRef } from "react";
import { gsap, SplitText } from "../lib/gsap";
import { motion, usePrefs } from "../state/prefs";
import { useReveal } from "../hooks/useReveal";
import { Label } from "./Label";
import photo from "../assets/photo-cafe.jpg";

export function About() {
  const { t } = usePrefs();
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  useLayoutEffect(() => {
    if (!root.current) return;
    if (!motion.enabled) { gsap.set(root.current.querySelector(".about__figure"), { "--s": 1 }); return; }
    const ctx = gsap.context(() => {
      const split = new SplitText(".about__quote", { type: "words", wordsClass: "word" });
      gsap.from(split.words, {
        opacity: 0.15, stagger: 0.05, ease: "none",
        scrollTrigger: { trigger: ".about__quote", start: "top 78%", end: "bottom 50%", scrub: true },
      });
      const fig = root.current!.querySelector<HTMLElement>(".about__figure")!;
      gsap.timeline({ scrollTrigger: { trigger: fig, start: "top 82%", once: true } })
        .fromTo(fig, { "--s": 0 }, { "--s": 1, duration: 0.9, ease: "power3.out" }, 0.5);
      gsap.to(fig.querySelector("img"), { yPercent: -8, ease: "none", scrollTrigger: { trigger: fig, start: "top bottom", end: "bottom top", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, [t]);

  return (
    <section className="section" id="about" ref={root}>
      <div className="wrap">
        <Label n="01" text={t.labels.about} jp="紹介" />
        <div className="grid">
          <h2 className="about__quote serif-i">{t.about.quote}</h2>
          <div className="about__text">
            {t.about.paragraphs.map((p, i) => <p key={i} data-reveal data-delay={i * 0.1}>{p}</p>)}
            <ul className="about__facts mono" data-reveal>
              {t.about.facts.map(([k, v]) => <li key={k}><span>{k}</span><span>{v}</span></li>)}
            </ul>
          </div>
          <figure className="about__figure" data-reveal="clip">
            <img src={photo} alt="Leonardo Barros" loading="lazy" width="1000" height="1249" />
            <span className="tag mono">LB — 026</span>
            <span className="jp vertical" aria-hidden="true">レオナルド</span>
          </figure>
          <div className="about__values">
            <h3 className="mono about__values-title" data-reveal>{t.about.valuesTitle}</h3>
            <ul className="values">
              {t.about.values.map((v, i) => (
                <li key={v.title} data-reveal data-delay={i * 0.08}>
                  <span className="mono muted">0{i + 1}</span>
                  <h4 className="display">{v.title}</h4>
                  <p>{v.text}</p>
                </li>
              ))}
            </ul>
            <p className="about__off" data-reveal><b className="mono">{t.about.offTitle}</b> {t.about.off}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
