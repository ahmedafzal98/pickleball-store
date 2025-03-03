const express = require("express");
const app = express();

app.use(express.json());

const VERIFICATION_TOKEN = "e3201657169c22ff56df27ff881ee04d";

app.get("/ebay-deletion", (req, res) => {
  res.status(200).send(VERIFICATION_TOKEN);
});
app.post("/ebay-deletion", (req, res) => {
  console.log("Received eBay Account Deletion Notification:", req.body);

  res.status(200).send("Received");
});

app.listen(3000, () => console.log("Server running on port 3000"));
