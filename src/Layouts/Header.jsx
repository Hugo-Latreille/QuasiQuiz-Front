import logo from "../assets/logo-full.svg";
import "./_header.scss";
import Button from "../Components/Button/Button";
import { Link, useLocation } from "react-router-dom";
import { useContext, useRef } from "react";
import { UserContext } from "../App";
import axios, { logoutToken, usersRoute } from "../utils/axios";
import useAxiosJWT from "../utils/useAxiosJWT";
import { useEffect } from "react";

const Header = () => {
	const location = useLocation();
	const { user, removeUser } = useContext(UserContext);
	const axiosJWT = useAxiosJWT();
	const dropDown = useRef(null);

	//** callback pour le dropdown */
	const dropdownFunc = () => {
		dropDown.current.classList.toggle("show");
	};
	// ** Désactiver le dropdown en cliquant n'importe où sur l'écran */

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropDown.current && !event.target.matches(".dropbtn")) {
				if (dropDown.current.classList.contains("show")) {
					dropDown.current.classList.remove("show");
				}
			}
		};
		document.addEventListener("click", handleClickOutside);
	}, [dropDown]);

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

				{!user.token ? (
					<Link
						className="link-mod"
						to="login"
						state={{ background: location }}
					>
						<Button label="Connexion" />
					</Link>
				) : (
					<div className="dropdown">
						<img
							onClick={dropdownFunc}
							src="https://picsum.photos/200"
							className="dropbtn"
						></img>
						<div id="myDropdown" className="dropdown-content" ref={dropDown}>
							<div className="list">
								<a href="#" className="profile">
									Profile
								</a>
								<a href="#" className="logout">
									Déconnexion
								</a>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Header;
