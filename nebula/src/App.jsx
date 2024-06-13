import { Navigate, Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";
import { GlobalContext } from "./GlobalContext";
import { ClipLoader } from "react-spinners";

import "./App.css";

import Homepage from "./Homepage";
import LandingPage from "./LandingPage";
import Book from "./Book";
import Checkout from "./Checkout";
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

  }, [setIsAuthenticated, setIsLoading]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <ClipLoader className="loader" size={50} color="white" />
        <div>Loading...</div>
      </div>
    );
  }
  return (
    <>
      <Routes>
      <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<LandingPage />}></Route>
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
