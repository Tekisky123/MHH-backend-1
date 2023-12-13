import express from 'express'
const userRouter=express.Router();
import { registerUser,login,updatemobile , getUser , deleteUser , updateUser} from '../controllers/userController.js';

userRouter.post('/register',registerUser);
userRouter.post('/login',login);
userRouter.post('/updatemobile',updatemobile);
userRouter.get('/getuser',getUser);
userRouter.get('/deleteuser/:id',deleteUser);
userRouter.post('/updateuser',updateUser);



export default userRouter;
