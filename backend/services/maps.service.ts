import axios from "axios";
import { response } from "express";
import { object } from "zod";
export async function getCoordinate(address: string) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: { address, key: apiKey },
      }
    );

    if (response.data.status == "OK") {
      const location = response.data.results[0].geometry.location;
      //   console.log(location);
      return { lat: location.lat, lng: location.lng };
    } else {
      throw new Error(`Invalid API response: ${JSON.stringify(response.data)}`);
    }
  } catch (e) {
    console.error("Error in getCoordinate:", e);
    throw e;
  }
}
export async function getDistancetime(origin: string, destination: string) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    throw new Error("Google Maps API Key is missing.");
  }

  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/distancematrix/json",
      {
        params: {
          key: apiKey,
          origins: origin,
          destinations: destination,
          mode: "driving",
          units: "metric",
        },
      }
    );
    console.log(response.data.rows[0]);

    if (response.data.status === "OK") {
      //   console.log("this is getting executed");
      const element = response.data.rows[0].elements[0];
      const distance = element.distance.text;
      const duration = element.duration.text;
      return { distance, duration };
    } else {
      //   console.log("this is getting executed");
      throw new Error(`API Error: ${response.data.status}`);
    }
  } catch (error) {
    console.error("Error fetching distance:", error);
    if (error) {
      console.error("API Response error details:", error);
    }
    throw error;
  }
}
// new learning here : explicit and implicit return type in typescript in arrow function
type params = {
  description: string;
};
export async function getAutoSuggestions(input: string) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  let predictions: params[] = [];
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/autocomplete/json",
      {
        params: {
          key: apiKey,
          input,
        },
      }
    );
    console.log("preds is : ", response);
    if (response.data.status === "OK") {
      const pred = response.data.predictions;
      predictions = pred
        .filter((each: params) => !!each.description)
        .map((pred: params) => ({
          description: pred.description,
        }));
    }
    return predictions;
  } catch (e) {
    console.error("error fetching response", e);
  }
}

export async function getDirections(source: string, destination: string) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  try {
    const endpoint = `https://maps.googleapis.com/maps/api/directions/json`;

    const response = await axios.get(endpoint, {
      params: {
        origin: source,
        destination: destination,
        mode: "driving",
        key: apiKey,
      },
    });

    if (response.data.status !== "OK") {
      throw new Error(`Google Maps API error: ${response.data.status}`);
    }
    const directions = response.data.routes[0];
    const legs = directions.legs[0];

    return {
      distance: legs.distance.text,
      duration: legs.duration.text,
      steps: legs.steps.map((step: any) => ({
        instruction: step.html_instructions,
        distance: step.distance.text,
        duration: step.duration.text,
      })),
    };
  } catch (error) {
    console.error("Error fetching directions:", error);
    throw new Error("Unable to fetch directions. Please try again later.");
  }
}
