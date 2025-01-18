"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = require("../middlewares/validate");
const captain_1 = require("../controllers/captain");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post("/register", (0, validate_1.validate)(validate_1.captainRegisterSchema), (req, res) => {
    (0, captain_1.register)(req, res);
});
router.post("/login", (0, validate_1.validate)(validate_1.captainloginSchema), (req, res) => {
    (0, captain_1.loginCaptain)(req, res);
});
router.get("/profile", auth_1.authCaptain, (req, res) => {
    (0, captain_1.captainProfile)(req, res);
});
router.post("/logout", auth_1.authCaptain, (req, res) => {
    (0, captain_1.logout)(req, res);
});
router.put("/active", auth_1.authCaptain, (req, res) => {
    (0, captain_1.activeCaptain)(req, res);
});
exports.default = router;
