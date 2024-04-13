import "./navbar.css";
import Sidebar from "./Sidebar";
import SideContextProvider from "./SideContext";
import { GlobalContext } from "./GlobalContext";
import { useContext } from "react";

export function Navbar() {
  const { scrollBlocked, isVisible1, isVisible2, isVisible3, isVisible4 } =
    useContext(GlobalContext);

  const handleLinkClick = (event, id) => {
    event.preventDefault();
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <nav className="Navbar">
        <div className="Navbar-div">
          <h1 className="Nebula-span">Nebula</h1>
        </div>
        <ul
          className={
            scrollBlocked ? "Nav-ul-container-no-events " : "Nav-ul-container"
          }
        >
          <li className="li-container">
            <a
              href="#section1"
              className={`li-container underline ${
                isVisible1 ? "visible" : ""
              }`}
              onClick={(e) => handleLinkClick(e, "section1")}
            >
              Book your trip
            </a>
          </li>
          <li className="li-container">
            <a
              href="#section2"
              className={`li-container underline ${
                isVisible2 ? "visible" : ""
              }`}
              onClick={(e) => handleLinkClick(e, "section2")}
            >
              Explore
            </a>
          </li>
          <li className="li-container">
            <a
              href="#section3"
              className={`li-container underline ${
                isVisible3 ? "visible" : ""
              }`}
              onClick={(e) => handleLinkClick(e, "section3")}
            >
              Solar System
            </a>
          </li>
          <li className="li-container">
            <a
              href="#section4"
              className={`li-container underline ${
                isVisible4 ? "visible" : ""
              }`}
              onClick={(e) => handleLinkClick(e, "section4")}
            >
              News
            </a>
          </li>
        </ul>
        <SideContextProvider>
          <Sidebar></Sidebar>
        </SideContextProvider>
      </nav>
    </>
  );
}
