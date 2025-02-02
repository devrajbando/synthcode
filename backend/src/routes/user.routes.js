import { Router } from "express";
import {registerUser,LoginUser,LogoutUser} from '../controllers/user.controller.js'

import {verifyJWT,validateToken} from '../middlewares/auth.middleware.js'
// import { Token } from "../models/token.model.js";





const userRouter=Router()

userRouter.route('/signup').post(registerUser)
userRouter.route('/login').post(LoginUser)
userRouter.route('/logout').post(verifyJWT,LogoutUser)


export default userRouter