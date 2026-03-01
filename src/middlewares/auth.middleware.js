import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';

export const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;

    if(!token)
    {
        throw new AppError("Not Authorized",401);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        throw new AppError("Token is invalid or expired",401);
    }
})


export const authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role))
        {
            throw new AppError("You are not authorized to perform this action",403);
        }
        next();
    }
}