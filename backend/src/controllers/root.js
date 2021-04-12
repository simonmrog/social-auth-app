"use strict";

class RootController {
  renderIndex (req, res) {
    res.render("index", {
      title: "Passport Social Login",
      user: req.user
    });
  }

  redirectToIndex (req, res) {
    res.redirect(301, "/");
  }
}


export default new RootController();
