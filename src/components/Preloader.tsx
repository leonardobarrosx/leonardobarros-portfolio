import { useEffect, useRef, useState } from "react";
import { gsap, reduced } from "../lib/gsap";
import { meta } from "../data/content";

const GLYPHS = ["レ", "オ", "ナ", "ル", "ド", "バ", "ロ", "ス"];

export function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [glyph, setGlyph] = useState(GLYPHS[0]);

  useEffect(() => {
    document.body.classList.add("is-loading");
    if (reduced) {
      document.body.classList.remove("is-loading");
      onDone();
      return;
    }
    const state = { n: 0 };
    let g = 0;
    const glyphTimer = window.setInterval(() => {
      g = (g + 1) % GLYPHS.length;
      setGlyph(GLYPHS[g]);
    }, 90);

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.classList.remove("is-loading");
        onDone();
      },
    });
    tl.to(state, {
      n: 100,
      duration: 1.9,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.round(state.n)),
    })
      .to(bar.current, { scaleX: 1, duration: 1.9, ease: "power2.inOut" }, 0)
      .add(() => {
        window.clearInterval(glyphTimer);
        setGlyph(meta.nameJp);
      })
      .to(root.current, { yPercent: -100, duration: 1, ease: "power4.inOut" }, "+=0.25");

    return () => {
      window.clearInterval(glyphTimer);
      tl.kill();
    };
  }, [onDone]);

  if (reduced) return null;

  return (
    <div className="loader" ref={root} aria-hidden="true">
      <div className="loader__top mono">
        <span>{meta.name}</span>
        <span>{meta.volume}</span>
      </div>
      <div className="loader__jp jp">{glyph}</div>
      <div className="loader__bottom">
        <span className="mono">{meta.location}</span>
        <span className="loader__count">
          {count}
          <small>%</small>
        </span>
      </div>
      <div className="loader__bar" ref={bar} />
    </div>
  );
}
