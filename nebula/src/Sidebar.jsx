import React, { useState, useEffect } from "react";
import "./sidebar.css";
import Profile from "./Profile";
import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import { useNavigate } from "react-router-dom";

function Sidebar() {

  const { scrollBlocked,setScrollBlocked} = useContext(GlobalContext)
  // const { showProfile, setShowProfile } = useContext(SideContext);
  const [expanded, setExpanded] = useState(false);
  const [ready, setReady] = useState(false);


  // const [scrollBlocked, setScrollBlocked] = useState(false);
  const [overlay, setOverlay] = useState(false)
  const toggleScroll = () => {
    setScrollBlocked(!scrollBlocked);
    setOverlay(!overlay)
  };
  // Applica lo stile appropriato al body in base allo stato dello scroll
  if (scrollBlocked) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
  /* ---------------------------------------------------- */

  const toggleProfile = (e) => {
    setExpanded(() => !expanded);
    setTimeout(() => {
      setReady(!ready);
    }, 400);
  };
const navigateBook = useNavigate()
  function handleBookPage(){
    navigateBook("../book")
  }

  return (
    <>
      <label htmlFor="menu-control" className="hamburger" onClick={toggleScroll} >
        <i className="hamburger__icon"></i>
        <i className="hamburger__icon"></i>
        <i className="hamburger__icon"></i>
      </label>

      <input type="checkbox" id="menu-control" className="menu-control" />

      <aside className="sidebar">
        <div className={overlay ? "overlay-visible" :"overlay-hidden"}>
        </div>

        <nav className="sidebar__menu">
          <button onClick={toggleProfile}>
            <span className="underline">Profile</span>
          </button>
          <button onClick={handleBookPage}>
            <span className="underline">My bookings</span>
          </button>
          <button>
            <span className="underline">Privacy Policy</span>
          </button>
          <button>
            <span className="underline">Contacts</span>
          </button>
        </nav>

        <label htmlFor="menu-control" className="sidebar__close" onClick={toggleScroll} ></label>

      </aside>
      <Profile
        expanded={expanded}
        setExpanded={setExpanded}
        ready={ready}
        setReady={setReady}
      ></Profile>
    </>
  );
}

export default Sidebar;
