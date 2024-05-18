import mongoose from "mongoose";
import bcyrpt from "bcrypt"

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
    }
}, {timestamps:true})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()
    
    this.password = await bcyrpt.hash(this.password, 10)
    next()
})

export const User = mongoose.model("User", userSchema)