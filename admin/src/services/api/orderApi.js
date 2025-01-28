import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1/auth/order",
});

// get orders
export const fetchOrders = (token) =>
  api.get("/get-orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// update order status
export const updateOrderStatus = (orderId, status, token) =>
  api.post(
    `/update-order-status/${orderId}`,
    { status: status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
