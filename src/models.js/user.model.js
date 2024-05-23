import mongoose from "mongoose";
import bcyrpt from "bcrypt"
import jwt from "jsonwebtoken";

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

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()
    
    this.password = await bcyrpt.hash(this.password, 10)
    next()
})



userSchema.methods.generateVerifyToken = function () {
    return jwt.sign({ email: this.email },
         process.env.VERIFY_TOKEN_SECRET,
          { 
            expiresIn: `${process.env.VERIFY_TOKEN_EXPIRES}` 
        }
    );
};

export const User = mongoose.model("User", userSchema)