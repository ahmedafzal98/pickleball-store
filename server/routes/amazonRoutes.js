const express = require("express");
const router = express.Router();
require("dotenv").config();

const ApiClient = require("../amazon-sdk/ApiClient");
const DefaultApi = require("../amazon-sdk/api/DefaultApi");

const client = new ApiClient();
client.accessKey = process.env.AMAZON_ACCESS_KEY;
client.secretKey = process.env.AMAZON_SECRET_KEY;
client.host = "webservices.amazon.com";
client.region = process.env.AMAZON_REGION;

const api = new DefaultApi(client);

// Example: Search Products
router.get("/search", async (req, res) => {
  const keyword = req.query.keyword || "pickleball";

  const searchItemsRequest = {
    Keywords: keyword,
    PartnerTag: process.env.AMAZON_PARTNER_TAG,
    PartnerType: "Associates",
    Marketplace: "www.amazon.com",
  };

  try {
    const data = await api.searchItems(searchItemsRequest);
    res.json(data);
  } catch (err) {
    console.error("Amazon API error:", err);
    res.status(500).json({ error: "Amazon API call failed" });
  }
});

// Example: Get Product by ASIN
router.get("/item/:asin", async (req, res) => {
  const { asin } = req.params;

  const getItemsRequest = {
    ItemIds: [asin],
    Resources: [
      "Images.Primary.Medium",
      "ItemInfo.Title",
      "Offers.Listings.Price",
    ],
    PartnerTag: process.env.AMAZON_PARTNER_TAG,
    PartnerType: "Associates",
    Marketplace: "www.amazon.com",
  };

  try {
    const data = await api.getItems(getItemsRequest);
    res.json(data);
  } catch (err) {
    console.error("Amazon API error:", err);
    res.status(500).json({ error: "Amazon API call failed" });
  }
});

module.exports = router;
