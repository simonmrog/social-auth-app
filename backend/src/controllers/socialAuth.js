"use strict";

import PassportService from "passport";


class SocialAuthController {
  authenticate(provider, redirect = false) {
    if (redirect) return PassportService.authenticate(provider, {
      successRedirect: "/", failureRedirect: "/login"
    });

    return PassportService.authenticate(provider);
  }

  logout(req, res) {
    req.logout();
    req.session.destroy((err) => {
      delete req.session;
    });
    res.redirect("/");
  }
}

export default new SocialAuthController();
