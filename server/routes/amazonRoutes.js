// routes/amazonRoutes.js
const express = require("express");
const {
  searchItems,
  getItemByASIN,
} = require("../controller/AmazonController");

const router = express.Router();

router.get("/search", searchItems);

router.get("/item/:asin", getItemByASIN);

module.exports = router;
