"use strict";

import mongoose from "mongoose";

import config from "./config.js";


class MongoDB {
  mongooseConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  };
  mongoUsername = config.MONGO_USERNAME;
  mongoPassword = config.MONGO_PASSWORD;
  mongoDatabase = config.MONGO_DATABASE_NAME;
  mongoHost = config.MONGO_HOST;
  mongoPort = config.MONGO_PORT;
  mongoUri = null;

  makeDatabaseConnection() {
    const auth = this.mongoUsername !== "" ? `${this.mongoUsername}:${this.mongoPassword}@` : "";
    this.mongoUri = `mongodb://${auth}${this.mongoHost}:${this.mongoPort}/${this.mongoDatabase}`;

    console.log(`[INFO] Connecting to ${this.mongoUri}...`);

    return mongoose.connect(this.mongoUri, {
      auth: { authSource: "admin" },
      ...this.mongooseConfig
    });
  }
}

export default new MongoDB();
