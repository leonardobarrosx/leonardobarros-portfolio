import { useCallback, useRef } from "react";
import { gsap, SplitText } from "../lib/gsap";
import { motion } from "../state/prefs";

/** Returns a pointerenter handler that ripples the characters of `selector` inside the hovered element. Splits lazily. */
export function useCharWave(selector: string) {
  const splits = useRef(new WeakMap<HTMLElement, SplitText>());
  return useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (!motion.enabled) return;
    const host = e.currentTarget;
    const target = host.querySelector<HTMLElement>(selector);
    if (!target) return;
    let split = splits.current.get(target);
    if (!split) {
      split = new SplitText(target, { type: "chars", charsClass: "wave-char" });
      splits.current.set(target, split);
    }
    gsap.killTweensOf(split.chars);
    gsap.fromTo(split.chars, { y: 0, rotate: 0 }, { y: -8, rotate: -3, duration: 0.28, ease: "power2.out", stagger: { each: 0.025, from: "start" }, yoyo: true, repeat: 1 });
  }, [selector]);
}
