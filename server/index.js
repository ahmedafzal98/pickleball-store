const express = require("express");
const crypto = require("crypto");
const app = express();

const VERIFICATION_TOKEN = "e3201657169c22ff56df27ff881ee04d"; // Replace with your chosen token
const ENDPOINT_URL =
  "https://pickleball-store-backend.onrender.com/ebay-deletion";

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
  console.log("Received eBay Account Deletion Notification:", req.body);
  // Process deletion notification here if needed
  res.status(200).send("Received");
});

// Listen on the appropriate port (Render provides the PORT env variable)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
