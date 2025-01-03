"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blackListModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const blackListSchema = new mongoose_1.default.Schema({
    token: String
});
exports.blackListModel = mongoose_1.default.model('blacklisted', blackListSchema);
