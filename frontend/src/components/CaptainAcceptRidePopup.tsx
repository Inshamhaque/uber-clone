import React, { useEffect, useState } from "react";
import axios from "axios";

export function CaptainAcceptRidePopup({
  setAcceptRidePopup,
  setrideSummaryPanel,
  setchosenRide,
}: any) {
  const [rides, setrides] = useState<
    {
      fare: number;
      pickup: string;
      destination: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchPendingRides = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/rides/pending-rides"
        );
        if (response && response.data) {
          setrides(response.data.rides);
        }
      } catch (error) {
        console.error("Error fetching pending rides:", error);
      }
    };
    fetchPendingRides();
  }, []);
  const [curr, setcurr] = useState(0);

  return (
    <div className="w-80 bg-white  rounded-lg p-4">
      {curr != 0 && (
        <button
          onClick={() => {
            setcurr((prev) => prev - 1);
          }}
          className="absolute top-1/2 left-4 mr-10 transform -translate-y-1/2 text-gray-600 bg-gray-200 px-3 py-2 rounded-full hover:bg-gray-300"
        >
          &lt;
        </button>
      )}
      {rides.length === 0 ? (
        <p className="text-gray-600 text-center">
          No pending rides available. Check back Later
        </p>
      ) : (
        rides.map((ride, idx) => (
          <div
            key={idx}
            className={`${idx == curr ? "block" : "hidden"} mb-4 pl-3 pb-4`}
          >
            {/* Header Section */}
            <div className="flex items-center justify-between">
              {/* Profile Picture */}
              <div className="flex items-center">
                <img
                  src={"https://via.placeholder.com/40"} // Dynamic profile image
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                {/* Rider Details */}
                <div className="ml-3">
                  <p className="font-semibold text-gray-800">Esther</p>
                  {/* <div className="flex items-center mt-1">
                    {ride.paymentMethod && (
                      <span className="text-xs text-white bg-yellow-400 px-2 py-0.5 rounded mr-2">
                        {ride.paymentMethod}
                      </span>
                    )}
                    {ride.hasDiscount && (
                      <span className="text-xs text-white bg-green-500 px-2 py-0.5 rounded">
                        Discount
                      </span>
                    )}
                  </div> */}
                </div>
              </div>
              {/* Price */}
              <p className="text-lg font-bold text-gray-800">${ride.fare}</p>
            </div>

            {/* Ride Info Section */}
            <div className="mt-4">
              {/* Pick Up Location */}
              <div className="mb-2">
                <p className="text-xs font-bold text-gray-500">PICK UP</p>
                <p className="text-sm text-gray-800">{ride.pickup}</p>
              </div>
              {/* Drop Off Location */}
              <div>
                <p className="text-xs font-bold text-gray-500">DROP OFF</p>
                <p className="text-sm text-gray-800">{ride.destination}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => {
                  setAcceptRidePopup(false);
                }}
                className="w-1/2 text-gray-600 bg-gray-200 py-2 rounded-l-lg hover:bg-gray-300"
              >
                Ignore
              </button>
              <button
                onClick={() => {
                  setAcceptRidePopup(false);
                  setrideSummaryPanel(true);
                  setchosenRide(ride);
                  // Perform additional logic for accepting the ride
                }}
                className="w-1/2 text-white bg-yellow-500 py-2 rounded-r-lg hover:bg-yellow-600"
              >
                Accept
              </button>
            </div>
          </div>
        ))
      )}
      {curr != rides.length - 1 && (
        <button
          onClick={() => {
            setcurr((prev) => prev + 1);
          }}
          className="absolute top-1/2 right- right-4 transform -translate-y-1/2 text-gray-600 bg-gray-200 px-3 py-2 rounded-full hover:bg-gray-300"
        >
          &gt;
        </button>
      )}
    </div>
  );
}
