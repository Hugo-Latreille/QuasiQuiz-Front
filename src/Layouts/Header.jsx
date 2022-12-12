import logo from "../assets/logo-full.svg";
import "./_header.scss";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";
import axios, { logoutToken, usersRoute } from "../utils/axios";
import useAxiosJWT from "../utils/useAxiosJWT";

const Header = () => {
	const location = useLocation();
	const { user, removeUser } = useContext(UserContext);
	const axiosJWT = useAxiosJWT();

	const handleLogout = async () => {
		const { data: userData } = await axiosJWT.get(
			`${usersRoute}?email=${user.email}`,
			{
				headers: { "Authorization": `Bearer ${user.token}` },
			}
		);
		const userId = userData["hydra:member"][0].id;

		await axiosJWT.patch(
			`${usersRoute}/${userId}`,
			{
				isReady: false,
			},
			{ headers: { "Content-Type": "application/merge-patch+json" } }
		);

		await axios.get(logoutToken);
		removeUser();
	};

	return (
		<>
			<div className="header">
				<img src={logo} alt="logoQuasiQuiz" className="logo" />

				<button className="login-btn">
					<Link
						className="link-mod"
						to="login"
						state={{ background: location }}
					>
						Connexion
					</Link>
				</button>
				{user?.token && (
					<button className="login-btn" onClick={handleLogout}>
						logout
					</button>
				)}
			</div>
		</>
	);
};

export default Header;
