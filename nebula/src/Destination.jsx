import React, { useContext, useEffect, useState } from "react";
import Drop from "./Drop";
import "./Destination.css";
import Planets from "./Planets";
import { GlobalContext } from "./GlobalContext";

function Destination({ id }) {
  const { selectedOption, setIsVisible1 } = useContext(GlobalContext);
  useEffect(() => {
    const handleScroll = () => {
      // Ottieni l'elemento
      const element = document.getElementById("section1");
  
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
        setIsVisible1(isFiftyPercentVisible);
      }
    };
  
    // Aggiungi l'event listener per lo scroll
    window.addEventListener("scroll", handleScroll);
  
    // Rimuovi l'event listener quando il componente viene smontato
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const planetBackgrounds = {
    Moon: "moon-background",
    Mars: "mars-background",
    Venus: "venus-background",
    Mercury: "mercury-background",
    Jupiter: "jupiter-background",
    Saturn: "saturn-background",
    Neptune: "neptune-background",
    Uranus: "uranus-background",
  };
  const planetBackground = planetBackgrounds[selectedOption] || "none";

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(true);
    const timeoutId = setTimeout(() => {
      setIsActive(false);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [selectedOption]);

  return (
    <div className="destination-section" id={id}>
      <div className={`destination-container prev-back ${isActive ? "" : "inactive"} ${planetBackground}`}>
        <Drop></Drop>
        <Planets></Planets>
      </div>
    </div>
  );
}

export default Destination;
