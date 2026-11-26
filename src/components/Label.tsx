import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "../lib/gsap";
import { decode } from "../lib/decode";
import { motion } from "../state/prefs";
import { hexId, toBin } from "../lib/hex";

/**
 * Section label: a black block "0x01 / Title", then the rule, drawn as the title in binary. The
 * text decodes in; the rule is drawn by useReveal.
 */
export function Label({ n, text }: { n: string; text: string }) {
  const el = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const node = el.current;
    if (!node || !motion.enabled) return;
    const full = `${hexId(Number(n))} / ${text}`;
    const st = ScrollTrigger.create({ trigger: node, start: "top 90%", once: true, onEnter: () => decode(node, full, 1.2) });
    return () => st.kill();
  }, [n, text]);
  return (
    <div className="label">
      <span className="mono label__text" ref={el} aria-hidden="true">{hexId(Number(n))} / {text}</span>
      <span className="sr-only">{n} / {text}</span>
      <span className="label__rule mono" aria-hidden="true"><span>{toBin(text.slice(0, 12))}</span></span>
    </div>
  );
}
