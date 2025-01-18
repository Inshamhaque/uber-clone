import { captainModel} from "../models/captain.models";
type prs = {
    firstname : string, 
    lastname : string
    password : string,
    email : string,
    vehicle : Object,
    location : Object
}
export async function createCaptain({ firstname, password, lastname, vehicle, email, location } : prs){
    if(!firstname || !email || !vehicle || !password){
        console.log(firstname)
        console.log(lastname);
        console.log(email);
        console.log(password);
        console.log(vehicle);
        throw new Error('ALl fields are required');
    }
    else{
        const captain = await captainModel.create({
            fullname : {
                firstname,
                lastname
            },
            email,
            password, 
            vehicle, 
            location
            
        });
        return captain;
    }
}