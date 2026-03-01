import express from "express";
import {protect} from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import { createBlogController, deleteBlogController, getBlogsController, getSingleBlogController, updateBlogController } from "../controllers/blog.controller.js";

const router = express.Router();

router.post('/', protect, upload.single('image'), createBlogController);
router.get('/', getBlogsController);
router.get("/:id", getSingleBlogController);
router.put("/:id", protect, updateBlogController);
router.delete("/:id", protect, deleteBlogController);
export default router;