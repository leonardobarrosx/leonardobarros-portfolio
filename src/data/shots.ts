/**
 * Screens captured from the projects actually running, with mock data.
 *
 * Files live in `src/assets/cases/<work id>/` and are picked up here by name, so adding a capture
 * is a matter of dropping the file in the folder: `NN-name.webp` joins the sequence in order and
 * `loop.gif` becomes the moving one, which the gallery shows first.
 */
const files = import.meta.glob("../assets/cases/*/*.{webp,gif}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export interface Shot {
  src: string;
  /** The loop is a GIF: it leads the gallery and is never lazy-loaded. */
  motion: boolean;
}

const byWork: Record<string, Shot[]> = {};
for (const path of Object.keys(files).sort()) {
  const m = path.match(/\/cases\/([^/]+)\/([^/]+)$/);
  if (!m) continue;
  const [, work, name] = m;
  (byWork[work] ??= []).push({ src: files[path], motion: name.endsWith(".gif") });
}
// the moving one first, then the numbered sequence as sorted above
for (const list of Object.values(byWork)) list.sort((a, b) => Number(b.motion) - Number(a.motion));

export function shotsFor(id: string): Shot[] {
  return byWork[id] ?? [];
}
