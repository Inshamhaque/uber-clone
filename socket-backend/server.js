const axios = require("axios");
const WebSocket = require("ws");

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8000 });

console.log("WebSocket server is running on ws://localhost:8000");

// Store connected clients
const clients = new Set();

wss.on("connection", (ws) => {
  console.log("Client connected");
  clients.add(ws);
  let id;

  // Send a welcome message to the client
  ws.send(JSON.stringify({ message: "Connected to the WebSocket server" }));

  // Handle messages from the client
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    console.log("Received:", JSON.parse(data.id));
    id = data.id;
    // Broadcast the message to all clients (optional)
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Handle client disconnection
  ws.on("close", () => {
    console.log("Client disconnected");
    clients.delete(ws);
  });

  // Send periodic updates (e.g., checking ride status)
  const interval = setInterval(() => {
    // check for the status of the ride from the db
    const response = axios.get("http://localhost:8080/rides/ride-status", {
      params: {
        id,
      },
    });
    if (response) {
      console.log(response.data);
    }
    ws.send(JSON.stringify({ rideStatus: "waiting for driver" }));
  }, 5000);

  ws.on("close", () => clearInterval(interval)); // Clear interval on disconnect
});
