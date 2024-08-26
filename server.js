/*
- Start Node Server: node server.js
      - With nodemon(dynamic updating): npm run dev
- Start mongod: mongod
*/

// Build express.js routes to nodejs server
const express = require('express');  // Import the Express library
const app = express();  // Create an Express application

const PORT = process.env.PORT || 5000;  // Set the port to an environment variable or default to 5000

app.get('/', (req, res) => {  // Define a route for HTTP GET requests to the root URL
  res.send('Price Tracker API');  // Send a response back to the client
});

app.listen(PORT, () => {  // Start the server and listen on the specified port
  console.log(`Server running on port ${PORT}`);  // Log a message when the server is running
});

//NOTE: Is the correct time to call when server boots up, or do we need to call when user actually registers
const authRoutes = require('./routes/auth');
app.use('/api/users', authRoutes);

// connect to mongodb
const mongoose = require('mongoose');

//NOTE: CHANGE myDatabase to correct location, once a db is created
mongoose.connect('mongodb://localhost:27017/myDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));


// Create routes to user and product database, to handle HTTP connections
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);


// Create the price updater object
const updatePrices = require('./services/priceUpdater');
const cron = require('node-cron');  // package that run tasks at intervals

// Shedule the updater to run at specfied interval
async function scheduleUpdates() {
  const users = await User.find();
  users.forEach(user => {
    cron.schedule(`0 */${user.updateInterval} * * *`, () => {
      console.log(`Running price updater for user ${user._id} every ${user.updateInterval} hours...`);
      updatePrices(user._id);
    });
  });
}

scheduleUpdates();
