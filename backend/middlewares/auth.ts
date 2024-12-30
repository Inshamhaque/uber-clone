import { blackListModel } from "../models/blacklist.models";
export const authUser = async(req:any,res:any,next:any)=>{
    const token = req.coolkie.token || req.headers.authorization;
    if(!token){
        return res.status(401).json({
            message : 'unauthorized'
        })
    }
    const isBlackListed  = await blackListModel.findOne({token});
    if(isBlackListed){
        return res.status(401).json({
            message : 'unauthorized'
        })
    }
    next();
}