import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,   
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true, 
            minlength:6
        },
        profileImage:{
            type: String,
        },
        role:{
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        }
    },
    {
        timestamps: true
    }
)

userSchema.index({ email: 1});

const User = mongoose.model('User', userSchema);
export default User;