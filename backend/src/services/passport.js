"use strict";


import passport from "passport";
import passportTwitter from "passport-twitter";
const TwitterStrategy = passportTwitter.Strategy;

import passportFacebook from "passport-facebook";
const FacebookStrategy = passportFacebook.Strategy;

import SocialAuthService from "./socialAuth.js";
import config from "../config.js";


class PassportService {
  constructor() {
    this.passport = passport;
    this.config();
  }

  async callback(accessToken, refreshToken, profile, done) {
    const user = await SocialAuthService.loginUser(profile);
    done(null, user);
  }

  initialize() {
    return this.passport.initialize();
  }

  session() {
    return this.passport.session();
  }

  authenticate(args) {
    return this.passport.authenticate(...args);
  }

  config() {
    this.passport.serializeUser(function (user, done) {
      done(null, user);
    });

    this.passport.deserializeUser(function (obj, done) {
      done(null, obj);
    });

    const twitterStrategy = new TwitterStrategy({
      consumerKey: config.TWITTER_KEY,
      consumerSecret: config.TWITTER_SECRET,
      callbackURL: "/auth/twitter/callback"
    }, this.callback);

    const facebookStrategy = new FacebookStrategy({
      clientID: config.FACEBOOK_CLIENT_ID,
      clientSecret: config.FACEBOOK_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos"]
    }, this.callback);

    this.passport.use(twitterStrategy);
    this.passport.use(facebookStrategy);
  }
}


export default new PassportService();
