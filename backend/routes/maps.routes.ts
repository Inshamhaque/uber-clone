import express from "express";
import { authUser } from "../middlewares/auth";
import { validate, addressSchema } from "../middlewares/validate";
import {
  autoComplete,
  Directons,
  DistanceTime,
  fare,
  getAddressCoordinates,
} from "../controllers/map.controller";
const router = express.Router();

router.get("/get-coordinates", authUser, (req, res) => {
  getAddressCoordinates(req, res);
});
export default router;

router.get("/get-distance-time", authUser, (req, res) => {
  DistanceTime(req, res);
});
router.get("/auto-complete", authUser, (req, res) => {
  autoComplete(req, res);
});
router.get("/get-fare", (req, res) => {
  fare(req, res);
});
router.get("/directions", (req, res) => {
  Directons(req, res);
});
