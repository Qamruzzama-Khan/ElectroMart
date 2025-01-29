import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuth";
import { fetchOneOrder } from "../../services/api/orderApi";
import {useOrderContext} from "../../hooks/useOrder"

const OrderItem = ({ order }) => {
  const { user } = useAuthContext();
  const { updateOrderStatus } = useOrderContext();
  const [isTracking, setIsTracking] = useState(false);

  const update = async (orderId) => {
    setIsTracking(true);
    const response = await fetchOneOrder(orderId, user?.accessToken);
    setTimeout(() => {
      updateOrderStatus(orderId, response.data.data.status);
      setIsTracking(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col justify-between border border-gray-300 p-2 rounded">
       <p>ID: {order._id}</p>
      <p>Status: {isTracking ? "Tracking..." : order.status}</p>
      <div className="flex items-start justify-between">
      <p>Items: {order.totalItems}</p>
      <button
        className="px-2 py-1 bg-green-600 hover:bg-green-700 rounded text-white"
        onClick={() => update(order._id)}
      >
        Track
      </button>
   </div>
    </div>
  );
};

export default OrderItem;
