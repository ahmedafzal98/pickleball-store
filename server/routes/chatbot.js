const express = require("express");
const router = express.Router();
const { chatbotReply } = require("../controller/chatbotController");

router.post("/chat", chatbotReply);

module.exports = router;
