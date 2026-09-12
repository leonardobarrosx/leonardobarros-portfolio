import { useCallback, useState } from "react";
import { useLenis } from "./hooks/useLenis";
import { Preloader } from "./components/Preloader";
import { Cursor } from "./components/Cursor";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Work } from "./components/Work";
import { Experience } from "./components/Experience";
import { Stack } from "./components/Stack";
import { Contact } from "./components/Contact";

export default function App() {
  const [ready, setReady] = useState(false);
  const onDone = useCallback(() => setReady(true), []);
  useLenis(ready);

  return (
    <>
      <Preloader onDone={onDone} />
      <Cursor />
      <Nav />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Services />
        <Work />
        <Experience />
        <Stack />
        <Contact />
      </main>
      <div className="grain" aria-hidden="true" />
    </>
  );
}
