import "./message.scss";
import React, { useEffect } from "react";
import { useState } from "react";
import { host, mercureHubUrl, messagesRoute } from "../../utils/axios";
import useAxiosJWT from "../../utils/useAxiosJWT";
import { BsFillChatLeftDotsFill } from "react-icons/bs";

const Message = ({ gameId, userId }) => {
	const axiosJWT = useAxiosJWT();
	const [messages, setMessages] = useState(null);
	const [chatMessage, setChatMessage] = useState("");
	const [chatOpen, setChatOpen] = useState(false);

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();
		const getMessages = async () => {
			try {
				if (gameId) {
					const { data: messagesInGame } = await axiosJWT.get(
						`${messagesRoute}?game=${gameId}`,
						{
							signal: controller.signal,
						}
					);
					if (isMounted && messagesInGame) {
						const allMessages = messagesInGame["hydra:member"];
						setMessages(allMessages);
					}
				}
			} catch (error) {
				console.log(error);
			}
		};
		getMessages();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [gameId]);

	useEffect(() => {
		const url = new URL(mercureHubUrl);
		url.searchParams.append("topic", `${host}${messagesRoute}/{id}`);
		const eventSource = new EventSource(url);
		eventSource.onmessage = (e) => {
			console.log("Message", e);
			console.log(JSON.parse(e.data));
			setMessages((prev) => [...prev, JSON.parse(e.data)]);
		};

		return () => {
			eventSource.close();
		};
	}, [messages]);

	const handleMessage = async (e) => {
		e.preventDefault();
		try {
			const { data: test } = await axiosJWT.post(messagesRoute, {
				message: chatMessage,
				userId: `/api/users/${userId}`,
				game: `/api/games/${gameId}`,
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{!chatOpen ? (
				<div className="chatIcon">
					<BsFillChatLeftDotsFill onClick={() => setChatOpen(true)} />
				</div>
			) : (
				<div className="messageContainer">
					{messages &&
						messages.map((message) => (
							<p
								key={message.id}
								className={message.userId.id === userId ? "me" : "other"}
							>
								{message.message}
							</p>
						))}
					<form onSubmit={handleMessage}>
						<input
							type="text"
							value={chatMessage}
							onChange={(e) => setChatMessage(e.target.value)}
						/>
						<button type="submit">Envoyer</button>
					</form>
				</div>
			)}
		</>
	);
};

export default Message;
