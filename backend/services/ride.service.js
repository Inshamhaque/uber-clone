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
exports.calculateFare = calculateFare;
exports.createRide = createRide;
const ride_models_1 = require("../models/ride.models");
const maps_service_1 = require("./maps.service");
const crypto_1 = __importDefault(require("crypto"));
const fareRates = {
    car: {
        baseFare: 50,
        ratePerKm: 15,
        ratePerMinute: 3,
    },
    bike: {
        baseFare: 20,
        ratePerKm: 8,
        ratePerMinute: 2,
    },
    auto: {
        baseFare: 30,
        ratePerKm: 10,
        ratePerMinute: 2.5,
    },
};
function calculateFare(source, destination, vehicleType) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!fareRates[vehicleType]) {
                throw new Error("Invalid vehicle type. Choose 'car', 'bike', or 'auto'.");
            }
            const distancetime = yield (0, maps_service_1.getDistancetime)(source, destination);
            const distanceInKm = parseFloat(distancetime.distance.replace(" km", ""));
            const timeInMinutes = parseInt(distancetime.duration.replace(" mins", ""));
            const { baseFare, ratePerKm, ratePerMinute } = fareRates[vehicleType];
            const totalFare = baseFare + distanceInKm * ratePerKm + timeInMinutes * ratePerMinute;
            return {
                distance: distanceInKm,
                duration: timeInMinutes,
                fare: totalFare.toFixed(2),
            };
        }
        catch (e) {
            console.error("Error calculating fare:", e);
            throw new Error("Unable to calculate fare.");
        }
    });
}
function getOtp(length) {
    return __awaiter(this, void 0, void 0, function* () {
        const otp = crypto_1.default.randomInt(0, 10 ** length).toString();
        return otp.padStart(length, "0");
    });
}
function createRide(_a) {
    return __awaiter(this, arguments, void 0, function* ({ user, pickup, destination, vehicleType, }) {
        try {
            const { distance, duration, fare } = yield calculateFare(pickup, destination, vehicleType);
            const otp = getOtp(6);
            const newRide = yield ride_models_1.rideModel.create({
                user,
                pickup,
                destination,
                distance,
                duration,
                fare: parseFloat(fare),
                otp,
            });
            return newRide;
        }
        catch (e) {
            console.error("Error creating ride:", e);
            throw new Error("Unable to create ride.");
        }
    });
}
