import { useRef } from "react";
import { usePrefs } from "../state/prefs";
import { useReveal } from "../hooks/useReveal";
import { Label } from "./Label";
import claudio from "../assets/t-claudio.jpg";
import roger from "../assets/t-roger.jpg";

const PHOTOS = { claudio, roger };

export function Testimonials() {
  const { t } = usePrefs();
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  return (
    <section className="section" id="words" ref={root}>
      <div className="wrap">
        <Label n="05" text={t.labelsExtra.words} jp="声" />
        <div className="grid quotes">
          {t.testimonials.map((q, i) => (
            <figure className="quote" key={q.name} data-reveal data-delay={i * 0.12}>
              <span className="quote__mark serif-i" aria-hidden="true">“</span>
              <blockquote className="quote__text serif-i">{q.quote}</blockquote>
              <figcaption className="quote__who">
                <img src={PHOTOS[q.photo]} alt="" width="320" height="320" loading="lazy" />
                <span><b>{q.name}</b><span className="mono muted">{q.role}</span></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
