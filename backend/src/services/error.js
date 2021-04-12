"use strict";


class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }

  static handleError(err, res) {
    console.log("[ERROR]:", err.message);

    // DB Connection timed out
    if (err.message.includes("Server selection")) {
      err.statusCode = 500;
      err.message = "Cannot connect to db. Connection timeout";
    }

    // Timeout from mongoose stopped execution
    if (err.message.includes("interrupted at shutdown")) {
      err.statusCode = 500;
      err.message = "Cannot connect to db. Connection timeout";
    }

    // Verify if is mongoose validation
    if (err.message.includes("validation")) err.statusCode = 422;

    // Unknown error or internal server error
    if (!err.statusCode) {
      err.statusCode = 500;
      err.message = "Internal Server Error";
    }

    if (res) res.status(err.statusCode).json({
      status: "error",
      detail: err.message
    });
  }
}

export default ErrorHandler;
