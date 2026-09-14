import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "../lib/gsap";
import { decode } from "../lib/decode";
import { motion } from "../state/prefs";

/** Section label: "01 / Title  ———" with a katakana/kanji accent. The text decodes in; the rule is drawn by useReveal. */
export function Label({ n, text, jp }: { n: string; text: string; jp?: string }) {
  const el = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const node = el.current;
    if (!node || !motion.enabled) return;
    const full = `${n} / ${text}`;
    const st = ScrollTrigger.create({ trigger: node, start: "top 90%", once: true, onEnter: () => decode(node, full, 1.2) });
    return () => st.kill();
  }, [n, text]);
  return (
    <div className="label">
      <span className="mono label__text" ref={el} aria-hidden="true">{n} / {text}</span>
      <span className="sr-only">{n} / {text}</span>
      {jp && <span className="label__jp jp">{jp}</span>}
      <span className="label__rule" aria-hidden="true" />
    </div>
  );
}
