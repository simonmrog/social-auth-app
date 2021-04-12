"use strict";

import express from "express";
const { Router } = express;

import SocialAuthController from "../controllers/socialAuth.js";

const socialAuthRouter = Router();
socialAuthRouter.get("/twitter", SocialAuthController.authenticate("twitter"));
socialAuthRouter.get("/facebook", SocialAuthController.authenticate("facebook"));
socialAuthRouter.get("/twitter/callback", SocialAuthController.authenticate("twitter", true));
socialAuthRouter.get("/facebook/callback", SocialAuthController.authenticate("facebook", true));
socialAuthRouter.get("/logout", SocialAuthController.logout);


export default socialAuthRouter;
