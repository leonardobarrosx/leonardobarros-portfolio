import { useCallback, useEffect, useRef, useState, lazy, Suspense } from "react";
import { usePrefs } from "../state/prefs";
import { useReveal } from "../hooks/useReveal";
import { coverFor, featureFor } from "../data/shots";
import { Label } from "./Label";
import { shared, type Work as WorkItem } from "../data/content";
import { actionLabels } from "../data/actionLabels";
import "../styles/project-editorial.css";

const CaseStudy = lazy(() => import("./CaseStudy").then((m) => ({ default: m.CaseStudy })));

function Poster({ w, position, featured, onOpen }: {
  w: WorkItem;
  position: number;
  featured: boolean;
  onOpen: (id: string, from?: HTMLElement | null) => void;
}) {
  const el = useRef<HTMLButtonElement>(null);
  const cover = featureFor(w.id) ?? coverFor(w.id);
  return (
    <button
      type="button"
      className={`poster editorial-card poster--${w.variant}${featured ? " editorial-card--featured" : ""}${cover ? " has-shot" : ""}`}
      ref={el}
      onClick={() => onOpen(w.id, el.current)}
      data-reveal="clip"
      data-work={w.id}
      data-cursor="view"
      aria-haspopup="dialog"
      aria-label={`${w.title.join(" ")} — ${w.desc}`}
    >
      <span className="editorial-card__visual" aria-hidden="true">
        {cover ? <img src={cover} alt="" loading="lazy" decoding="async" draggable={false} /> :
          <span className="editorial-card__placeholder display">{w.title.join(" ")}</span>}
        <span className="editorial-card__index mono">{String(position).padStart(2, "0")} / PROJECT</span>
        <span className="editorial-card__corner" aria-hidden="true">↗</span>
      </span>
      <span className="editorial-card__content">
        <span className="editorial-card__eyebrow mono"><span>{w.kind}</span><span>{w.year}</span></span>
        <span className="editorial-card__heading display">{w.title.join(" ")}</span>
        <span className="editorial-card__description">{w.desc}</span>
        <span className="editorial-card__footer mono">
          <span className="editorial-card__stack">{w.stack}</span>
          <span className="editorial-card__explore">↗</span>
        </span>
      </span>
    </button>
  );
}

export function Work() {
  const { t, lang } = usePrefs();
  const actions = actionLabels[lang];
  const [showAll, setShowAll] = useState(false);
  const root = useRef<HTMLElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [origin, setOrigin] = useState<DOMRect | null>(null);
  const opened = useRef(false);
  useReveal(root);

  useEffect(() => {
    const fromHash = () => {
      const m = location.hash.match(/^#work\/([a-z0-9-]+)$/);
      setOpenId(m && t.works.some((w) => w.id === m[1]) ? m[1] : null);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [t]);

  const open = useCallback((id: string, from?: HTMLElement | null) => {
    setOrigin(from ? from.getBoundingClientRect() : null);
    history.replaceState(null, "", `#work/${id}`);
    setOpenId(id);
  }, []);

  const close = useCallback(() => {
    history.replaceState(null, "", "#work");
    setOpenId(null);
  }, []);

  const index = t.works.findIndex((w) => w.id === openId);
  if (index >= 0) opened.current = true;

  const step = useCallback((dir: 1 | -1) => {
    if (index < 0) return;
    const next = t.works[(index + dir + t.works.length) % t.works.length];
    history.replaceState(null, "", `#work/${next.id}`);
    setOpenId(next.id);
  }, [index, t.works]);

  const featureIds = ["meu-chamado", "motor", "argus"];
  const featured = featureIds.flatMap((id) => t.works.filter((work) => work.id === id));
  const others = t.works.filter((work) => !featureIds.includes(work.id));

  return (
    <section className="section editorial-work" id="work" ref={root}>
      <div className="wrap">
        <Label n="03" text={t.labels.work} jp="作品" />
        <div className="editorial-work__heading">
          <p className="editorial-work__intro serif-i">{t.labels.work}</p>
          <span className="mono editorial-work__count">{String(t.works.length).padStart(2, "0")} / SELECTED PROJECTS</span>
        </div>
        <div className="editorial-work__featured">
          {featured.map((w, i) => <Poster key={w.id} w={w} position={i + 1} featured onOpen={open} />)}
        </div>
        {others.length > 0 && (
          <div className="editorial-work__progressive">
            <button type="button" className="editorial-work__toggle mono" onClick={() => setShowAll((value) => !value)} aria-expanded={showAll} aria-controls="work-other-projects">
              <span>{showAll ? actions.fewerProjects : actions.allProjects}</span>
              <span aria-hidden="true">{showAll ? "−" : "+"}</span>
            </button>
            {(showAll || (openId !== null && others.some((w) => w.id === openId))) && (
              <div id="work-other-projects" className="editorial-work__expanded">
                <div className="editorial-work__divider mono"><span>{actions.otherProjects}</span><span>{String(others.length).padStart(2, "0")} PROJECTS</span></div>
                <div className="editorial-work__grid">
                  {others.map((w, i) => <Poster key={w.id} w={w} position={i + 4} featured={false} onOpen={open} />)}
                </div>
              </div>
            )}
          </div>
        )}
        <a className="work__more mono" href={shared.github} target="_blank" rel="noreferrer" data-reveal data-cursor="link">
          {t.sheet.more} <span aria-hidden="true">↗</span>
        </a>
      </div>
      <Suspense fallback={null}>
        {(index >= 0 || opened.current) && <CaseStudy works={t.works} index={index} origin={origin} onClose={close} onStep={step} />}
      </Suspense>
    </section>
  );
}
