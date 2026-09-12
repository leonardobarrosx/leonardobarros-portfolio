import { useLayoutEffect, useRef } from "react";
import { gsap, SplitText, reduced } from "../lib/gsap";
import { useReveal } from "../hooks/useReveal";
import { about } from "../data/content";
import photo from "../assets/photo.jpg";

export function About() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  useLayoutEffect(() => {
    if (!root.current || reduced) return;
    const ctx = gsap.context(() => {
      const split = new SplitText(".about__quote", { type: "words", wordsClass: "word" });
      gsap.from(split.words, {
        opacity: 0.12,
        stagger: 0.06,
        ease: "none",
        scrollTrigger: { trigger: ".about__quote", start: "top 80%", end: "bottom 45%", scrub: true },
      });
      const fig = root.current!.querySelector(".about__figure")!;
      gsap.timeline({ scrollTrigger: { trigger: fig, start: "top 80%", once: true } })
        .to(fig.querySelector("img"), { clipPath: "inset(0% 0 0 0)", duration: 1.4, ease: "power4.inOut" })
        .fromTo(fig, { "--s": 0 }, { "--s": 1, duration: 0.9, ease: "power3.out" }, "<0.6");
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section container" id="about" ref={root}>
      <div className="label mono"><span>01 / About</span></div>
      <div className="about__grid">
        <div>
          <h2 className="about__quote serif-i">{about.quote}</h2>
          <figure className="about__figure">
            <img src={photo} alt="Leonardo Barros" loading="lazy" />
            <span className="tag mono">LB — 026</span>
            <span className="jp vertical" aria-hidden="true">レオナルド</span>
          </figure>
        </div>
        <div className="about__text">
          {about.paragraphs.map((p, i) => (
            <p key={i} data-reveal>{p}</p>
          ))}
          <ul className="about__facts mono" data-reveal>
            {about.facts.map(([k, v]) => (
              <li key={k}><span>{k}</span><span>{v}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
