import { User } from "../models/user.model.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { sendEmail } from "../utils/sendEmail.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { json } from "express";

const generateAccessAndRefreshToken = async(userId)=>{
    try {
        const user = await User.findById(userId)

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "something happened while generating access and refresh token")
    }
}

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

    const token = user.verificationToken
    
    sendEmail(user.email, user.verificationToken,
         'Email Verification',
         `Please verify your email by clicking the following link: http://localhost:5173/verify/${token}`,
         `Please verify your email by clicking the following link: <a href="http://localhost:5173/verify/${token}">Verify Email</a>`
        )

    return res
    .status(200)
    .json(new ApiResponse( 200, createdUser, "Verify your email by clicking the link which was sent by us to your email, Thanks :)" ) )
    
})

const verifyingUser = asyncHandler(async(req, res)=>{
    const {token} = req.params;
    
        try {
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

    
            user.save({validateBeforeSave: false})
            return res.status(200)
            .json({message: "verified successfully now you can login"})

        } catch (error) {
            throw new ApiError(401, "Invalid Token")
        }
    
})

const userLogin = asyncHandler(async (req,res)=>{
    const {username, email, password} = req.body

    if(!username && !email){
        throw new Error("all fields are required")
    }

    const user = await User.findOne({
        $or:[{email}, {username}]
    })

    if(!user){
        throw new Error("User not found")
    }

    const passwordVerify = await user.isPasswordCorrect(password)

    if(!passwordVerify){
        throw new Error("Incorrect password")
    }
    
    
    const {refreshToken, accessToken} = await generateAccessAndRefreshToken(user._id)

    const loggedIn = await User.findById(user._id).select("-password -refreshToken")
    const options = {
        httpOnly: true,
        secure: true
    }
    
    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, {user:loggedIn, accessToken, refreshToken}, "logged in"))
})

const userLogout = asyncHandler(async (req, res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }


    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, {}, "user logged out")
        )
})

export {user, verifyingUser, userLogin, userLogout}