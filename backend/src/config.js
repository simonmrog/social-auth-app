"use strict";

import dotenv from "dotenv";
dotenv.config();

class Settings {
  PORT = process.env.PORT || 3600;
  ENVIRONMENT = process.env.ENVIRONMENT;
  MONGO_USERNAME = process.env.MONGO_USERNAME || "";
  MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
  MONGO_DATABASE_NAME = process.env.MONGO_DATABASE_NAME;
  MONGO_HOST = process.env.MONGO_HOST;
  MONGO_PORT = process.env.MONGO_PORT;

  TWITTER_KEY = process.env.TWITTER_KEY;
  TWITTER_SECRET = process.env.TWITTER_SECRET;
  FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
  FACEBOOK_SECRET = process.env.FACEBOOK_SECRET;
};

export default new Settings();
