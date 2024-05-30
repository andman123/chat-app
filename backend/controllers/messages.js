const messagesService = require("../services/messages");

exports.create_message = (req, res) => {
	const body = req.body;
	const result = messagesService.create_message(body);
	res.status(200).json({
		success: true,
		result: result,
	});
};

exports.get_messages = (req, res) => {
	res.status(200).json({
		success: true,
		result: ["result"],
	});
};
