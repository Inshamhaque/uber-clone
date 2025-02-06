import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";

export function Map_component() {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          console.log(
            "User location:",
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div style={{ width: "100%", height: "550px" }}>
      <APIProvider
        apiKey="AIzaSyA5d9mo7c0Zjpr-2UNnADwoQU24z0o_R_8"
        onLoad={() => {
          console.log("Google Maps loaded");
        }}
      >
        <Map
          defaultZoom={5}
          defaultCenter={userLocation || { lat: 20.5937, lng: 78.9629 }} // Default to Sydney if location not available
          onCameraChanged={(ev: MapCameraChangedEvent) =>
            console.log(
              "Camera changed:",
              ev.detail.center,
              "Zoom:",
              ev.detail.zoom
            )
          }
          style={{ width: "100%", height: "100%" }}
        ></Map>
      </APIProvider>
    </div>
  );
}
