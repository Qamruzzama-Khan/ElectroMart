import OrderItem from "../../components/order/OrderItem";
import { useOrderContext } from "../../hooks/useOrder";

const MyOrdersPage = () => {
  const { orders } = useOrderContext();

  return (
    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {orders &&
        orders.map((order) => <OrderItem key={order._id} order={order} />)}
    </div>
  );
};

export default MyOrdersPage;
