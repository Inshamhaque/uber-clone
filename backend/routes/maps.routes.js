"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const map_controller_1 = require("../controllers/map.controller");
const router = express_1.default.Router();
router.get("/get-coordinates", auth_1.authUser, (req, res) => {
    (0, map_controller_1.getAddressCoordinates)(req, res);
});
exports.default = router;
router.get("/get-distance-time", auth_1.authUser, (req, res) => {
    (0, map_controller_1.DistanceTime)(req, res);
});
router.get("/auto-complete", auth_1.authUser, (req, res) => {
    (0, map_controller_1.autoComplete)(req, res);
});
router.get("/get-fare", (req, res) => {
    (0, map_controller_1.fare)(req, res);
});
