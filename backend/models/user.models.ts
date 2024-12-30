import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullname:{
        firstname : {
            type : String,
            required : true,
            minlength : [3,'first name must be atleast 3 characters']
        },
        lastname : {
            type : String,
            minlength : [3,'Last name must be at least 3 characters']
        }
    },
    email : {
        type : String,
        required : true,
        unique : true,
        minlength : [5,'Email must be at least 5 characters long']
    },
    password : {
        type : String, 
        required : true,
        select : false
    },
    socketId : {
        type : String
    }
})
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},'JWT_SECRET',{expiresIn:'24h'});
    return token;
}
userSchema.methods.comparePasswrd = async function(password : string){
    return await bcrypt.compare(password,this.password);
}
userSchema.statics.hashPassword = async function(password : string){
    return bcrypt.hash(password,10,(err,hash)=>{
        if(err){
            console.error('error ocurrred while hashing');
        }
        else{
            console.log('hashed string is',hash);
        }
    });
}
export const userModel = mongoose.model('user',userSchema);
