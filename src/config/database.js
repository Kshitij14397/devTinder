const mongoose = require("mongoose");

const connectDB = async () => {
   await mongoose.connect(
    "mongodb+srv://kshitij14397:9cJB43Om2mnPQW58@devtinder.ftsur7s.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
