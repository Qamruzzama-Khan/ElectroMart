import { useEffect } from "react";
import { useCartContext } from "../hooks/useCart";
import CartItem from "./CartItem";

const Cart = () => {
  const { cart } = useCartContext();

  return (
    <div className="w-full md:w-[50%] grid grid-cols-1  gap-2">
      {cart.items &&
        cart.items.map((item) => <CartItem key={item._id} item={item} />)}
    </div>
  );
};

export default Cart;
