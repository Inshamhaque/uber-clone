import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectToDB } from './db/db';
import userRoutes from './routes/userRoutes'
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
connectToDB();
app.use('/user',userRoutes);
app.listen(8080,()=>{
    console.log('app running on port 3000');
})




