# Uber Clone

## Overview
This is an Uber-like ride-hailing application built using modern web technologies. The project aims to replicate key functionalities of a ride-booking platform, allowing passengers to request rides and captains (drivers) to accept them.

🚀 **This project is currently in development.**

## Features
### Passenger Side
- Request a ride by selecting a pickup and destination.
- View estimated ride duration and vehicle type.
- Receive ride confirmation and track ride progress.

### Captain Side
- Toggle online/offline status.
- Receive ride requests via WebSocket.
- Accept or reject rides in real-time.
- View ride details upon acceptance.

### WebSocket Integration
- Real-time communication between passengers and captains.
- Instant ride request notifications for captains.
- Live status updates on ride acceptance.

### Backend Functionality
- WebSocket server for real-time communication.
- Ride request handling and distribution.
- Passenger and captain identification.

## Tech Stack
- **Frontend:** React, Tailwind CSS, GSAP (for animations)
- **Backend:** Node.js, WebSocket, Express.js
- **Database:** MongoDB
- **State Management:** Recoil (planned)

## Future Work
- Implement ride-matching functionality for carpooling.
- Enhance ride-tracking with live map integration.
- Improve UI/UX for a smoother experience.
- Add authentication and profile management.

## Setup Instructions
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/uber-clone.git
   cd uber-clone
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   cd server
   node index.js
   ```
4. Start the frontend:
   ```sh
   cd client
   npm start
   ```
5. Open `http://localhost:3000` in the browser to use the app.

## Contributors
- **Inshamul Haque** (Full Stack Developer) - [GitHub](https://github.com/Inshamhaque)

---
⚠️ **Disclaimer:** This project is for learning purposes only and is not affiliated with Uber Technologies Inc.

