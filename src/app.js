const express = require('express');

const app = express();

const data = require('../data.json');
console.log(data);

// This will only handle GET call to /user
app.get("/user/:userId", (req, res) => {
    console.log("kp1", req.query);
    console.log("kp2", req.params)
    res.send({ firstName: "Kshitij", lastName: "Pandey" });
});

app.post("/user", (req, res) => {
    // saving data to DB
    res.send("Data successfully saved to the database!");
});

app.delete("/user", (req, res) => {
    res.send("Deleted successfully!");
});

// This will match all the HTTP method API calls to /ping
app.use("/ping", (req, res) => {
    res.send("pong")
});

app.get(/.*fly$/, (req, res) => {
    res.send({ firstName: "Kshitij", lastName: "Pandey" });
});

app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000");
});
