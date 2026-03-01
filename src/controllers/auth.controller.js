import asyncHandler from "../utils/asyncHandler.js";
import {registerUser} from '../services/auth.service.js';

export const signUp = asyncHandler(async (req,res)=>{
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