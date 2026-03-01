import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import AppError from '../utils/appError.js';

export const registerUser = async(data)=>{
    const {email, password, profileImage} = data;

    const existingUser = await User.findOne({email});

    if(existingUser)
    {
        throw new AppError('User already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = new User({
        email,
        password: hashedPassword,
        profileImage
    });

    return user;
}