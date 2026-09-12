import { gsap } from "./gsap";

const KATA = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワ";

/** Resolve katakana noise into `text`, left to right. Returns the tween so it can be placed on a timeline. */
export function scramble(el: HTMLElement, text: string, duration = 1.2) {
  const state = { p: 0 };
  return gsap.to(state, {
    p: 1, duration, ease: "power2.out",
    onUpdate: () => {
      const n = Math.floor(state.p * text.length);
      let out = text.slice(0, n);
      for (let i = n; i < text.length; i++) out += text[i] === " " ? " " : KATA[Math.floor(Math.random() * KATA.length)];
      el.textContent = out;
    },
    onComplete: () => { el.textContent = text; },
  });
}
