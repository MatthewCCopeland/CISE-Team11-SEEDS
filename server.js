// server.js
require('dotenv').config({path: "./config.env"});
const express = require('express');
const connectDB = require('./config/db');

// Connect Database
connectDB();

const app = express();

app.use(express.json());

//Redirect any incoming traffic on api/auth to the authentication router
app.use("/api/auth", require("./routes/auth"));

const port = process.env.PORT || 8082;

const server = app.listen(port, () => console.log(`Server running on port ${port}`));

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
  });