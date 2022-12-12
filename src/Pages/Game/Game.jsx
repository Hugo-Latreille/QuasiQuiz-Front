import "./_game.scss";
import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";
import { axiosJWT, gameQuestions } from "../../utils/axios";
import { useEffect } from "react";
import Timer from "../../Components/Timer/Timer";

const Game = () => {
	//! récupérer game AVEC PARAMETRES REACT ROUTER
	// récuperer les questions de cette partie + le temps de chacune + le niveau
	// set FOCUS sur le champ de réponse (inputRef.current.focus())
	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();
		const getQuestions = async () => {
			try {
				const { data: gameQuestion } = await axiosJWT.get(
					`${gameQuestions}?game=35`,
					{
						signal: controller.signal,
					}
				);
				if (isMounted && gameQuestion) {
					console.log(gameQuestion);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getQuestions();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	return (
		<>
			<Header />
			<main>
				<div className="game-content">
					<div className="timer">
						<p>30 s</p>
					</div>
					<Timer />
					<div className="game-box">
						<div className="media">
							<img src="https://picsum.photos/300/200" alt="image" />
						</div>
						<div className="question">
							<p>Une question ?</p>
						</div>
						<div className="answer">
							<form action="">
								<input type="text" name="" id="" />
							</form>
						</div>
					</div>
					<div className="lvl-box">
						<div className="lvl-border">
							<div className="lvl-content"></div>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
};

export default Game;
