import mongoose from "mongoose";
export async function connectToDB(){
    mongoose.connect('mongodb+srv://haqueinsham:BLbPwkeRXAw4Qzdd@cluster0.zj28cv7.mongodb.net/test-uber-clone'
    ).then(()=>{
        console.log('Connected to DB');
    }).catch(e=>console.log(e));
}

