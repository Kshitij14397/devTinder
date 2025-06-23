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
    res.status(400).send("Something went wrong: " + err.message);
  }
});

app.get("/user", async (req, res) => {
  try {
    const emailId = req.body.emailId;
    const user = await User.findOne({ emailId });
    if (!user) {
      res.status(404).send("User Data Not Found");
    } else {
      res.send(user);
    }
    // const user = await User.find({ emailId });
    // if (user.length === 0) {
    //   res.status(404).send("User Data Not Found");
    // } else {
    //   res.send(user);
    // }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("No Data Found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).send("User Data Not Found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  try {
    const id = req.query.id;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).send("User Data Not Found");
    } else {
      res.send("User Deleted Successfully");
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.patch("/user/:id", async (req, res) => {
  try {
    const id = req.params?.id;
    const userData = req.body;
    const allowedFields = [
      "firstName",
      "lastName",
      "password",
      "age",
      "gender",
      "photoUrl",
      "about",
      "skills",
    ];

    const isUpdateAllowed = Object.keys(userData).every((data) =>
      allowedFields.includes(data)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update Not Allowed");
    }

    if (userData?.skills?.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }

    const user = await User.findByIdAndUpdate(id, userData, {
      runValidators: true,
    });
    if (!user) {
      res.status(404).send("User Data Not Found");
    } else {
      res.send("User Updated Successfully");
    }
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
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
