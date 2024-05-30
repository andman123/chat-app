const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const messageRouter = require("./routes/messages");

app.use("/messages", messageRouter);

module.exports = app;
