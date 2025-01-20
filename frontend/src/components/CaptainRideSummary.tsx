import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Simulated fare rates (these should match your backend rates)
const fareRates = {
  car: { baseFare: 50, ratePerKm: 10, ratePerMinute: 2 },
  bike: { baseFare: 30, ratePerKm: 5, ratePerMinute: 1 },
  auto: { baseFare: 40, ratePerKm: 8, ratePerMinute: 1.5 },
};

export function CaptainRideDetails({ setrideSummaryPanel, chosenRide }: any) {
  async function onClickHandler() {
    const response = await axios.put(
      `http://localhost:8080/rides/ride-accept?id=${chosenRide._id}`
    );
    console.log(response);
    if (response) {
      console.log("REQUEST SENT");
    }
  }
  return (
    <div className="w-full p-4 h-screen bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <div className="text-lg font-bold text-black">
          {chosenRide._id ?? ""}
        </div>
        <div className="w-6"></div> {/* Placeholder for symmetry */}
      </div>

      {/* User Details */}
      <div className="p-4 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/50"
              alt="User"
              className="w-12 h-12 rounded-full"
            />
            <div className="ml-4">
              <div className="font-semibold text-black">Esther Berry</div>
              <div className="text-xs text-gray-500">
                {chosenRide.distance} km
              </div>
            </div>
          </div>
          <div className="text-lg font-semibold text-black">
            ${chosenRide.fare}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
            {chosenRide.paymentMethod || "Cash"}
          </div>
          <div className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
            Discount
          </div>
        </div>
      </div>

      {/* Pickup and Dropoff Information */}
      <div className="p-4">
        <div className="text-xs font-semibold text-gray-500">PICK UP</div>
        <div className="text-sm font-medium text-black">
          {chosenRide.pickup}
        </div>
        <div className="mt-4 text-xs font-semibold text-gray-500">DROP OFF</div>
        <div className="text-sm font-medium text-black">
          {chosenRide.destination}
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-around items-center bg-white p-4 mt-2">
        <Link
          to="/captain-riding"
          className="flex-1 bg-green-500 text-white text-sm font-semibold py-2 rounded-md mx-2 flex items-center justify-center"
          onClick={onClickHandler}
        >
          Confirm
        </Link>

        <button
          onClick={() => {
            setrideSummaryPanel(false);
          }}
          className="flex-1 bg-gray-500 text-white text-sm font-semibold py-2 rounded-md mx-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
