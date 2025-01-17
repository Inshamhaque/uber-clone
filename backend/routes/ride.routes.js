"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = require("../middlewares/validate");
const ride_controller_1 = require("../controllers/ride.controller");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post("/create-ride", (0, validate_1.validate)(validate_1.createRideSchema), auth_1.authUser, (req, res) => {
    (0, ride_controller_1.ridecreator)(req, res);
});
exports.default = router;
