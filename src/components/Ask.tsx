import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { decode } from "../lib/decode";
import { LS_ASKED, motion, read, usePrefs, write } from "../state/prefs";
import { Swatches } from "./ThemeMenu";

/**
 * A small card that turns up once, out of nowhere, and asks for the visitor's favourite colour.
 * Picking one re-themes the site; skipping keeps the house palette. Either way it never comes back.
 */
export function Ask({ ready }: { ready: boolean }) {
  const { t } = usePrefs();
  const [show, setShow] = useState(false);
  const [thanks, setThanks] = useState(false);
  const card = useRef<HTMLDivElement>(null);
  const question = useRef<HTMLParagraphElement>(null);

  // Never over the first read: it waits until the visitor has been through the work and reaches the
  // experience section (or most of the page). Never again after it was answered or skipped (or a theme
  // was picked from the menu); `?ask` forces it.
  useEffect(() => {
    const forced = new URLSearchParams(location.search).has("ask");
    if (!ready || (read(LS_ASKED) && !forced)) return;
    let fired = false;
    const fire = () => { if (fired) return; fired = true; setShow(true); };
    const onScroll = () => {
      const xp = document.getElementById("experience");
      const reached = xp ? xp.getBoundingClientRect().top < window.innerHeight * 0.5 : false;
      const deep = window.scrollY > (document.documentElement.scrollHeight - window.innerHeight) * 0.6;
      if (reached || deep) fire();
    };
    const timer = forced ? window.setTimeout(fire, 1200) : 0;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.clearTimeout(timer); window.removeEventListener("scroll", onScroll); };
  }, [ready]);

  // Enter: the card pops up, the question decodes, the dots follow.
  useLayoutEffect(() => {
    if (!show || !card.current) return;
    const el = card.current;
    if (!motion.enabled) { gsap.set(el, { opacity: 1, y: 0 }); return; }
    const ctx = gsap.context(() => {
      gsap.timeline()
        .fromTo(el, { y: 32, opacity: 0, scale: 0.94 }, { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "back.out(1.5)" })
        .from(".ask__kicker, .ask__hint, .ask__skip", { opacity: 0, y: 6, duration: 0.5, stagger: 0.05 }, 0.3)
        .from(".ask .swatch", { scale: 0, opacity: 0, duration: 0.6, ease: "back.out(2)", stagger: 0.04 }, 0.45)
        .add(question.current ? decode(question.current, t.ask.question, 1.2) : () => {}, 0.35);
    }, el);
    return () => ctx.revert();
  }, [show, t]);

  const leave = () => {
    write(LS_ASKED, "1");
    if (!motion.enabled || !card.current) { setShow(false); return; }
    gsap.to(card.current, { y: 24, opacity: 0, duration: 0.45, ease: "power3.in", onComplete: () => setShow(false) });
  };

  const picked = () => {
    setThanks(true);
    if (motion.enabled && question.current) decode(question.current, t.ask.thanks, 1.2);
    else if (question.current) question.current.textContent = t.ask.thanks;
    window.setTimeout(leave, 3200);
  };

  if (!show) return null;
  return (
    <div className={`ask ${thanks ? "is-done" : ""}`} ref={card} role="dialog" aria-label={t.ask.question} style={{ opacity: 0 }}>
      <span className="ask__kicker mono"><i aria-hidden="true" />{t.ask.kicker}</span>
      <p className="ask__q serif-i" ref={question}>{t.ask.question}</p>
      <Swatches size="lg" onPick={picked} />
      <div className="ask__foot mono">
        <span className="ask__hint">{t.ask.hint}</span>
        <button type="button" className="ask__skip" onClick={leave}>{t.ask.skip} ✕</button>
      </div>
    </div>
  );
}
