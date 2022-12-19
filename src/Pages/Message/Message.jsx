import React, { useEffect } from "react";
import { useState } from "react";
import { host, mercureHubUrl, messagesRoute } from "../../utils/axios";
import useAxiosJWT from "../../utils/useAxiosJWT";

const Message = () => {
	const axiosJWT = useAxiosJWT();
	const [messages, setMessages] = useState(null);

	useEffect(() => {
		const getMessages = async () => {
			const { data: allMessages } = await axiosJWT.get(messagesRoute);
			setMessages(allMessages["hydra:member"]);
		};
		getMessages();

		const url = new URL(mercureHubUrl);
		url.searchParams.append("topic", `${host}${messagesRoute}/{id}`);
		const eventSource = new EventSource(url);
		eventSource.onmessage = (e) => {
			console.log(JSON.parse(e.data));
			setMessages((prev) => [...prev, JSON.parse(e.data)]);
		};

		return () => {
			eventSource.close();
		};
	}, []);

	const handleTest = async () => {
		const { data: test } = await axiosJWT.post(messagesRoute, {
			message: "coucou",
			userId: `/api/users/5`,
			game: `/api/games/7`,
		});
		console.log(test);
	};

	return (
		<div>
			{messages &&
				messages.map((message) => <p key={message.id}>{message.message}</p>)}
			<button onClick={handleTest}>TEST</button>
		</div>
	);
};

export default Message;
