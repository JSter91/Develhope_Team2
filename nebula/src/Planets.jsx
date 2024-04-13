import React, { useContext, useEffect, useState } from "react";
import "./Planets.css";
import { GlobalContext } from "./GlobalContext";

import Moon from "./assets/Moon.png";
import Mars from "./assets/Mars.png";
import Jupiter from "./assets/Jupiter.png";
import Mercury from "./assets/Mercury.png";
import Saturn from "./assets/Saturn.png";
import Neptune from "./assets/Neptune.png";
import Uranus from "./assets/Uranus.png";
import Venus from "./assets/Venus.png";
import placeholderImage from "./assets/Daco.png";

const planetArr = [
  Moon,
  Mars,
  Venus,
  Mercury,
  Jupiter,
  Saturn,
  Neptune,
  Uranus,
];

/* ----------------------------------------------- */
function Planets() {
  const [isSelected, setIsSelected] = useState(false);

  const { selectedOption } = useContext(GlobalContext);

  const isEmptySelection = !selectedOption;
  const planetIndex = selectedOption
    ? planetArr.findIndex((planet) => planet.includes(selectedOption))
    : -1;

  const planetImage = isEmptySelection
    ? placeholderImage
    : planetIndex !== -1
    ? planetArr[planetIndex]
    : null;

  useEffect(() => {
    setIsSelected(() => false); 
    setTimeout(() => {
      setIsSelected(() => true);
    }, 300);
  }, [selectedOption]);

  const planetSlide = isSelected
    ? "planet-viewer planet-slide "
    : "planet-viewer";
  const planetOpacity = isSelected ? "planet-opacity-1" : "planet-opacity-0";

  return (
    <div className="planets-container">
      <div className={planetOpacity}>
        <img
          className={planetSlide}
          src={planetImage}
          alt={selectedOption || "No planet selected"}
        />
      </div>
      <h5 className="planet-name">{selectedOption || "Nebula "}</h5>{" "}
    </div>
  );
}

export default Planets;
