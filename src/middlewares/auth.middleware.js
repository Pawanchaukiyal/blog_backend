import jwt from 'jsonwebtoken';
import AppError from '../utils/appError.js';
import asyncHandler from '../utils/asyncHandler.js';

export const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;

    if(!token)
    {
        throw new AppError("Not Authorized",401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
        id: decoded.id,
        role: decoded.role
    }   
    next();
})