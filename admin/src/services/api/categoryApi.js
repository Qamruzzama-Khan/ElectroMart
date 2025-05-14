import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1/category",
});

// get categories
export const fetchCategories = () => api.get("/get-categories");

// create category
export const createCategory = (data, token) =>
  api.post("/create-category", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// delete category
export const deleteCategory = (categoryId, token) =>
  api.delete(`/delete-category/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// update category
export const updateCategory = (categoryId, data, token) =>
  api.put(`/update-category/${categoryId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
