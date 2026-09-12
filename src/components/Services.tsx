import { useRef } from "react";
import { usePrefs } from "../state/prefs";
import { useReveal } from "../hooks/useReveal";
import { Label } from "./Label";
import { useCharWave } from "../hooks/useCharWave";

export function Services() {
  const { t } = usePrefs();
  const root = useRef<HTMLElement>(null);
  const wave = useCharWave(".service__title");
  useReveal(root);
  return (
    <section className="section" id="services" ref={root}>
      <div className="wrap">
        <Label n="02" text={t.labels.services} jp="仕事" />
        <ul className="services">
          {t.services.map((s, i) => (
            <li className="service" key={s.n} data-reveal data-delay={i * 0.06} onPointerEnter={wave}>
              <span className="service__n mono">{s.n}</span>
              <h3 className="service__title display">{s.title}</h3>
              <p className="service__text">{s.text}</p>
              <span className="service__jp jp">{s.jp}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
