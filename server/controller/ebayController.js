const { searchEbayItems } = require("../services/ebayService");

const getEbayItems = async (req, res) => {
  try {
    const query = req.query.q || "";
    const results = await searchEbayItems(query);

    res.json(results);
  } catch (error) {
    console.error("🔥 ERROR:", error.response?.data || error.message);
    res
      .status(500)
      .json({ error: error.response?.data || "Internal Server Error" });
  }
};
module.exports = { getEbayItems };
