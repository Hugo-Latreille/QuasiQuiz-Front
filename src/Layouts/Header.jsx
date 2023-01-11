import logo from "../assets/logo-full.svg";
import "./_header.scss";
import Button from "../Components/Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import { UserContext } from "../App";
import axios, {
	gameHasUsersRoute,
	gamesRoute,
	logoutToken,
	usersRoute,
} from "../utils/axios";
import useAxiosJWT from "../utils/useAxiosJWT";
import { useEffect } from "react";
import { useState } from "react";
import { Skeleton } from "@mui/material";

const Header = ({ gameId, players }) => {
	const location = useLocation();
	const { user, removeUser } = useContext(UserContext);
	const axiosJWT = useAxiosJWT();
	const dropDown = useRef(null);
	const [avatar, setAvatar] = useState(null);
	const navigate = useNavigate();

	//TODO récup game id props
	//TODO uniquement si un seul joueur dans la game, supp gameHasUser + patch game is closed
	//! quand plusieurs joueurs lobby ? celui qui reste devient GM

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

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();
		const loadUser = async () => {
			try {
				if (user.token) {
					const { data: userData } = await axiosJWT.get(
						`${usersRoute}?email=${user.email}`,
						{
							headers: { Authorization: `Bearer ${user.token}` },
							signal: controller.signal,
						}
					);
					if (isMounted && userData) {
						setAvatar(userData["hydra:member"][0].avatar);
					}
				}
			} catch (error) {
				console.log(error);
			}
		};

		loadUser();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	const handleLogout = async () => {
		const { data: userData } = await axiosJWT.get(
			`${usersRoute}?email=${user.email}`,
			{
				headers: { Authorization: `Bearer ${user.token}` },
			}
		);
		const userId = userData["hydra:member"][0].id;

		const { data: userInThisGame } = await axiosJWT.get(
			`${gameHasUsersRoute}?game=${gameId}&userId=${userId}`
		);
		const isGameMaster = userInThisGame["hydra:member"][0].is_game_master;
		const userInGameId = userInThisGame["hydra:member"][0].id;

		const { data: usersInThisGame } = await axiosJWT.get(
			`${gameHasUsersRoute}?game=${gameId}`
		);

		await axiosJWT.delete(`${gameHasUsersRoute}/${userInGameId}`);
		await axiosJWT.patch(
			`${usersRoute}/${userId}`,
			{
				isReady: false,
			},
			{ headers: { "Content-Type": "application/merge-patch+json" } }
		);

		if (usersInThisGame["hydra:member"].length === 1 && gameId) {
			await axiosJWT.patch(
				`${gamesRoute}/${gameId}`,
				{
					isOpen: false,
				},
				{ headers: { "Content-Type": "application/merge-patch+json" } }
			);
		} else {
			if (isGameMaster && gameId) {
				const { data: newGM } = await axiosJWT.get(
					`${gameHasUsersRoute}?game=${gameId}&userId=${players[0].id}`
				);

				await axiosJWT.patch(
					`${gameHasUsersRoute}/${newGM["hydra:member"][0].id}`,
					{
						isGameMaster: true,
					},
					{ headers: { "Content-Type": "application/merge-patch+json" } }
				);
			}
		}

		await axios.get(logoutToken);
		removeUser();
	};

	const handleProfile = () => {
		navigate("/profil");
	};

	return (
		<>
			<div className="header">
				<Link to="/lobby">
					<img src={logo} alt="logoQuasiQuiz" className="logo" />
				</Link>

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
						{avatar ? (
							<img
								onClick={dropdownFunc}
								src={`data:image/svg+xml;base64,${avatar}`}
								className="dropbtn"
							></img>
						) : (
							<Skeleton variant="circular" width={40} height={40} />
						)}

						<div id="myDropdown" className="dropdown-content" ref={dropDown}>
							<div className="list">
								<p className="profile" onClick={handleProfile}>
									Profil
								</p>
								<p className="logout" onClick={handleLogout}>
									Déconnexion
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Header;
