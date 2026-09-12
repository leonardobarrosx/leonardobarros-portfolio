import { useEffect, useRef } from "react";
import { decode } from "../lib/decode";
import { motion } from "../state/prefs";
import { landmarks, toDMS } from "../data/content";

/** Cycles through João Pessoa landmarks and their DMS coordinates, decoding each one in. */
export function Landmarks({ interval = 4800, className = "" }: { interval?: number; className?: string }) {
  const el = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = el.current;
    if (!node) return;
    let i = 0;
    const text = (k: number) => `${landmarks[k].name} · ${toDMS(landmarks[k].lat, landmarks[k].lng)}`;
    node.textContent = text(0);
    if (!motion.enabled) return;
    let tween: ReturnType<typeof decode> | null = null;
    const id = window.setInterval(() => {
      i = (i + 1) % landmarks.length;
      tween?.kill();
      tween = decode(node, text(i), 1.3);
    }, interval);
    return () => { window.clearInterval(id); tween?.kill(); };
  }, [interval]);
  return <span className={`landmark ${className}`} ref={el} />;
}
