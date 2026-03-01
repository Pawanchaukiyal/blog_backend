import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  addCommentController,
  getCommentsController
} from "../controllers/comment.controller.js";
import { validate } from "../middleware/validate.middleware.js";

const router = express.Router();

router.post("/:blogId", protect, commentValidator, validate, addCommentController);
router.get("/:blogId", getCommentsController);

export default router;