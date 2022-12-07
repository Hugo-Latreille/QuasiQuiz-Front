import { Outlet } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import useRefreshToken from "./useRefreshToken";

const PersistLogin = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { user } = useContext(UserContext);
	const token = user?.token;
	const refresh = useRefreshToken();

	useEffect(() => {
		let isMounted = true;

		const verifyRefreshToken = async () => {
			try {
				await refresh();
			} catch (err) {
				console.error(err);
			} finally {
				isMounted && setIsLoading(false);
			}
		};

		!token ? verifyRefreshToken() : setIsLoading(false);

		return () => (isMounted = false);
	}, []);

	return <>{isLoading ? <p>Loading</p> : <Outlet />}</>;
};
export default PersistLogin;
