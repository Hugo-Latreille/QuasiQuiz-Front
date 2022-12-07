import { useContext } from "react";
import axios from "../api/axios";
import { UserContext } from "../App";
import { refreshTokenRoute } from "./apiRoutes";

const useRefreshToken = () => {
	const { user, refreshToken } = useContext(UserContext);

	const refresh = async () => {
		const response = await axios.get(refreshTokenRoute, {
			withCredentials: true,
		});
		console.log(response);
		// refreshToken();
		return response.data.accessToken;
	};
	return refresh;
};

export default useRefreshToken;
