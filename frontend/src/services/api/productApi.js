import axios from "axios";

const api = axios.create({
  baseURL: "https://electromart-9wkq.onrender.com/api/v1/product",
});

// get products
export const fetchProducts = () => api.get("/get-products");

// get one product
export const fetchOneProduct = (productId) =>
  api.get(`/get-one-product/${productId}`);
