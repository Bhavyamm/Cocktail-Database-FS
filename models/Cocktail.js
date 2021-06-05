const mongoose = require("mongoose");

const CocktailSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  instructions: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = Cocktail = mongoose.model("Cocktail", CocktailSchema);
