import React, { useEffect } from "react";
import { messagesRoute } from "../../utils/axios";
import useAxiosJWT from "../../utils/useAxiosJWT";

const Message = () => {
	const axiosJWT = useAxiosJWT();

	useEffect(() => {
		const url = new URL("https://localhost");
		url.searchParams.append("topic", `https://www.localhost:8000/{id}`);
		const eventSource = new EventSource(url);
		console.log(eventSource);
	}, []);

	const handleTest = async () => {
		const { data: test } = await axiosJWT.post(messagesRoute, {
			message: "coucou",
			userId: `/api/users/7`,
			game: `/api/games/5`,
		});
		console.log(test);
	};

	return <button onClick={handleTest}>TEST</button>;
};

export default Message;
