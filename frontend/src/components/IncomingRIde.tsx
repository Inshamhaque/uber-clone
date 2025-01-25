import React, { useState } from "react";
import axios from "axios";
function UserProfile({
  userProfile,
}: {
  userProfile: {
    fullname: { firstname: string; lastname: string };
    email: string;
  };
}) {
  return (
    <div className="user-profile bg-gray-50 p-3 rounded-lg shadow-sm border mt-4">
      <p className="font-semibold text-gray-800">{`${userProfile.fullname.firstname} ${userProfile.fullname.lastname}`}</p>
      <p className="text-sm text-gray-500">{userProfile.email}</p>
    </div>
  );
}

export function IncomingRide({
  incomingRide,
  setIncomingRidePanel,
}: {
  incomingRide: {
    pickup: string;
    destination: string;
    vehicleType: string;
    vehiclePrice: string;
    _id: string;
    userProfile: {
      fullname: { firstname: string; lastname: string };
      email: string;
    };
  } | null;
  setIncomingRidePanel: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [rideAccepted, setRideAccepted] = useState(false);

  const handleAcceptRide = () => {
    setRideAccepted(true);
    // Add any additional logic for accepting the ride here
  };

  async function onClickHandler() {
    const response = await axios.put(
      `http://localhost:8080/rides/ride-accept?id=${incomingRide._id}`
    );
    console.log(response);
    if (response) {
      console.log("REQUEST SENT");
    }
  }

  return (
    <div className=" flex justify-center items-center top-4 right-4 max-w-sm w-full z-50">
      {rideAccepted ? (
        <div className="notification bg-green-500 text-white p-4 rounded-lg shadow-md flex items-center justify-between animate-slideIn">
          <p className="text-sm font-medium">Ride Accepted Successfully!</p>
        </div>
      ) : (
        <div className="incoming-ride bg-white p-5 rounded-lg shadow-lg border border-gray-200 animate-slideIn">
          <div className="text-left mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Incoming Ride Request
            </h2>
            <p className="text-sm text-gray-600">Review the details below:</p>
          </div>
          <div className="ride-details text-sm text-gray-700">
            <p className="mb-1">
              <span className="font-medium">Pickup:</span>{" "}
              {incomingRide?.pickup}
            </p>
            <p className="mb-1">
              <span className="font-medium">Destination:</span>{" "}
              {incomingRide?.destination}
            </p>
            <p className="mb-1">
              <span className="font-medium">Vehicle Type:</span>{" "}
              {incomingRide?.vehicleType}
            </p>
            <p className="mb-4">
              <span className="font-medium">Price:</span>{" "}
              {incomingRide?.vehiclePrice}
            </p>
          </div>
          {incomingRide?.userProfile && (
            <UserProfile userProfile={incomingRide.userProfile} />
          )}
          <button
            onClick={onClickHandler}
            className="w-full bg-blue-500 text-white py-2 mt-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Accept Ride
          </button>
          <button
            onClick={() => {
              setIncomingRidePanel(false);
            }}
            className="w-full bg-red-500 text-white py-2 mt-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Decline Ride
          </button>
        </div>
      )}
    </div>
  );
}
