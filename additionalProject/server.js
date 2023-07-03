const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 5001;
const bodyParser = require("body-parser");
const decorRouter = require("./routes/decor-router");
const HttpError = require("./models/http-error");
const userRouter = require("./routes/user-routes");
const cors = require("cors");
require("dotenv").config();
//middle-wear

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST, PATCH, DELETE");
  next();
});
app.use("/api/user", userRouter);
app.use("/api/decor", decorRouter);

app.use((req, res, next) => {
  const error = new HttpError("Couldn't find this route", 404);
  next(error);
});
//error message
app.use((error, req, res, next) => {
  if (res.headerSent) {
    //if response already send
    return next(error);
  }
  //500 means something went wrong on server
  res.status(error.code || 500);
  res.json({ message: error.message } || "An unknown message occured");
});

mongoose
  .connect(process.env.MONGO_CONNECT)
  .then(() => {
    app.listen(port, () => console.log("listening"));
  })
  .catch((error) => console.log(error));
