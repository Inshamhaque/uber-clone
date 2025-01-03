import express, { json } from 'express';
import { userRegisterSchema, userLoginSchema, validate } from '../middlewares/validate';
import { loginUser, logout, registerUser, userProfile } from '../controllers/user';
import { authUser } from '../middlewares/auth';
const router = express.Router();
//user creation route
router.post('/register',validate(userRegisterSchema),(req,res,next)=>{
    registerUser(req,res,next);
})
// user login route 
router.post('/login',validate(userLoginSchema),(req,res,next)=>{
    loginUser(req,res,next);
})
//user get profile
router.get('/profile',authUser,(req,res,next)=>{
    userProfile(req,res,next);
})
//logout route 
router.post('/logout',authUser,(req,res,next)=>{
    logout(req,res,next);
})
export default router;