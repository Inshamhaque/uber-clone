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
exports.getCoordinate = getCoordinate;
exports.getDistancetime = getDistancetime;
exports.getAutoSuggestions = getAutoSuggestions;
exports.getDirections = getDirections;
const axios_1 = __importDefault(require("axios"));
function getCoordinate(address) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        try {
            const response = yield axios_1.default.get("https://maps.googleapis.com/maps/api/geocode/json", {
                params: { address, key: apiKey },
            });
            if (response.data.status == "OK") {
                const location = response.data.results[0].geometry.location;
                //   console.log(location);
                return { lat: location.lat, lng: location.lng };
            }
            else {
                throw new Error(`Invalid API response: ${JSON.stringify(response.data)}`);
            }
        }
        catch (e) {
            console.error("Error in getCoordinate:", e);
            throw e;
        }
    });
}
function getDistancetime(origin, destination) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        if (!apiKey) {
            throw new Error("Google Maps API Key is missing.");
        }
        try {
            const response = yield axios_1.default.get("https://maps.googleapis.com/maps/api/distancematrix/json", {
                params: {
                    key: apiKey,
                    origins: origin,
                    destinations: destination,
                    mode: "driving",
                    units: "metric",
                },
            });
            console.log(response.data.rows[0]);
            if (response.data.status === "OK") {
                //   console.log("this is getting executed");
                const element = response.data.rows[0].elements[0];
                const distance = element.distance.text;
                const duration = element.duration.text;
                return { distance, duration };
            }
            else {
                //   console.log("this is getting executed");
                throw new Error(`API Error: ${response.data.status}`);
            }
        }
        catch (error) {
            console.error("Error fetching distance:", error);
            if (error) {
                console.error("API Response error details:", error);
            }
            throw error;
        }
    });
}
function getAutoSuggestions(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        let predictions = [];
        try {
            const response = yield axios_1.default.get("https://maps.googleapis.com/maps/api/place/autocomplete/json", {
                params: {
                    key: apiKey,
                    input,
                },
            });
            console.log("preds is : ", response);
            if (response.data.status === "OK") {
                const pred = response.data.predictions;
                predictions = pred
                    .filter((each) => !!each.description)
                    .map((pred) => ({
                    description: pred.description,
                }));
            }
            return predictions;
        }
        catch (e) {
            console.error("error fetching response", e);
        }
    });
}
function getDirections(source, destination) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        try {
            const endpoint = `https://maps.googleapis.com/maps/api/directions/json`;
            const response = yield axios_1.default.get(endpoint, {
                params: {
                    origin: source,
                    destination: destination,
                    mode: "driving",
                    key: apiKey,
                },
            });
            if (response.data.status !== "OK") {
                throw new Error(`Google Maps API error: ${response.data.status}`);
            }
            const directions = response.data.routes[0];
            const legs = directions.legs[0];
            return {
                distance: legs.distance.text,
                duration: legs.duration.text,
                steps: legs.steps.map((step) => ({
                    instruction: step.html_instructions,
                    distance: step.distance.text,
                    duration: step.duration.text,
                })),
            };
        }
        catch (error) {
            console.error("Error fetching directions:", error);
            throw new Error("Unable to fetch directions. Please try again later.");
        }
    });
}
