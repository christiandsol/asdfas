const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Decor = require("../models/decor");
const User = require("../models/user");
const getDecors = async (req, res, next) => {
  const productID = req.params.pid;
  let foundDecors;
  try {
    foundDecors = await Decor.findById(productID);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, couldn't find product",
      500
    );
    return next(error);
  }
  if (!foundDecors || foundDecors.length === 0) {
    const error = new HttpError("Could not find decor with provided id", 404);
    return next(error);
  }
  res.json({ decors: foundDecors.toObject({ getters: true }) });
};

const postDecor = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError("Some requests are invalid", 422);
    return next(error);
  }

  const { title, description, url, price, user, image } = req.body;
  const createdDecor = new Decor({
    title,
    description,
    url,
    price,
    user: req.userData.userId,
    image,
  });
  let userFound;
  try {
    userFound = await User.findById(req.userData.userId);
  } catch (error) {
    return next(new HttpError("Creating decor failed, try again", 500));
  }

  if (!userFound) {
    return next(new HttpError("User not found", 404));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdDecor.save({ session: sess });
    userFound.decors.push(createdDecor);
    await userFound.save({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Failed to save", 500);
    return next(error);
  }

  res.status(201).json({ decor: createdDecor });
};
//patch
const updateDecorByID = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError("Some inputs are invalid", 403);
    return next(error);
  }
  const { title, description, url, price, image } = req.body;
  const productId = req.params.pid;
  let product;
  try {
    product = await Decor.findById(productId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, couldn't find product",
      500
    );
    return next(error);
  }
  if (product.user !== req.userData.userId) {
    return next(new HttpError("You are not allowed to edit this decor", 401));
  }
  product.title = title;
  product.description = description;
  product.url = url;
  product.price = price;
  product.image = image;
  try {
    await product.save();
  } catch (err) {
    const error = new HttpError("Failure in database", 500);
    return next(error);
  }
  res.status(200).json({ decor: product.toObject({ getters: true }) });
};

const deleteDecor = async (req, res, next) => {
  const decorId = req.params.pid;
  let decor;
  try {
    decor = await Decor.findById(decorId).populate("user");
  } catch (err) {
    const error = new HttpError("Could not find specified decor", 500);
    return next(error);
  }

  if (!decor) {
    return next(new HttpError("Decor doesn't seem to exist", 500));
  }
  if (decor.user !== req.userData.userId) {
    return next(new HttpError("You are not allowed to delete this decor", 401));
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    //delete decor,
    await Decor.deleteOne({ _id: decorId }, { session: sess });
    decor.user.decors.pull(decor);
    await decor.user.save({ session: sess });
    await sess.commitTransaction();
    //delete decor in user
  } catch (err) {
    console.log(err);
    const error = new HttpError("Could not remove specified decor", 500);
    return next(error);
  }
  res.status(200).json({ message: "deleted place" });
};

exports.getDecors = getDecors;
exports.postDecor = postDecor;
exports.deleteDecor = deleteDecor;
exports.updateDecorByID = updateDecorByID;
