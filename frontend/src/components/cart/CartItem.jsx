import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuth";
import { removeItemFromcart, updateCart } from "../../services/api/cartApi";
import { useCartContext } from "../../hooks/useCart";
import { toast } from "react-toastify";

const CartItem = ({ item }) => {
  const { user } = useAuthContext();
  const { removeFromCart, handleQuantity } = useCartContext();

  const handleRemoveFromCart = async (itemId) => {
    const response = await removeItemFromcart(itemId, user?.accessToken);
    removeFromCart(itemId);
    toast(response.data.message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleQty = async (e, itemId) => {
    const { id } = e.target;
    if (id === "increase") {
      handleQuantity(itemId, "increase");
    }
    if (id === "decrease" && item.quantity > 1) {
      handleQuantity(itemId, "decrease");
    }
  };

  return (
    <div className="border border-gray-300 rounded-sm w-full flex flex-col p-2 gap-2">
      <div className="flex gap-2">
        <div className="flex flex-col items-center gap-2">
          <img
            className="h-20 w-[110px]"
            src={item.product?.image.imageUrl}
            alt="item-image"
          />
          {/* quantity */}
          <div className="w-full flex items-center justify-center rounded-sm text-sm">
            <button
              id="decrease"
              onClick={(e) => handleQty(e, item._id)}
              className="bg-gray-200 px-2 rounded-l-sm"
            >
              -
            </button>
            <span className="bg-gray-50 px-2 ">{item.quantity}</span>
            <button
              onClick={(e) => handleQty(e, item._id)}
              id="increase"
              className="bg-gray-200 px-2 rounded-r-sm"
            >
              +
            </button>
          </div>
        </div>
        <div className="w-full">
          <p>{item.product?.name}</p>
          <p>Price: {item.price}</p>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <p className="w-full">
          Subtotal: {item.subTotal}
        </p>
        <span
          onClick={() => handleRemoveFromCart(item._id)}
          className="material-symbols-outlined text-red-600 hover:text-red-700 cursor-pointer"
        >
          delete
        </span>
      </div>
    </div>
  );
};

export default CartItem;
