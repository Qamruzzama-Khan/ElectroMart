import express, { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// create category
router
  .route("/create-category")
  .post(verifyJWT, verifyAdmin, upload.single("image"), createCategory);

// get categories
router.route("/get-categories").get(getCategories);

// update category
router
  .route("/update-category/:categoryId")
  .put(verifyJWT, verifyAdmin, upload.single("image"), updateCategory);

// delete category
router
  .route("/delete-category/:categoryId")
  .delete(verifyJWT, verifyAdmin, deleteCategory);

export default router;
