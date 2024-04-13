// /////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////
import React, { useState } from "react";
import "./Drop.css";
import MyDatePicker from "./DatePicker";
import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

function Drop() {
  const {
    adults,
    setAdults,
    child,
    setChild,
    baggages,
    setBaggages,
    selectedOption,
    setSelectedOption,
    showOptions,
    setShowOptions,
    selectedDate,
    setSelectedDate,
    log,
    bookings,
    setBookings,
    scrollBlocked,
    bookDestination,
    newBooking,
    setNewBooking,
    totalPrice,
    setTotalPrice,
  } = useContext(GlobalContext);

  // console.log(selectedOption);

  function increaseAdults() {
    setAdults(adults + 1 <= 10 ? adults + 1 : 10);
  }

  function decreaseAdults() {
    setAdults(adults - 1 >= 0 ? adults - 1 : 0);
  }

  function increaseChild() {
    setChild(child + 1 <= 10 ? child + 1 : 10);
  }

  function decreaseChild() {
    setChild(child - 1 >= 0 ? child - 1 : 0);
  }

  const maxBaggages = adults + child;

  function increaseBaggages() {
    setBaggages(baggages + 1 <= maxBaggages ? baggages + 1 : maxBaggages);
  }

  function decreaseBaggages() {
    setBaggages(baggages - 1 >= 0 ? baggages - 1 : 0);
  }

  function show(option) {
    setSelectedOption(option);
    setShowOptions(false);
  }
  function toggleOptions(e) {
    e.stopPropagation();
    e.preventDefault();
    setShowOptions(!showOptions);
  }

  const [showModal, setShowModal] = useState(false);

  // const [totalPrice, setTotalPrice] = useState(0);

  const handleSubmit = () => {
    const totalPrices = adults * 70000 + child * 50000 + baggages * 1000;
    setTotalPrice(totalPrices);
    // Mostra il modale di conferma
    setShowModal(true);
  };

  const handleConfirm = () => {
    const day = selectedDate.getDate();
    const month = selectedDate.getMonth() + 1; // I mesi iniziano da zero, quindi aggiungiamo 1
    const year = selectedDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    const userData = JSON.parse(localStorage.getItem("userData"));
    const email = userData.email;
    const bookingId = uuidv4();
    const newBooking1 = {
      id: bookingId,
      email:email,
      adults: adults,
      children: child,
      baggages: baggages,
      selectedOption: selectedOption,
      selectedDate: formattedDate,
      totalPrice: totalPrice,
    };
    bookDestination(newBooking1);
    // localStorage.setItem("bookings", JSON.stringify(bookings));
    // localStorage.setItem(
    //   "bookings",
    //   JSON.stringify([...bookings, newBooking1])
    // );

    const currentBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem(
      "bookings",
      JSON.stringify([...currentBookings, newBooking1])
    );

    setAdults(0);
    setChild(0);
    setBaggages(0);
    setSelectedOption("");
    setSelectedDate("");

    console.log("Modulo inviato!");

    // Chiudi il modale di conferma
    setShowModal(false);
  };
// ////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////
// const handleConfirm = async () => {
//   try {
//     const userData = JSON.parse(localStorage.getItem('userData'));
//     const userEmail = userData.email;
//     // Invia la richiesta al server per inserire la prenotazione nel database
//     const response = await fetch('/api/bookings', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email: userEmail, 
//         adults: adults,
//         children: child,
//         baggages: baggages,
//         destination: selectedOption,
//         date: selectedDate.toISOString(), // Converti la data in formato ISO string
//       }),
//     });

//     if (response.ok) {
//       console.log('Prenotazione confermata e inserita nel database!');
//       // Effettua altre operazioni, come mostrare un messaggio di conferma all'utente
//       // Aggiungi la prenotazione al localStorage
//       const day = selectedDate.getDate();
//       const month = selectedDate.getMonth() + 1;
//       const year = selectedDate.getFullYear();
//       const formattedDate = `${day}/${month}/${year}`;
//       const newBooking = {
//         adults: adults,
//         child: child,
//         baggages: baggages,
//         selectedOption: selectedOption,
//         selectedDate: formattedDate,
//         totalPrice: totalPrice,
//       };
//       localStorage.setItem(
//         "bookings",
//         JSON.stringify([...bookings, newBooking])
//       );

//       // Resetta lo stato degli input
//       setAdults(0); 
//       setChild(0);
//       setBaggages(0);
//       setSelectedOption("");
//       setSelectedDate("");

//       console.log("Modulo inviato!");

//       // Chiudi il modale di conferma
//       setShowModal(false);
//     } else {
//       console.error('Errore durante l\'inserimento della prenotazione nel database');
//     }
//   } catch (error) {
//     console.error('Errore durante la richiesta al server:', error);
//   }
// };



// //////////////////////////////////////////////////////
  // ///////////////////////////////////////////////////////

  const handleCancel = () => {
    // Chiudi il modale di conferma
    setShowModal(false);
  };

  console.log(selectedDate);

  /* ----------------prices-------------------- */

  const navigate = useNavigate();
  function goToBook() {
    navigate("../book");
  }

  return (
    <div className="container">
      <h4 className="drop-title">Choose your destination</h4>

      <div className={`dropdown ${showOptions ? "active" : ""}`}>
        <input
          onClick={toggleOptions}
          type="text"
          name="planet"
          className="textbox"
          placeholder="Choose the planet"
          value={selectedOption}
          readOnly
        />
        {showOptions && (
          <div className="options">
            <div name="moon" onClick={() => show("Moon")}>
              Moon
            </div>
            <div name="mars" onClick={() => show("Mars")}>
              Mars
            </div>
            <div name="venus" onClick={() => show("Venus")}>
              Venus
            </div>
            <div name="mercury" onClick={() => show("Mercury")}>
              Mercury
            </div>
            <div name="jupiter" onClick={() => show("Jupiter")}>
              Jupiter
            </div>
            <div name="saturn" onClick={() => show("Saturn")}>
              Saturn
            </div>
            <div name="neptune" onClick={() => show("Neptune")}>
              Neptune
            </div>
            <div name="uranus" onClick={() => show("Uranus")}>
              Uranus
            </div>
          </div>
        )}
      </div>
      <MyDatePicker></MyDatePicker>
      <div className="grid-1100">
        <div className="items-drop">
          <div id="adults" className="number-selector">
            <p>Adults</p>
            <div>
              <button onClick={decreaseAdults}>-</button>
              <span>{adults}</span>
              <button onClick={increaseAdults}>+</button>
            </div>
          </div>

          <div id="passengers" className="number-selector">
            <p>Children</p>
            <div>
              <button onClick={decreaseChild}>-</button>
              <span>{child}</span>
              <button onClick={increaseChild}>+</button>
            </div>
          </div>

          <div id="baggages" className="number-selector">
            <p>Baggages</p>
            <div>
              <button onClick={decreaseBaggages}>-</button>
              <span>{baggages}</span>
              <button onClick={increaseBaggages}>+</button>
            </div>
          </div>
        </div>

        <div className="cart-btn-container">
          <button
            onClick={handleSubmit}
            disabled={
              !selectedOption || !selectedDate || (adults === 0 && child === 0)
            }
          >
            Add to cart
          </button>
          <button onClick={goToBook}>Go to my books</button>
        </div>
      </div>

      <Modal
        className="modal"
        isOpen={showModal}
        onRequestClose={handleCancel}
        contentLabel="add destination to cart?"
      >
        <p>add destination to cart?</p>
        <br />
        <p className="p-modal">
          Option selected: <span>{selectedOption}</span>{" "}
        </p>
        <br />

        <p className="p-modal">
          Adults: {adults}
          <span> {adults * 70000} $</span>
        </p>
        <br />

        <p className="p-modal">
          Children: {child} <span>{child * 50000} $</span>
        </p>
        <br />

        <p className="p-modal">
          Baggages: {baggages} <span>{baggages * 1000} $</span>
        </p>
        <br />

        <p className="p-modal">
          Total : <span>{totalPrice} $</span>
        </p>
        <br />

        <p>
          Selected date: <br />
          {selectedDate &&
            `${selectedDate.getDate()}/${
              selectedDate.getMonth() + 1
            }/${selectedDate.getFullYear()} ${
              selectedDate.getHours() + 12
            }:${String(selectedDate.getMinutes()).padStart(2, "0")}`}
        </p>
        <br />

        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={handleCancel}>Delete</button>
      </Modal>
    </div>
  );
}

export default Drop;
