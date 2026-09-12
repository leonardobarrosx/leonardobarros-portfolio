import { useCallback, useState } from "react";
import { PrefsProvider, usePrefs } from "./state/prefs";
import { useLenis } from "./hooks/useLenis";
import { Preloader } from "./components/Preloader";
import { Cursor } from "./components/Cursor";
import { Nav } from "./components/Nav";
import { Ask } from "./components/Ask";
import { Scrollbar } from "./components/Scrollbar";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Work } from "./components/Work";
import { Experience } from "./components/Experience";
import { Testimonials } from "./components/Testimonials";
import { Stack } from "./components/Stack";
import { Contact } from "./components/Contact";

function Site() {
  const { lang, motionOn } = usePrefs();
  const [ready, setReady] = useState(false);
  const onDone = useCallback(() => setReady(true), []);
  useLenis(ready && motionOn);

  return (
    <>
      <Preloader onDone={onDone} />
      <Cursor />
      <Nav ready={ready} />
      <Scrollbar />
      <Ask ready={ready} />
      {/* Remount all sections when language or motion changes so GSAP splits/triggers rebuild cleanly. */}
      <main key={`${lang}-${motionOn}`}>
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Services />
        <Work />
        <Experience />
        <Testimonials />
        <Stack />
        <Contact />
      </main>
      <div className="grain" aria-hidden="true" />
    </>
  );
}

export default function App() {
  return (
    <PrefsProvider>
      <Site />
    </PrefsProvider>
  );
}
