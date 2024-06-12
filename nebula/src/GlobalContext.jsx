import { createContext, useState } from "react";
export const GlobalContext = createContext();

// eslint-disable-next-line react/prop-types
function GlobalProvider({ children }) {
  const [scroll, setScroll] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [adults, setAdults] = useState(0);
  const [child, setChild] = useState(0);
  const [baggages, setBaggages] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [scrollBlocked, setScrollBlocked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function bookDestination(newBooking) {
    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBooking),
      });
      const data = await response.json();

      if (response.ok) {
        console.log("Prenotazione effettuata con successo!");
        setBookings((bookings) => [...bookings, newBooking]);
        localStorage.setItem(
          "bookings",
          JSON.stringify([...bookings, newBooking])
        );
      } else {
        console.error("Errore durante la prenotazione:", data.message);
      }
    } catch (error) {
      console.error("Errore durante la prenotazione:", error);
    }
  }

  const planetBackgrounds = {
    moon: "linear-gradient(135deg, #4F74C0, #24395C)",
    mars: "linear-gradient(135deg, #D74B4B, #673E3E)",
    venus: "linear-gradient(135deg, #FEB692, #EA5455)",
    mercury: "linear-gradient(135deg, #FFDDE1, #CBEAFD)",
    jupiter: "linear-gradient(135deg, #BDC3C7, #2C3E50)",
    saturn: "linear-gradient(135deg, #F2C94C, #F29C4B)",
    neptune: "linear-gradient(135deg, #65B0EF, #1A2980)",
    uranus: "linear-gradient(135deg, #6EC8F4, #BFE9FF)",
  };

  const [formData, setFormData] = useState({});

  const [registerData, setRegisterData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberPassword: false,
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberPassword: false,
  });

  const [userData, setUserData] = useState({
    full_name: "",
    email: "",
  });

  // book your trip
  const [isVisible1, setIsVisible1] = useState(false);
  // explore
  const [isVisible2, setIsVisible2] = useState(false);
  // solar System
  const [isVisible3, setIsVisible3] = useState(false);
  // news
  const [isVisible4, setIsVisible4] = useState(false);

  // tuta
  const [isVisible5, setIsVisible5] = useState(false);

  const value = {
    scroll,
    setScroll,
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
    planetBackgrounds,
    bookings,
    setBookings,
    scrollBlocked,
    setScrollBlocked,
    bookDestination,
    totalPrice,
    setTotalPrice,
    formData,
    setFormData,
    registerData,
    setRegisterData,
    loginData,
    setLoginData,
    userData,
    setUserData,
    isVisible1,
    setIsVisible1,
    isVisible2,
    setIsVisible2,
    isVisible3,
    setIsVisible3,
    isVisible4,
    setIsVisible4,
    isVisible5,
    setIsVisible5,
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    setIsLoading,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export default GlobalProvider;
