import { useRef } from "react";
import { useReveal } from "../hooks/useReveal";
import { services } from "../data/content";

export function Services() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  return (
    <section className="section container" id="services" ref={root}>
      <div className="label mono"><span>02 / What I do</span></div>
      <ul className="services">
        {services.map((s) => (
          <li className="service" key={s.n} data-reveal>
            <span className="mono">{s.n}</span>
            <h3 className="service__title display">{s.title}</h3>
            <p className="service__text">{s.text}</p>
            <span className="service__jp jp">{s.jp}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
