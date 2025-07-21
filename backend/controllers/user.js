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
exports.logout = exports.userProfile = exports.loginUser = exports.registerUser = void 0;
const blacklist_models_1 = require("../models/blacklist.models");
const user_models_1 = require("../models/user.models");
const user_service_1 = require("../services/user.service");
const bcrypt_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// user creation
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, email, password } = req.body;
    const isPresent = yield user_models_1.userModel.findOne({ email });
    // todo: userModel method not working fine
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    if (isPresent) {
        return res.status(400).json({
            message: "user already exists",
        });
    }
    // creating user using pre defined function earlier
    const user = yield (0, user_service_1.createUser)({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
    });
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, "JWT_SECRET");
    return res.status(201).json({
        message: "User created successfully",
        token,
        user,
    });
});
exports.registerUser = registerUser;
// user login
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_models_1.userModel.findOne({ email }).select("+password");
    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password",
        });
    }
    const match = yield bcrypt_1.default.compare(password, user.password);
    if (!match) {
        return res.status(401).json({
            message: "invalid email or password",
        });
    }
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, "JWT_SECRET");
    // set cookie in here
    res.cookie("token", token, {
        httpOnly: true, // Prevents client-side scripts from accessing the cookie
        // secure: process.env.NODE_ENV === "", // Ensures cookies are sent over HTTPS in production
        sameSite: "None", // Controls cross-origin requests
        maxAge: 24 * 60 * 60 * 1000, // Optional: Sets the expiration time (1 day in milliseconds),
        secure: false,
    });
    console.log("cookie set successfully");
    res.set("Authorizaton", token);
    return res.status(201).json({
        token,
        message: "user login successful",
        user,
    });
});
exports.loginUser = loginUser;
// get profiles of user
const userProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json(req.user);
});
exports.userProfile = userProfile;
//logout user
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    yield blacklist_models_1.blackListModel.create({ token });
    res.status(200).json({
        message: "logged out",
    });
});
exports.logout = logout;
