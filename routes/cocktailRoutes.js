const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const { check, validationResult } = require("express-validator");
const Cocktail = require("../models/Cocktail");
const User = require("../models/User");

const router = express.Router();

// @route   GET api/cocktails
// @desc    Get all Cocktails
// @access  Public

router.get("/", async (req, res) => {
  try {
    const cocktails = await Cocktail.find();
    res.json(cocktails);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/cocktails/:category
// @desc    Get Cocktail by category
// @access  Public

router.get("/:category", async (req, res) => {
  try {
    const cocktail = await Cocktail.find({ category: req.params.category });

    if (!cocktail) {
      return res.status(404).json({ msg: "Cocktail not found" });
    }

    res.json(cocktail);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Cocktail not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   GET api/cocktails/:id
// @desc    Get cocktail by Id
// @access  Public

router.get("/cocktail/:id", async (req, res) => {
  try {
    // console.log(req.params, "req");
    const cocktail = await Cocktail.findById(req.params.id);

    // console.log(cocktail, "cocktail");

    if (!cocktail) {
      return res.status(404).json({ msg: "Cocktail not found" });
    }

    res.json(cocktail);
  } catch (error) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Cocktail not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/cocktails/:cocktailId
// @desc    Delete a cocktail
// @access  Private

router.delete("/:cocktailId", protect, admin, async (req, res) => {
  try {
    const cocktail = await Cocktail.findById(req.params.cocktailId);

    if (!cocktail) {
      return res.status(404).json({ msg: "Cocktail not found" });
    }

    await cocktail.remove();
    res.json({ msg: "Cocktail removed" });
  } catch (error) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Cocktail not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   POST api/cocktails
// @desc    Create a Cocktail
// @access  Private

router.post("/", protect, admin, async (req, res) => {
  try {
    const { name, image, category, instructions, ingredients, price } = req.body;

    let finalCocktail = {};

    if (name) finalCocktail.name = name;
    if (image) finalCocktail.image = image;
    if (category) finalCocktail.category = category;
    if (instructions) finalCocktail.instructions = instructions;
    if (price) finalCocktail.price = price;
    if (ingredients)
      finalCocktail.ingredients = ingredients
        .split(",")
        .map((ingredient) => ingredient.trim());

    finalCocktail.user = req.user.id;

    const cocktail = new Cocktail(finalCocktail);
    await cocktail.save();
    res.json(cocktail);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
