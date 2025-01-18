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
exports.ridecreator = ridecreator;
exports.pendingrides = pendingrides;
const ride_models_1 = require("../models/ride.models");
const ride_service_1 = require("../services/ride.service");
function ridecreator(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { pickup, destination, vehicleType } = req.body;
            const user = req.user;
            console.log("user is:", user);
            if (!user || !pickup || !destination || !vehicleType) {
                return res.status(400).json({
                    message: "Missing required fields: user, pickup, destination, vehicleType.",
                });
            }
            const ride = yield (0, ride_service_1.createRide)({
                user,
                pickup,
                destination,
                vehicleType,
            });
            return res.status(201).json({
                message: "Ride created successfully.",
                ride,
            });
        }
        catch (error) {
            console.error("Error creating ride:", error);
            return res.status(500).json({
                message: "Unable to create ride.",
                error,
            });
        }
    });
}
function pendingrides(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rides = yield ride_models_1.rideModel.find({
                status: "pending",
            });
            return res.status(201).json({
                rides,
            });
        }
        catch (e) {
            return res.status(400).json({
                message: "some error occurred",
            });
        }
    });
}
