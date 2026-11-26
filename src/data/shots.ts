/**
 * Screens captured from running projects, plus explicitly labelled source-based UI previews for VESTA.
 *
 * Files live in `src/assets/cases/<work id>/` and are picked up here by name, so adding a capture
 * is a matter of dropping the file in the folder: `NN-name.webp` joins the sequence in order and
 * `loop.mp4` (or a legacy `loop.gif`) becomes the moving one, which the gallery shows first.
 * A `-m` name (`loop-m.mp4`, `NN-m-name.webp`) is a phone-sized capture and is shown at phone width.
 */
const files = import.meta.glob("../assets/cases/*/*.{webp,gif,svg,mp4}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export interface Shot {
  src: string;
  /** The loop (MP4 or GIF): it leads the gallery and is never lazy-loaded. */
  motion: boolean;
  /** An MP4 loop, rendered as a muted inline <video> instead of an <img>. */
  video: boolean;
  /** A portrait phone capture, shown at phone width instead of the full column. */
  phone: boolean;
  /** File name without the extension, which is what the captions are keyed by. */
  name: string;
}

const byWork: Record<string, Shot[]> = {};
const covers: Record<string, string> = {};
for (const path of Object.keys(files).sort()) {
  const m = path.match(/\/cases\/([^/]+)\/([^/]+)$/);
  if (!m) continue;
  const [, work, name] = m;
  // VESTA's earlier captures predate the current React UI: only show explicitly labelled updated SVG recreations.
  if (work === "vesta") continue; // Require current, browser-captured screenshots; old files and mock SVGs are intentionally hidden.
  // cover is the card's own crop and never joins the sequence
  if (name.startsWith("cover.")) { covers[work] = files[path]; continue; }
  const base = name.replace(/\.[a-z0-9]+$/, "");
  (byWork[work] ??= []).push({
    src: files[path],
    motion: /\.(gif|mp4)$/.test(name),
    video: name.endsWith(".mp4"),
    phone: /(^|-)m(-|$)/.test(base),
    name: base,
  });
}
// the moving one first, then the numbered sequence as sorted above
for (const list of Object.values(byWork)) list.sort((a, b) => Number(b.motion) - Number(a.motion));

export function shotsFor(id: string): Shot[] {
  return byWork[id] ?? [];
}

/** The crop the project card mounts behind its title, when the project has one. */
export function coverFor(id: string): string | undefined {
  return covers[id];
}

/** The clearest real product view for each project's editorial card and case-study hero. */
const preferred: Record<string, string> = {
  ninho: "02-telas",
  cutucanois: "02-aparencia",
  argus: "02-laboratorio",
  motor: "01-inicio",
  "meu-chamado": "02-painel",
  soluna: "01-vila",
  vault: "01-inicio",
};
export function featureFor(id: string): string | undefined {
  const name = preferred[id];
  return (name ? byWork[id]?.find((shot) => shot.name === name)?.src : undefined) ?? covers[id];
}
