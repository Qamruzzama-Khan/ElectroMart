import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/header/Navbar";
import LoginPage from "./pages/auth/LoginPage";
import OrdersPage from "./pages/order/OrdersPage";
import { useAuthContext } from "./hooks/useAuth";
import ProductsPage from "./pages/product/ProductsPage";
import AddProductPage from "./pages/product/AddProductPage";
import UpdateProductPage from "./pages/product/UpdateProductPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/routes/ProtectedRoute";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="app md:w-[80%] px-2">
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
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/add-product"
          element={
            user && user?.user.status === "admin" ? (
              <ProtectedRoute>
                <AddProductPage />
              </ProtectedRoute>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/update-product/:productId"
          element={
            user && user?.user.status === "admin" ? (
              <ProtectedRoute>
                <UpdateProductPage />
              </ProtectedRoute>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/orders"
          element={
            user?.user.status === "admin" ? (
             <ProtectedRoute>
               <OrdersPage />
             </ProtectedRoute>
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
