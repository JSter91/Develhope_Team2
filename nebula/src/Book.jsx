import React, { useContext, useEffect, useState } from "react";
import "./Book.css";
import { GlobalContext } from "./GlobalContext";
import { useNavigate } from "react-router-dom";

function Book() {
  const { bookings, setBookings, setScrollBlocked } = useContext(GlobalContext);

  const [savedBookings, setSavedBookings] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const email = userData.email;

  useEffect(() => {
    const savedBookingsFromLocalStorage = JSON.parse(
      localStorage.getItem("bookings")
    );
    if (savedBookingsFromLocalStorage) {
      setSavedBookings(savedBookingsFromLocalStorage);
    }
    console.log(savedBookings);
  }, [bookings]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Effettua la chiamata al backend per ottenere le prenotazioni associate all'email corrente
        const response = await fetch(`http://localhost:5000/api/bookings/${email}`);
        if (!response.ok) {
          throw new Error("Errore durante il recupero delle prenotazioni");
        }
        const data = await response.json();
        setSavedBookings(data.bookings); // Imposta lo stato con le prenotazioni ottenute dal backend
        // Aggiorna anche il localStorage con le prenotazioni ottenute dal backend
        localStorage.setItem("bookings", JSON.stringify(data.bookings));
      } catch (error) {
        console.error("Errore durante il recupero delle prenotazioni:", error);
      }
    };

    fetchBookings(); // Chiama la funzione fetchBookings quando il componente viene montato
  }, [email]); 
  // //////////////////////////////////////////////////////


  // function deleteItem(index) {
  //   const updatedBookings = [...savedBookings];
  //   updatedBookings.splice(index, 1);
  //   setSavedBookings(updatedBookings);
  //   localStorage.setItem("bookings", JSON.stringify(updatedBookings));
  //   const updatedBookingsState = [...bookings];
  //   updatedBookingsState.splice(index, 1);
  //   setBookings(updatedBookingsState);
  // }
// //////////////////////////////////////////////////////////////////
async function deleteItem(index) {
  try {
    const bookingToDelete = savedBookings[index];
    const idToDelete = bookingToDelete.id; // Assicurati che la prenotazione abbia una proprietà 'id'

    // Elimina la prenotazione dal database
    await fetch(`http://localhost:5000/api/bookings/${idToDelete}`, {
      method: 'DELETE'
    });

    // Rimuovi la prenotazione dall'array di prenotazioni nello stato locale
    const updatedBookings = [...savedBookings];
    updatedBookings.splice(index, 1);
    setSavedBookings(updatedBookings);

    // Aggiorna anche il localStorage con le prenotazioni aggiornate
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    // Rimuovi la prenotazione dall'array di prenotazioni nello stato globale, se necessario
    const updatedGlobalBookings = [...bookings];
    updatedGlobalBookings.splice(index, 1);
    setBookings(updatedGlobalBookings);
  } catch (error) {
    console.error('Errore durante l\'eliminazione della prenotazione:', error);
  }
}

// //////////////////////////////////////////////////////////////////


  const navigateToHome = useNavigate();
  function backToHome() {
    setScrollBlocked(false);
    navigateToHome("../homepage");
  }

  const checkout = useNavigate();
  function goToPayment() {
    checkout("../checkout");
  }

  function calculateTotal() {
    let total = 0;
    savedBookings.forEach((booking) => {
      total += Number(booking.totalprice);
    });
    return total;
  }
  return (
    <>
      <div className="book-container">
        <div className="book">
          <h2>My Books</h2>
          {savedBookings.length === 0 ? (
            <p>No books</p>
          ) : (
            <>
              <ul className="book-list">
                {savedBookings.map((booking, index) => {
                  const dateObject = new Date(booking.selecteddate);

                  // Ottieni il giorno, il mese e l'anno dall'oggetto Data
                  const day = dateObject.getDate();
                  const month = dateObject.getMonth() + 1; // i mesi iniziano da 0, quindi aggiungi 1
                  const year = dateObject.getFullYear();
                  return (
                  
                  <li className="book-item" key={index}>
                    <strong>adults : {booking.adults}</strong>
                    <strong>children : {booking.children}</strong>
                    <strong>destination : {booking.selectedoption}</strong>
                    <strong>Selected Date: {day}/{month}/{year}</strong>                    <strong>price: : {booking.totalprice} $</strong>
                    <button onClick={() => deleteItem(index)}>delete</button>
                  </li>
                )})}
              </ul>
              <div className="total-resume">
                <p>Total : {calculateTotal()} $</p>
              </div>
            </>
          )}

          <div className="btn-container-book">
            <button onClick={backToHome}>back</button>
            <button onClick={goToPayment} disabled={savedBookings.length === 0}>
              proceed to payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Book;
