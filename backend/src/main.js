"use strict";

import ErrorHandler from "./services/error.js";
import app from "./app.js";
import mongo from "./db.js";
import config from "./config.js";


async function initAppication() {
  try {
    const db = await mongo.makeDatabaseConnection();
    console.log("[INFO]: Connected to database:", db.connection.host);
    app.listen(config.PORT);
    console.log("[INFO]: Server running on port", config.PORT);
  } catch (err) {
    ErrorHandler.handleError(err);
  }
}


initAppication();
