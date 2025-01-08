import { Link } from "react-router-dom";

export function CaptainRideDetails({ setrideSummaryPanel }: any) {
  return (
    <div className="w-full h-screen bg-gray-100">
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
        <div className="text-lg font-bold text-black">#123456</div>
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
              <div className="text-xs text-gray-500">2.2 km</div>
            </div>
          </div>
          <div className="text-lg font-semibold text-black">$25.00</div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
            ApplePay
          </div>
          <div className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
            Discount
          </div>
        </div>
      </div>

      {/* Pickup and Dropoff Information */}
      <div className="p-4">
        <div className="text-xs font-semibold text-gray-500">PICK UP</div>
        <div className="text-sm font-medium text-black">7958 Swift Village</div>
        <div className="mt-4 text-xs font-semibold text-gray-500">DROP OFF</div>
        <div className="text-sm font-medium text-black">
          105 William St, Chicago, US
        </div>
      </div>

      {/* Noted Section */}
      <div className="p-4 bg-white">
        <div className="text-xs font-semibold text-gray-500">NOTED</div>
        <div className="text-sm text-gray-600 mt-1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac
          vestibulum erat. Cras vulputate auctor lectus at consequat.
        </div>
      </div>

      {/* Trip Fare */}
      <div className="p-4 bg-white">
        <div className="text-xs font-semibold text-gray-500">TRIP FARE</div>
        <div className="flex justify-between text-sm text-black mt-2">
          <div>Apple Pay</div>
          <div>$15.00</div>
        </div>
        <div className="flex justify-between text-sm text-black mt-2">
          <div>Discount</div>
          <div>$10.00</div>
        </div>
        <div className="flex justify-between text-sm text-black mt-2 font-semibold">
          <div>Paid amount</div>
          <div>$25.00</div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-around items-center bg-white p-4 mt-2">
        <Link
          to="/captain-riding"
          className="flex-1 bg-green-500 text-white text-sm font-semibold py-2 rounded-md mx-2 flex items-center justify-center"
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
