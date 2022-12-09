import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";
import "./_lobby.scss";
import { useContext, useEffect } from "react";
import useAxiosJWT from "../../utils/useAxiosJWT";
import { gameHasUsersRoute, gamesRoute, usersRoute } from "../../utils/axios";
import { UserContext } from "../../App";

const Lobby = () => {
	const axiosJWT = useAxiosJWT();
	const { user } = useContext(UserContext);

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		// - Si une game est ouverte, et qu'il n'en fait pas déjà partie, on ajoute l'utilisateur à cette game

		const isGameOpen = async () => {
			try {
				const { data: userData } = await axiosJWT.get(
					`${usersRoute}?email=${user.email}`,
					{
						headers: { "Authorization": `Bearer ${user.token}` },
					}
				);
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
					const gameId = data["hydra:member"][0].id;
					console.log(thisGame.gameHasUsers);

					// On vérifie si game_has_user ne contient pas déjà l'utilisateur pour la partie en cours
					const isUserAlreadyGame = thisGame.gameHasUsers
						.map((gameHasUser) =>
							gameHasUser.userId.includes(`api/users/${userId}`)
						)
						.some((value) => value === true);
					console.log(isUserAlreadyGame);

					//Si l'utilisateur n'est pas dans game existante, on l'ajoute
					if (!isUserAlreadyGame) {
						const { data: addUserInGame } = await axiosJWT.post(
							gameHasUsersRoute,
							{
								game: `/api/games/${gameId}`,
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

	//* 3-si GM, affichage bouton partie et lancement, le game devient fermé, on appelle la route générant les questions, pour les autres joueurs, bouton "rejoindre la partie"

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
							<div className="gamer-img"></div>
							<h3>Pseudo</h3>
						</div>
					</div>
					<div className="gamer-box">
						<h4>Joueur présents :</h4>
						<div className="gc-grid">
							<div className="gamer-card">
								<div className="gamer-img"></div>
								<h3>Pseudo</h3>
							</div>
							<div className="gamer-card ">
								<div className="gamer-img user"></div>
								<h3>Pseudo</h3>
							</div>
							<div className="gamer-card">
								<div className="gamer-img"></div>
								<h3>Pseudo</h3>
							</div>
							<div className="gamer-card">
								<div className="gamer-img"></div>
								<h3>Pseudo</h3>
							</div>
							<div className="gamer-card">
								<div className="gamer-img"></div>
								<h3>Pseudo</h3>
							</div>
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
