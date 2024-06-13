import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import  GlobalProvider  from "./GlobalContext.jsx";
import Modal from "react-modal";

Modal.setAppElement("#root");
ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </BrowserRouter>
);
