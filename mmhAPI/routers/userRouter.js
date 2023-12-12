import express from "express"
import { getUserPage } from "../controllers/userController.js"
const userRouter=express.Router()
userRouter.get("/getuser",getUserPage)
export {userRouter}
