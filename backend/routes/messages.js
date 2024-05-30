const express = require("express");
const router = express.Router();

const messagesController = require("../controllers/messages");

router.post("/", messagesController.create_message);

router.get("/", messagesController.get_messages);

module.exports = router;
