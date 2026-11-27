import { gsap } from "./gsap";

const KATA = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワ";
const rnd = (s: string) => s[Math.floor(Math.random() * s.length)];

/**
 * Three overlapping waves run left to right over the text:
 * binary is "typed", then converts to katakana, then resolves into the final string.
 * Untyped slots hold a no-break space so monospace containers keep their width.
 */
export function decode(el: HTMLElement, text: string, duration = 1.4) {
  const n = text.length;
  const state = { p: 0 };
  const cache: string[] = new Array(n).fill("");
  let lastRoll = 0;
  const render = () => {
    const p = state.p;
    const now = performance.now();
    const roll = now - lastRoll > 34;
    if (roll) lastRoll = now;
    let out = "";
    for (let i = 0; i < n; i++) {
      const ch = text[i];
      if (ch === " " || ch === "\n") { out += ch; continue; }
      const f = i / Math.max(n - 1, 1);
      const typed = p >= f * 0.5;
      const kata = p >= 0.32 + f * 0.45;
      const done = p >= 0.58 + f * 0.42;
      if (done) out += ch;
      else if (kata) { if (roll || !cache[i] || "01".includes(cache[i])) cache[i] = rnd(KATA); out += cache[i]; }
      else if (typed) { if (roll || !cache[i]) cache[i] = rnd("01"); out += cache[i]; }
      else out += "\u00A0";
    }
    el.textContent = out;
  };
  return gsap.fromTo(state, { p: 0 }, { p: 1, duration, ease: "power1.inOut", onUpdate: render, onComplete: () => { el.textContent = text; } });
}
