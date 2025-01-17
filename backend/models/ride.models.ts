import mongoose from "mongoose";

enum Statuses {
  "pending",
  "accepted",
  "ongoing",
  "completed",
  "cancelled",
}
export const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Captain",
  },
  pickup: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  }, // in kms
  duration: {
    type: Number,
    required: true,
  }, // in hrs
  status: {
    type: String,
    enum: Object.values(Statuses),
    default: "pending",
  },
  fare: {
    type: Number,
    required: true,
  },
  paymentId: {
    type: String,
  },
  orderId: {
    type: String,
  },
  signature: {
    type: String,
  },
});

export const rideModel = mongoose.model("ride", rideSchema);
