import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1/auth/user",
});

export const signupUser = (data) => api.post("/signup", data);

export const loginUser = (data) => api.post("/login", data);
