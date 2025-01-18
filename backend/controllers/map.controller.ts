import {
  getAutoSuggestions,
  getCoordinate,
  getDistancetime,
} from "../services/maps.service";
import { calculateFare } from "../services/ride.service";
export async function getAddressCoordinates(req: any, res: any) {
  const { address } = req.query;

  try {
    const coordinates = await getCoordinate(address);
    console.log(coordinates);
    return res.status(200).json({ coordinates });
  } catch (e) {
    res.status(404).json({
      message: "coordinates not found",
    });
  }
}
export async function DistanceTime(req: any, res: any) {
  const { source } = req.query;
  const { destination } = req.query;
  try {
    const result = await getDistancetime(source, destination);
    console.log(result);
    res.status(200).json({
      result,
    });
  } catch (e) {
    res.status(404).json({
      message: "error occurred while fetching api",
    });
  }
}
export async function autoComplete(req: any, res: any) {
  const { input } = req.query;
  try {
    const result = await getAutoSuggestions(input);
    console.log(result);
    res.status(200).json({
      result,
    });
  } catch (e) {
    res.status(404).json({
      message: "some error occurred",
    });
  }
}
export async function fare(req: any, res: any) {
  const { source, destination } = req.query;
  try {
    const auto_price = await calculateFare(source, destination, "auto");
    const bike_price = await calculateFare(source, destination, "bike");
    const car_price = await calculateFare(source, destination, "car");
    return res.status(200).json({
      bike_price,
      car_price,
      auto_price,
    });
  } catch (e) {
    res.status(400).json({
      message: "error calculating fare",
    });
  }
}
