const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    // Creating a new instance of the User model
    const user = new User(req.body);
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
