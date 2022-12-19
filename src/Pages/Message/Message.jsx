import React, { useEffect } from "react";
import { host, mercureHubUrl, messagesRoute } from "../../utils/axios";
import useAxiosJWT from "../../utils/useAxiosJWT";

const Message = () => {
	const axiosJWT = useAxiosJWT();

	const handleTest = async () => {
		const { data: test } = await axiosJWT.post(messagesRoute, {
			message: "coucou",
			userId: `/api/users/5`,
			game: `/api/games/7`,
		});
		console.log(test);
	};

	const url = new URL(mercureHubUrl);
	url.searchParams.append("topic", `${host}${messagesRoute}/{id}`);
	const eventSource = new EventSource(url);
	eventSource.onmessage = (e) => console.log(JSON.parse(e.data));

	//https://localhost:8000/api/messages/{id}

	return <button onClick={handleTest}>TEST</button>;
};

export default Message;
