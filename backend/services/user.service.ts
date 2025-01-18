import { userModel } from "../models/user.models";
type prs = {
    firstname : string,
    lastname : string,
    email : string,
    password : string
}
export async function createUser({
    firstname, lastname, email, password
}:prs){
    if(!firstname || !email || !password){
        throw new Error('All fields are required');
    }
    const user  = userModel.create({
        fullname : {
            firstname, 
            lastname
        },
        email,
        password
    })
    return user
}