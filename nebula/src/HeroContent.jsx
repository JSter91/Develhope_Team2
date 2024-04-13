import React, { useEffect, useState } from "react";
import "./HeroContent.css";

function HeroContent({ id }) {
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);
  const [showFourth, setShowFourth] = useState(false);

  useEffect(() => {
    const intervalFirst = setInterval(() => {
      setShowFirst(true);
    }, 800);

    const intervalSecond = setInterval(() => {
      setShowSecond(true);
    }, 1000);

    const intervalThird = setInterval(() => {
      setShowThird(true);
    }, 2000);

    const intervalFourth = setInterval(() => {
      setShowFourth(true);
    }, 2200);

    return () => {
      clearInterval(intervalFirst);
      clearInterval(intervalSecond);
      clearInterval(intervalThird);
      clearInterval(intervalFourth);
    };
  }, []);
  return (
    <>
      <div className="hero-content" id={id}>
        {/* <div className="phrase">
          <div className= {`to ${showFirst ? "to phrase-holder" : "prev-holder hidden1"}`}>
            <p className={` ${showFirst ? "prhase-show" : "phrase-hidden"}`}>
              to
            </p>
          </div>
          <div className= {` ${showFirst ? "phrase-holder infinity" : "prev-holder hidden2"}`}>
            <p className={`${showSecond ? "prhase-show" : "phrase-hidden"}`}>
              infinity
            </p>
          </div>
          <div className= {` ${showFirst ? "phrase-holder-late and" : "prev-holder hidden3"}`}>
            <p className={` ${showThird ? "prhase-show" : "phrase-hidden"}`}>
              and
            </p>
          </div>
          <div className= {` ${showFirst ? "phrase-holder-late beyond" : "prev-holder hidden4"}`}>
            <p className={`${showFourth ? "prhase-show" : "phrase-hidden"}`}>
              beyond
            </p>
          </div>
        </div> */}
        <div className="star-animation">
          <span className="star-span"></span>
          <span className="star-span"></span>
          <span className="star-span"></span>
          <span className="star-span"></span>
        </div>
      </div>
    </>
  );
}

export default HeroContent;
