const express = require("express");
const app = express();

const VERIFICATION_TOKEN = "e3201657169c22ff56df27ff881ee04d"; // Your token

app.use(express.json()); // Parse JSON requests

app.post("/ebay-deletion", (req, res) => {
  console.log("Received request from eBay:", req.body);

  // eBay sends a challenge request during verification
  if (req.body.challenge) {
    return res.status(200).json({ challenge: req.body.challenge });
  }

  // If it's an actual deletion request, log the data
  console.log("Received eBay Account Deletion Notification:", req.body);

  res.status(200).send("Received");
});

app.get("/ebay-deletion", (req, res) => {
  console.log("Received GET request from eBay:", req);

  // eBay sends a challenge request during verification

  res.status(200).send(VERIFICATION_TOKEN);
});

// Listen on the correct port for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
