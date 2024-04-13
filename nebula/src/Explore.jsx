import "./explore.css";
import canyon from "./assets/canyon.jpeg";
import mars from "./assets/Mars.png";
import astromare from "./assets/astromare.jpg";
import nettuno from "./assets/Neptune.png";
import venere from "./assets/Venus.png";
import quadsadv from "./assets/quadsadv.png";
import {GlobalContext} from "./GlobalContext";
import { useState, useEffect, useContext } from "react";
import info from "./assets/icons8-info-100.png"


export function Explore({ id }) {
  const { setIsVisible2, isVisible2 } = useContext(GlobalContext);

  useEffect(() => {
    const handleScroll = () => {
      // Ottieni l'elemento
      const element = document.getElementById("section2");
  
      // Verifica se l'elemento esiste
      if (element) {
        // Calcola la posizione dell'elemento rispetto al top della finestra
        const elementTop = element.getBoundingClientRect().top;
  
        // Calcola l'altezza dell'elemento
        const elementHeight = element.offsetHeight;
  
        // Calcola l'altezza del 60% dell'elemento
        const fiftyPercentElementHeight = elementHeight * 0.5;
  
        // Calcola l'altezza del 60% della viewport
        const fiftyPercentViewportHeight = window.innerHeight * 0.5;
  
        // Verifica se almeno il 60% dell'altezza dell'elemento è visibile nella viewport
        const isFiftyPercentVisible = elementTop < fiftyPercentViewportHeight && elementTop + fiftyPercentElementHeight > 0;
  
        // Imposta isVisible a true solo se almeno il 60% dell'altezza dell'elemento è visibile
        setIsVisible2(isFiftyPercentVisible);
      }
    };
  
    // Aggiungi l'event listener per lo scroll
    window.addEventListener("scroll", handleScroll);
  
    // Rimuovi l'event listener quando il componente viene smontato
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
      

  return (
    <>
      <div className="explore_container" id={id}>
        <div className="containerAllCards">
          <div className="cards">
            <div className="adventures-card canyon">
              <img className="planetpng" src={mars} alt="mars" />
              <h4 id="underline-text">CANYON TENT ADVENTURES </h4>
              <div className="desc-adventures-card">
                <p>In the vast Martian canyons, where rust-colored cliffs rise against a dusty pink sky, every step feels like a journey through time and space. Amidst the otherworldly landscape, we ventured, tracing ancient riverbeds, discovering hidden caves, and marveling at the alien beauty of Mars.</p>
              <img className="info-icon" src={info} alt="info canyon" />
              </div>
            </div>

            <div className="adventures-card astromare">
              <img className="planetpng" src={nettuno} alt="neptune" />

              <h4 id="underline-text">
                OCEAN AERIAL TOUR
              </h4>
              <div className="desc-adventures-card">
                <p>Embarking on an ocean aerial tour of Neptune is a voyage beyond imagination. Hovering above the azure expanse, we witness the grandeur of colossal storms swirling in the atmosphere. As we glide over icy waves, Neptune reveals its mystique.</p>
              <img className="info-icon" src={info} alt="info canyon" />
              </div>

            </div>

            <div className="adventures-card venere">
              <img className="planetpng" src={venere} alt="venenus" />
              <h4 id="underline-text">
                 THE ALIENS DUNE TOUR
              </h4>
              <div className="desc-adventures-card">
                <p>Traversing the desert dunes of Venus unveils a surreal landscape, where golden sands stretch endlessly beneath the scorching sun. Amidst swirling dust devils, we navigate towering dunes sculpted by relentless winds.</p>
              <img className="info-icon" src={info} alt="info canyon" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
