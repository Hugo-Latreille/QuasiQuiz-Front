import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";
import "./_correction.scss";
import { useParams } from "react-router-dom";
import {
	axiosJWT,
	gameHasUsersRoute,
	gameQuestions,
	scoresRoute,
	userAnswersRoute,
	usersRoute,
} from "../../utils/axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";

//TODO Une fois terminé, PATCH /api/game/gameId is_corrected = true
//TODO bouton "afficher les résultats" pour GM, autres utilisateurs sur page "Correction en cours" get api/game/gameID -> bouton s'affiche quand is_corrected = true
//!ajout css click boutons

const Correction = () => {
	const { gameId } = useParams();
	const { user } = useContext(UserContext);
	const [userId, setUserId] = useState(null);
	const [users, setUsers] = useState(null);
	const [questions, setQuestions] = useState([]);
	const [selectedQuestion, setSelectedQuestion] = useState(0);
	const [thisQuestion, setThisQuestion] = useState(null);
	const [thisQuestionAnswers, setThisQuestionAnswers] = useState(null);
	const [thisQuestionAnswer, setThisQuestionAnswer] = useState(null);
	const [selectedQuestionAnswer, setSelectedQuestionAnswer] = useState(0);
	const isLastQuestion = selectedQuestion + 1 === questions?.length;
	const isLastAnswer =
		selectedQuestionAnswer + 1 === thisQuestionAnswers?.length;

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();
		const getQuestions = async () => {
			try {
				const { data: userData } = await axiosJWT.get(
					`${usersRoute}?email=${user.email}`,
					{
						signal: controller.signal,
					}
				);
				const userId = userData["hydra:member"][0].id;
				setUserId(userId);

				const { data: gameQuestion } = await axiosJWT.get(
					`${gameQuestions}?game=${gameId}`,
					{
						signal: controller.signal,
					}
				);
				if (isMounted && gameQuestion) {
					console.log(gameQuestion["hydra:member"]);
					setQuestions(gameQuestion["hydra:member"]);
				}
			} catch (error) {
				console.log(error);
			}
		};
		const getUsers = async () => {
			try {
				if (gameId) {
					const { data: usersInGame } = await axiosJWT.get(
						`${gameHasUsersRoute}?game=${gameId}`
					);
					if (usersInGame) {
						console.log(usersInGame["hydra:member"]);
						setUsers(usersInGame["hydra:member"]);
					}
				}
			} catch (error) {
				console.log(error);
			}
		};

		getQuestions();
		getUsers();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [gameId]);
	useEffect(() => {
		questions && setThisQuestion(questions[`${selectedQuestion}`]);
	}, [questions, selectedQuestion]);

	//? Route filtrée : https://localhost:8000/api/user_answers?userId=25&question=44&game=11

	useEffect(() => {
		const getAnswersByQuestion = async () => {
			try {
				if (thisQuestion) {
					const { data: usersAnswers } = await axiosJWT.get(
						`${userAnswersRoute}?question=${thisQuestion.question.id}&game=${gameId}`
					);
					if (usersAnswers) {
						setThisQuestionAnswers(usersAnswers["hydra:member"]);
						console.log(usersAnswers["hydra:member"]);
					}
				}
			} catch (error) {
				console.log(error);
			}
		};
		getAnswersByQuestion();
	}, [thisQuestion]);

	useEffect(() => {
		thisQuestionAnswers &&
			setThisQuestionAnswer(thisQuestionAnswers[`${selectedQuestionAnswer}`]);
	}, [thisQuestionAnswers]);

	const progressBarCalc = () => {
		const result = ((selectedQuestion + 1) / questions.length) * 100;
		return result;
	};

	const getParseMedia = () => {
		if (thisQuestion.question.media.length > 0) {
			const media = thisQuestion.question.media[0].contentUrl;
			if (media.includes("mp4")) {
				return (
					<video width="750" height="500" controls autoPlay muted>
						<source src={media} type="video/mp4" />
					</video>
				);
			} else if (media.includes("png")) {
				return <img src={media} alt="image" />;
			}
		}
		return;
	};

	//TODO revoir la logique : validation au click sur suivant, si vrai alors useState true, si faux alors false !!!!!!!!!

	const handleNext = () => {
		if (!isLastAnswer) {
			return setSelectedQuestionAnswer((prev) => prev + 1);
		}
		if (isLastQuestion) {
			return console.log("fin des réponses");
		}
		setSelectedQuestion((prev) => prev + 1);
	};

	const handleTrue = async () => {
		//patch useranswer istrue = true
		//vérifier si première bonne réponse (avec filtre userAnswers), si oui post score, sinon, patch score, on fetch score actuel et on incrémente
		// https://localhost:8000/api/scores?order[score]=asc&game=25
		try {
			const { data: patchUser } = await axiosJWT.patch(
				`${userAnswersRoute}/${thisQuestionAnswer.id}`,
				{
					isTrue: true,
				},
				{
					headers: { "Content-Type": "application/merge-patch+json" },
				}
			);
			console.log("patch", patchUser);

			const { data: userScore } = await axiosJWT.get(
				`${scoresRoute}?game=${gameId}&userId=${thisQuestionAnswer.userId.id}`
			);
			console.log(userScore);
			if (userScore["hydra:member"].length === 0) {
				const { data: userScore } = await axiosJWT.post(scoresRoute, {
					game: `/api/games/${thisQuestion.game.id}`,
					userId: `/api/users/${thisQuestionAnswer.userId.id}`,
					score: thisQuestion.question.level,
				});
				console.log(userScore);
			}
			//sinon patch le score
			const { data: updateScore } = await axiosJWT.patch(
				`${scoresRoute}/${userScore["hydra:member"][0].id}`,
				{
					score:
						userScore["hydra:member"][0].score + thisQuestion.question.level,
				},
				{
					headers: { "Content-Type": "application/merge-patch+json" },
				}
			);
		} catch (error) {
			console.log(error);
		}
	};

	const handleFalse = async () => {
		try {
			const { data: patchUser } = await axiosJWT.patch(
				`${userAnswersRoute}/${thisQuestionAnswer.id}`,
				{
					isTrue: false,
				},
				{
					headers: { "Content-Type": "application/merge-patch+json" },
				}
			);
			// console.log("patch", patchUser);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Header />
			<main>
				{thisQuestion && (
					<div className="game-content">
						<div className="game-box">
							<div className="media">{getParseMedia()}</div>
							<div className="question">
								<p>{thisQuestion.question.question}</p>
							</div>
							{thisQuestionAnswer && (
								<>
									<div className="answer">
										<div className="good-answer">
											<p>Réponse attendue :</p>
											<p>{thisQuestion.question.answer.answer}</p>
										</div>
										<div className="gamer-answer">
											<p>{thisQuestionAnswer.answer}</p>
										</div>
									</div>
									<div className="gamer-pseudo">
										<p>{thisQuestionAnswer.userId.pseudo}</p>
										<img
											className="avatar"
											src={`data:image/svg+xml;base64,${thisQuestionAnswer.userId.avatar}`}
											alt=""
										/>
									</div>
								</>
							)}

							<div className="true-false-next">
								<button className="true" onClick={handleTrue}>
									Vrai
								</button>
								<button className="next" onClick={handleNext}>
									Suivant
								</button>
								<button className="false" onClick={handleFalse}>
									Faux
								</button>
							</div>
						</div>
						<ProgressBar
							level={thisQuestion.question.level}
							progress={progressBarCalc()}
						/>
						{/* <div className="progressbar-box">
							<div className="lvl-border">
								<div className="lvl-content"></div>
							</div>
						</div> */}
					</div>
				)}
			</main>
			<Footer />
		</>
	);
};

export default Correction;
