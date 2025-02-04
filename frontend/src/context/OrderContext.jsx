import { createContext, useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuth";
import { fetchPlacedOrders } from "../services/api/orderApi";

export const OrderContext = createContext();

export const OrderContextProvider = ({ children }) => {
  const [orders, setOrders] = useState();

  //   update order status
  const updateOrderStatus = async (orderId, status) => {
    setOrders((prevOrders) => [
      ...prevOrders.map((order) =>
        order._id === orderId ? { ...order, status: status } : order
      ),
    ]);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        setOrders,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
