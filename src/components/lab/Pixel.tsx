import { memo } from "react";
import { PIXELS, PIXEL_COLORS, type PixelName } from "../../data/pixels";

/** Runs of one colour in a row become one rect: a 16×16 icon is ~40 rects instead of 256. */
function rects(rows: readonly string[]) {
  const out: { x: number; y: number; w: number; c: string }[] = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const c = row[x];
      let w = 1;
      while (x + w < row.length && row[x + w] === c) w++;
      if (c !== ".") out.push({ x, y, w, c });
      x += w;
    }
  });
  return out;
}

const CACHE = new Map<PixelName, ReturnType<typeof rects>>();

/** One sprite from the LAB sheet, crisp at any size. Decorative unless a title is given. */
export const Pixel = memo(function Pixel({ name, className = "", title }: { name: PixelName; className?: string; title?: string }) {
  let r = CACHE.get(name);
  if (!r) { r = rects(PIXELS[name]); CACHE.set(name, r); }
  return (
    <svg className={`px ${className}`} viewBox="0 0 16 16" shapeRendering="crispEdges" role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      {r.map((p, i) => <rect key={i} x={p.x} y={p.y} width={p.w} height={1} fill={PIXEL_COLORS[p.c]} />)}
    </svg>
  );
});
