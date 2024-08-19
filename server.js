// server.js
const express = require('express');  // Import the Express library
const app = express();  // Create an Express application

const PORT = process.env.PORT || 5000;  // Set the port to an environment variable or default to 5000

app.get('/', (req, res) => {  // Define a route for HTTP GET requests to the root URL
  res.send('Price Tracker API');  // Send a response back to the client
});

app.listen(PORT, () => {  // Start the server and listen on the specified port
  console.log(`Server running on port ${PORT}`);  // Log a message when the server is running
});