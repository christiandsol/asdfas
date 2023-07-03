const { get, isValidObjectId } = require("mongoose");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv");
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    return next(new HttpError("Error getting all users"), 500);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const postSignUp = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    error = new HttpError("invalid inputs", 403);
    return next(error);
  }
  const { username, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("user not signed up", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("User exists already, log in", 422);
    return next(error);
  }
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("Couldn't create user, try again", 500);
    return next(error);
  }

  const newUser = User({
    username,
    email,
    password: hashedPassword,
    image: "deez nuts",
    decors: [],
  });
  try {
    await newUser.save();
  } catch (err) {
    const error = new HttpError("Signing up failed", 500);
    return next(error);
  }
  let token;
  try {
    token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.PRIVATE_TOKEN,
      { expiresIn: "1hr" }
    );
  } catch (error) {
    return next(new HttpError("Error Signing up"), 500);
  }
  res
    .status(201)
    .json({ userId: newUser._id, email: newUser.email, token: token });
};

const postLogIn = async (req, res, next) => {
  const { email, password } = req.body;
  let identifiedUser;
  try {
    identifiedUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Error finding user"), 500);
  }
  if (!identifiedUser) {
    return next(new HttpError("user not found"), 401);
  }
  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, identifiedUser.password);
  } catch (error) {
    return next(
      new HttpError("Could not log you in, please recheck credentialss"),
      500
    );
  }
  if (!isValidPassword) {
    return next(
      new HttpError("Could not log you in, please recheck credentials"),
      500
    );
  }
  //
  let token;
  try {
    token = jwt.sign(
      {
        userId: identifiedUser._id,
        email: identifiedUser.email,
      },
      process.env.PRIVATE_TOKEN,
      { expiresIn: "1hr" }
    );
  } catch (err) {}
  res.status(200).json({
    userId: identifiedUser._id,
    email: identifiedUser.email,
    token: token,
  });
};

const getUserDecors = async (req, res, next) => {
  const user = req.params.uid;
  console.log("here");
  let foundUser;
  try {
    foundUser = await User.findById(user);
    console.log("user after", foundUser);
  } catch (err) {
    next(new HttpError("could not find Deez", 500));
  }
  console.log("yoyo 1");
  if (!foundUser) {
    console.log("yoyo 2");
    next(new HttpError("could not find Deez", 404));
  }
  res.status(200).json({ decors: foundUser.decors });
};

exports.postSignUp = postSignUp;
exports.postLogIn = postLogIn;
exports.getUsers = getUsers;
exports.getUserDecors = getUserDecors;
