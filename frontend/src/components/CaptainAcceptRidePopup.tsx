import React from "react";

export function CaptainAcceptRidePopup({
  setAcceptRidePopup,
  setrideSummaryPanel,
}: any) {
  return (
    <div className="w-80 bg-white shadow-lg rounded-lg p-4">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        {/* Profile Picture */}
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/40" // Replace with actual image URL
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          {/* Rider Details */}
          <div className="ml-3">
            <p className="font-semibold text-gray-800">Esther Berry</p>
            <div className="flex items-center mt-1">
              <span className="text-xs text-white bg-yellow-400 px-2 py-0.5 rounded mr-2">
                ApplePay
              </span>
              <span className="text-xs text-white bg-green-500 px-2 py-0.5 rounded">
                Discount
              </span>
            </div>
          </div>
        </div>
        {/* Price */}
        <p className="text-lg font-bold text-gray-800">$25.00</p>
      </div>

      {/* Ride Info Section */}
      <div className="mt-4">
        {/* Pick Up Location */}
        <div className="mb-2">
          <p className="text-xs font-bold text-gray-500">PICK UP</p>
          <p className="text-sm text-gray-800">7958 Swift Village</p>
        </div>
        {/* Drop Off Location */}
        <div>
          <p className="text-xs font-bold text-gray-500">DROP OFF</p>
          <p className="text-sm text-gray-800">105 William St, Chicago, US</p>
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
          }}
          className="w-1/2 text-white bg-yellow-500 py-2 rounded-r-lg hover:bg-yellow-600"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
