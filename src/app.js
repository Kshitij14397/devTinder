const express = require("express");

const app = express();

// app.use("/", (req, res) => {
//   res.send("Hello");
// });

app.use(
  "/user",
  [
    (req, res, next) => {
      console.log("Handling the router user!!");
      next();
    },
    (req, res, next) => {
      console.log("Handling the router user 2!!");
      // res.send("2nd Response!!");
      next();
    },
  ],
  (req, res, next) => {
    console.log("Handling the router user 3!!");
    // res.send("3rd Response!!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the router user 4!!");
    // res.send("4th Response!!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the router user 5!!");
    res.send("5th Response!!");
  }
);

app.listen(3000, () => {
  console.log("Server is listening on PORT 3000");
});
