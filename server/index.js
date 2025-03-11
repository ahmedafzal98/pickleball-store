const express = require("express");
const crypto = require("crypto");
const cors = require("cors");
const axios = require("axios");
const app = express();

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
    const query = req.query.q || "";
    const finalQuery = query ? `pickleball ${query}` : `pickleball`;

    const response = await axios.get(
      `https://api.ebay.com/buy/browse/v1/item_summary/search`,
      {
        params: { q: finalQuery, limit: 50, offset: 0 },
        headers: {
          Authorization:
            "Bearer v^1.1#i^1#I^3#r^0#p^1#f^0#t^H4sIAAAAAAAA/+VYbWwURRjuXa8lhZZqQEsQzbHUH4Xc3uzt3vVu0zu8tmCv33BHofUD92O2Xbtf3Zlre00MpT9QooSIhgRBKfIRv/CHRv2BwQRiYlCCMdKA/JBUFMUACWIkJRp3r0e5VgJIL7GJl00u88477zzPM+87M7tgsLBo6aa6TX+UOGY5hwfBoNPhoOaAosKCZXPznQsL8kCWg2N4sHzQNZT/cxXiVMVgV0Nk6BqC7n5V0RCbNoaJpKmxOodkxGqcChGLBTYebWpkfSRgDVPHuqArhDtWGyYYUBmkQ1RQ9AuSWAl5y6rdiJnQw4RASz4e+oHAMZwoMKLVj1ASxjSEOQ2HCR/w+T2A9lBUwkexDLAekvL7Owh3GzSRrGuWCwmISBoumx5rZmG9PVQOIWhiKwgRiUVXxluisdoVzYkqb1asSEaHOOZwEk1u1egidLdxShLefhqU9mbjSUGACBHeyPgMk4Oy0Rtg7gF+Wmro4zmKoQTACX6B4gI5kXKlbqocvj0O2yKLHintykINyzh1J0UtNfhnoYAzrWYrRKzWbf+tSnKKLMnQDBMrqqPt0dZWIhLtUqEYlQY8CYiwp3V1rUcSoUD5KJrziBITCjKilJlkPFJG4imz1OiaKNuCIXezjquhhRhO1YXO0sVyatFazKiEbTTZfvQN/Zhgh72g4yuYxF2avaZQtURwp5t3Vn9iNMamzCcxnIgwtSMtT5jgDEMWiamd6TzMpE4/ChNdGBus19vX10f20aRudnp9AFDedU2NcaELqhyR8bVrvR/Jdx7gkdNUBGiNRDKLU4aFpd/KUwuA1klE/FQwQIcyuk+GFZlq/Ychi7N3cjXkqjp4PkDRDOAZAINByVeZi+qIZBLUa+OAPJfyqJzZDbGhcAL0CFaeJVVoyiJL+yUfHZSgRwyEJA8TkiQP7xcDHkqCEEDI80Io+H8pkrtN8zgUTIhzluc5yfFl1XXVbfUruIFe2IMHqADf1K7FA6bQuK6nIe5DUm/7Wn+r1FOrMnr4bivhluRrFNlSJmHNn0sB7Fqfvgh1OsJQnBa9uKAbsFVXZCE1sxaYNsVWzsSpOFQUyzAtklHDiOVun84JvX+xRdwb59yeTf/BuXRLVshO15nFyh6PrACcIZP2yUMKuurVOevKYZvWI8GudQv1tHjL1m11RrG2SI6zlcXxayaZpkyiXoE0IdKTpnXDJlvsm1dC74aadZZhU1cUaLZR065lVU1ijlfgTCvqHCS4zM2wg5aqZKhKX8jHgGnxEtLH6PqZtiXlchu2Da7Ku7xKeye/1Efy0j9qyHEEDDkOOx0OUAUepZaAxYX5a1z5xQuRjCEpcxKJ5E7Nelc1IdkNUwYnm855eSfmNoob6xp/H+STn6y9ujyYV5L1TWH4KbBg4qtCUT41J+sTA1h0s6eAKi0r8fkBTVn0GcCADrDkZq+LetA1f9en5Zev7X7x5M6yml1nL5y5tvSs4AYlE04OR0Gea8iRd3T53scWd7xb+sjpKwuPnxjbULxoy+ix7s3yn9cPb2+rNSteL95zruj7z4TCNXtf85oDvaXXZw1tPd9JKiPqS8a+o6O7nZcubN93cefKPUffPvbrW28ullvGjr+646HZ8tLnyzvG1IsL7msuHjmyzbg8Fj/ZdbD+mFjx7byvzgVcGwaePDD7tHFqVdmZhpdZR1PFGN1+qqLiQuyVz1Nwf8WVg2VdjoZt330wfHUuv3vHvJ75Xxyq7612fLx8UbP7gZHfCkfXB7fO3livOze1PF5S/oP+8OZfBp57GpR+eP6nS/d/Ezy1V3qi8NAb7/sBCkXjJz4iEs+8532h4Z32/aMdVVt+bCg98PXpv5xflo+v5d+frEg27REAAA==",
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
    res.status(500).json({ error: error });
  }
});

// Listen on the appropriate port (Render provides the PORT env variable)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
