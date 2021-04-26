// server.js
require('dotenv').config({path: "./config.env"});
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const errorHandler = require("./middleware/error");

// Connect DB
connectDB();

app.use(express.json());

//Redirect any incoming traffic on api/auth to the authentication router
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

// Error Handler Middleware
app.use(errorHandler);

const port = process.env.PORT || 8082;

const server = app.listen(port, () => 
    console.log(`Server running on port ${port}`)
);

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
  });