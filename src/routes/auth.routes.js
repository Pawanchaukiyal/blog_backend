import express from 'express';
import { signUp} from '../controllers/auth.controller.js';
import {signupValidator} from '../validators/auth.validator.js';
import {validate} from '../middlewares/validate.middleware.js';

const router = express.Router();

router.post("/signup", signupValidator, validate, signUp);

export default router;