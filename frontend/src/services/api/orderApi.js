import axios from "axios";

const api = axios.create({
  baseURL: "https://electromart-backend-o28q.onrender.com/api/v1/auth/order",
});

// create order
export const createOrder = (cartId, data, token) =>
  api.post(`/create-order/${cartId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// get placed orders
export const fetchPlacedOrders = (token) =>
  api.get("/get-orders-ByUser", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// get one order
export const fetchOneOrder = (orderId, token) =>
  api.get(`/get-one-order/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
