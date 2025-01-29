import OrderItem from "../../components/order/OrderItem";
import { useOrderContext } from "../../hooks/useOrder";

const MyOrdersPage = () => {
  const { orders } = useOrderContext();

  return (
    <div className="border border-gray-400 p-2 rounded mt-5">
      {orders &&
        orders.map((order) => <OrderItem key={order._id} order={order} />)}
    </div>
  );
};

export default MyOrdersPage;
