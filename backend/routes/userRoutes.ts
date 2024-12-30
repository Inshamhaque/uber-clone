import express, { json } from 'express';
import { userRegisterSchema, userLoginSchema, validate } from '../middlewares/validate';
import { loginUser, registerUser } from '../controllers/user';
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
router.get('/profile',authUser,(req,res,next)=>{
    res.status(201).json({
        message : req.body
    })
})
export default router;