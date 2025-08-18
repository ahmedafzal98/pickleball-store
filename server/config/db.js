const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);
    console.log("✅ Connected to Database");
  } catch (error) {
    console.error("❌ Failed to connect to Database:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
