import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Error } from "./middlewares/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// routes import
import userRoutes from "./routes/user.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import orderRoutes from "./routes/order.route.js";

// routes declaration
app.use("/api/v1/auth/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/auth/cart", cartRoutes);
app.use("/api/v1/auth/order", orderRoutes);

// Middleware for Errors
app.use(Error);

export { app };
