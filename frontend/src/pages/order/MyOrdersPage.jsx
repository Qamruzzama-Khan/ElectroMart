import OrderList from "../../components/order/OrderList";
import { useOrderContext } from "../../hooks/useOrder";
import { fetchPlacedOrders } from "../../services/api/orderApi";
import { useAuthContext } from "../../hooks/useAuth";
import { useEffect } from "react";

const MyOrdersPage = () => {
  const {setOrders} = useOrderContext();
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

  return (
  <div className="mt-10">
    <OrderList />
  </div>
  );
};

export default MyOrdersPage;
