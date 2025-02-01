import axios from "axios";

const api = axios.create({
  baseURL: "https://electromart-backend-r11z.onrender.com/api/v1/auth/user",
});

export const loginUser = (data) => api.post("/login", data);
