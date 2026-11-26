import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { motion } from "../../state/prefs";
import { LAB_BIN, LAB_HEX, dumpLine } from "../../lib/hex";
import { LabMark } from "./LabMark";
import { Sticker } from "./Sticker";

/** How far a click knocks the stickers about, in pixels. */
const REACH = 280;

/**
 * The hero's right side: the LAB stamp pressed onto the page, with the things it is made of taped
 * around it: sprites, a cursor, a floppy, the monogram as bytes. Every piece is decorative.
 */
export function HeroCollage({ note }: { note: [string, string, string] }) {
  const root = useRef<HTMLDivElement>(null);

  // A click near the pile knocks the stickers loose for a moment (the site-wide "shot").
  useEffect(() => {
    const el = root.current;
    if (!el || !motion.enabled) return;
    const onShot = (e: Event) => {
      const { x, y, power } = (e as CustomEvent<{ x: number; y: number; power: number }>).detail;
      el.querySelectorAll<HTMLElement>(".sticker").forEach((s) => {
        const r = s.getBoundingClientRect();
        const dx = r.left + r.width / 2 - x, dy = r.top + r.height / 2 - y;
        const d = Math.hypot(dx, dy);
        if (d > REACH) return;
        const f = (1 - d / REACH) * (1 + power);
        gsap.fromTo(s, { "--kick": `${(dx < 0 ? -1 : 1) * 14 * f}deg`, x: (dx / (d || 1)) * 18 * f, y: (dy / (d || 1)) * 18 * f },
          { "--kick": "0deg", x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.35)", overwrite: true });
      });
    };
    window.addEventListener("lb:shot", onShot);
    return () => window.removeEventListener("lb:shot", onShot);
  }, []);

  const [a, b, c] = note;
  return (
    <div className="collage" ref={root} aria-hidden="true">
      <span className="collage__grid" />
      <span className="collage__stamp" data-depth="18"><LabMark variant="stamp" /></span>
      <Sticker icon="laptop" rotate={-8} className="collage__s1" depth={30} />
      <Sticker icon="gamepad" rotate={9} tape="left" className="collage__s2" depth={38} />
      <Sticker icon="coffee" rotate={6} tape="right" className="collage__s3" depth={24} />
      <Sticker icon="floppy" rotate={-12} className="collage__s4" depth={34} />
      <Sticker icon="cursor" rotate={0} tape="none" className="collage__s5 sticker--bare" depth={46} />
      <Sticker icon="heart" rotate={-4} tape="none" className="collage__s6 sticker--bare" depth={42} />
      <Sticker rotate={4} className="collage__hex" depth={20}>
        <span className="mono">0x{LAB_HEX.split(" ").join(" 0x")}</span>
      </Sticker>
      <Sticker rotate={-3} tape="right" className="collage__note" depth={14}>
        <b className="display">{a}</b>
        <span>{b}</span>
        <span className="mono">{c}</span>
      </Sticker>
      <span className="collage__bin mono" data-depth="10">{LAB_BIN} · {dumpLine("LEONARDO BARROS", 0x4c41)}</span>
    </div>
  );
}
