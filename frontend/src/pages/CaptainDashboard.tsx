import { useEffect, useRef, useState } from "react";
import { CaptainDetails } from "../components/CaptainDetails";
import { CaptainAcceptRidePopup } from "../components/CaptainAcceptRidePopup";
import gsap from "gsap";
import { CaptainRideDetails } from "../components/CaptainRideSummary";
import { IncomingRide } from "../components/IncomingRIde";
export function CaptainDashboard() {
  const [online, setOnline] = useState(false);
  const [acceptRidePopup, setAcceptRidePopup] = useState(false);
  const [rideSummaryPanel, setRideSummaryPanel] = useState(false);
  const [chosenRide, setChosenRide] = useState({
    _id: "",
    duration: 0,
    destination: "",
    pickup: "",
    vehicleType: "",
    vehiclePrice: "",
    userProfile: {},
  });
  const [incomingRide, setIncomingRide] = useState<{
    _id: string;
    duration: number;
    destination: string;
    pickup: string;
    vehicleType: string;
    vehiclePrice: string;
    userProfile: any;
  } | null>({
    _id: "",
    duration: 0,
    destination: "",
    pickup: "",
    vehicleType: "",
    vehiclePrice: "",
    userProfile: {
      fullname: { firstname: "", lastname: "" },
      email: "",
    },
  });
  const acceptRidePopupRef = useRef(null);
  const rideSummaryPanelRef = useRef(null);
  const incomingRideRef = useRef(null);
  const [incomingRidePanel, setIncomingRidePanel] = useState(false);
  // WebSocket reference
  const socketRef = useRef(null);

  // Establish WebSocket connection
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000");
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected");
      socket.send(JSON.stringify({ type: "identify", role: "captain" }));
      if (online) {
        socket.send(JSON.stringify({ type: "status", status: "online" }));
      }
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log("Received from server(captain-side):", message);

        if (message.type === "new-ride") {
          const {
            rideId,
            pickup,
            destination,
            vehicleType,
            vehiclePrice,
            userProfile,
          } = message.data;

          // Set incoming ride and open popup
          setIncomingRide({
            _id: rideId,
            duration: message.data.duration, // Use actual duration from message
            destination,
            pickup,
            vehicleType,
            vehiclePrice,
            userProfile,
          });
          console.log("Incoming ride:", incomingRide);
          // setAcceptRidePopup(true); // Open notification popup
          setIncomingRidePanel(true);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [online]);

  // Accept ride logic
  const handleAcceptRide = () => {
    if (socketRef.current && incomingRide) {
      socketRef.current.send(
        JSON.stringify({
          type: "ride-accepted",
          rideId: incomingRide._id,
        })
      );
      setChosenRide(incomingRide);
      setAcceptRidePopup(false);
      setRideSummaryPanel(true);
    }
  };

  //incoming ride gsap
  useEffect(() => {
    if (incomingRidePanel) {
      gsap.set(incomingRideRef.current, { visibility: "visible" });
      gsap.to(incomingRideRef.current, {
        transform: "translateY(0)",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(incomingRideRef.current, {
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(incomingRideRef.current, { visibility: "hidden" });
        },
      });
    }
  }, [incomingRidePanel]);

  useEffect(() => {
    if (acceptRidePopup) {
      gsap.fromTo(
        acceptRidePopupRef.current,
        { opacity: 0, scale: 0.8, visibility: "visible" },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    } else {
      gsap.to(acceptRidePopupRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(acceptRidePopupRef.current, { visibility: "hidden" });
        },
      });
    }
  }, [acceptRidePopup]);

  useEffect(() => {
    if (rideSummaryPanel) {
      gsap.to(rideSummaryPanelRef.current, {
        transform: "translateY(0)",
        duration: 0.5,
        ease: "power2.out",
        visibility: "visible",
      });
    } else {
      gsap.to(rideSummaryPanelRef.current, {
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [rideSummaryPanel]);

  return (
    <div className="w-screen h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
        <div className="text-black">...</div>
        <div className="text-lg font-bold text-black">
          {online ? "Online" : "Offline"}
        </div>
        <div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              onChange={() => {
                setOnline((prev) => !prev);
                if (
                  socketRef.current &&
                  socketRef.current.readyState === WebSocket.OPEN
                ) {
                  socketRef.current.send(
                    JSON.stringify({
                      type: "status",
                      status: !online ? "online" : "offline",
                    })
                  );
                }
              }}
            />
            <div className="w-11 h-6 rounded-full bg-gray-700 peer-checked:bg-blue-800"></div>
            <div className="w-5 h-5 absolute rounded-full bg-white peer-checked:translate-x-6 transition-transform"></div>
          </label>
        </div>
      </div>

      {/* Offline Notification */}
      {!online && (
        <div className="bg-orange-500 text-white flex items-center justify-center px-4 py-2">
          <div className="text-sm font-semibold">
            <span>You are offline! </span>
            <span className="text-xs font-normal">
              Go online to start accepting jobs.
            </span>
          </div>
        </div>
      )}

      {/* Map Section */}
      <div className="relative w-full flex-1">...</div>
      {/* <div>{incomingRide}</div> */}

      {/* Driver Info Card */}
      <div className="bg-white shadow-md rounded-t-2xl p-6">
        <CaptainDetails />
      </div>

      {/* Add Ride Button */}
      <div className="fixed bottom-20 right-6">
        <button
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg"
          onClick={() => {
            setChosenRide({
              _id: "manual-ride",
              duration: 15,
              destination: "Demo Destination",
              pickup: "Demo Pickup",
              vehicleType: "Car",
              vehiclePrice: 10,
            });
            setAcceptRidePopup(true);
          }}
        >
          +
        </button>
      </div>

      {/* Accept Ride Popup Panel */}
      <div
        ref={acceptRidePopupRef}
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        style={{ visibility: "hidden" }}
      >
        <div className="bg-white rounded-lg shadow-lg p-6">
          <CaptainAcceptRidePopup
            setAcceptRidePopup={setAcceptRidePopup}
            handleAcceptRide={handleAcceptRide}
            chosenRide={chosenRide}
          />
        </div>
      </div>

      {/* Ride Summary Panel */}
      <div
        ref={rideSummaryPanelRef}
        className="scroll-smooth w-full z-10 fixed bottom-0"
      >
        <CaptainRideDetails
          setRideSummaryPanel={setRideSummaryPanel}
          chosenRide={chosenRide}
        />
      </div>

      {/* Incoming Ride Notification */}
      {incomingRidePanel && (
        <div
          ref={incomingRideRef}
          className="fixed absolute  inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          style={{ visibility: "hidden" }}
        >
          <IncomingRide
            incomingRide={incomingRide}
            setIncomingRidePanel={setIncomingRidePanel}
          />
        </div>
      )}
    </div>
  );
}
