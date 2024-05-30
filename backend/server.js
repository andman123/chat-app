require("dotenv").config();

const express = require("express");
const app = express();

const WebSocket = require("ws");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = process.env.API_PORT || 4001;

let messages = [];

app.use(cors());

app.use(bodyParser.json());

const server = app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
	console.log("Client connected");

	ws.on("message", (message) => {
		console.log("received:", message);
	});

	ws.send(JSON.stringify({ type: "init", messages }));
});

const broadcast = (data) => {
	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(data));
		}
	});
};

app.post("/messages", (req, res) => {
	const { text } = req.body;

	if (messages.length >= 9) {
		messages.shift();
	}

	const message = { id: Date.now(), text };
	messages.push(message);

	broadcast({ type: "new_message", message }); // Рассылка нового сообщения всем клиентам

	res.status(201).json(message);
});

app.get("/messages", (req, res) => {
	res.json(messages);
});
