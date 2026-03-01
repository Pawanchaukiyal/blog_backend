import { body } from "express-validator";

export const commentValidator = [
  body("text").notEmpty().withMessage("Comment text is required")
];