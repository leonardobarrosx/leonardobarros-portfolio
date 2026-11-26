import type { CSSProperties, ReactNode } from "react";
import type { PixelName } from "../../data/pixels";
import { Pixel } from "./Pixel";

type Tape = "top" | "left" | "right" | "none";

/**
 * A collage piece: a pixel sprite (or any child) cut out of paper, held down with a strip of tape
 * and set at an angle. Purely decorative; position, size and angle come from the caller.
 */
export function Sticker({ icon, children, rotate = 0, tape = "top", className = "", style, depth }: {
  icon?: PixelName;
  children?: ReactNode;
  rotate?: number;
  tape?: Tape;
  className?: string;
  style?: CSSProperties;
  /** Parallax depth read by the hero (px of travel). */
  depth?: number;
}) {
  return (
    <span className={`sticker ${icon ? "sticker--px" : "sticker--slip"} ${className}`} style={{ "--rot": `${rotate}deg`, ...style } as CSSProperties} data-depth={depth} aria-hidden="true">
      <span className="sticker__body">
        {icon ? <Pixel name={icon} /> : children}
      </span>
      {tape !== "none" && <i className={`tape tape--${tape}`} />}
    </span>
  );
}
