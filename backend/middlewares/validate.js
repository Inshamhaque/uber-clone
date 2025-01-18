"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.createRideSchema = exports.addressSchema = exports.captainloginSchema = exports.captainRegisterSchema = exports.userLoginSchema = exports.userRegisterSchema = void 0;
const zod_1 = __importStar(require("zod"));
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
const vehicleTypeEnum = zod_1.default.enum(["car", "bike", "auto"]);
exports.captainRegisterSchema = zod_1.default.object({
    fullname: zod_1.default.object({
        firstname: zod_1.default.string().min(3),
        lastname: zod_1.default.string().min(3),
    }),
    email: zod_1.default.string().email(),
    password: zod_1.default.string(),
    status: zod_1.default.string().optional(),
    vehicle: zod_1.default.object({
        color: zod_1.default.string(),
        plate: zod_1.default.string(),
        capacity: zod_1.default.number(),
        vehicleType: vehicleTypeEnum,
    }),
    location: zod_1.default
        .object({
        ltd: zod_1.default.number(),
        lng: zod_1.default.number(),
    })
        .optional(),
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
// create ride schema
exports.createRideSchema = zod_1.z.object({
    pickup: zod_1.z
        .string({
        required_error: "Pickup location is required.",
        invalid_type_error: "Pickup location must be a string.",
    })
        .min(1, "Pickup location cannot be empty."),
    destination: zod_1.z
        .string({
        required_error: "Destination location is required.",
        invalid_type_error: "Destination location must be a string.",
    })
        .min(1, "Destination location cannot be empty."),
    vehicleType: zod_1.z.enum(["car", "bike", "auto"], {
        required_error: "Vehicle type is required.",
        invalid_type_error: "Vehicle type must be one of 'car', 'bike', or 'auto'.",
    }),
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
