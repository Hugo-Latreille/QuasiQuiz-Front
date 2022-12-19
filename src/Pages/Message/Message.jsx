import React, { useEffect } from "react";
import { messagesRoute } from "../../utils/axios";
import useAxiosJWT from "../../utils/useAxiosJWT";

const Message = () => {
	const axiosJWT = useAxiosJWT();

	const handleTest = async () => {
		const { data: test } = await axiosJWT.post(messagesRoute, {
			message: "coucou",
			userId: `/api/users/7`,
			game: `/api/games/5`,
		});
		console.log(test);
	};

	const url = new URL("https://localhost/.well-known/mercure");
	url.searchParams.append("topic", "https://localhost:8000/api/messages/");
	const eventSource = new EventSource(url);
	eventSource.onmessage = (e) => console.log(e);

	return <button onClick={handleTest}>TEST</button>;
};

export default Message;
