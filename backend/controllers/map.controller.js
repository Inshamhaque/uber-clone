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
exports.getAddressCoordinates = getAddressCoordinates;
exports.DistanceTime = DistanceTime;
exports.autoComplete = autoComplete;
exports.fare = fare;
exports.Directons = Directons;
const maps_service_1 = require("../services/maps.service");
const ride_service_1 = require("../services/ride.service");
function getAddressCoordinates(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { address } = req.query;
        try {
            const coordinates = yield (0, maps_service_1.getCoordinate)(address);
            console.log(coordinates);
            return res.status(200).json({ coordinates });
        }
        catch (e) {
            res.status(404).json({
                message: "coordinates not found",
            });
        }
    });
}
function DistanceTime(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { source } = req.query;
        const { destination } = req.query;
        try {
            const result = yield (0, maps_service_1.getDistancetime)(source, destination);
            console.log(result);
            res.status(200).json({
                result,
            });
        }
        catch (e) {
            res.status(404).json({
                message: "error occurred while fetching api",
            });
        }
    });
}
function autoComplete(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { input } = req.query;
        try {
            const result = yield (0, maps_service_1.getAutoSuggestions)(input);
            console.log(result);
            res.status(200).json({
                result,
            });
        }
        catch (e) {
            res.status(404).json({
                message: "some error occurred",
            });
        }
    });
}
function fare(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { source, destination } = req.query;
        try {
            const auto_price = yield (0, ride_service_1.calculateFare)(source, destination, "auto");
            const bike_price = yield (0, ride_service_1.calculateFare)(source, destination, "bike");
            const car_price = yield (0, ride_service_1.calculateFare)(source, destination, "car");
            return res.status(200).json({
                bike_price,
                car_price,
                auto_price,
            });
        }
        catch (e) {
            res.status(400).json({
                message: "error calculating fare",
            });
        }
    });
}
function Directons(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { source, destination } = req.query;
        try {
            const directions = yield (0, maps_service_1.getDirections)(source, destination);
            if (directions) {
                res.status(201).json({
                    directions,
                });
            }
        }
        catch (e) {
            res.status(400).json({
                message: "some error occurred",
            });
        }
    });
}
