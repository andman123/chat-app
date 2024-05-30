import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { createMessage, fetchMessages } from "../repository/messages";

const Messages = () => {
	const queryClient = useQueryClient();
	const { data } = useQuery({
		queryKey: ["messages"],
		queryFn: fetchMessages,
	});

	const mutation = useMutation({
		mutationFn: createMessage,
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({
				queryKey: ["messages"],
			});
		},
	});

	useEffect(() => {
		const ws = new WebSocket(process.env.REACT_APP_WS_URL);

		ws.onmessage = (event) => {
			const { type, message } = JSON.parse(event.data);
			if (type === "new_message") {
				queryClient.setQueryData(["messages"], (old) => [
					...old,
					message,
				]);
			}
		};

		return () => ws.close();
	}, [queryClient]);

	const [text, setText] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		mutation.mutate(text);
		setText("");
	};
	return (
		<div>
			<h1>Chat App</h1>
			<ul>
				{data?.map((message) => (
					<li key={message.id}>{message.text}</li>
				))}
			</ul>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<button type="submit">Send</button>
			</form>
		</div>
	);
};

export default Messages;
