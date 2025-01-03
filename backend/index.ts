import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectToDB } from './db/db';
import userRoutes from './routes/userRoutes'
import  captainRoutes  from './routes/captain.routes'
const app = express(); 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
connectToDB();
app.use('/user',userRoutes);
app.use('/captain',captainRoutes);
app.listen(8080,()=>{
    console.log('app running on port 3000');
})




