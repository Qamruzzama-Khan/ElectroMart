import axios from "axios";

const api = axios.create({
  baseURL: "https://electromart-backend-o28q.onrender.com/api/v1/category",
});

// get categories
export const fetchCategories = () => api.get("/get-categories");
