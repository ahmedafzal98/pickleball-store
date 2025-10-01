const express = require("express");
const {
  addUser,
  redirectUser,
  getAffiliate,
  clearAffiliate,
} = require("../controller/UserController");

const router = express.Router();

router.post("/addUser", addUser);
router.get("/u/:id", redirectUser);
router.get("/get-affiliate", getAffiliate);
router.get("/clear-affiliate", clearAffiliate);

module.exports = router;
