const ErrorResponse = require("../utils/errorResponse");

// Custom error handler
const errorHandler = (err, req, res) => {
  let error = { ...err };

  error.message = err.message;

  // Specific case for spectifc error
  if (err.code === 11000) {
    const message = `Duplicate Field value entered`;
    error = new ErrorResponse(message, 400);
  }

  // Specific case for spectifc error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  // Logs error message
  console.log(error.message);

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
