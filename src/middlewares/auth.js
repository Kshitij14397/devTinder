const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send("You are unauthorized!!")
    }

    const decodedMessage = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedMessage.id);

    if (!user) {
      throw new Error("User does not exist");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
};

module.exports = { userAuth };
