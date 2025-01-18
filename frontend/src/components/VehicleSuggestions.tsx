import axios from "axios";
import { useEffect, useState } from "react";

export function VehicleSuggestions({
  setrideSummaryPanel,
  setvehiclepanelopen,
  source,
  destination,
  setvehicleType,
  setvehiclePrice,
}: any) {
  const [carprice, setcarprice] = useState();
  const [bikeprice, setbikeprice] = useState();
  const [autoprice, setautoprice] = useState();
  useEffect(() => {
    const fetchFare = async () => {
      console.log(source);
      console.log(destination);
      const response = await axios.get("http://localhost:8080/maps/get-fare", {
        params: {
          source,
          destination,
        },
      });
      if (response) {
        setcarprice(response.data.car_price.fare);
        setautoprice(response.data.auto_price.fare);
        setbikeprice(response.data.bike_price.fare);
      }
    };
    fetchFare();
  }, [source, destination]);
  const vehicles = [
    {
      logo: "https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg", // Replace with actual image URL
      name: "Car",
      capacity: 4,
      time: "2 mins away",
      arrivalTime: "15:24",
      description: "Affordable, compact rides",
      price: carprice,
      selected: true,
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png", // Replace with actual image URL
      name: "Bike",
      capacity: 1,
      time: "3 mins away",
      arrivalTime: "15:24",
      description: "Affordable motorcycle rides",
      price: bikeprice,
      selected: false,
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png", // Replace with actual image URL
      name: "UberAuto",
      capacity: 3,
      time: "2 mins away",
      arrivalTime: "15:24",
      description: "Affordable auto rides",
      price: autoprice,
      selected: false,
    },
  ];

  return (
    <div className="space-y-4">
      {vehicles.map((vehicle, index) => (
        <div
          onClick={() => {
            console.log("clicked!!!");
            setvehiclepanelopen(false);
            setrideSummaryPanel(true);
            setvehiclePrice(vehicle.price);
            setvehicleType(vehicle.name);
          }}
          key={index}
          className={`flex items-center p-2 border ${
            vehicle.selected ? "border-black rounded-lg" : "border-gray-300"
          }`}
        >
          {/* Logo */}
          <img
            src={vehicle.logo}
            alt={`${vehicle.name} logo`}
            className="object-contain  w-12 h-12 mr-2"
          />

          {/* Details */}
          <div className="flex-grow">
            <div className="flex justify-between">
              <div className="text-lg font-semibold">{vehicle.name}</div>
              <div className="text-sm text-gray-500 flex items-center">
                <span className="mr-2">&#128101;</span>
                {vehicle.capacity}
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {vehicle.time} <span className="mx-2">&#8226;</span>{" "}
              {vehicle.arrivalTime}
            </div>
            <div className="text-sm text-gray-400">{vehicle.description}</div>
          </div>

          {/* Price */}
          <div className="text-lg font-semibold">{vehicle.price}</div>
        </div>
      ))}
    </div>
  );
}
