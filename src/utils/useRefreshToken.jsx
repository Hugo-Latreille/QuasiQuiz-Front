import { useContext } from "react";
import axios, { refreshTokenRoute } from "./../utils/axios.js";
import { UserContext } from "../App";

const useRefreshToken = () => {
	const { refreshToken } = useContext(UserContext);

	const refresh = async () => {
		const { data } = await axios.get(refreshTokenRoute);
		console.log(data);
		refreshToken(data.token);
		return data.token;
	};
	return refresh;
};

export default useRefreshToken;
