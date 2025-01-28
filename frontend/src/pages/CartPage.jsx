import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuth";
import { fetchCart } from "../services/api/cartApi";
import GoBackBtn from "../components/buttons/GoBackBtn";
import Cart from "../components/Cart";
import Summary from "../components/Summary";
import { useCartContext } from "../hooks/useCart";

const CartPage = () => {
  const { cart } = useCartContext();

  return (
    <div className="mt-5">
      <GoBackBtn />
      {cart && (
        <div>
          <div className="flex flex-col items-center gap-2 md:hidden">
            <Summary />
            <Cart />
          </div>
          <div className="hidden md:flex flex-row items-start gap-2">
            <Cart />
            <Summary />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
