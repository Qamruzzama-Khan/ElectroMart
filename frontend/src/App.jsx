import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import AuthPage from "./pages/AuthPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ChekoutPage from "./pages/ChekoutPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import { useAuthContext } from "./hooks/useAuth";
import { Navigate } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
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
        <Route path="/" element={<HomePage />} />
        <Route
          path="/cart"
          element={user ? <CartPage /> : <Navigate to="/auth" />}
        />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/product-details/:productId"
          element={<ProductDetailsPage />}
        />
        <Route path="/checkout" element={<ChekoutPage />} />
        <Route
          path="/my-orders"
          element={user ? <MyOrdersPage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/profile"
          element={user ? <ProfilePage /> : <Navigate to="/auth" />}
        />
        {/* <Route path="/order" element={<PlaceOrder/>} /> */}
      </Routes>
    </div>
  );
};

export default App;
