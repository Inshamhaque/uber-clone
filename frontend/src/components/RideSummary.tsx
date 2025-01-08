export function RideSummary({ setrideSummaryPanel }: any) {
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
            <div className="font-semibold text-black">562/11-A</div>
            <div className="text-sm text-gray-500">
              Kaikondrahalli, Bengaluru, Karnataka
            </div>
          </div>
        </div>
      </div>

      {/* Destination */}
      <div className="w-full px-2 mb-4">
        <div className="flex items-center mb-1">
          <span className="text-xl text-gray-500 mr-2">◾</span>
          <div>
            <div className="font-semibold text-black">Third Wave Coffee</div>
            <div className="text-sm text-gray-500">
              17th Cross Rd, PWD Quarters, 1st Sector, HSR Layout, Bengaluru,
              Karnataka
            </div>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="w-full ml-5 px-2">
        <div className="text-xl font-bold text-black">₹193.20</div>
      </div>

      {/* Confirm Button */}
      <div className="flex flex-col space-y-5 ml-5 mr-5 w-full mt-5">
        <button className="w-full bg-black text-white text-sm rounded-lg py-2 px-8">
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
