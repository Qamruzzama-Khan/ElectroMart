import express, { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// create product
router
  .route("/create-product")
  .post(verifyJWT, verifyAdmin, upload.single("image"), createProduct);

// get products
router.route("/get-products").get(getProducts);

// update product
router
  .route("/update-product/:productId")
  .put(verifyJWT, verifyAdmin, upload.single("image"), updateProduct);

// get one product
router.route("/get-one-product/:productId").get(getOneProduct);

// delete product
router
  .route("/delete-product/:productId")
  .delete(verifyJWT, verifyAdmin, deleteProduct);

export default router;
