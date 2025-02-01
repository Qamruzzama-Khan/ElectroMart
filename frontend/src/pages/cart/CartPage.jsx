import { useEffect } from "react";
import GoBackBtn from "../../components/buttons/GoBackBtn";
import CartList from "../../components/cart/CartList";
import OrderSummary from "../../components/order/OrderSummary";
import { useCartContext } from "../../hooks/useCart";

const CartPage = () => {
  const { cart } = useCartContext();
  
  return (
    <div className="mt-5">
      <GoBackBtn />
      {cart.items && cart.items.length >= 1 ? <div>
          <div className="flex flex-col items-center gap-2 md:hidden">
            <OrderSummary />
            <CartList />
          </div>
          <div className="hidden md:flex flex-row items-start gap-2">
            <CartList />
            <OrderSummary />
          </div>
        </div> : <div className="text-lg">No items added...</div>}
    </div>
  );
};

export default CartPage;
