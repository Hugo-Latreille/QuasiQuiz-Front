import { Link } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useEffect } from "react";

const AuthTest = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [users, setUsers] = useState({});

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();
		const getUsers = async () => {
			try {
				const { data } = await axios.get("https://localhost:8000/api/users", {
					signal: controller.signal,
				});
				if (data) {
					isMounted && setIsLoading(false);
				}
				setUsers(data["hydra:member"]);
			} catch (error) {
				console.log(error);
			}
		};
		getUsers();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	const { removeUser } = useContext(UserContext);

	const handleLogout = async () => {
		// await axios.get("https://localhost:8000/api/token/invalidate");
		removeUser();
	};

	return (
		<div>
			{isLoading && <p>Loading...</p>}
			{!isLoading && users?.map((user) => <p key={user.id}>{user.pseudo}</p>)}
			<Link to="/test">Back to Welcome</Link>
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
};
export default AuthTest;
