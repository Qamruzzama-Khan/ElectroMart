import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createOrder } from "../services/api/orderApi";
import { useAuthContext } from "../hooks/useAuth";
import { deleteCart } from "../services/api/cartApi";
import { useCartContext } from "../hooks/useCart";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"

const ChekoutPage = () => {
  const { user } = useAuthContext();
  const { clearCart } = useCartContext();
  const { cart } = useCartContext();
  const navigate = useNavigate();

  const [orderForm, setOrderForm] = useState({
    shippingInfo: {
      name: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      phoneNumber: "",
    },
    paymentMethod: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // check if the change is in the shippingInfo object
    if (name in orderForm.shippingInfo) {
      setOrderForm({
        ...orderForm,
        shippingInfo: {
          ...orderForm.shippingInfo,
          [name]: value,
        },
      });
    } else {
      setOrderForm({
        ...orderForm,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createOrder(cart._id, orderForm, user?.accessToken);
    if (response.data.success) {
      toast(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setOrderForm({
        shippingInfo: {
          name: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
          phoneNumber: "",
        },
        paymentMethod: "",
      });
      navigate('/my-orders')
      // delete cart from backend
      await deleteCart(cart._id, user?.accessToken);
      // clear cart object from cartContext
      clearCart();
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start gap-4 mt-10">
      {cart && (
        <div className="border border-gray-300 p-2 rounded flex flex-col gap-2 w-full">
          <h1 className="bg-gray-100 p-2 rounded text-gray-800 font-semibold">
            Order Summary
          </h1>
          <div className="flex flex-col gap-1">
            <p>Total items: {cart.totalItems}</p>
            <p>Total bill: {cart.totalBill}</p>
          </div>
        </div>
      )}
      {/* shippingInfo-form */}
      <div className="flex flex-col gap-2 border border-gray-300 p-4 rounded w-full mx-auto">
        <h5 className="bg-gray-100 p-2 rounded text-gray-800 font-semibold">
          Shipping Information
        </h5>
        <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
          {Object.keys(orderForm.shippingInfo).map((key) => (
            <input
              key={key}
              className="border border-gray-300 p-2 rounded"
              type="text"
              name={key}
              value={orderForm.shippingInfo[key]}
              onChange={handleChange}
              placeholder={key}
            />
          ))}

          <select
            className="border border-gray-300 p-2 rounded cursor-pointer"
            name="paymentMethod"
            value={orderForm.paymentMethod}
            onChange={handleChange}
          >
            <option value="" disabled>
              Payment Method
            </option>
            <option value="online">Online</option>
            <option value="cod">Cash On Delivery</option>
          </select>
          <button type="submit" className="bg-pink-600 p-2 text-white rounded">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChekoutPage;
