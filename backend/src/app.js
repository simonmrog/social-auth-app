"use strict";

import { fileURLToPath } from "url";
import path, { dirname } from "path";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";

import router from "./routes/index.js";
import PassportService from "./services/passport.js";


// Dirname config
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const corsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ["accessToken"]
}

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Session config
app.use(cookieParser());
app.use(session({ secret: "SECRET", resave: true, saveUninitialized: true }));
app.use(PassportService.initialize());
app.use(PassportService.session());

// Views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Routes
router(app);

export default app;
