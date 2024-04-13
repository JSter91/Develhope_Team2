
import astro from "./assets/astro.png";
import "./tuta.css";
import { useState, useEffect, useRef } from "react";

export function Tuta() {
  const [isVisible, setIsVisible] = useState(false);
  const tutaRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!tutaRef.current) return;

      const elementTop = tutaRef.current.getBoundingClientRect().top;
      const elementHeight = tutaRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Calcola l'altezza dell'elemento visibile
      const visibleHeight = Math.min(elementHeight, viewportHeight - elementTop);

      // Calcola il 60% dell'altezza dell'elemento
      const sixtyPercentHeight = 0.6 * elementHeight;

      // Verifica se il 60% dell'altezza è visibile
      const isVisibleNow = visibleHeight >= sixtyPercentHeight;

      setIsVisible(isVisibleNow);
    };

    // Aggiungi l'event listener per lo scroll
    window.addEventListener("scroll", handleScroll);

    // Controlla immediatamente al caricamento della pagina
    handleScroll();

    // Rimuovi l'event listener quando il componente viene smontato
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
         <div className="section-tuta" ref={tutaRef}>
        <h2 className="titolo-suit"> BIO SUIT 2.0 </h2>

        <div className={`main ${isVisible ? "main-visible" : ""}`}>
          <img className="product__image" src={astro} alt="astro-tuta" />
          <div className={`title ${isVisible ? "title-visible" : ""} `}>
            THE INNOVATION
            <span> OF OUR NEW SUIT </span>
            <p className="desc">
              Explore the frontiers of space with our innovative Astronaut
              Suit! Designed with utmost precision and cutting-edge
              technology, our suit offers a perfect blend of safety, comfort,
              and futuristic style. Crafted with ultra-resistant materials,
              our suit shields against the extreme elements of space, ensuring
              thermal insulation, radiation resistance, and protection against
              micrometeoroids.
            </p>
            <div className={`table-tuta ${isVisible ? 'tuta-visible' : ''}`}>
              <p className="lighter">50% LIGHTER WATERPROOF </p>
              <p className="recycled">RECYCLED MATERIALS</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
