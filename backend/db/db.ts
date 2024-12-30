import mongoose from "mongoose";
export async function connectToDB(){
    mongoose.connect('mongodb+srv://haqueinsham:Deadlydevil@cluster0.dmne0nl.mongodb.net/Uber-Clone'
    ).then(()=>{
        console.log('Connected to DB');
    }).catch(e=>console.log(e));
}

