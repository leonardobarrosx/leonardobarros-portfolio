import { useEffect, useState } from "react";
import { meta } from "../data/content";

function localTime() {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: meta.timezone,
  }).format(new Date());
}

export function Nav() {
  const [time, setTime] = useState(localTime());
  useEffect(() => {
    const id = window.setInterval(() => setTime(localTime()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <header className="nav">
      <a className="nav__mark" href="#top" aria-label="Top">
        LB
      </a>
      <nav className="nav__links mono">
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#experience">Experience</a>
        <a href="#contact">Contact</a>
      </nav>
      <div className="nav__right mono">
        <span>JPA {time}</span>
      </div>
    </header>
  );
}
