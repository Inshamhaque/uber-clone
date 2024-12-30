import zod from 'zod'
export const userRegisterSchema = zod.object({
    fullname : zod.object({
        firstname : zod.string().min(3),
        lastname : zod.string().min(3)
    }),
    email : zod.string().email(),
    password : zod.string()
})
export const userLoginSchema = zod.object({
    email : zod.string().email(),
    password : zod.string()
})
export const validate = (schema:any) => (req:any,res:any,next:any) =>{
    const result = schema.safeParse(req.body);
    if(result.success){
        req.body = result.data;
        next();
    }
    else{
        return res.status(400).json({
            errors : result.error.errors
        })
    }
}