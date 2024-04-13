import { useEffect } from "react";
import "./Footer.css";
import nebulaLogo from "./assets/logogo.png"
import nebulaLogo_black from "./assets/logogo_black.png"

import Facebook from "./assets/icons8-facebook-100.png";
import Twitter from "./assets/icons8-twitterx-100.png";
import Instagram from "./assets/icons8-instagram-100.png";
import Nasaimg from "./assets/Nasa.png";
import Spaceximg from "./assets/Spacex.png";
import Googleimg from "./assets/google.png";
import Moon from "./assets/Moon.png";
import { useRef } from "react";
export function Footer() {


  const imgRef = useRef(null);

  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        if (imgRef.current) {
          const winScrollY = window.scrollY;
          const elementRect = imgRef.current.getBoundingClientRect();
          const translateY = (winScrollY - elementRect.top) * -0.12;
          imgRef.current.style.transform = `translateY(${translateY}px)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);


  return (
    <>
      <div className="moon-container">
      <img className="nebulaLogo_black" src={nebulaLogo_black} alt="logo_black" />

        <div className="gradient"></div>
        <img ref={imgRef} className="parallax" src={Moon}></img>
      </div>
      <footer className="footer">
        <div className="top-footer">
          <img className="nebulaLogo" src={nebulaLogo} alt="logo" />
          <div className="Icons-title">
            <h3 className="footer-title">Follow us</h3>
            <img className="icons-img facebook" src={Facebook} />
            <img className="icons-img twitter" src={Twitter} />
            <img className="icons-img instagram" src={Instagram} />
          </div>
          <div className="partners">
            <h3 className="footer-title">Our Partner</h3>
            <img className="Googleimg" src={Googleimg}></img>
            <img className="Nasaimg" src={Nasaimg}></img>
            <img className="Spaceximg" src={Spaceximg}></img>
          </div>
        </div>
        <div className="footer_links">
          <ul className="contact-links">
            <h3>Contact us</h3>
            <br></br>
            <li>
              <a href="#">Customer care</a>
            </li>
            <li>
              <a href="#">Service guarantee</a>
            </li>
            <li>
              <a href="#">Other service information</a>
            </li>
            <li>
              <a href="#">Site Feedback</a>
            </li>
          </ul>
          <ul className="Nebula.com-links">
            <h3>Nebula.com</h3>
            <br></br>
            <li>
              <a href="#">Who we are?</a>
            </li>
            <li>
              <a href="#">News</a>
            </li>
            <li>
              <a href="#">Work with us</a>
            </li>
            <li>
              <a href="#">General conditions</a>
            </li>
            <li>
              <a href="#">Privacy policy</a>
            </li>
            <li>
              <a href="#">Nebula.com group</a>
            </li>
          </ul>

          <ul>
            <h3>Other services</h3>
            <br></br>
            <li>
              <a href="#">Investor relations</a>
            </li>
            <li>
              <a href="#">Nebula.com Rewards</a>
            </li>
            <li>
              <a href="#">Partner</a>
            </li>
            <li>
              <a href="#">Add your trip</a>
            </li>
            <li>
              <a href="#">Safety</a>
            </li>
          </ul>
        </div>

        <div className="footer_copy">
          <p>&copy;2024 Nebula.com™. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
