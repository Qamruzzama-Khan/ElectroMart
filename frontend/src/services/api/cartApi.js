import axios from "axios";

const api = axios.create({
  baseURL: "https://electromart-backend-o28q.onrender.com/api/v1/auth/cart",
});

// get cart
export const fetchCart = (token) =>
  api.get("/get-cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// add item to cart
export const addItemTocart = (productId, token) =>
  api.post(
    `/add-to-cart/${productId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

// add item to cart
export const removeItemFromcart = (itemId, token) =>
  api.post(
    `/remove-from-cart/${itemId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

// update cart
export const updateCart = (itemId, data, token) =>
  api.post(
    `/update-cart/${itemId}`,
    { quantity: data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

// delete cart
export const deleteCart = (cartId, token) =>
  api.delete(`/delete-cart/${cartId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
