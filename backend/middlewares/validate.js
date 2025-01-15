"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.addressSchema = exports.captainloginSchema = exports.captainRegisterSchema = exports.userLoginSchema = exports.userRegisterSchema = void 0;
const zod_1 = __importDefault(require("zod"));
// use register schema
exports.userRegisterSchema = zod_1.default.object({
    fullname: zod_1.default.object({
        firstname: zod_1.default.string().min(3),
        lastname: zod_1.default.string().min(3),
    }),
    email: zod_1.default.string().email(),
    password: zod_1.default.string(),
});
// user login schema
exports.userLoginSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string(),
});
// captain register schema
const vehicleTypeEnum = zod_1.default.enum(["car", "motorcycle", "auto"]);
exports.captainRegisterSchema = zod_1.default.object({
    fullname: zod_1.default.object({
        firstname: zod_1.default.string().min(3),
        lastname: zod_1.default.string().min(3),
    }),
    email: zod_1.default.string().email(),
    password: zod_1.default.string(),
    status: zod_1.default.string(),
    vehicle: zod_1.default.object({
        color: zod_1.default.string(),
        plate: zod_1.default.string(),
        capacity: zod_1.default.number(),
        vehicleType: vehicleTypeEnum,
    }),
    location: zod_1.default.object({
        ltd: zod_1.default.number(),
        lng: zod_1.default.number(),
    }),
});
// captain login schema
exports.captainloginSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string(),
});
// get address schema
exports.addressSchema = zod_1.default.object({
    address: zod_1.default.string().min(3),
});
const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (result.success) {
        req.body = result.data;
        next();
    }
    else {
        return res.status(400).json({
            errors: result.error.errors,
        });
    }
};
exports.validate = validate;
