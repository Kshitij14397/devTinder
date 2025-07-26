const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://kshitij14397:kshitij14397@devtinder.ftsur7s.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
