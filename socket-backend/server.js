const axios = require("axios");
const WebSocket = require("ws");

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8000 });

console.log("WebSocket server is running on ws://localhost:8000");

// Handle new connections
wss.on("connection", (ws) => {
  console.log("Client connected");

  // Send a welcome message to the client
  ws.send(JSON.stringify({ message: "Connected to the WebSocket server" }));

  // Handle messages from the client
  ws.on("message", async (message) => {
    try {
      const data = JSON.parse(message);
      console.log("Received:", data);

      // If a ride is created, broadcast to all clients
      if (data.type === "ride-created") {
        const { rideId, pickup, destination, vehicleType, vehiclePrice } = data;

        // Notify the rider
        ws.send(JSON.stringify({ message: "Ride created successfully", data }));

        // Broadcast the new ride to all connected clients
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: "new-ride",
                message: "A new ride has been created",
                data,
              })
            );
          }
        });

        // Simulate checking the ride status and periodically updating the rider
        const interval = setInterval(async () => {
          try {
            const response = await axios.get(
              "http://localhost:8080/rides/ride-status",
              {
                params: { id: rideId },
              }
            );

            if (response && response.data) {
              const rideStatus = response.data.status;

              // Send the updated ride status to the rider
              if (ws.readyState === WebSocket.OPEN) {
                ws.send(
                  JSON.stringify({
                    type: "ride-status-update",
                    rideId,
                    status: rideStatus,
                  })
                );
              }

              // End the interval if the ride is completed
              if (rideStatus === "completed") {
                console.log(`Ride ${rideId} completed`);
                clearInterval(interval);
              }
            }
          } catch (error) {
            console.error("Error checking ride status:", error.message);
            clearInterval(interval);
          }
        }, 5000);
      }
    } catch (error) {
      console.error("Error handling message:", error.message);
    }
  });

  // Handle client disconnection
  ws.on("close", () => {
    console.log("Client disconnected");
  });

  // Handle errors
  ws.on("error", (error) => {
    console.error("WebSocket error:", error.message);
  });
});
