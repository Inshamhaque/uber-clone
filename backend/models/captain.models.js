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
Object.defineProperty(exports, "__esModule", { value: true });
exports.captainModel = exports.captainSchema = void 0;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "Firstname must be at least 3 characters long"],
        },
        lastname: {
            type: String,
            minlength: [3, "Lastname must be at least 3 characters long"],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive",
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, "Color must be at least 3 characters long"],
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "Plate must be at least 3 characters long"],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1"],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ["car", "motorcycle", "auto"],
        },
    },
    location: {
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        },
    },
    money: {
        type: Number,
        default: 100,
    },
    jobs: {
        type: Number,
        default: 0,
    },
    distance: {
        type: Number,
        default: 0,
    },
});
exports.captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
    return token;
};
exports.captainSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.compare(password, this.password);
    });
};
exports.captainSchema.statics.hashPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.hash(password, 10);
    });
};
exports.captainModel = mongoose.model("captain", exports.captainSchema);
