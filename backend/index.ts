import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDB } from "./db/db";
import userRoutes from "./routes/userRoutes";
import captainRoutes from "./routes/captain.routes";
import mapRoutes from "./routes/maps.routes";
import rideRoutes from "./routes/ride.routes";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectToDB();
app.use("/user", userRoutes);
app.use("/captain", captainRoutes);
app.use("/maps", mapRoutes);
app.use("/rides", rideRoutes);
app.listen(8080, () => {
  console.log("app running on port 8080");
});
