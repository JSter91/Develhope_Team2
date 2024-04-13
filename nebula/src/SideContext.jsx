import React, { createContext } from "react";
import { useState } from "react";

export const SideContext = createContext();

function SideContextProvider({ children }) {
  const [showProfile, setShowProfile] = useState(false);


  const value = {
    showProfile,
    setShowProfile,
  };

  return <SideContext.Provider value={value}>{children}</SideContext.Provider>;
}

export default SideContextProvider;
