import { asyncHandler } from "../utils/AsyncHandler.js";
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.model.js'
import bcrypt from 'bcrypt'
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from 'jsonwebtoken'
import { mongoose } from "mongoose";
// import { sendEmail } from "../utils/SendEmail.js";

const generateAccessAndRefreshToken=async(userId)=>
    {
        try {
            const user=await User.findById(userId)
            const accessToken=user.generateAcessToken()
            const refreshToken=user.generateRefreshToken()
            user.refreshToken=refreshToken
            await user.save({validateBeforeSave:false})
    
            return {accessToken,refreshToken}
        } catch (error) {
            console.log(error.message)
            throw new ApiError(500,"something went wrong on our side")
        }
    }

// const verifyEmail=asyncHandler(async(req,res)=>{
    
        
//         const email=req.body.email;
//         const username=req.body.username
//         const existedUser=await User.findOne({
//             $or:[{username},{email}]
//         })
//         if(existedUser){
//             throw new ApiError(409,"User with email or username already exists")
//         }
        
        

//             return res.status(201).json(
//                 new ApiResponse(201,"username","New user")
//             )
        
    
        
        
//         // console.log(existedUser)
//         // const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
//         // await sendEmail(user.email, "Verify Email", url);
        
        
//         // return res.status(201).send("Email sent to your account to verify")
//     })
            


const registerUser=asyncHandler(async(req,res)=>{
    try {
        const {
            username,
            email,
            password,
        }=req.body;
            console.log(req.body)
    
    
            const existedUser=await User.findOne({
                $or:[{username},{email}]
            })
            if(existedUser){
                return res.status(409)
                .json({

                    
                    status: 409,
                    message: "User with email or username already exists",
                }
                )
            }
            console.log(existedUser)

            const newPassword = await bcrypt.hash(password, 10)
    
            const user=await User.create({
                username:req.body.username.toLowerCase(),
                email:req.body.email,
                password:newPassword,
                              
            })
    
            const createdUser=await User.findById(user._id).select(
                "-password -refreshToken"
            )
    
            if(!createdUser){
                throw new ApiError(500 ,"something went wrong on our side")
            }
        
            
            return res.status(201).json(
                new ApiResponse(201,createdUser,"User created Successfully")
            )
    } catch (error) {
        // throw new ApiError(500,"something went wrong")
        console.log(error)
    }
})
const checkAuth=asyncHandler(async(req,res)=>{
    res.status(200)
})
const LoginUser=asyncHandler(async(req,res)=>{
    
    
    const {email,password }=req.body
    if(!email)
        throw new ApiError(400,"email is required")

    const user=await User.findOne({email})
    
    
    if(!user)
        throw new ApiError(404,"user does  not exist")

    console.log(password)
    console.log(user.password)

    // const isPasswordValid=password === user.password ? true:false

    const isPasswordValid=await bcrypt.compare(
		password,
		user.password)
    
        
        console.log(isPasswordValid)
    if(!isPasswordValid)
        throw new ApiError(401,"INCORRECT password")

    const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id)


    const loggedInUser=await User.findById(user._id).select("-password -refreshToken") 

    const options={
        httpOnly:true,//for local its false, later set true
        secure:true
    }

    return res   
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(
        200,
        {
            user:loggedInUser,accessToken,refreshToken
        },
        "User Logged In Succesfully"
    ))



})

const LogoutUser=asyncHandler(async(req,res)=>{

    const {password}=req.body
    const user=await User.findById(req.user._id)

    // const isPasswordValid=await user.isPasswordCorrect(password)
    
    const isPasswordValid=await bcrypt.compare(
        password,
		user.password)
        // console.log(isPasswordValid)
        console.log(password)
        console.log(user.password)
    // const isPasswordValid=password === user.password ? true:false
        if(!isPasswordValid)
            throw new ApiError(401,"INCORRECT password")
        
        
    await User.findByIdAndUpdate (req.user._id,{
        $unset:{
            refreshToken:1
        }
    },{
        new:true
    })
        

        const options={
            httpOnly:true,
            secure:false
//turn to true during production       
 }

        return res
        .status(200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .json(new ApiResponse(200,{},"User logged Out"))
    })

const ChangePassword=asyncHandler(async(req,res)=>{
    const {oldPassword, newPassword}=req.body
    const user=await User.findById(req.user._id)
    const isPasswordValid=await bcrypt.compare(
        oldPassword,
		user.password)
        // const isPasswordValid=password === user.password ? true:false
        if(!isPasswordValid)
            throw new ApiError(401,"INCORRECT password")
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(req.user?._id,
            {
                $set:{
                    password:hashedPassword
                }
            },
            {new:true} 
        ).select("-password")
    await user.save({validateBeforeSave:false})


    

    return res
    .status(200)
    .json(new ApiResponse(200,{},"Password changed Successfully"))
    })

const CurrentUser=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id)
    const email=user.email
    const username=user.username
    return res
    .status(200)
    .json(new ApiResponse(200,{email,username},"User data"))
    
})

export {generateAccessAndRefreshToken,
    // verifyEmail,
    registerUser,
    LoginUser,
    LogoutUser
    ,checkAuth,
    ChangePassword,
    CurrentUser
}