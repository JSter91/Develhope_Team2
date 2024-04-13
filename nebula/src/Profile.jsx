import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useContext } from "react";
import { GlobalContext } from "./GlobalContext"; // Importa il context in cui sono conservati i dati

function Profile({ expanded, ready, setReady, setExpanded }) {
  const { userData, setUserData } = useContext(GlobalContext);

  useEffect(() => {
    // Recupera i dati dell'utente dal localStorage al caricamento del componente
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      // Effettua il parsing della stringa JSON recuperata dal localStorage
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);     }
  }, []); // Esegui solo al primo render del componente
  const back = () => {
    setReady(!ready);

    setTimeout(() => {
      setExpanded(!expanded);
    }, 500);
  };

  const logout = () => {
    const token = localStorage.getItem("token"); // Prendi il token dal localStorage
    if (!token) {
      console.error("Token non trovato nel localStorage");
      return;
    }
  
    // Effettua la richiesta di logout al server includendo il token
    fetch("http://localhost:5000/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
    .then(response => {
      if (response.ok) {
        console.log("Logout successful");
        localStorage.removeItem("token"); // Rimuovi il token dal localStorage dopo il logout
        localStorage.removeItem("userData");
        window.location.href = "/"; // Redirect alla pagina di login o homepage dopo il logout
      } else {
        console.error("Logout failed:", response.statusText);
        // Gestisci il fallimento del logout, ad esempio mostrando un messaggio all'utente
      }
    })
    .catch(error => {
      console.error("Logout error:", error.message);
      // Gestisci gli errori di rete o del server
    });
  };
    
  return (
    <>
      <div
        className={`${"profile"} ${expanded ? "expanded_profile" : false} ${
          ready ? "ready_profile" : false
        }`}
      >
        <div className={`${"profile-container"} ${!ready && "hidden"}`}>
          <div className="profile-section">
            <div className="user_profile">
              <p>User Profile </p>
              <button onClick={back}> Back</button>
            </div>

            {userData && (
              <div className="userData">
                <div className="userImage"></div>
                <div className="profile-data">
                  <label>Full Name : </label>
                  <span>{userData.full_name}</span>
                  <br />
                  <br />

                  <label>Email : </label>

                  <span>{userData.email}</span>
                </div>
              </div>
            )}
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
