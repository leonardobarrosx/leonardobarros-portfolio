import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefs } from "../state/prefs";
import { useReveal } from "../hooks/useReveal";
import { Label } from "./Label";
import { Sheet, useSticky } from "./Sheet";
import dental from "../assets/logos/dental.png";
import polybalas from "../assets/logos/polybalas.png";
import ipec from "../assets/logos/ipec.png";
import cgibr from "../assets/logos/cgibr.png";
import bemais from "../assets/logos/bemais.png";

const LOGOS = { dental, polybalas, ipec, bemais } as const;

const ORGS = [
  { name: "AeC", src: null },
  { name: "Dental Center", src: dental },
  { name: "Polybalas", src: polybalas },
  { name: "Ipec", src: ipec },
  { name: "CGI.br", src: cgibr },
  { name: "BeMais", src: bemais },
];

/** Typographic mark for organisations without a logo file. */
function Mark({ name }: { name: string }) {
  const initials = name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  return <span className="sheet__mark display" aria-hidden="true">{initials}</span>;
}

export function Experience() {
  const { t } = usePrefs();
  const root = useRef<HTMLElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  useReveal(root);

  useEffect(() => {
    const fromHash = () => {
      const m = location.hash.match(/^#experience\/([a-z0-9-]+)$/);
      setOpenId(m && t.experience.some((x) => x.id === m[1]) ? m[1] : null);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [t]);

  const open = useCallback((id: string) => { history.replaceState(null, "", `#experience/${id}`); setOpenId(id); }, []);
  const close = useCallback(() => { history.replaceState(null, "", "#experience"); setOpenId(null); }, []);

  const current = t.experience.find((x) => x.id === openId) ?? null;
  const x = useSticky(current);
  const host = (url?: string) => (url ? url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") : "");

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
          {t.experience.map((e, i) => (
            <li key={e.id} data-reveal data-delay={Math.min(i, 4) * 0.05}>
              <button type="button" className="xp__row" onClick={() => open(e.id)} aria-haspopup="dialog" data-cursor="link">
                <span className="xp__years mono">{e.years}</span>
                <span className="xp__role display">{e.role}</span>
                <span className="xp__org">{e.org}</span>
                <span className="xp__where mono">{e.where}</span>
                <span className="xp__more mono" aria-hidden="true">{t.xp.open} <i>+</i></span>
                <span className="xp__note">{e.note}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Sheet open={!!current} onClose={close} label={x ? `${x.role} — ${x.org}` : undefined}>
        {x && (
          <>
            <div className="sheet__top mono">
              <span>{x.period}</span>
              <button className="sheet__close mono" onClick={close}>{t.sheet.close} ✕</button>
            </div>
            <div className="sheet__body">
              <div className="sheet__org">
                {x.logo ? <img className="sheet__logo" src={LOGOS[x.logo]} alt="" /> : <Mark name={x.org} />}
                <div>
                  <b>{x.org}</b>
                  {x.site && <a className="mono" href={x.site} target="_blank" rel="noreferrer">{host(x.site)} ↗</a>}
                </div>
              </div>
              <h3 className="sheet__title sheet__title--role display">{x.role}</h3>
              <ul className="sheet__bullets">
                {x.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
              <dl className="sheet__facts mono">
                <b>{t.xp.period}</b><span>{x.period}</span>
                <b>{t.xp.location}</b><span>{x.where}</span>
                <b>{t.xp.type}</b><span>{x.type}</span>
              </dl>
            </div>
            <div className="sheet__foot">
              {x.site
                ? <a className="btn" href={x.site} target="_blank" rel="noreferrer">{t.xp.visit} ↗</a>
                : <span className="mono muted">{x.org}</span>}
            </div>
          </>
        )}
      </Sheet>
    </section>
  );
}
