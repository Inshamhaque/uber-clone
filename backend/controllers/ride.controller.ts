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
import mongoose from "mongoose";

export async function checkRideStatus(req: any, res: any) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      message: "Ride ID is required.",
    });
  }

  try {
    // Convert the string ID to ObjectId
    // const rideId = mongoose.Types.ObjectId(id);

    // Use findById with the properly formatted ObjectId
    const ride = await rideModel.findById(id);

    if (!ride) {
      return res.status(404).json({
        message: "Ride not found.",
      });
    }

    return res.status(200).json({
      message: "Ride status fetched successfully.",
      status: ride.status,
    });
  } catch (error) {
    console.error("Error checking ride status:", error);
    return res.status(500).json({
      message: "Unable to check ride status.",
      error,
    });
  }
}
// to mark ride as accepted
export async function updateRide(req: any, res: any) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      message: "Ride ID is required.",
    });
  }

  try {
    // Find the ride by ID
    const ride = await rideModel.findById(id);

    if (!ride) {
      return res.status(404).json({
        message: "Ride not found.",
      });
    }

    // Check if the ride status is 'pending' before updating it
    if (ride.status === "pending") {
      // Update the status to 'accepted'
      ride.status = "accepted";

      // Save the updated ride
      await ride.save();

      return res.status(200).json({
        message: "Ride status updated to accepted.",
        ride,
      });
    } else {
      return res.status(400).json({
        message: "Ride is not in pending status. Cannot update.",
      });
    }
  } catch (error) {
    console.error("Error updating ride status:", error);
    return res.status(500).json({
      message: "Unable to update ride status.",
      error,
    });
  }
}
