import asyncHandler from "../utils/asyncHandler.js";
import {registerUser, loginUser} from '../services/auth.service.js';
import { generateToken } from "../utils/jwt.js";


export const signup = asyncHandler(async (req,res)=>{
    const user = await registerUser(req.body);

    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data:{
            id: user._id,
            email: user.email
        }
    })
})

export const login = asyncHandler(async(req, res)=>{
    const {email, password} = req.body;

    const user = await loginUser(email, password);

    const token = generateToken({
        id: user._id,
        role: user.role
    })

    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    })

    res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        data:{
            id: user._id,
            email: user.email,
            role: user.role
        }
    })
})