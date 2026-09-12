import { useEffect, useRef, useState, type CSSProperties } from "react";
import { THEMES } from "../data/themes";
import { usePrefs } from "../state/prefs";

function Swatches({ onPick }: { onPick?: () => void }) {
  const { theme, setTheme, t } = usePrefs();
  return (
    <div className="swatches" role="group" aria-label={t.nav.theme}>
      {THEMES.map((th) => (
        <button
          key={th.id}
          type="button"
          className={`swatch ${th.id === theme ? "is-active" : ""}`}
          style={{ "--sw": th.tokens["--accent"], "--sw-2": th.tokens["--accent-light"] } as CSSProperties}
          onClick={() => { setTheme(th.id); onPick?.(); }}
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
        <span className="mono">{t.nav.theme} · {t.themes[theme]}</span>
        <Swatches />
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
          <Swatches onPick={() => setOpen(false)} />
          <span className="mono thememenu__name">{t.themes[theme]}</span>
        </div>
      )}
    </div>
  );
}
