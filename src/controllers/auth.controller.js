import asyncHandler from "../utils/asyncHandler.js";
import { registerUser, loginUser } from "../services/auth.service.js";
import { generateToken } from "../utils/jwt.js";
import cloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
export const signup = asyncHandler(async (req, res) => {
  let imageUrl = "";

  if (req.file) {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "profile_images" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.end(req.file.buffer);
    });

    imageUrl = result.secure_url;
  }

  const user = await registerUser({
    ...req.body,
    profileImage: imageUrl,
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      id: user._id,
      email: user.email,
      profileImage: user.profileImage,
    },
  });
});
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await loginUser(email, password);

  const token = generateToken({
    id: user._id,
    role: user.role
  })

  // res.cookie('token', token, {
  //     httpOnly: true,
  //     secure: false,
  //     sameSite: 'lax'
  // })
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });

  res.status(200).json({
    success: true,
    message: 'User logged in successfully',
    data: {
      id: user._id,
      email: user.email,
      role: user.role
    }
  })
})

export const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0)
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select(
    "email profileImage role"
  );

  res.status(200).json({
    success: true,
    data: user
  });
});