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
const vehicleTypeEnum = zod.enum(["car", "bike", "auto"]);
export const captainRegisterSchema = zod.object({
  fullname: zod.object({
    firstname: zod.string().min(3),
    lastname: zod.string().min(3),
  }),
  email: zod.string().email(),
  password: zod.string(),
  status: zod.string().optional(),
  vehicle: zod.object({
    color: zod.string(),
    plate: zod.string(),
    capacity: zod.number(),
    vehicleType: vehicleTypeEnum,
  }),
  location: zod
    .object({
      ltd: zod.number(),
      lng: zod.number(),
    })
    .optional(),
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
// create ride schema
export const createRideSchema = z.object({
  pickup: z
    .string({
      required_error: "Pickup location is required.",
      invalid_type_error: "Pickup location must be a string.",
    })
    .min(1, "Pickup location cannot be empty."),
  destination: z
    .string({
      required_error: "Destination location is required.",
      invalid_type_error: "Destination location must be a string.",
    })
    .min(1, "Destination location cannot be empty."),
  vehicleType: z.enum(["car", "bike", "auto"], {
    required_error: "Vehicle type is required.",
    invalid_type_error: "Vehicle type must be one of 'car', 'bike', or 'auto'.",
  }),
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
