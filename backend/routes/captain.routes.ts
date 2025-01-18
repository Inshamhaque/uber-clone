import express from "express";
import {
  captainRegisterSchema,
  validate,
  captainloginSchema,
} from "../middlewares/validate";
import {
  activeCaptain,
  captainProfile,
  loginCaptain,
  logout,
  register,
} from "../controllers/captain";
import { authCaptain } from "../middlewares/auth";
const router = express.Router();
router.post("/register", validate(captainRegisterSchema), (req, res) => {
  register(req, res);
});
router.post("/login", validate(captainloginSchema), (req, res) => {
  loginCaptain(req, res);
});
router.get("/profile", authCaptain, (req, res) => {
  captainProfile(req, res);
});
router.post("/logout", authCaptain, (req, res) => {
  logout(req, res);
});
router.put("/active", authCaptain, (req, res) => {
  activeCaptain(req, res);
});
export default router;
