import asyncHandler from "../utils/asyncHandler.js";
import {registerUser, loginUser} from '../services/auth.service.js';
import { generateToken } from "../utils/jwt.js";
import cloudinary from "../config/cloudinary.js";
import { Profiler } from "react";

export const signup = asyncHandler(async (req,res)=>{
    let imageUrl = "";

    if(req.file)
    {
       const result = await new Promise((ressolve, reject)=>{
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'profile_images' },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    ressolve(result);
                }
            }
        );
        stream.end(req.file.buffer);
       })
       imageUrl = result.secure_url;
    }
    const user = await registerUser({
        ...req.body,
        ProfileImage: imageUrl
    });

    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data:{
            id: user._id,
            email: user.email,
            ProfileImage: user.ProfileImage
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

export const logout = asyncHandler(async() =>{
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })
        res.status(200).json({
            success: true,
            message: "User logged out successfully"
        })
})