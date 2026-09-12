import { useRef } from "react";
import { useReveal } from "../hooks/useReveal";
import { stack, credentials } from "../data/content";

export function Stack() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  return (
    <section className="section container" id="stack" ref={root}>
      <div className="label mono"><span>05 / Stack</span><span>技術</span></div>
      <div className="stack__wall display" data-reveal>
        {stack.map((s) => (
          <span className="stack__word" key={s}>{s}</span>
        ))}
      </div>
      <ul className="stack__creds mono" data-reveal>
        {credentials.map((c) => <li key={c}>{c}</li>)}
      </ul>
    </section>
  );
}
