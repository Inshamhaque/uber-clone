import { blackListModel } from "../models/blacklist.models";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.models";
import { captainModel } from "../models/captain.models";
export const authUser = async (req: any, res: any, next: any) => {
  const token = req.cookies.token || req.headers.authorization;
  if (!token) {
    console.log("no token is there");
    return res.status(401).json({
      message: "unauthorized",
    });
  }
  const isBlackListed = await blackListModel.findOne({ token });
  if (isBlackListed) {
    return res.status(401).json({
      message: "unauthorized",
    });
  }
  try {
    const decoded = jwt.verify(token, "JWT_SECRET");
    //@ts-ignore
    const user = await userModel.findById(decoded._id);
    req.user = user;
    return next();
  } catch (e) {
    console.error("unauthorized access invoked");
    return res.status(401).json({
      message: "unauthorized",
    });
  }
};
export const authCaptain = async (req: any, res: any, next: any) => {
  const token = req.cookies.token || req.headers.authorization;
  if (!token) {
    console.log("no token is there");
    console.log("token is there : ", token);
    return res.status(401).json({
      message: "unauthorized",
    });
  }
  const isBlackListed = await blackListModel.findOne({ token });
  if (isBlackListed) {
    return res.status(401).json({
      message: "unauthorized",
    });
  }
  try {
    const decoded = jwt.verify(token, "JWT_SECRET");
    //@ts-ignore
    const captain = await captainModel.findById(decoded._id);
    req.captain = captain;
    return next();
  } catch (e) {
    console.log("there is error in here");
    return res.status(401).json({
      message: "unauthorized",
    });
  }
};
