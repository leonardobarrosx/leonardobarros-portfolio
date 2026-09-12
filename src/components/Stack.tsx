import { useRef } from "react";
import { usePrefs } from "../state/prefs";
import { useReveal } from "../hooks/useReveal";
import { Label } from "./Label";
import { shared } from "../data/content";
import { toolbox } from "../data/toolbox";
import cisco from "../assets/certs/cisco.png";
import google from "../assets/certs/google.png";
import connect from "../assets/certs/connect.svg";

function CertIcon({ kind }: { kind: "efset" | "cisco" | "google" | "connect" }) {
  if (kind === "cisco") return <img className="cert__logo" src={cisco} alt="" />;
  if (kind === "google") return <img className="cert__logo" src={google} alt="" />;
  if (kind === "connect") return <img className="cert__logo" src={connect} alt="" />;
  return <span className="cert__badge">EF<br />SET</span>;
}

export function Stack() {
  const { t } = usePrefs();
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  return (
    <section className="section" id="stack" ref={root}>
      <div className="wrap">
        <Label n="06" text={t.labels.stack} jp="技術" />
        <div className="stack__wall display" data-reveal>
          {shared.stack.map((s) => <span className="stack__word" key={s}>{s}</span>)}
        </div>
        <h3 className="mono stack__certs-title" data-reveal>{t.labelsExtra.toolbox}</h3>
        <dl className="toolbox">
          {toolbox.map((g, i) => (
            <div className="toolbox__row" key={g.id} data-reveal data-delay={Math.min(i, 3) * 0.04}>
              <dt>
                <span className="mono toolbox__n">{String(i + 1).padStart(2, "0")}</span>
                <b>{t.toolbox[g.id]}</b>
                <span className="jp toolbox__jp" aria-hidden="true">{g.jp}</span>
              </dt>
              <dd>{g.items.map((item) => <span className="tool" key={item}>{item}</span>)}</dd>
            </div>
          ))}
        </dl>
        <h3 className="mono stack__certs-title" data-reveal>{t.labelsExtra.certs}</h3>
        <ul className="certs">
          {t.certs.map((c, i) => (
            <li className="cert" key={c.name} data-reveal data-delay={i * 0.05}>
              <CertIcon kind={c.icon} />
              <div>
                <b>{c.name}</b>
                <span className="mono muted">{c.issuer} · {c.meta}</span>
                {c.id && <span className="mono muted cert__id">ID {c.id}</span>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
