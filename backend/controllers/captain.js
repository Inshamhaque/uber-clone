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
exports.register = register;
exports.loginCaptain = loginCaptain;
exports.captainProfile = captainProfile;
exports.logout = logout;
const blacklist_models_1 = require("../models/blacklist.models");
const captain_models_1 = require("../models/captain.models");
const captain_1 = require("../services/captain");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//signup handler
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { fullname, vehicle, password, email, location } = req.body;
        const isPresent = yield captain_models_1.captainModel.findOne({
            email
        });
        if (isPresent) {
            return res.status(400).json({
                message: "user already exists"
            });
        }
        ;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const captain = yield (0, captain_1.createCaptain)({
            firstname: fullname.firstname,
            password: hashedPassword,
            lastname: fullname.lastname,
            email,
            vehicle,
            location
        });
        if (!captain) {
            console.error('error occured while creaitng captain : ');
        }
        console.log(captain);
        const token = jsonwebtoken_1.default.sign({ _id: captain._id }, 'JWT_SECRET');
        return res.status(201).json({
            message: "captain created successfully",
            captain,
            token
        });
    });
}
//login handler
function loginCaptain(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const captain = yield captain_models_1.captainModel.findOne({ email }).select('+password');
        if (!captain) {
            return res.status(401).json({
                message: 'invalid email or password'
            });
        }
        const isMatch = bcrypt_1.default.compare(password, captain.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "invalid email or password"
            });
        }
        //generate token here, if correct credentials are given
        const token = jsonwebtoken_1.default.sign({ _id: captain._id }, 'JWT_SECRET');
        res.cookie('token', token, {
            httpOnly: true, // Prevents client-side scripts from accessing the cookie
            secure: process.env.NODE_ENV === 'production', // Ensures cookies are sent over HTTPS in production
            sameSite: 'lax', // Controls cross-origin requests
            maxAge: 24 * 60 * 60 * 1000 // Optional: Sets the expiration time (1 day in milliseconds)
        });
        return res.status(201).json({
            token,
            message: 'captain login successfull',
            captain
        });
    });
}
// get captain profile 
function captainProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.status(200).json(req.captain);
    });
}
// logout handler 
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                message: 'uunauthroized access, how did  u bypass middlware'
            });
        }
        res.clearCookie('token');
        yield blacklist_models_1.blackListModel.create({ token });
        res.status(200).json({
            message: "logged out"
        });
    });
}
