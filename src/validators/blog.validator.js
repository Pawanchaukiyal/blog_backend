import { body } from "express-validator";

export const createBlogValidator = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
];

export const updateBlogValidator = [
  body("title").optional().notEmpty().withMessage("Title cannot be empty"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Description cannot be empty")
];