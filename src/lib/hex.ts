/**
 * The LAB texture vocabulary: text rendered as the bytes a machine would see. Used for labels,
 * the decorative columns and the case-study stages instead of the old katakana accents.
 */
const enc = new TextEncoder();

/** "LAB" → "4C 41 42" (UTF-8 bytes, so accents and other scripts still come out as valid hex). */
export function toHex(text: string, sep = " "): string {
  return Array.from(enc.encode(text), (b) => b.toString(16).toUpperCase().padStart(2, "0")).join(sep);
}

/** "LAB" → "01001100 01000001 01000010". */
export function toBin(text: string, sep = " "): string {
  return Array.from(enc.encode(text), (b) => b.toString(2).padStart(8, "0")).join(sep);
}

/** 3 → "0x03". */
export const hexId = (n: number, width = 2) => `0x${n.toString(16).toUpperCase().padStart(width, "0")}`;

/** A hexdump line: "0040  4C 41 42 ...  |LAB...|", like `xxd` prints it. */
export function dumpLine(text: string, offset = 0): string {
  const bytes = Array.from(enc.encode(text)).slice(0, 16);
  const hex = bytes.map((b) => b.toString(16).toUpperCase().padStart(2, "0")).join(" ");
  const ascii = bytes.map((b) => (b >= 32 && b < 127 ? String.fromCharCode(b) : ".")).join("");
  return `${offset.toString(16).toUpperCase().padStart(4, "0")}  ${hex.padEnd(47, " ")}  |${ascii}|`;
}

/** The monogram in bytes: Leonardo de Araujo Barros, and a lab. */
export const LAB_HEX = toHex("LAB");
export const LAB_BIN = toBin("LAB");
