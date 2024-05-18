import { User } from "../models.js/user.model.js";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const user = asyncHandler( async(req, res)=>{
    const {fullName, username, email, password} = req.body

    if ([fullName, username, email, password].some((field) => field?.trim() === "")) {
        ApiError(401, "All fields are required")
    }

    if (!email.includes("@")) {
        throw new ApiError(400, "Enter a valid email")
    }

    const existedUser = await User.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if (existedUser) {
        ApiError(401, "User already existed")
    }

    const user = await User.create({
        fullName,
        username,
        email,
        password

    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        ApiError(401, "Something happened while registration")
    }

    return res
    .status(200)
    .json(new ApiResponse( 200, createdUser, "User has created succesfully" ) )
        
    
})

export {user}