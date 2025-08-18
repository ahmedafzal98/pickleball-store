const express = require("express");
const {
  verifyEbayChallenge,
  handleEbayDeletion,
} = require("../controller/verificationController");

const router = express.Router();

router.get("/ebay-deletion", verifyEbayChallenge);
router.post("/ebay-deletion", handleEbayDeletion);

module.exports = router;
