import { useEffect, useLayoutEffect, useState } from "react";
import {
  Hero,
  Header,
  FirstGame,
  Location,
  FAQ,
  Contact,
  Footer,
} from "./Sections.jsx";
import { Offers, GameNotice } from "./Offers.jsx";
import { Gallery } from "./Gallery.jsx";
import { Field } from "./Field.jsx";
import { QuickBooking, SectionRail } from "./Navigation.jsx";
import { event } from "./club.js";
import { heroMotion } from "./heroMotion.js";
import { sectionMotion } from "./sectionMotion.js";
import { terrainMotion } from "./terrainMotion.js";

function Seam({ name }) {
  return (
    <div
      className={`section-seam seam-${name}`}
      aria-hidden="true"
      data-viewport="once"
    />
  );
}

export default function App() {
  const [upcoming, setUpcoming] = useState(
    () => Date.now() < event.starts.getTime(),
  );
  useEffect(() => {
    let timer;
    function refresh() {
      clearTimeout(timer);
      const remaining = event.starts.getTime() - Date.now();
      setUpcoming(remaining > 0);
      if (remaining > 0)
        timer = setTimeout(refresh, Math.min(remaining, 2147483647));
    }
    refresh();
    document.addEventListener("visibilitychange", refresh);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  useLayoutEffect(() => {
    const cleanups = [heroMotion(), sectionMotion(), terrainMotion()];
    const id = location.hash.slice(1);
    if (id)
      document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
    return () => cleanups.forEach((cleanup) => cleanup?.());
  }, []);

  return (
    <>
      <div className="scroll-meter" aria-hidden="true" />
      <a className="skip" href="#main">
        К содержанию
      </a>
      <Header />
      <main id="main">
        <Hero />
        <GameNotice upcoming={upcoming} />
        <Offers />
        <Seam name="first" />
        <FirstGame />
        <Seam name="field" />
        <Field />
        <Seam name="gallery" />
        <Gallery />
        <Seam name="location" />
        <Location />
        <FAQ />
        <Seam name="contact" />
        <Contact />
      </main>
      <Footer />
      <SectionRail />
      <QuickBooking />
    </>
  );
}
