import { rideModel } from "../models/ride.models";
import { createRide } from "../services/ride.service";

export async function ridecreator(req: any, res: any) {
  try {
    const { pickup, destination, vehicleType } = req.body;
    const user = req.user;
    console.log("user is:", user);

    if (!user || !pickup || !destination || !vehicleType) {
      return res.status(400).json({
        message:
          "Missing required fields: user, pickup, destination, vehicleType.",
      });
    }

    const ride = await createRide({
      user,
      pickup,
      destination,
      vehicleType,
    });
    return res.status(201).json({
      message: "Ride created successfully.",
      ride,
    });
  } catch (error) {
    console.error("Error creating ride:", error);
    return res.status(500).json({
      message: "Unable to create ride.",
      error,
    });
  }
}
export async function pendingrides(req: any, res: any) {
  try {
    const rides = await rideModel.find({
      status: "pending",
    });
    return res.status(201).json({
      rides,
    });
  } catch (e) {
    return res.status(400).json({
      message: "some error occurred",
    });
  }
}
