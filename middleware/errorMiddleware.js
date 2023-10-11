const errorResponse = require("../utlis/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  //moongoose cast error
  if (err.name === "castError") {
    const message = "Resources n not found";
    error = new errorResponse(message, 404);
  }

  //duplicate key error
  if (err.code === 11000) {
    const message = "Duplicate field value enterd";
    error = new errorResponse(message, 404);
  }
  //moongoose validation

  if (err.name === "validationError") {
    const message = Object.values(err.error).map((val) => val.message);
    error = new errorResponse(message, 404);
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "server error",
    });
  }
};

module.exports = errorHandler;
