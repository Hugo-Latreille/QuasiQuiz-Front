import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";
import "./_lobby.scss";
import { useContext, useEffect } from "react";
import useAxiosJWT from "../../utils/useAxiosJWT";
import { gameHasUsersRoute, gamesRoute, usersRoute } from "../../utils/axios";
import { UserContext } from "../../App";
import { useState } from "react";

const Lobby = () => {
	const axiosJWT = useAxiosJWT();
	const { user } = useContext(UserContext);
	// const [userPicture, setUserPicture] = useState(null);
	const [gameId, setGameId] = useState(null);
	const [otherUsers, setOtherUsers] = useState(null);

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const isGameOpen = async () => {
			try {
				const { data: userData } = await axiosJWT.get(
					`${usersRoute}?email=${user.email}`,
					{
						headers: { "Authorization": `Bearer ${user.token}` },
					}
				);
				// setUserPicture(userData["hydra:member"][0].avatar);
				const userId = userData["hydra:member"][0].id;

				const { data } = await axiosJWT.get(`${gamesRoute}?is_open=true`, {
					signal: controller.signal,
				});
				if (isMounted && data) {
					if (data["hydra:member"].length === 0) {
						// si pas de partie, on en créé une,  is_open true, et on y ajoute l'utilisateur en tant que MJ

						const { data: newGame } = await axiosJWT.post(gamesRoute, {
							isOpen: true,
						});

						await axiosJWT.post(gameHasUsersRoute, {
							game: `/api/games/${newGame.id}`,
							userId: `/api/users/${userId}`,
							isGameMaster: true,
						});

						return console.log("Partie créée");
					}
					const thisGame = data["hydra:member"][0];
					setGameId(data["hydra:member"][0].id);

					// - Si une game est ouverte, et qu'il n'en fait pas déjà partie, on ajoute l'utilisateur à cette game
					// On vérifie si game_has_user ne contient pas déjà l'utilisateur pour la partie en cours
					const isUserAlreadyGame = thisGame.gameHasUsers
						.map((gameHasUser) =>
							gameHasUser.userId.includes(`api/users/${userId}`)
						)
						.some((value) => value === true);
					console.log("isUserAlreadyGame?", isUserAlreadyGame);

					//Si l'utilisateur n'est pas dans game existante, on l'ajoute
					if (!isUserAlreadyGame) {
						const { data: addUserInGame } = await axiosJWT.post(
							gameHasUsersRoute,
							{
								game: `/api/games/${data["hydra:member"][0].id}`,
								userId: `/api/users/${userId}`,
								isGameMaster: false,
							}
						);
						return console.log(addUserInGame);
					}
				}
			} catch (error) {
				console.log(error);
			}
		};
		isGameOpen();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	//! 4- on récupère tous les utilisateurs de GHU pour cette partie, on stock pseudo/img/MJ, on map pour afficher

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();
		const getGameUsers = async () => {
			try {
				if (gameId) {
					const { data: usersInGame } = await axiosJWT.get(
						`${gameHasUsersRoute}?game=${gameId}`,
						{
							signal: controller.signal,
						}
					);
					if (isMounted && usersInGame) {
						const allGameUsers = usersInGame["hydra:member"];

						const allOtherUsers = allGameUsers
							// ?.filter((gameUser) => gameUser.userId.email !== user.email)
							.map((user) => ({
								id: user.userId.id,
								pseudo: user.userId.pseudo,
								avatar: user.userId.avatar,
								email: user.userId.email,
								isGameMaster: user.is_game_master,
							}));

						console.log(allOtherUsers);
						setOtherUsers(allOtherUsers);
					}
				}
			} catch (error) {
				console.log(error);
			}
		};
		getGameUsers();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [gameId]);

	//! 3-si GM, affichage bouton partie et lancement, le game devient fermé, on appelle la route générant les questions, navigate vers question / pour les autres joueurs, bouton "rejoindre la partie"

	return (
		<>
			<Header />
			<div className="lobby-content">
				<div className="lobby-title">
					<h1>La partie va bientôt commencer !</h1>
				</div>
				<div className="lobby-gamer">
					<div className="gm-box">
						<h4>Vous lui devez allégeance !</h4>
						<div className="gm-card">
							<div className="gamer-img">
								{otherUsers &&
									otherUsers
										?.filter((otherUser) => otherUser.isGameMaster === true)
										.map((otherUser) => (
											<img
												key={otherUser.id}
												src={`data:image/svg+xml;base64,${otherUser.avatar}`}
												alt=""
											/>
										))}
							</div>
							<h3>Pseudo</h3>
						</div>
					</div>
					<div className="gamer-box">
						<h4>Joueur présents :</h4>
						<div className="gc-grid">
							{otherUsers &&
								otherUsers
									?.filter((otherUser) => otherUser.isGameMaster === false)
									.map((otherUser) => (
										<div key={otherUser?.id} className="gamer-card">
											<div
												className={
													otherUser.email === user.email
														? "gamer-img user"
														: "gamer-img"
												}
											>
												<img
													src={`data:image/svg+xml;base64,${otherUser?.avatar}`}
													alt=""
												/>
											</div>
											<h3>{otherUser?.pseudo}</h3>
										</div>
									))}
						</div>
						<div className="legend">
							<ul>
								<li id="gm-color">Le MJ</li>
								<li id="g-color">Les Autres</li>
								<li id="user-color">Vous</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Lobby;
