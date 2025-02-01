import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Error } from "./middlewares/error.middleware.js";
import path from "path";

const app = express();
const _dirname = path.resolve();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// serve static files (your React/Vue/Angular build)
app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.use(cookieParser());

// catch-all route to handle all other requests
app.get('*', (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
})

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
