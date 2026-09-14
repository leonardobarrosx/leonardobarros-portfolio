import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, scrollToHash } from "../lib/gsap";
import { motion, usePrefs } from "../state/prefs";
import { shared } from "../data/content";
import { decode } from "../lib/decode";
import { LangMenu } from "./LangMenu";
import { ThemeMenu } from "./ThemeMenu";

function localTime() {
  return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: shared.timezone }).format(new Date());
}

const SECTIONS = ["work", "about", "experience", "contact"] as const;

export function Nav({ ready }: { ready: boolean }) {
  const { t, lang, motionOn, toggleMotion } = usePrefs();
  const [time, setTime] = useState(localTime());
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const cvHref = `${import.meta.env.BASE_URL}${lang === "pt" ? shared.cv.pt : shared.cv.en}`;
  const bar = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = window.setInterval(() => setTime(localTime()), 1000);
    return () => window.clearInterval(id);
  }, []);

  // Slide the bar in once the intro is done.
  useLayoutEffect(() => {
    if (!ready || !bar.current) return;
    if (!motion.enabled) { gsap.set(bar.current, { opacity: 1 }); return; }
    gsap.fromTo(bar.current, { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.6 });
  }, [ready]);

  // Scroll progress hairline + active section + dark/light context for the mark.
  useLayoutEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      if (progress.current) {
        gsap.to(progress.current, { scaleX: 1, ease: "none", scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 } });
      }
      SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el, start: "top 50%", end: "bottom 50%",
          onToggle: (self) => { if (self.isActive) setActive(id); },
        });
      });
      gsap.utils.toArray<HTMLElement>(".section--dark").forEach((el) => {
        ScrollTrigger.create({
          trigger: el, start: "top 40px", end: "bottom 40px",
          onToggle: (self) => setDark(self.isActive),
        });
      });
    });
    return () => ctx.revert();
  }, [ready, lang]);

  useLayoutEffect(() => {
    if (menu.current) gsap.set(menu.current, { y: 0, yPercent: -100 });
  }, []);

  // Full-screen menu.
  useEffect(() => {
    if (!menu.current) return;
    document.body.classList.toggle("is-locked", open);
    if (!motion.enabled) { gsap.set(menu.current, { yPercent: open ? 0 : -100 }); return; }
    if (open) {
      gsap.timeline()
        .to(menu.current, { yPercent: 0, duration: 0.7, ease: "power4.inOut" })
        .from(".menu__links a", { y: 40, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.06 }, "-=0.25");
    } else {
      gsap.to(menu.current, { yPercent: -100, duration: 0.6, ease: "power4.inOut" });
    }
  }, [open]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    history.replaceState(null, "", `#${id}`);
    scrollToHash(`#${id}`);
  };

  const hoverScramble = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (!motion.enabled) return;
    const el = e.currentTarget.querySelector<HTMLElement>("span");
    if (el) decode(el, el.dataset.text || el.textContent || "", 0.7);
  };
  const links = SECTIONS.map((id) => (
    <a key={id} href={`#${id}`} onClick={(e) => go(e, id)} onPointerEnter={hoverScramble} className={active === id ? "is-active" : ""} aria-label={t.nav[id]} aria-current={active === id ? "true" : undefined}><span data-text={t.nav[id]} aria-hidden="true">{t.nav[id]}</span></a>
  ));

  return (
    <>
      <div className="progress" ref={progress} aria-hidden="true" />
      <header className={`nav ${dark ? "nav--dark" : ""}`}>
        <div className="nav__bar wrap" ref={bar} style={{ opacity: 0 }}>
          <a className="nav__mark" href="#top" onClick={(e) => go(e, "top")} aria-label="Top"><i />LB</a>
          <nav className="pill nav__links" aria-label="Sections">{links}</nav>
          <div className="nav__right">
            <span className="mono nav__clock">JPA {time}</span>
            <LangMenu />
            <ThemeMenu />
            <div className="pill seg">
              <button onClick={toggleMotion} aria-pressed={motionOn} title={t.nav.motion}>{t.nav.motion}: {motionOn ? t.nav.on : t.nav.off}</button>
            </div>
            <div className="pill seg nav__cv">
              <a href={cvHref} download title={t.contact.cv}>{t.nav.cv} ↓</a>
            </div>
            <div className="pill seg nav__burger">
              <button onClick={() => setOpen(true)} aria-expanded={open}>{t.nav.menu}</button>
            </div>
          </div>
        </div>
      </header>

      <div className="menu" ref={menu} aria-hidden={!open}>
        <div className="menu__top">
          <span className="nav__mark"><i />LB</span>
          <button className="pill seg" onClick={() => setOpen(false)}><span style={{ padding: "6px 10px" }}>{t.nav.close}</span></button>
        </div>
        <nav className="menu__links">
          {SECTIONS.map((id, i) => (
            <a key={id} href={`#${id}`} onClick={(e) => go(e, id)}><small>0{i + 1}</small>{t.nav[id]}</a>
          ))}
        </nav>
        <div className="menu__foot mono">
          <LangMenu inline />
          <ThemeMenu inline />
          <a className="menu__cv" href={cvHref} download>{t.contact.cv} ↓</a>
          <span>{t.meta.location} · JPA {time}</span>
          <span>{shared.email}</span>
        </div>
      </div>
    </>
  );
}
