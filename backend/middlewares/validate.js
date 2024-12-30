"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.userLoginSchema = exports.userRegisterSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userRegisterSchema = zod_1.default.object({
    fullname: zod_1.default.object({
        firstname: zod_1.default.string().min(3),
        lastname: zod_1.default.string().min(3)
    }),
    email: zod_1.default.string().email(),
    password: zod_1.default.string()
});
exports.userLoginSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string()
});
const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (result.success) {
        req.body = result.data;
        next();
    }
    else {
        return res.status(400).json({
            errors: result.error.errors
        });
    }
};
exports.validate = validate;
