const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Prashant",
    lastName: "Sinha",
    emailId: "sinhaprashant126@gmail.com",
    password: "sp@#121",
  };

  try {
    const user = new User(userObj);
    await user.save();
    res.send("Data Saved Successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
      console.log("Server is listening on PORT 3000");
    });
  })
  .catch(() => {
    console.log("Database cannot be connected");
  });
