"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const user_models_1 = require("../models/user.models");
const user_1 = require("../services/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// user creation
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, email, password } = req.body;
    const isPresent = yield user_models_1.userModel.findOne({ email });
    // todo: userModel method not working fine
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    if (isPresent) {
        return res.status(400).json({
            message: "user already exists"
        });
    }
    // creating user using pre defined function earlier
    const user = yield (0, user_1.createUser)({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, 'JWT_SECRET');
    return res.status(201).json({
        message: "User created successfully",
        token,
        user
    });
});
exports.registerUser = registerUser;
// user login 
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_models_1.userModel.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }
    const match = yield bcrypt_1.default.compare(password, user.password);
    if (!match) {
        return res.status(401).json({
            message: "invalid email or password"
        });
    }
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, 'JWT_SECRET');
    return res.status(201).json({
        token,
        message: "user login successful",
        user
    });
});
exports.loginUser = loginUser;
// get profiles of user
