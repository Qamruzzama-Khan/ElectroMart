import express, { Router } from "express";
import { signupUser, loginUser } from "../controllers/user.controller.js";

const router = Router();

// signup route
router.route("/signup").post(signupUser);

// login route
router.route("/login").post(loginUser);

export default router;
