const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
require("dotenv").config();
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return next(new HttpError("Authentication failed", 401));
    }
    const decodedToken = jwt.verify(token, process.env.PRIVATE_TOKEN);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    return next(new HttpError("Authentication failed", 401));
  }
};
