import express, { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import {
  createOrderFromCart,
  getOrders,
  getOrdersByUser,
  updateOrderStatus,
  getOneOrder,
} from "../controllers/order.controller.js";

const router = Router();

// create order from cart
router.route("/create-order/:cartId").post(verifyJWT, createOrderFromCart);

// get orders
router.route("/get-orders").get(verifyJWT, verifyAdmin, getOrders);

// update order status
router
  .route("/update-order-status/:orderId")
  .post(verifyJWT, verifyAdmin, updateOrderStatus);

// get orders by user
router.route("/get-orders-ByUser").get(verifyJWT, getOrdersByUser);

// get one order
router.route("/get-one-order/:orderId").get(verifyJWT, getOneOrder);

export default router;
