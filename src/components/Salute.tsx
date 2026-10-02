import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefs, write } from "../state/prefs";
import { LS_THEME } from "../data/themes";

/** Where the anthem would live. Nothing is requested until the visitor presses play. */
const ANTHEM = `${import.meta.env.BASE_URL}audio/cancao-da-infantaria.mp3`;

/**
 * The easter egg behind the infantry mark in About.
 *
 * A double click crowns the mark in gold and shows the line about the queen of battle. Three more
 * clicks hand the whole site the hidden campaign theme and offer the anthem, which only plays on an
 * explicit press: a portfolio that starts making noise by itself is a portfolio someone closes.
 */
export function useSalute() {
  const { theme, setTheme } = usePrefs();
  const [crowned, setCrowned] = useState(false);
  const [open, setOpen] = useState(false);
  const clicks = useRef(0);
  const before = useRef(theme);

  const onDoubleClick = useCallback(() => {
    if (crowned) return;
    before.current = theme;
    clicks.current = 0;
    setCrowned(true);
  }, [crowned, theme]);

  const onClick = useCallback(() => {
    // after standing down the whole sequence is available again, from the double click
    if (!crowned || open) return;
    clicks.current += 1;
    if (clicks.current >= 3) {
      setTheme("campanha");
      // an easter egg should not outlive the visit: a reload comes back to their own colour
      write(LS_THEME, before.current);
      setOpen(true);
    }
  }, [crowned, open, setTheme]);

  const dismiss = useCallback(() => {
    setOpen(false);
    setCrowned(false);
    clicks.current = 0;
    setTheme(before.current === "campanha" ? "red" : before.current);
  }, [setTheme]);

  return { crowned, open, dismiss, handlers: { onDoubleClick, onClick } };
}

export function SaluteToast({ onDismiss }: { onDismiss: () => void }) {
  const { t } = usePrefs();
  const audio = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(false);

  // Only offer the anthem if the file is actually there.
  useEffect(() => {
    let alive = true;
    fetch(ANTHEM, { method: "HEAD" })
      .then((r) => {
        // a dev server answers unknown paths with the page itself, so check what came back
        const type = r.headers.get("content-type") ?? "";
        if (alive && r.ok && type.startsWith("audio/")) setAvailable(true);
      })
      .catch(() => { /* no anthem on this build */ });
    return () => { alive = false; };
  }, []);

  useEffect(() => () => { audio.current?.pause(); }, []);

  const toggle = () => {
    if (!audio.current) {
      audio.current = new Audio(ANTHEM);
      audio.current.loop = true;
      audio.current.volume = 0.45;
      audio.current.addEventListener("ended", () => setPlaying(false));
    }
    if (playing) { audio.current.pause(); setPlaying(false); return; }
    audio.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };

  const close = () => { audio.current?.pause(); onDismiss(); };

  return (
    <div className="salute mono" role="status">
      <div className="salute__text">
        <b>{t.about.salute.title}</b>
        <span>{t.about.salute.hint}</span>
      </div>
      {available && <button type="button" onClick={toggle} data-cursor="link">{playing ? t.about.salute.pause : t.about.salute.play}</button>}
      <button type="button" onClick={close} data-cursor="link">{t.about.salute.exit}</button>
    </div>
  );
}
