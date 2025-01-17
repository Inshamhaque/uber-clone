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
exports.authCaptain = exports.authUser = void 0;
const blacklist_models_1 = require("../models/blacklist.models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_models_1 = require("../models/user.models");
const captain_models_1 = require("../models/captain.models");
const authUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token || req.headers.authorization;
    if (!token) {
        console.log("no token is there");
        return res.status(401).json({
            message: "unauthorized",
        });
    }
    const isBlackListed = yield blacklist_models_1.blackListModel.findOne({ token });
    if (isBlackListed) {
        return res.status(401).json({
            message: "unauthorized",
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, "JWT_SECRET");
        //@ts-ignore
        const user = yield user_models_1.userModel.findById(decoded._id);
        req.user = user;
        return next();
    }
    catch (e) {
        console.error("unauthorized access invoked");
        return res.status(401).json({
            message: "unauthorized",
        });
    }
});
exports.authUser = authUser;
const authCaptain = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token || req.headers.authorization;
    if (!token) {
        console.log("no token is there");
        console.log("token is there : ", token);
        return res.status(401).json({
            message: "unauthorized",
        });
    }
    const isBlackListed = yield blacklist_models_1.blackListModel.findOne({ token });
    if (isBlackListed) {
        return res.status(401).json({
            message: "unauthorized",
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, "JWT_SECRET");
        //@ts-ignore
        const captain = yield captain_models_1.captainModel.findById(decoded._id);
        req.captain = captain;
        return next();
    }
    catch (e) {
        console.log("there is error in here");
        return res.status(401).json({
            message: "unauthorized",
        });
    }
});
exports.authCaptain = authCaptain;
