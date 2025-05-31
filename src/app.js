const express = require("express");

const app = express();

const users = [{ firstName: "Kshitij", lastName: "Pandey" }];

app.get("/user", (req, res) => {
  res.send(users);
});

app.post("/user", (req, res) => {
  // users.push(user);
  res.send("User is successfully added in the database");
});

app.delete("/user", (req, res) => {
  res.send("User is successfully deleted from the database");
});

app.put("/user", (req, res) => {
  res.send("User is successfully updated through PUT method in the database");
});

app.patch("/user", (req, res) => {
  res.send("User is successfully updated through PATCH method in the database");
});

app.listen(7777, () => {
  console.log("Server is listening on PORT 7777");
});
