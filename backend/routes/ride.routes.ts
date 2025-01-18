import express from "express";
import { createRideSchema, validate } from "../middlewares/validate";
import { pendingrides, ridecreator } from "../controllers/ride.controller";
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
export default router;
