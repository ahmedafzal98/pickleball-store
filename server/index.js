const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const ebayRoutes = require("./routes/ebayRoutes");
const amazonRoutes = require("./routes/amazonRoutes");
const userRoutes = require("./routes/UserRoutes");
const verificationRoutes = require("./routes/verificationRoutes");

const connectDB = require("./config/db");
const app = express();

app.use(cookieParser());
app.use(express.json());
// CORS setup
const allowedOrigins = [
  "https://pickleball-store-frontend.onrender.com",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "https://wesellpickleball.xyz",
  "https://pickleball-admin-client.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// ✅ Routes
app.use("/api/ebay", ebayRoutes);
app.use("/api/amazon", amazonRoutes);
app.use("/", verificationRoutes);
app.use("/", userRoutes);

// Start server
const PORT = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
