require("dotenv").config({ path: "./config.env" });
const path = require("path");
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

connectDB();

app.use(express.json());

// Connecting Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

// Error Handler Middleware
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  })
} else {
  app.get("/", (req, res, next) => {
    res.send("Api running");
  });
}

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
