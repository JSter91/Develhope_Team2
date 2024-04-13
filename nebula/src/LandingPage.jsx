import { useState, useEffect } from "react";
import landingPage from "./landingPage.module.css";
import Spline from "@splinetool/react-spline";
import Login from "./Login";

export default function LandingPage() {
  const [expanded, setExpanded] = useState(false);
  const [ready, setReady] = useState(false);
  const [display, setDisplay] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isVisible, setIsVisible] = useState(true);


  const toggleDiv = () => {
    setDisplay(!display);
    setExpanded(!expanded);
    setTimeout(() => {
      setShowLogin(!showLogin);
    }, 900);
    setTimeout(() => {
      setReady(!ready);
    }, 500);
    setIsVisible(!isVisible)
  };



  return (
    <>
      <div className={landingPage.container}>
        <Spline
          className={`${landingPage.spline_container} ${
            display ? landingPage.hidden : false
          } `}
          scene="https://prod.spline.design/JX2TI5KM2FzNgp4r/scene.splinecode"
        />
        <div className={landingPage.login}>

          <div
            id={landingPage.animatedDiv}
            className={`${landingPage.animatedDiv} ${
              expanded ? landingPage.expanded : false
            } ${ready ? landingPage.ready : false}`}
          >
            {showLogin && <Login></Login>}
          </div>
        </div>

        <div className={landingPage.buttons_container}>
          <button
            onClick={() => toggleDiv()}
            className={landingPage.landing_button}
          >
            <p className={`${landingPage.start} ${isVisible ? landingPage.fade_in : landingPage.fade_out}`}>Start Your Journey</p>
          </button>
        </div>
        <div className={landingPage.footer_copy}>
          <p>&copy;2024 Nebula.com™. All rights reserved.</p>
        </div>
      </div>
    </>
  );
}
