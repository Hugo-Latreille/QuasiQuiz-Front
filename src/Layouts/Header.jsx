import logo from "../assets/logo-full.svg";
import "./_header.scss";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";
import axios, { logoutToken } from "../utils/axios";

const Header = () => {
	const location = useLocation();
	const { user, removeUser } = useContext(UserContext);

	const handleLogout = async () => {
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
