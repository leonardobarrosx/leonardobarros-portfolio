import { useEffect, useRef, useState, type CSSProperties } from "react";
import { THEMES, type ThemeId } from "../data/themes";
import { usePrefs } from "../state/prefs";

/** The nine hues as dots. Hovering tries a theme on, clicking keeps it. */
export function Swatches({ onPick, onHover, size }: { onPick?: (id: ThemeId) => void; onHover?: (id: ThemeId | null) => void; size?: "lg" }) {
  const { theme, setTheme, previewTheme, t } = usePrefs();
  const hover = (id: ThemeId | null) => { previewTheme(id); onHover?.(id); };
  return (
    <div className={`swatches ${size === "lg" ? "swatches--lg" : ""}`} role="group" aria-label={t.nav.theme} onPointerLeave={() => hover(null)}>
      {THEMES.map((th) => (
        <button
          key={th.id}
          type="button"
          className={`swatch ${th.id === theme ? "is-active" : ""}`}
          style={{ "--sw": th.tokens["--accent"], "--sw-2": th.tokens["--accent-light"] } as CSSProperties}
          onPointerEnter={() => hover(th.id)}
          onClick={() => { setTheme(th.id); onPick?.(th.id); }}
          aria-pressed={th.id === theme}
          aria-label={t.themes[th.id]}
          title={t.themes[th.id]}
          data-cursor="link"
        >
          <i aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}

/** Colour theme picker: a dot in the current accent as a pill button, swatches for every hue in a popover. */
export function ThemeMenu({ inline = false }: { inline?: boolean }) {
  const { theme, t } = usePrefs();
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<ThemeId | null>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", onDoc);
    window.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDoc); window.removeEventListener("keydown", onKey); };
  }, [open]);

  if (inline) {
    return (
      <div className="themes">
        <span className="mono">{t.nav.theme} · {t.themes[hover ?? theme]}</span>
        <Swatches onHover={setHover} />
      </div>
    );
  }

  return (
    <div className="pill seg thememenu" ref={root}>
      <button onClick={() => setOpen((o) => !o)} aria-haspopup="true" aria-expanded={open} title={`${t.nav.theme}: ${t.themes[theme]}`} aria-label={t.nav.theme}>
        <i className="thememenu__dot" aria-hidden="true" />
      </button>
      {open && (
        <div className="thememenu__pop">
          <Swatches onPick={() => setOpen(false)} onHover={setHover} />
          <span className="mono thememenu__name">{t.themes[hover ?? theme]}</span>
        </div>
      )}
    </div>
  );
}
