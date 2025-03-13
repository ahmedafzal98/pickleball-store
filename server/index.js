const express = require("express");
const crypto = require("crypto");
const cors = require("cors");
const axios = require("axios");
const app = express();
require("dotenv").config();

const VERIFICATION_TOKEN = "e3201657169c22ff56df27ff881ee04d";
// Replace with your chosen token

const allowedOrigins = [
  "https://pickleball-store-frontend.onrender.com",
  "http://localhost:5173",
];
const ENDPOINT_URL =
  "https://pickleball-store-backend.onrender.com/ebay-deletion";

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

// GET endpoint for verification
app.get("/ebay-deletion", (req, res) => {
  const challengeCode = req.query.challenge_code;
  if (!challengeCode) {
    return res.status(400).send("Missing challenge_code query parameter.");
  }

  // Compute the hash: SHA256(challengeCode + verificationToken + endpoint URL)
  const hash = crypto.createHash("sha256");
  hash.update(challengeCode);
  hash.update(VERIFICATION_TOKEN);
  hash.update(ENDPOINT_URL);
  const challengeResponse = hash.digest("hex");

  // Respond with the challengeResponse in JSON format
  res.status(200).json({ challengeResponse });
});

// POST endpoint to handle deletion notifications
app.post("/ebay-deletion", (req, res) => {
  // Process deletion notification here if needed
  res.status(200).send("Received");
});

app.get("/api/ebay", async (req, res) => {
  try {
    const token = await getToken();
    console.log(token);

    const query = req.query.q || "";
    const finalQuery = query ? `pickleball ${query}` : `pickleball`;

    const response = await axios.get(
      `https://api.ebay.com/buy/browse/v1/item_summary/search`,
      {
        params: { q: finalQuery, limit: 50, offset: 0 },
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    const totalItems = response.data.itemSummaries?.length || 0;
    const adjustedLimit = totalItems < 50 ? totalItems : 50;

    res.json({
      totalItems,
      limitUsed: adjustedLimit,
      items: response.data.itemSummaries || [],
    });
  } catch (error) {
    console.error("🔥 ERROR:", error.response?.data || error.message); // Log the error properly
    res
      .status(500)
      .json({ error: error.response?.data || "Internal Server Error" });
  }
});

const getNewToken = async () => {
  try {
    const clientId = process.env.EBAY_CLIENT_ID;
    const clientSecret = process.env.EBAY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error("Missing eBay API credentials");
    }
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64"
    );

    const response = await axios.post(
      "https://api.ebay.com/identity/v1/oauth2/token",
      "grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope",
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("eBay Token Fetched Successfully!");

    return response.data;
  } catch (error) {
    console.error("Token fetch failed:", error.message);
    throw error;
  }
};
app.post("/api/auth", async (req, res) => {});

let ebayToken = {
  token: null,
  expiry: null,
};

const getToken = async () => {
  let currentDate = Date.now();

  if (!ebayToken.token || ebayToken.expiry < currentDate) {
    console.log("Token expired. Fetching new token...");

    const newToken = await getNewToken();

    ebayToken.token = newToken.access_token;
    ebayToken.expiry = currentDate + newToken.expires_in * 1000;
  }

  return ebayToken.token;
};
// Listen on the appropriate port (Render provides the PORT env variable)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
