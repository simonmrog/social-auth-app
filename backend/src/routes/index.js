"use strict";

import ErrorHandler from "../services/error.js";
import rootRouter from "./root.js";
import socialAuthRouter from "./socialAuth.js";

export default function(app) {
  app.use("/api/v1", rootRouter);
  app.use("/auth", socialAuthRouter);

  // Not found response for non-matching routes
  app.use('*', function(req, res){
    res.status(404).json({ detail: "Not Found" });
  });

  // Error handler
  app.use((err, req, res, next) => {
    ErrorHandler.handleError(err, res);
  });
};
