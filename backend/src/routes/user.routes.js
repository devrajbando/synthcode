import { Router } from "express";
import {registerUser,LoginUser,LogoutUser,ChangePassword,CurrentUser,verifyGoogleToken} from '../controllers/user.controller.js'

import {verifyJWT,validateToken} from '../middlewares/auth.middleware.js'
// import { Token } from "../models/token.model.js";





const userRouter=Router()

userRouter.route('/signup').post(registerUser)
userRouter.route('/verify').get(verifyJWT, async (req, res) => {
    res.json({ user: req.user })
  })
userRouter.route('/login').post(LoginUser)
// userRouter.route('/google').post(verifyGoogleToken)
userRouter.route('/logout').post(verifyJWT,LogoutUser)
userRouter.route('/change-pass').post(verifyJWT,ChangePassword)
userRouter.route('/current-user').post(verifyJWT,CurrentUser)


export default userRouter