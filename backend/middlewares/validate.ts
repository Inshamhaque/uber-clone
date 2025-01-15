import zod, { z } from "zod";
// use register schema
export const userRegisterSchema = zod.object({
  fullname: zod.object({
    firstname: zod.string().min(3),
    lastname: zod.string().min(3),
  }),
  email: zod.string().email(),
  password: zod.string(),
});
// user login schema
export const userLoginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});
// captain register schema
const vehicleTypeEnum = zod.enum(["car", "motorcycle", "auto"]);
export const captainRegisterSchema = zod.object({
  fullname: zod.object({
    firstname: zod.string().min(3),
    lastname: zod.string().min(3),
  }),
  email: zod.string().email(),
  password: zod.string(),
  status: zod.string(),
  vehicle: zod.object({
    color: zod.string(),
    plate: zod.string(),
    capacity: zod.number(),
    vehicleType: vehicleTypeEnum,
  }),
  location: zod.object({
    ltd: zod.number(),
    lng: zod.number(),
  }),
});
// captain login schema
export const captainloginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});
// get address schema
export const addressSchema = zod.object({
  address: zod.string().min(3),
});
export const validate = (schema: any) => (req: any, res: any, next: any) => {
  const result = schema.safeParse(req.body);
  if (result.success) {
    req.body = result.data;
    next();
  } else {
    return res.status(400).json({
      errors: result.error.errors,
    });
  }
};
