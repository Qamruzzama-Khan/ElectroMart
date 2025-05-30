import axios from "axios";

const api = axios.create({
  baseURL: "https://electromart-backend-o28q.onrender.com/api/v1/product",
});

// get products
export const fetchProducts = () => api.get("/get-products");

// get products by category
export const fetchProductsByCategory = (categoryId) => api.get(`/get-products-by-category/${categoryId}`);

// get one product
export const fetchOneProduct = (productId) =>
  api.get(`/get-one-product/${productId}`);
