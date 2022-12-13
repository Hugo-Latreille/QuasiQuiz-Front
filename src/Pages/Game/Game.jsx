import "./_game.scss";
import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";
import { axiosJWT, gameQuestions } from "../../utils/axios";
import { useEffect, useState } from "react";
import Timer from "../../Components/Timer/Timer";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import { useParams } from "react-router-dom";

//? set FOCUS sur le champ de réponse (inputRef.current.focus())
const Game = () => {
	// on récupère gameId des paramètres de la route
	const { gameId } = useParams();
	const [questions, setQuestions] = useState([]);
	const [selectedQuestion, setSelectedQuestion] = useState({});

	// récuperer les questions de cette partie + le temps de chacune + le niveau
	// useEffect(() => {
	// 	let isMounted = true;
	// 	const controller = new AbortController();
	// 	const getQuestions = async () => {
	// 		try {
	// 			const { data: gameQuestion } = await axiosJWT.get(
	// 				`${gameQuestions}?game=${gameId}`,
	// 				{
	// 					signal: controller.signal,
	// 				}
	// 			);
	// 			if (isMounted && gameQuestion) {
	// 				console.log(gameQuestion);
	// 				setQuestions(gameQuestion["hydra:member"]);
	// 			}
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	};
	// 	getQuestions();

	// 	return () => {
	// 		isMounted = false;
	// 		controller.abort();
	// 	};
	// }, [gameId]);

	return (
		<>
			<Header />
			<main>
				<div className="game-content">
					{/* <div className="timer">
						<p>30 s</p>
					</div> */}
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
					<ProgressBar level={2} progress={50} />
					{/* <div className="lvl-box">
						<div className="lvl-border">
							<div className="lvl-content"></div>
						</div>
					</div> */}
				</div>
			</main>
			<Footer />
		</>
	);
};

export default Game;
