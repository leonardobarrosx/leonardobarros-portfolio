import stamp from "../../assets/brand/lab-stamp.webp";
import clean from "../../assets/brand/lab-mark.webp";
import type { CSSProperties } from "react";

/**
 * The LAB monogram. The artwork is used as a mask, so it is painted with the theme's accent (or
 * whatever `color` the parent sets) and follows the theme switcher and the dark scheme.
 * - "stamp": the inked seal with its texture, the main version, for 64px and up.
 * - "clean": the smooth version for small sizes (nav, favicon), where texture turns into noise.
 */
export function LabMark({ variant = "clean", className = "", title, style }: { variant?: "stamp" | "clean"; className?: string; title?: string; style?: CSSProperties }) {
  const src = variant === "stamp" ? stamp : clean;
  return (
    <span
      className={`labmark labmark--${variant} ${className}`}
      style={{ "--mark": `url(${src})`, ...style } as CSSProperties}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    />
  );
}
