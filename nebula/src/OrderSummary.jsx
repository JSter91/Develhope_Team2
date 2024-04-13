import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderSummary = ({ billingData }) => {
  const returnAtHome = useNavigate();

  function returnToHome() {
    returnAtHome("/homepage");
  }
  const [savedBookingsSummary, setSavedBookingsSummary] = useState([]);

  useEffect(() => {
    const savedBookingsFromLocalStorage = JSON.parse(
      localStorage.getItem("bookings")
    );
    if (savedBookingsFromLocalStorage) {
      setSavedBookingsSummary(savedBookingsFromLocalStorage);
    }
  }, []);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    savedBookingsSummary.forEach((booking) => {
      totalPrice += Number(booking.totalprice);
    });
    return totalPrice;
  };

  const [purchased, setPurchased] = useState(false);
  // const submitPurchase = () => {
  //   setPurchased(!purchased);
  //   localStorage.setItem("bookings", JSON.stringify([]));
  // };
  const submitPurchase = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userEmail = userData.email;
  
      // Effettua una richiesta DELETE per eliminare le prenotazioni dell'utente dal database
      const response = await fetch(`http://localhost:5000/api/bookings/user/${userEmail}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error("Errore durante l'eliminazione delle prenotazioni dal database");
      }
  
      // Rimuovi le prenotazioni dal localStorage
      localStorage.setItem("bookings", JSON.stringify([]));
  
      // Imposta lo stato 'purchased' su true
      setPurchased(true);
    } catch (error) {
      console.error("Errore durante l'eliminazione delle prenotazioni dal database:", error);
    }
  };
    
  const NumeroOrdinale = () => {
    return <span>&#8470;</span>; // Numero ordinale Unicode
  };
  return (
    <>
      {!purchased && (
        <div className="summary">
          <ul className="book-list-summary">
            {savedBookingsSummary.map((booking, index) => {
              const dateObject = new Date(booking.selecteddate);
              const day = dateObject.getDate();
              const month = dateObject.getMonth() + 1; // i mesi iniziano da 0, quindi aggiungi 1
              const year = dateObject.getFullYear();
              return (
                <li className="book-item-summary" key={index}>
                  <strong>
                    Ticket <NumeroOrdinale /> {index + 1}
                  </strong>

                  <strong> adults : {booking.adults}</strong>

                  <strong>children : {booking.children}</strong>

                  <strong>destination : {booking.selectedoption}</strong>

                  <strong>
                    selected date :{day}/{month}/{year}
                  </strong>

                  <strong>price: {booking.totalprice} $</strong>
                </li>
              );
            })}
          </ul>
          <div className="resume-container">
            <div className="resume-message">
              <p>Each journey will depart from Cape Canaveral Space Station</p>
            </div>
            <br />
            <div>
              <div className="resume">
                <p>Total bookings: {savedBookingsSummary.length}</p>
                <p>Total Price:{calculateTotalPrice()} $</p>
              </div>
            </div>

            <div className="goBackHome">
              <button onClick={returnToHome}>go back home</button>
              <button onClick={submitPurchase}>submit purchase</button>
            </div>
          </div>
        </div>
      )}
      {purchased && (
        <div className="purchased">
          <div className="congratulations">
            <h2>Congratulations on your purchase!</h2>
            <br />
            <p>
              Embark on a journey of discovery and adventure beyond the stars.
              Explore the wonders of the cosmos and experience the thrill of
              space travel like never before.
            </p>
            <br />
            <button onClick={returnToHome}>back home</button>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderSummary;
