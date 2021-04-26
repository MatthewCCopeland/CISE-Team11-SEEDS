// server.js
require('dotenv').config({path: "./config.env"});
const express = require('express');
const connectDB = require('./config/db');

const app = express();

app.use(express.json());

//Redirect any incoming traffic on api/auth to the authentication router
app.use("/api/auth", require("./routes/auth"));

// Connect Database
connectDB();

app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));