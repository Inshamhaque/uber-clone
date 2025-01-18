import { useEffect, useRef, useState } from "react";
import { CaptainDetails } from "../components/CaptainDetails";
import { CaptainAcceptRidePopup } from "../components/CaptainAcceptRidePopup";
import gsap from "gsap";
import { CaptainRideDetails } from "../components/CaptainRideSummary";

export function CaptainDashboard() {
  const [online, setonline] = useState(false);
  const [AcceptRidePopup, setAcceptRidePopup] = useState(false);
  const [rideSummaryPanel, setrideSummaryPanel] = useState(false);
  const [chosenRide, setchosenRide] = useState({
    _id: "",
    duration: 0,
    destination: 0,
  });
  const AcceptRidePopupRef = useRef(null);
  const rideSummaryPanelRef = useRef(null);

  useEffect(() => {
    if (AcceptRidePopup) {
      gsap.fromTo(
        AcceptRidePopupRef.current,
        { opacity: 0, scale: 0.8, visibility: "visible" },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    } else {
      gsap.to(AcceptRidePopupRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(AcceptRidePopupRef.current, { visibility: "hidden" });
        },
      });
    }
  }, [AcceptRidePopup]);

  useEffect(() => {
    if (rideSummaryPanel) {
      gsap.to(rideSummaryPanelRef.current, {
        transform: "translateY(0)",
        duration: 0.5,
        ease: "power2.out",
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
        <div className="text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5M3.75 12h16.5M3.75 18.75h16.5"
            />
          </svg>
        </div>
        <div className="text-lg font-bold text-black">
          {online ? "Offline" : "Online"}
        </div>
        <div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              onChange={() => {
                setonline((prev) => !prev);
              }}
            />
            <div className="w-11 h-6 rounded-full bg-gray-700 peer-checked:bg-blue-800 "></div>
            <div className="w-5 h-5 absolute rounded-full bg-white peer-checked:translate-x-6 transition-transform"></div>
          </label>
        </div>
      </div>

      {/* Offline Notification */}
      <div className="bg-orange-500 text-white flex items-center justify-center px-4 py-2">
        <div className="text-sm font-semibold">
          <span>You are offline! </span>
          <span className="text-xs font-normal">
            Go online to start accepting jobs.
          </span>
        </div>
      </div>

      {/* Map Section */}
      <div className="relative w-full flex-1">
        <img
          src="https://www.researchgate.net/publication/323759986/figure/fig3/AS:631576123682823@1527590890164/Map-in-Uber-application-tracking-user-in-a-Yellow-Cab.png"
          alt="Map"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <div className="bg-yellow-400 w-16 h-16 rounded-full flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
              className="w-10 h-10 text-black"
            >
              <path d="M10 2a6 6 0 016 6c0 2.79-2.62 6.58-4.77 9.09a1.21 1.21 0 01-1.88 0C6.62 14.58 4 10.79 4 8a6 6 0 016-6zm0 3a3 3 0 100 6 3 3 0 000-6z" />
            </svg>
          </div>
          <div className="mt-2 text-xs font-semibold text-black">
            CITY CENTER
          </div>
        </div>
        <div className="absolute bottom-4 right-4">
          {/* accept ride button */}
          <button
            className="bg-white p-2 rounded-full shadow-lg"
            onClick={() => {
              setAcceptRidePopup(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Driver Info Card */}
      <div className="bg-white shadow-md rounded-t-2xl p-6">
        <CaptainDetails />
      </div>
      {/* Accept Ride pop up panel */}
      <div
        ref={AcceptRidePopupRef}
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        style={{ visibility: "hidden" }}
      >
        <div className="bg-white rounded-lg shadow-lg p-6">
          <CaptainAcceptRidePopup
            setAcceptRidePopup={setAcceptRidePopup}
            setrideSummaryPanel={setrideSummaryPanel}
            setchosenRide={setchosenRide}
          />
        </div>
      </div>
      {/* Ride Summary Panel */}
      <div
        ref={rideSummaryPanelRef}
        className="scroll-smooth w-full z-10 fixed bottom-0"
      >
        <CaptainRideDetails
          setrideSummaryPanel={setrideSummaryPanel}
          chosenRide={chosenRide}
        />
      </div>
    </div>
  );
}
