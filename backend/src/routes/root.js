"use strict";

import express from "express";
const { Router } = express;

import RootController from "../controllers/root.js";

const rootRouter = Router();
rootRouter.get("/", RootController.renderIndex);
// For facebook #_=_ problem
rootRouter.get("/#_=_", RootController.redirectToIndex);


export default rootRouter;
