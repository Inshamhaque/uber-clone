// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import axios from "axios";

export function Waiting({ setWaitingPanel, waitingPanel }: any) {
  const [rideStatus, setRideStatus] = useState<string>("waiting for driver");
  const id = localStorage.getItem("rideId");
  const loaderRef = useRef(null);

  useEffect(() => {
    // GSAP loader animation
    // const loader = document.getElementById("loader");

    gsap.fromTo(
      loaderRef.current,
      { rotation: 0 },
      {
        rotation: 360,
        duration: 1.5,
        repeat: -1,
        ease: "linear",
      }
    );

    // Polling function to check ride status
    const checkRideStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/rides/ride-status?id=${id}`
        );
        const data = response.data;

        if (data.status === "accepted") {
          setRideStatus("Ride accepted!");
          //   setWaitingPanel(false);
          // navigate user to a map screen ... /ride-ongoing
        } else {
          setRideStatus("Waiting for driver...");
        }
      } catch (error) {
        console.error("Error fetching ride status:", error);
        setRideStatus("Error checking status");
      }
    };

    // Long polling to check ride status every 5 seconds
    const intervalId = setInterval(checkRideStatus, 5000);

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, [id]);

  return (
    <div style={styles.container}>
      <h2>Waiting for driver to accept...</h2>
      <div ref={loaderRef} id="loader" style={styles.loader}></div>
      <p>Status: {rideStatus}</p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  loader: {
    width: "50px",
    height: "50px",
    border: "5px solid #ccc",
    borderTop: "5px solid #3498db",
    borderRadius: "50%",
    margin: "20px 0",
  },
};
