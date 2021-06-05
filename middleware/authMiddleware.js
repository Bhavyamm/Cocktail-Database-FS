const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, no authentication" });
  }

  try {
    const decoded = jwt.verify(token, "mySecretKey");

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

const admin = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

module.exports = { protect, admin };
