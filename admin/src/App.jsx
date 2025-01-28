import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import OrdersPage from "./pages/OrdersPage";
import { useAuthContext } from "./hooks/useAuth";
import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/AddProductPage";
import UpdateProductPage from "./pages/UpdateProductPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="app">
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="text-sm md:text-md"
      />
      <Routes>
        <Route
          path="/"
          element={
            user && user?.user.status === "admin" ? (
              <ProductsPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/add-product"
          element={
            user && user?.user.status === "admin" ? (
              <AddProductPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/update-product/:productId"
          element={
            user && user?.user.status === "admin" ? (
              <UpdateProductPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/orders"
          element={
            user?.user.status === "admin" ? (
              <OrdersPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
