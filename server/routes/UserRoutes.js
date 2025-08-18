const express = require("express");
const { addUser, redirectUser } = require("../controller/userController");

const router = express.Router();

router.post("/addUser", addUser);
router.get("/u/:id", redirectUser);

module.exports = router;
