import { useEffect, useRef, useState } from "react";
import { LANGS } from "../data/content";
import { usePrefs } from "../state/prefs";

/** Compact language switcher: current code as a pill button, native names in a popover. */
export function LangMenu({ inline = false }: { inline?: boolean }) {
  const { lang, setLang, t } = usePrefs();
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
      <div className="langs" role="group" aria-label={t.nav.language}>
        {LANGS.map((l) => (
          <button key={l.code} className={l.code === lang ? "is-active" : ""} onClick={() => setLang(l.code)} aria-pressed={l.code === lang} lang={l.html}>{l.name}</button>
        ))}
      </div>
    );
  }

  return (
    <div className="pill seg langmenu" ref={root}>
      <button onClick={() => setOpen((o) => !o)} aria-haspopup="listbox" aria-expanded={open} title={t.nav.language}>{lang.toUpperCase()} <i aria-hidden="true">▾</i></button>
      {open && (
        <ul className="langmenu__list" role="listbox" aria-label={t.nav.language}>
          {LANGS.map((l) => (
            <li key={l.code} role="option" aria-selected={l.code === lang}>
              <button className={l.code === lang ? "is-active" : ""} onClick={() => { setLang(l.code); setOpen(false); }} lang={l.html}>
                <span className="mono">{l.code.toUpperCase()}</span> {l.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
