import { useState, useEffect } from "react";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";

export function RideSummary({
  setrideSummaryPanel,
  pickup,
  destination,
  vehiclePrice,
  vehicleType,
  setride,
}: any) {
  const navigate = useNavigate();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [createride, setcreateride] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  useEffect(() => {
    // Establish WebSocket connection
    const ws = new WebSocket("ws://localhost:8000"); // Replace with your WebSocket server URL

    ws.onopen = () => {
      console.log("User Connected to WebSocket server");
    };

    ws.onmessage = (event) => {
      console.log("Message from server:", JSON.parse(event.data));
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setSocket(ws);
    // Cleanup WebSocket connection on unmount
  }, []);

  const createRideHandler = async () => {
    try {
      const response1 = await axios.get("http://localhost:8080/user/profile", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      const userProfileData = response1.data;
      setUserProfile(userProfileData);
      console.log("userprofile:", userProfileData);

      if (!userProfileData) {
        console.error("User profile not found");
        return;
      }
      const response = await axios.post(
        "http://localhost:8080/rides/create-ride",
        {
          pickup,
          destination,
          vehicleType: vehicleType.toLowerCase(),
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response) {
        console.log("Ride created successfully");
        const rideId = response.data.ride._id;
        setride(rideId);
        localStorage.setItem("rideId", rideId);

        // Send ride creation event to WebSocket server
        if (socket) {
          socket.send(
            JSON.stringify({
              type: "ride-created",
              rideId,
              pickup,
              destination,
              vehicleType: vehicleType.toLowerCase(),
              userProfile: userProfileData,
              vehiclePrice,
            })
          );
          console.log("Ride creation event sent to WebSocket server");
        }
      }
    } catch (error) {
      console.error("Error creating ride:", error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full bg-white rounded-t-lg">
      {/* Title */}
      <div className="flex items-center justify-between w-full px-5 text-2xl font-semibold text-gray-700">
        <div>Looking for nearby drivers</div>
      </div>

      {/* Image */}
      <div className="flex justify-center items-center w-full border-b pb-2 mb-3">
        <img
          className="w-40 h-40 object-contain"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt="Car Image"
        />
      </div>

      {/* Pickup Location */}
      <div className="w-full px-2 mb-4">
        <div className="flex items-center mb-1">
          <span className="text-xl text-gray-500 mr-2">📍</span>
          <div>
            <div className="font-semibold text-black">
              {splitAddress(pickup ?? "").first}
            </div>
            <div className="text-sm text-gray-500">
              {splitAddress(pickup ?? "").second}
            </div>
          </div>
        </div>
      </div>

      {/* Destination */}
      <div className="w-full px-2 mb-4">
        <div className="flex items-center mb-1">
          <span className="text-xl text-gray-500 mr-2">◾</span>
          <div>
            <div className="font-semibold text-black">
              {splitAddress(destination ?? "").first}
            </div>
            <div className="text-sm text-gray-500">
              {splitAddress(destination ?? "").second}
            </div>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="w-full ml-5 px-2">
        <div className="text-xl font-bold text-black">₹{vehiclePrice}</div>
      </div>

      {/* Confirm Button */}
      <div className="flex flex-col space-y-5 ml-5 mr-5 w-full mt-5">
        <button
          onClick={() => {
            createRideHandler();
            setrideSummaryPanel(false);
            setcreateride(true);
            navigate("/waiting");
          }}
          className="w-full bg-black text-white text-sm rounded-lg py-2 px-8"
        >
          Confirm Ride
        </button>
        <button
          onClick={() => {
            setrideSummaryPanel(false);
          }}
          className="w-full bg-black text-white text-sm rounded-lg py-2 px-8"
        >
          Cancel Ride
        </button>
      </div>
    </div>
  );
}

function splitAddress(address: string) {
  let idx = -1;
  for (let i = 0; i < address.length; i++) {
    if (address[i] === ",") {
      idx = i;
      break;
    }
  }
  const first = address.slice(0, idx + 1).trim();
  const second = address.slice(idx + 1).trim();
  return { first, second };
}
