import { User } from "../models.js/user.model.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { sendEmail } from "../utils/sendEmail.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const generateVerifyToken = asyncHandler(async(email)=>{
    try {
        const user = await User.findOne({email})
        const verificationToken = user.generateVerifyToken()

        user.verificationToken = verificationToken

        await user.save({validateBeforeSave:false})

    } catch (error) {
        console.log(`error occured while generating verify token, error: ${error}`)
    }
    
})

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
        throw new ApiError(401, "User already exists")
    }

    const user = await User.create({
        fullName,
        username,
        email,
        password
    })

    const verificationTokenVal = user.generateVerifyToken()
    user.verificationToken = verificationTokenVal
    await user.save({validateBeforeSave:false});

    const createdUser = await User.findById(user._id).select("-password -refreshToken -verificationToken")

    if(!createdUser){
        ApiError(401, "Something happened while registration")
    }

    
    sendEmail(user.email, user.verificationToken)

    return res
    .status(200)
    .json(new ApiResponse( 200, createdUser, "User has created succesfully" ) )
    
})

const verifyingUser = asyncHandler(async(req, res)=>{
    const {token} = req.params;
    

        const decoded = await jwt.verify(token, process.env.VERIFY_TOKEN_SECRET)
        if (!decoded) {
            throw new ApiError(401, "Token is not vaild")
        }
        const user = await User.findOne({email: decoded.email, verificationToken: token})
        
        if(!user){
            throw new ApiError(401, "Failed verifying token")
        }

        user.emailVerified = true
        user.verificationToken = null
        console.log(user)

        user.save({validateBeforeSave: false})
        res.status(200)
        .json(
            new ApiResponse(200,user, "Verified Successfully")
        )
    
    
})

export {user, verifyingUser}