const axios = require("axios");
const { clientId, clientSecret } = require("../config/ebayConfig");

let ebayToken = { token: null, expiry: null };

const getNewToken = async () => {
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

  console.log("✅ eBay Token Fetched Successfully!");
  return response.data;
};

const getToken = async () => {
  const now = Date.now();
  if (!ebayToken.token || ebayToken.expiry < now) {
    console.log("Token expired. Fetching new token...");
    const newToken = await getNewToken();
    ebayToken.token = newToken.access_token;
    ebayToken.expiry = now + newToken.expires_in * 1000;
  }
  return ebayToken.token;
};

const searchEbayItems = async (query) => {
  const token = await getToken();
  const finalQuery = query ? `pickleball ${query}` : `pickleball`;

  const response = await axios.get(
    "https://api.ebay.com/buy/browse/v1/item_summary/search",
    {
      params: { q: finalQuery, limit: 50, offset: 0 },
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  const items = response.data.itemSummaries || [];
  return {
    totalItems: items.length,
    limitUsed: Math.min(items.length, 50),
    items,
  };
};

module.exports = { searchEbayItems };
