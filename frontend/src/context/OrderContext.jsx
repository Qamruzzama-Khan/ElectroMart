import { createContext, useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuth";
import { fetchPlacedOrders } from "../services/api/orderApi";

export const OrderContext = createContext();

export const OrderContextProvider = ({ children }) => {
  const [orders, setOrders] = useState();
  const { user } = useAuthContext();

  useEffect(() => {
    const getPlacedOrders = async () => {
      const response = await fetchPlacedOrders(user?.accessToken);
      setOrders(response.data.data);
      console.log(response.data.data);
    };
    if (user?.accessToken) {
      getPlacedOrders();
    }
  }, [user]);

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
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
