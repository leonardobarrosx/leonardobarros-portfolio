import { useRef } from "react";
import { usePrefs } from "../state/prefs";
import { useReveal } from "../hooks/useReveal";
import { Label } from "./Label";
import dental from "../assets/logos/dental.png";
import polybalas from "../assets/logos/polybalas.png";
import ipec from "../assets/logos/ipec.png";
import cgibr from "../assets/logos/cgibr.png";
import bemais from "../assets/logos/bemais.png";

const ORGS = [
  { name: "AeC", src: null },
  { name: "Dental Center", src: dental },
  { name: "Polybalas", src: polybalas },
  { name: "Ipec", src: ipec },
  { name: "CGI.br", src: cgibr },
  { name: "BeMais", src: bemais },
];

export function Experience() {
  const { t } = usePrefs();
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  return (
    <section className="section section--dark" id="experience" ref={root}>
      <div className="wrap">
        <Label n="04" text={t.labels.experience} jp="経歴" />
        <div className="orgs" data-reveal>
          <span className="mono muted">{t.orgsTitle}</span>
          <ul className="orgs__list">
            {ORGS.map((o) => (
              <li key={o.name} title={o.name}>{o.src ? <img src={o.src} alt={o.name} loading="lazy" /> : <span className="display">{o.name}</span>}</li>
            ))}
          </ul>
        </div>
        <ul className="xp">
          {t.experience.map((x, i) => (
            <li className="xp__row" key={x.role + x.org} data-reveal data-delay={Math.min(i, 4) * 0.05}>
              <span className="xp__years mono">{x.years}</span>
              <span className="xp__role display">{x.role}</span>
              <span className="xp__org">{x.org}</span>
              <span className="xp__where mono">{x.where}</span>
              <span className="xp__note">{x.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
