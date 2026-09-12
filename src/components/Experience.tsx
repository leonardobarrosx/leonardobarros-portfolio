import { useRef } from "react";
import { useReveal } from "../hooks/useReveal";
import { experience } from "../data/content";

export function Experience() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  return (
    <section className="section section--dark" id="experience" ref={root}>
      <div className="container">
        <div className="label mono"><span>04 / Experience</span><span>経歴</span></div>
        <ul className="xp">
          {experience.map((x) => (
            <li className="xp__row" key={x.role + x.org} data-reveal>
              <span className="mono">{x.years}</span>
              <span className="xp__role display">{x.role}</span>
              <span className="xp__org">{x.org}</span>
              <span className="xp__where mono">{x.where}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
