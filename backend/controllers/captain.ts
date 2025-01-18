import { blackListModel } from "../models/blacklist.models";
import { captainModel } from "../models/captain.models";
import { createCaptain } from "../services/captain";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//signup handler
export async function register(req: any, res: any) {
  const { fullname, vehicle, password, email, location } = req.body;
  const isPresent = await captainModel.findOne({
    email,
  });
  if (isPresent) {
    return res.status(400).json({
      message: "user already exists",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const captain = await createCaptain({
    firstname: fullname.firstname,
    password: hashedPassword,
    lastname: fullname.lastname,
    email,
    vehicle,
    location,
  });
  if (!captain) {
    console.error("error occured while creaitng captain : ");
  }
  console.log(captain);
  const token = jwt.sign({ _id: captain._id }, "JWT_SECRET");

  return res.status(201).json({
    message: "captain created successfully",
    captain,
    token,
  });
}
//login handler
export async function loginCaptain(req: any, res: any) {
  const { email, password } = req.body;
  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain) {
    return res.status(401).json({
      message: "invalid email or password",
    });
  }
  const isMatch = bcrypt.compare(password, captain.password);
  if (!isMatch) {
    return res.status(401).json({
      message: "invalid email or password",
    });
  }
  //generate token here, if correct credentials are given
  const token = jwt.sign({ _id: captain._id }, "JWT_SECRET");
  res.cookie("token", token, {
    httpOnly: true, // Prevents client-side scripts from accessing the cookie
    secure: process.env.NODE_ENV === "production", // Ensures cookies are sent over HTTPS in production
    sameSite: "lax", // Controls cross-origin requests
    maxAge: 24 * 60 * 60 * 1000, // Optional: Sets the expiration time (1 day in milliseconds)
  });
  return res.status(201).json({
    token,
    message: "captain login successfull",
    captain,
  });
}
// get captain profile
export async function captainProfile(req: any, res: any) {
  res.status(200).json(req.captain);
}

// logout handler
export async function logout(req: any, res: any) {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "uunauthroized access, how did  u bypass middlware",
    });
  }
  res.clearCookie("token");
  await blackListModel.create({ token });
  res.status(200).json({
    message: "logged out",
  });
}

// profile update
export async function activeCaptain(req: any, res: any) {
  try {
    const captain = req.captain;
    const { email } = captain;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }
    const result = await captainModel.updateOne(
      { email },
      { $set: { status: "active" } }
    );

    if (result.nModified === 0) {
      return res
        .status(404)
        .json({ message: "Captain not found or already active." });
    }

    return res
      .status(200)
      .json({ message: "Captain status updated to active." });
  } catch (error) {
    console.error("Error updating captain:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}
