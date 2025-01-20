import express from "express";
import { createRideSchema, validate } from "../middlewares/validate";
import {
  checkRideStatus,
  pendingrides,
  ridecreator,
  updateRide,
} from "../controllers/ride.controller";
import { authUser } from "../middlewares/auth";
const router = express.Router();
router.post(
  "/create-ride",
  validate(createRideSchema),
  authUser,
  (req: any, res: any) => {
    ridecreator(req, res);
  }
);
router.get("/pending-rides", (req, res) => {
  pendingrides(req, res);
});
router.get("/ride-status", (req, res) => {
  checkRideStatus(req, res);
});
router.put("/ride-accept", (req, res) => {
  updateRide(req, res);
});
export default router;
