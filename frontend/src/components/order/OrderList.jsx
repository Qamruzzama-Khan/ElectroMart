import { useOrderContext } from "../../hooks/useOrder";
import OrderItem from "./OrderItem";

const OrderList = () => {
    const { orders } = useOrderContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {orders &&
        orders.map((order) => <OrderItem key={order._id} order={order} />)}
    </div>
  )
}

export default OrderList
