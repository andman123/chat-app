export const fetchMessages = async () => {
	const response = await fetch(`${process.env.REACT_APP_API_URL}/messages`);
	return response.json();
};

export const createMessage = async (text) => {
	const response = await fetch(`${process.env.REACT_APP_API_URL}/messages`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ text }),
	});
	return response.json();
};
