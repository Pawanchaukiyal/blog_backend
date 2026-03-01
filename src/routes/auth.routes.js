import express from "express";
import { signup, login, logout, getMe } from "../controllers/auth.controller.js";
import { signupValidator, loginValidator } from "../validators/auth.validator.js";
import { validate } from "../middlewares/validation.middleware.js";
import {protect} from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
const router = express.Router();

router.post("/signup", upload.single("profileImage"), signupValidator, validate, signup);
router.post("/login", loginValidator, validate, login);
router.post("/logout", logout);
router.get("/me", protect, getMe);
export default router;