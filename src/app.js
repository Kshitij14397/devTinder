const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/getUserData", (req, res) => {
  try {
    // Logic of DB call and get user data
    throw new Error("Some Error.Contact Support Team");
    res.send("User Data Sent");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

app.listen(3000, () => {
  console.log("Server is listening on PORT 3000");
});
