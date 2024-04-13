import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Experience from "./Experience";
import HeroContent from "./HeroContent";
import { Navbar } from "./Navbar";
import News from "./News";
import SolarSystem from "./SolarSystem";
import Star from "./Star";
import Homepage from "./Homepage";
import LandingPage from "./LandingPage";
import { useContext, useEffect } from "react";
import Book from "./Book";
import Checkout from "./Checkout";
import { GlobalContext } from "./GlobalContext";
import NotFoundPage from "./NotFoundPage";

function App() {
  const { isAuthenticated, setIsAuthenticated, isLoading, setIsLoading } = useContext(GlobalContext);
  useEffect(() => {
    // Controlla se c'è un token nel localStorage al caricamento della pagina
    const token = localStorage.getItem("token");
    if (token) {
      // Se il token è presente, imposta lo stato isAuthenticated su true
      setIsAuthenticated(true);
    }
    setIsLoading(false);

  }, []);

  if (isLoading) {
    // Se l'applicazione è ancora in fase di caricamento, visualizza un messaggio di attesa
    return <div>Loading...</div>;
  }
  console.log("isAuthenticated:", isAuthenticated);


  return (
    <>
      <Routes>
      <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<LandingPage></LandingPage>}></Route>
        <Route
          path="/homepage"
          element={isAuthenticated ? <Homepage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/book"
          element={isAuthenticated ? <Book /> : <Navigate to="/" replace />}
        />
        <Route
          path="/checkout"
          element={isAuthenticated ? <Checkout /> : <Navigate to="/" replace />}
        />
      </Routes>
    </>
  );
}

export default App;
