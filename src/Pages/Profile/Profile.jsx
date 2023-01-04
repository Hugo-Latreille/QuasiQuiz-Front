import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";
import Button from "../../Components/Button/Button";
import { MdEdit } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import { Buffer } from "buffer";
import "./_profile.scss";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import {
	axiosJWT,
	gameHasUsersRoute,
	usersRoute,
	multiAvatarRoute,
	multiAvatarAPIKey,
} from "../../utils/axios";
import { Link, Outlet, useLocation } from "react-router-dom";
import { DateTime } from "luxon";
import axios from "axios";

const Profile = () => {
	const location = useLocation();
	const { user } = useContext(UserContext);
	const [userData, setUserData] = useState(null);
	const [userGames, setUserGames] = useState(null);
	const [editPseudo, setEditPseudo] = useState(false);
	const [pseudo, setPseudo] = useState("");
	const [avatar, setAvatar] = useState(null);
	const [avatars, setAvatars] = useState(null);
	const [editAvatar, setEditAvatar] = useState(false);

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const userData = async () => {
			try {
				const { data: userData } = await axiosJWT.get(
					`${usersRoute}?email=${user.email}`,
					{
						headers: { Authorization: `Bearer ${user.token}` },
						signal: controller.signal,
					}
				);
				if (isMounted && userData) {
					setUserData(userData["hydra:member"][0]);
					setPseudo(userData["hydra:member"][0].pseudo);
					setAvatar(userData["hydra:member"][0].avatar);
					// console.log(userData["hydra:member"][0]);
					const userId = userData["hydra:member"][0].id;

					const { data: userGames } = await axiosJWT.get(
						`${gameHasUsersRoute}?userId=${userId}`
					);
					if (userGames) {
						setUserGames(userGames["hydra:member"]);
						// console.log(userGames["hydra:member"]);
					}
				}
				// const {data:userHistory}
			} catch (error) {
				console.log(error);
			}
		};

		userData();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	const handlePseudo = async () => {
		try {
			await axiosJWT.patch(
				`${usersRoute}/${userData.id}`,
				{
					pseudo: pseudo,
				},
				{ headers: { "Content-Type": "application/merge-patch+json" } }
			);

			setEditPseudo(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const getAvatars = async () => {
			const data = [];
			for (let i = 0; i < 4; i++) {
				const image = await axios.get(
					`${multiAvatarRoute}/${Math.round(
						Math.random() * 1000
					)}?apikey=${multiAvatarAPIKey}`
				);
				const buffer = Buffer.from(image.data);
				data.push(buffer.toString("base64"));
			}
			setAvatars(data);
		};
		getAvatars();
	}, []);

	const handleAvatar = async (index) => {
		try {
			await axiosJWT.patch(
				`${usersRoute}/${userData.id}`,
				{
					avatar: avatars[index],
				},
				{ headers: { "Content-Type": "application/merge-patch+json" } }
			);
			setAvatar(avatars[index]);
			setEditAvatar(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Header />
			{userData && (
				<main>
					<div className="profile-content">
						<div className="avatar">
							{editAvatar ? (
								<div className="avatarContainer">
									<div className="title-container">
										<h1>Choisissez votre avatar</h1>
									</div>
									<div className="avatars">
										{avatars?.map((avatar, index) => {
											return (
												<div key={index} className="avatar">
													<img
														src={`data:image/svg+xml;base64,${avatar}`}
														alt="avatar"
														key={avatar}
														onClick={() => handleAvatar(index)}
													/>
												</div>
											);
										})}
									</div>
								</div>
							) : (
								<>
									<img src={`data:image/svg+xml;base64,${avatar}`} alt="" />
									<MdEdit
										className="edit"
										onClick={() => setEditAvatar(true)}
									/>
								</>
							)}
						</div>
						<div className="profile-info">
							{editPseudo ? (
								<div className="profile-info__edit">
									<input
										className="pseudoEdit"
										type="text"
										value={pseudo}
										onChange={(e) => setPseudo(e.target.value)}
									/>
									<AiOutlineCheck
										className="pseudoEditCheck"
										onClick={handlePseudo}
									/>
								</div>
							) : (
								<h1 className="pseudo">
									{pseudo}
									<MdEdit
										onClick={() => setEditPseudo(true)}
										className="edit"
									/>
								</h1>
							)}

							<p>{userData.email}</p>

							<Link
								className="link-mod"
								to={`/password/${userData.id}`}
								state={{ background: location }}
							>
								<Button label="Changer le mdp" />
							</Link>
						</div>

						<div className="parties">
							<h3>Historique :</h3>
							{userGames &&
								userGames
									.filter((game) => game.game.is_corrected)
									.map((game) => (
										<div className="party" key={game.id}>
											<Link to={`/palmares/${game.game.id}`} className="date">
												{DateTime.fromISO(`${game.game.created_at}`)
													.setLocale("fr")
													.toLocaleString(DateTime.DATETIME_MED)}
											</Link>
										</div>
									))}
						</div>
					</div>
				</main>
			)}
			<Footer />
			<Outlet />
		</>
	);
};

export default Profile;
