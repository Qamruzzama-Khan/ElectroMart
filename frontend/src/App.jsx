import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/header/Navbar";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/cart/CartPage";
import AuthPage from "./pages/auth/AuthPage"
import ProductDetailsPage from "./pages/product/ProductDetailsPage";
import ChekoutPage from "./pages/ChekoutPage";
import MyOrdersPage from "./pages/order/MyOrdersPage";
import { useAuthContext } from "./hooks/useAuth";
import { Navigate } from "react-router-dom";
import ProfilePage from "./pages/auth/ProfilePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductsPage from "./pages/product/ProductsPage";

const App = () => {
  const { user } = useAuthContext();

  return (
    <div className="app w-[95%] md:w-[80%] mx-auto">
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
        <Route path="/" element={<HomePage />} />
        <Route
          path="/cart"
          element={<CartPage />}
        />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/product-details/:productId"
          element={<ProductDetailsPage />}
        />
        <Route
          path="/products/:category"
          element={<ProductsPage />}
        />
        <Route path="/checkout" element={<ChekoutPage />} />
        <Route
          path="/my-orders"
          element={user && <MyOrdersPage />}
        />
        <Route
          path="/profile"
          element={user && <ProfilePage />}
        />
      </Routes>
    </div>
  );
};

export default App;
