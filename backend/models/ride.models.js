"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rideModel = exports.rideSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var Statuses;
(function (Statuses) {
    Statuses[Statuses["pending"] = 0] = "pending";
    Statuses[Statuses["accepted"] = 1] = "accepted";
    Statuses[Statuses["ongoing"] = 2] = "ongoing";
    Statuses[Statuses["completed"] = 3] = "completed";
    Statuses[Statuses["cancelled"] = 4] = "cancelled";
})(Statuses || (Statuses = {}));
exports.rideSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    captain: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Captain",
    },
    pickup: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    distance: {
        type: Number,
        required: true,
    }, // in kms
    duration: {
        type: Number,
        required: true,
    }, // in hrs
    status: {
        type: String,
        enum: Object.values(Statuses),
        default: "pending",
    },
    fare: {
        type: Number,
        required: true,
    },
    paymentId: {
        type: String,
    },
    orderId: {
        type: String,
    },
    signature: {
        type: String,
    },
});
exports.rideModel = mongoose_1.default.model("ride", exports.rideSchema);
