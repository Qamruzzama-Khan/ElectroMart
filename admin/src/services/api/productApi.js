import axios from "axios";

const api = axios.create({
  baseURL: "https://electromart-backend-o28q.onrender.com/api/v1/product",
});

// get products
export const fetchProducts = () => api.get("/get-products");

// get one product
export const fetchOneProduct = (productId) =>
  api.get(`/get-one-product/${productId}`);

// create product
export const createProduct = (data, token) =>
  api.post("/create-product", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// delete product
export const deleteProduct = (productId, token) =>
  api.delete(`/delete-product/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// update product
export const updateProduct = (productId, data, token) =>
  api.put(`/update-product/${productId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
