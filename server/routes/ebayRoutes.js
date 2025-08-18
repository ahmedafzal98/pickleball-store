const express = require("express");
const { getEbayItems } = require("../controller/ebayController");

const router = express.Router();

router.get("/", getEbayItems);

module.exports = router;
