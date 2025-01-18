import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FinishRide } from "../components/FinishRide";

export function CaptainRiding() {
  const [completeRidePanel, setCompleteRidePanel] = useState(false);
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const completeRidePanelRef = useRef(null);
  const finishRidePanelRef = useRef(null);

  useEffect(() => {
    if (completeRidePanel) {
      gsap.to(completeRidePanelRef.current, {
        y: 0, // this gives complete view on the screen
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(completeRidePanelRef.current, {
        y: "100%",
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [completeRidePanel]);

  useEffect(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        y: 0, // this gives complete view on the screen
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        y: "100%",
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [finishRidePanel]);

  return (
    <div className="flex flex-col w-screen h-screen relative">
      {/* Navigation and Header */}
      <div className="absolute top-0 w-full flex items-center justify-between px-4 py-3 bg-white shadow-md z-10">
        <button className="text-black">
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
              d="M15.75 9V5.25M15.75 9l-3-3m3 3l3-3M15.75 18.75V15M15.75 15l-3 3m3-3l3 3M8.25 5.25h-.008v.008H8.25V5.25zM8.25 5.25h7.5m-7.5 0h7.5"
            />
          </svg>
        </button>
        <div className="text-lg font-semibold text-black">Pick up</div>
      </div>

      {/* Map Section */}
      <div className="flex-1 relative">
        <img
          src="https://www.researchgate.net/publication/323759986/figure/fig3/AS:631576123682823@1527590890164/Map-in-Uber-application-tracking-user-in-a-Yellow-Cab.png"
          alt="Map"
          className="h-full w-full object-cover"
        />
        <div className="absolute top-0 w-full bg-orange-500 text-white flex items-center justify-between px-4 py-2 z-20">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span className="font-semibold">250m</span>
          </div>
          <span className="text-sm font-medium">
            Turn right at 105 William St, Chicago, US
          </span>
        </div>
      </div>

      {/* Pickup Info */}
      <div className="absolute bottom-0 w-full bg-white rounded-t-xl shadow-lg p-6 z-10">
        <div className="flex flex-col items-center mb-4">
          <div
            onClick={() => {
              setCompleteRidePanel(true);
            }}
            className="w-full flex justify-center items-center mb-2 cursor-pointer"
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
                d="m4.5 18.75 7.5-7.5 7.5 7.5"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          </div>
          <div className="bg-orange-500 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold text-lg">
            A
          </div>
          <span className="mt-2 text-sm font-semibold text-gray-800">
            Pick up at
          </span>
        </div>
        <div className="text-sm text-gray-600">7958 Swift Village</div>
      </div>

      {/* Complete Ride Panel */}
      <div
        ref={completeRidePanelRef}
        className="fixed z-20 bottom-0 left-0 right-0 bg-white p-6 rounded-t-xl shadow-xl transform translate-y-full opacity-0"
      >
        <div
          className="flex justify-center items-center mb-3"
          onClick={() => {
            setCompleteRidePanel(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
            />
          </svg>
        </div>
        <p>
          <span className="font-semibold">
            HERE DIRECTIONS WILL GO, SEPERATE COMPONENT
          </span>
          This is the complete ride panel. Lorem ipsum dolor, sit amet
          consectetur adipisicing elit. Excepturi ratione, id amet at pariatur
          error nisi iusto rem nobis molestiae libero unde reprehenderit minus,
          similique itaque maxime fugit iure inventore?
        </p>
        <button
          onClick={() => {
            setFinishRidePanel(true);
          }}
          className="w-full text-white bg-black px-8 py-4 rounded-full mt-4"
        >
          Complete Ride
        </button>
      </div>
      {/* Finish ride panel */}
      {finishRidePanel && (
        <div className="fixed z-30 bottom-0">
          <FinishRide setFinishRidePanel={setFinishRidePanel} />
        </div>
      )}
    </div>
  );
}
zz;
