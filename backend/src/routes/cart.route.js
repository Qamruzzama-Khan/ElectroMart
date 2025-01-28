import express, { Router } from "express";
import {
  addItemToCart,
  getCart,
  removeItemFromCart,
  updateCart,
  deleteCart,
} from "../controllers/cart.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// add to cart
router.route("/add-to-cart/:productId").post(verifyJWT, addItemToCart);

// get cart
router.route("/get-cart").get(verifyJWT, getCart);

// remove from cart
router.route("/remove-from-cart/:itemId").post(verifyJWT, removeItemFromCart);

// update cart
router.route("/update-cart/:itemId").post(verifyJWT, updateCart);

// delete cart
router.route("/delete-cart/:cartId").delete(verifyJWT, deleteCart);

export default router;
