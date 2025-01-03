"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = require("../middlewares/validate");
const user_1 = require("../controllers/user");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
//user creation route
router.post('/register', (0, validate_1.validate)(validate_1.userRegisterSchema), (req, res, next) => {
    (0, user_1.registerUser)(req, res, next);
});
// user login route 
router.post('/login', (0, validate_1.validate)(validate_1.userLoginSchema), (req, res, next) => {
    (0, user_1.loginUser)(req, res, next);
});
//user get profile
router.get('/profile', auth_1.authUser, (req, res, next) => {
    (0, user_1.userProfile)(req, res, next);
});
//logout route 
router.post('/logout', auth_1.authUser, (req, res, next) => {
    (0, user_1.logout)(req, res, next);
});
exports.default = router;
