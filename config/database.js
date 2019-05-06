const mongoose = require("mongoose");
const config = require("config");
const databaseString = config.get("mongoURI");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(databaseString, { useNewUrlParser: true });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
    //Exits process
    process.exit(1);
  }
};

module.exports = connectToDatabase;
