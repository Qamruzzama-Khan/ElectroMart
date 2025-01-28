import { Link } from "react-router-dom";
import { useCartContext } from "../hooks/useCart";

const Summary = () => {
  const { cart } = useCartContext();

  return (
    <div className="border border-gray-500 p-2 w-full md:w-[50%] rounded flex flex-col gap-2">
      <p className="text-lg font-semibold text-gray-800">Summary</p>
      <p className="flex items-center gap-1">
        <span className="text-gray-900">Grand Total: {cart.totalBill}</span>
        <span className="text-gray-700"></span>
      </p>
      <p className="flex items-center gap-1">
        <span className="text-gray-900">Total Items: {cart.totalItems}</span>
        <span className="text-gray-700"></span>
      </p>
      <Link to="/checkout">
        <button className="bg-pink-700 hover:bg-pink-800 p-1 text-white rounded w-full md:w-[60%]">
          Proceed To Checkout
        </button>
      </Link>
    </div>
  );
};

export default Summary;
