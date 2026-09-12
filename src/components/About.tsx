import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
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
    const fig = root.current.querySelector<HTMLElement>(".about__figure")!;
    if (!motion.enabled) { gsap.set(fig, { "--s": 1 }); return; }
    const ctx = gsap.context(() => {
      // Red block slides in after the clip reveal; the photo settles from a slight zoom while it stays pinned.
      gsap.fromTo(fig, { "--s": 0 }, { "--s": 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: fig, start: "top 75%", once: true }, delay: 0.5 });
      gsap.fromTo(fig.querySelector("img"), { scale: 1.12 }, { scale: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top 80%", end: "bottom 40%", scrub: 1 } });
    }, root);
    return () => ctx.revert();
  }, [t]);

  return (
    <section className="section" id="about" ref={root}>
      <div className="wrap">
        <Label n="01" text={t.labels.about} jp="紹介" />
        <div className="grid about">
          <figure className="about__figure" data-reveal="clip">
            <img src={photo} alt="Leonardo Barros" loading="lazy" width="1000" height="1249" />
            <span className="tag mono">LB — 026</span>
            <span className="jp vertical" aria-hidden="true">レオナルド</span>
          </figure>

          <div className="about__main">
            <h2 className="about__quote serif-i" data-split>{t.about.quote}</h2>
            <div className="about__text">
              {t.about.paragraphs.map((p, i) => <p key={i} data-split>{p}</p>)}
            </div>
            <ul className="about__facts mono">
              {t.about.facts.map(([k, v], i) => <li key={k} data-reveal data-delay={i * 0.06}><span>{k}</span><span>{v}</span></li>)}
            </ul>
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
      </div>
    </section>
  );
}
