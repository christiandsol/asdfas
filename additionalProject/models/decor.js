const { ObjectId } = require("mongodb");

mongoose = require("mongoose");

const Schema = mongoose.Schema;

const decorSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  price: { type: Number, required: true },
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  image: { type: String, required: false },
});
module.exports = mongoose.model("Decor", decorSchema);
