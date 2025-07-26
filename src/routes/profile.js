const express = require("express");
const bcrypt = require("bcrypt");
const { userAuth } = require("../middlewares/auth");
const {
  validateProfileUpdateData,
  validateProfilePasswordUpdateData,
} = require("../utils/validation");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    validateProfileUpdateData(req);
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.json({ message: "Profile Successfully Updated", data: loggedInUser });
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    validateProfilePasswordUpdateData(req);
    const loggedInUser = req.user;
    const { password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    loggedInUser.password = hashPassword;
    await loggedInUser.save();
    res.json({
      message: "Profile Password Successfully Updated",
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

module.exports = profileRouter;
