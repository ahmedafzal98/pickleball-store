require("dotenv").config();
const ApiClient = require("../amazon-sdk/ApiClient");
const DefaultApi = require("../amazon-sdk/api/DefaultApi");

const client = new ApiClient();
client.accessKey = process.env.AMAZON_ACCESS_KEY;
client.secretKey = process.env.AMAZON_SECRET_KEY;
client.host = "webservices.amazon.com"; // always amazon.com for US marketplace
client.region = process.env.AMAZON_REGION;

const api = new DefaultApi(client);

const searchItems = async (req, res) => {
  const keyword = req.query.keyword || "pickleball";

  const searchItemsRequest = {
    Keywords: keyword,
    PartnerTag: process.env.AMAZON_PARTNER_TAG,
    PartnerType: "Associates",
    Marketplace: "www.amazon.com",
    Resources: [
      "Images.Primary.Medium",
      "Images.Primary.Large",
      "ItemInfo.Title",
      "ItemInfo.Features",
      "ItemInfo.ByLineInfo",
      "Offers.Listings.Price",
      "Offers.Listings.Condition",
      "Offers.Listings.DeliveryInfo.IsPrimeEligible",
      "Offers.Listings.MerchantInfo",
    ],
  };

  try {
    const data = await api.searchItems(searchItemsRequest);
    res.json(data);
  } catch (err) {
    console.error("Amazon Search API error:", err.message);
    res.status(500).json({ error: "Amazon search API call failed" });
  }
};

const getItemByASIN = async (req, res) => {
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
    console.error("Amazon GetItem API error:", err.message);
    res.status(500).json({ error: "Amazon getItem API call failed" });
  }
};

module.exports = {
  searchItems,
  getItemByASIN,
};
