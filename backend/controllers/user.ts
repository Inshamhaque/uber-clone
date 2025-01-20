import { blackListModel } from "../models/blacklist.models";
import { userModel } from "../models/user.models";
import { createUser } from "../services/user.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// user creation
export const registerUser = async (req: any, res: any, next: any) => {
  const { fullname, email, password } = req.body;
  const isPresent = await userModel.findOne({ email });
  // todo: userModel method not working fine
  const hashedPassword = await bcrypt.hash(password, 10);
  if (isPresent) {
    return res.status(400).json({
      message: "user already exists",
    });
  }
  // creating user using pre defined function earlier
  const user = await createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });
  const token = jwt.sign({ _id: user._id }, "JWT_SECRET");
  return res.status(201).json({
    message: "User created successfully",
    token,
    user,
  });
};
// user login
export const loginUser = async (req: any, res: any, next: any) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({
      message: "invalid email or password",
    });
  }
  const token = jwt.sign({ _id: user._id }, "JWT_SECRET");
  // set cookie in here
  res.cookie("token", token, {
    httpOnly: true, // Prevents client-side scripts from accessing the cookie
    // secure: process.env.NODE_ENV === "", // Ensures cookies are sent over HTTPS in production
    sameSite: "None", // Controls cross-origin requests
    maxAge: 24 * 60 * 60 * 1000, // Optional: Sets the expiration time (1 day in milliseconds),
    secure: false,
  });
  console.log("cookie set successfully");

  res.set("Authorizaton", token);
  return res.status(201).json({
    token,
    message: "user login successful",
    user,
  });
};

// get profiles of user
export const userProfile = async (req: any, res: any, next: any) => {
  res.status(200).json(req.user);
};
//logout user
export const logout = async (req: any, res: any, next: any) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await blackListModel.create({ token });
  res.status(200).json({
    message: "logged out",
  });
};
