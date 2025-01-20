import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { LocationSuggestions } from "../components/LocationSuggestions";
import { VehicleSuggestions } from "../components/VehicleSuggestions";
import { RideSummary } from "../components/RideSummary";
import axios from "axios";
type inputs = {
  pickup: string;
  destination: string;
};
export function Dashboard() {
  const [panelopen, setpanelopen] = useState(false);
  const [vehiclepanelopen, setvehiclepanelopen] = useState(false);
  const [rideSummaryPanel, setrideSummaryPanel] = useState(false);
  const [input, setInput] = useState<string>("");
  const [locationSuggestions, setLocationSuggestions] = useState();
  const [pickup, setpickup] = useState();
  const [destination, setdestination] = useState();
  const panelRef = useRef(null);
  const backgroundPanel = useRef(null);
  const vehiclepanelRef = useRef(null);
  const rideSummaryPanelRef = useRef(null);
  const pickupRef = useRef(null);
  const destinationRef = useRef(null);
  const [inputchosen, setinputchosen] = useState<
    "pickup" | "destination" | null
  >(null);
  const [vehiclePrice, setvehiclePrice] = useState();
  const [vehicleType, setvehicleType] = useState();
  const [ride_id, setride] = useState();

  // Fetch location suggestions from the backend API
  const fetchLocationSuggestions = async (query: string) => {
    console.log("Input is:", query);
    if (!query.trim()) return; // Skip empty input
    try {
      const response = await axios.get(
        "http://localhost:8080/maps/auto-complete",
        {
          params: { input: query },
          withCredentials: true,
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("Fetched suggestions:", response.data);
      setLocationSuggestions(response.data || []);
    } catch (e) {
      console.error("Error fetching location suggestions:", e);
    }
  };

  // Handle input changes and fetch location suggestions
  const handleLocationInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = e.target.value;
    setInput(query);
    fetchLocationSuggestions(query);
    console.log("suggestions are : ", locationSuggestions);
  };

  useEffect(() => {
    if (panelopen) {
      gsap.to(panelRef.current, {
        height: "100%",
      });
      gsap.to(backgroundPanel.current, {
        height: "0px",
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
      });
      gsap.to(backgroundPanel.current, {
        height: "70%",
      });
    }
  }, [panelopen]);

  useEffect(() => {
    if (vehiclepanelopen) {
      gsap.to(vehiclepanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehiclepanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclepanelopen]);

  useEffect(() => {
    if (rideSummaryPanel) {
      gsap.to(rideSummaryPanelRef.current, {
        transform: "translateY(0)",
        onComplete: () => {
          console.log("Ride Summary Panel animation completed");
        },
      });
    } else {
      gsap.to(rideSummaryPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [rideSummaryPanel]);

  return (
    <div className="overflow-hidden  h-screen">
      <div ref={backgroundPanel} className="h-[70%] h-screen w-screen">
        <img
          src="https://www.researchgate.net/publication/323759986/figure/fig3/AS:631576123682823@1527590890164/Map-in-Uber-application-tracking-user-in-a-Yellow-Cab.png"
          alt="Map"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="h-[100%] m-4 ml-4 space-y-3 relative">
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            {!panelopen && (
              <h1 className="text-2xl font-semibold">Find a Trip</h1>
            )}
            {panelopen && (
              <div
                onClick={() => {
                  setpanelopen(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>

          <form className="relative py-3">
            <div className="absolute ml-4 mt-8 mb-2 line w-[3px] h-8 bg-gray-600 rounded-xl"></div>
            <div className="absolute mt-2 ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path d="M4.25 2A2.25 2.25 0 0 0 2 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h2a.75.75 0 0 0 0-1.5h-2ZM13.75 2a.75.75 0 0 0 0 1.5h2a.75.75 0 0 1 .75.75v2a.75.75 0 0 0 1.5 0v-2A2.25 2.25 0 0 0 15.75 2h-2ZM3.5 13.75a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 4.25 18h2a.75.75 0 0 0 0-1.5h-2a.75.75 0 0 1-.75-.75v-2ZM18 13.75a.75.75 0 0 0-1.5 0v2a.75.75 0 0 1-.75.75h-2a.75.75 0 0 0 0 1.5h2A2.25 2.25 0 0 0 18 15.75v-2ZM7 10a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z" />
              </svg>
            </div>
            {/* pickup input field */}
            <input
              ref={pickupRef}
              // value={pickup} find a way to place the value chosen at the correct input spot
              onClick={() => {
                setpanelopen(true);
                setInput(pickup ?? "");
                setinputchosen("pickup");
              }}
              type="text"
              placeholder="Add a pickup location"
              className="w-full bg-gray-200 mb-4 px-10 py-2 rounded-lg active:border-black"
              value={pickup}
              onChange={handleLocationInputChange}
            />
            <div className="absolute mt-3 ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm5-2.25A.75.75 0 0 1 7.75 7h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75v-4.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {/* destination input field */}
            <input
              ref={destinationRef}
              value={destination}
              onClick={() => {
                setpanelopen(true);
                setInput(destination ?? "");
                setinputchosen("destination");
              }}
              onChange={handleLocationInputChange}
              type="text"
              placeholder="Enter your destination"
              className="w-full bg-gray-200 mb-4 px-10 py-2 rounded-lg active:border-black"
            />
          </form>
          <button
            onClick={() => {
              setpanelopen(false);
              setvehiclepanelopen(true);
            }}
            className="w-full px-8 py-2 rounded-lg  text-white bg-black"
          >
            Find Trip
          </button>
        </div>

        <div ref={panelRef} className="pt-20 h-0">
          <LocationSuggestions
            suggestions={locationSuggestions}
            setSuggestions={setLocationSuggestions}
            setpickup={setpickup}
            setdestination={setdestination}
            inputchosen={inputchosen}
          />
        </div>
      </div>

      <div
        ref={vehiclepanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <VehicleSuggestions
          setrideSummaryPanel={setrideSummaryPanel}
          setvehiclepanelopen={setvehiclepanelopen}
          source={pickup}
          destination={destination}
          setvehicleType={setvehicleType}
          setvehiclePrice={setvehiclePrice}
        />
      </div>

      <div
        ref={rideSummaryPanelRef}
        className="ride-summary-panel fixed bottom-0 w-full bg-white px-3 py-10 pt-12"
      >
        <RideSummary
          setrideSummaryPanel={setrideSummaryPanel}
          vehiclePrice={vehiclePrice}
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
          setride={setride}
        />
      </div>
    </div>
  );
}
