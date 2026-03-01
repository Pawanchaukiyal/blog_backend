import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import {
  createBlogController,
  deleteBlogController,
  getBlogsController,
  getSingleBlogController,
  updateBlogController
} from "../controllers/blog.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import {
  createBlogValidator,
  updateBlogValidator
} from "../validators/blog.validator.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.single("image"),
  createBlogValidator,
  validate,
  createBlogController
);

router.get("/", getBlogsController);

router.get("/:id", getSingleBlogController);

router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateBlogValidator,
  validate,
  updateBlogController
);

router.delete("/:id", protect, deleteBlogController);

export default router;