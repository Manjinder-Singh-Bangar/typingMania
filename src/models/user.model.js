import mongoose from "mongoose";
import bcyrpt from "bcrypt"
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required:true,
        unique:true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String
    },
    refreshToken:{
        type: String
    }
}, {timestamps:true})

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES
    }
)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email:this.email,
            fullName:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES
    }
)
}

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()
    
    this.password = await bcyrpt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    try {
        return await bcyrpt.compare(password, this.password)
    } catch (error) {
        throw new ApiError("Invalid credientials")
    }
}



userSchema.methods.generateVerifyToken = function () {
    return jwt.sign({ email: this.email },
         process.env.VERIFY_TOKEN_SECRET,
          { 
            expiresIn: `${process.env.VERIFY_TOKEN_EXPIRES}` 
        }
    );
};

export const User = mongoose.model("User", userSchema)