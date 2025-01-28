import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";
import { OrderContextProvider } from "./context/OrderContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <CartContextProvider>
      <OrderContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </OrderContextProvider>
    </CartContextProvider>
  </AuthContextProvider>
);
