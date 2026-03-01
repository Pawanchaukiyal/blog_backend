import {body} from 'express-validator';

export const signupValidator = [
    body("email")
        .isEmail()
        .withMessage("Please provide a valid email address"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];