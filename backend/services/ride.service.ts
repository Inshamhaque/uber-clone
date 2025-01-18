import mongoose from "mongoose";
import { rideModel } from "../models/ride.models";
import { getDistancetime } from "./maps.service";
import crypto from "crypto";

type VehicleType = "car" | "bike" | "auto";

const fareRates = {
  car: {
    baseFare: 50,
    ratePerKm: 15,
    ratePerMinute: 3,
  },
  bike: {
    baseFare: 20,
    ratePerKm: 8,
    ratePerMinute: 2,
  },
  auto: {
    baseFare: 30,
    ratePerKm: 10,
    ratePerMinute: 2.5,
  },
};

export async function calculateFare(
  source: string,
  destination: string,
  vehicleType: VehicleType
) {
  try {
    if (!fareRates[vehicleType]) {
      throw new Error("Invalid vehicle type. Choose 'car', 'bike', or 'auto'.");
    }

    const distancetime = await getDistancetime(source, destination);
    const distanceInKm = parseFloat(distancetime.distance.replace(" km", ""));
    const timeInMinutes = parseInt(distancetime.duration.replace(" mins", ""));

    const { baseFare, ratePerKm, ratePerMinute } = fareRates[vehicleType];
    const totalFare =
      baseFare + distanceInKm * ratePerKm + timeInMinutes * ratePerMinute;

    return {
      distance: distanceInKm,
      duration: timeInMinutes,
      fare: totalFare.toFixed(2),
    };
  } catch (e) {
    console.error("Error calculating fare:", e);
    throw new Error("Unable to calculate fare.");
  }
}

async function getOtp(length: number) {
  const otp = crypto.randomInt(0, 10 ** length).toString();
  return otp.padStart(length, "0");
}

type CreateRideParams = {
  user: mongoose.Types.ObjectId;
  pickup: string;
  destination: string;
  vehicleType: VehicleType;
};

export async function createRide({
  user,
  pickup,
  destination,
  vehicleType,
}: CreateRideParams) {
  try {
    const { distance, duration, fare } = await calculateFare(
      pickup,
      destination,
      vehicleType
    );
    const otp = getOtp(6);
    const newRide = await rideModel.create({
      user,
      pickup,
      destination,
      distance,
      duration,
      fare: parseFloat(fare),
      otp,
    });

    return newRide;
  } catch (e) {
    console.error("Error creating ride:", e);
    throw new Error("Unable to create ride.");
  }
}
