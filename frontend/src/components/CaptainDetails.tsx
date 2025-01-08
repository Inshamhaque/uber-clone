export function CaptainDetails() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Driver"
            className="w-12 h-12 rounded-full object-cover mr-3"
          />
          <div>
            <div className="font-bold text-black">Jeremiah Curtis</div>
            <div className="text-sm text-gray-500">Basic level</div>
          </div>
        </div>
        <div className="text-lg font-bold text-black">$325.00</div>
      </div>

      <div className="flex justify-between text-center text-sm text-gray-700">
        <div>
          <div className="font-bold text-black">10.2</div>
          <div className="text-xs">HOURS ONLINE</div>
        </div>
        <div>
          <div className="font-bold text-black">30 KM</div>
          <div className="text-xs">TOTAL DISTANCE</div>
        </div>
        <div>
          <div className="font-bold text-black">20</div>
          <div className="text-xs">TOTAL JOBS</div>
        </div>
      </div>
    </div>
  );
}
