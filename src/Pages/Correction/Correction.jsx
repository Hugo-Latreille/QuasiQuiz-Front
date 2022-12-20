import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";
import "./_correction.scss";
import { useNavigate, useParams } from "react-router-dom";
import {
	axiosJWT,
	gameHasUsersRoute,
	gameQuestions,
	gamesRoute,
	host,
	mercureHubUrl,
	scoresRoute,
	userAnswersRoute,
	usersRoute,
} from "../../utils/axios";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../App";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import Button from "../../Components/Button/Button";

const Correction = () => {
	const navigate = useNavigate();
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
	const [isTrue, setIsTrue] = useState(null);
	const trueRef = useRef(null);
	const falseRef = useRef(null);
	const isLastQuestion = selectedQuestion === questions?.length;
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
	}, [thisQuestionAnswers, selectedQuestionAnswer]);

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

	const isUserGameMaster = () => {
		return users?.filter(
			(thisUser) =>
				thisUser.is_game_master === true && thisUser.userId.email === user.email
		).length === 1
			? true
			: false;
	};

	useEffect(() => {
		const url = new URL(mercureHubUrl);
		url.searchParams.append("topic", `${host}${userAnswersRoute}/{id}`);
		url.searchParams.append("topic", `${host}${scoresRoute}/{id}`);
		const eventSource = new EventSource(url);
		eventSource.onmessage = (e) => {
			console.log("userAnswer", JSON.parse(e.data));
			const data = JSON.parse(e.data);
			if (!isUserGameMaster()) {
				if (data["@context"].includes("UserAnswer")) {
					if (data.is_true === true) {
						falseRef.current.classList.remove("false__active");
						trueRef.current.classList.add("true__active");
					} else {
						trueRef.current.classList.remove("true__active");
						falseRef.current.classList.add("false__active");
					}
				}
				//! si le score évolue, on passe question suivante etc.
				if (data["@context"].includes("Score")) {
					console.log("SCORE EVENT");
					console.log(thisQuestionAnswers?.length);
					console.log(isLastAnswer);
					falseRef.current.classList.remove("false__active");
					trueRef.current.classList.remove("true__active");
					if (!isLastAnswer) {
						return setSelectedQuestionAnswer((prev) => prev + 1);
					}
					if (isLastQuestion) {
						return console.log("fin des réponses");
					}
					setSelectedQuestionAnswer(0);
					setSelectedQuestion((prev) => prev + 1);
				}
			}
		};
		return () => {
			eventSource.close();
		};
	}, [thisQuestionAnswers]);

	// const handleNext = async () => {
	// 	if (isTrue === null) return;
	// 	if (isTrue === false) {
	// 		try {
	// 			await axiosJWT.patch(
	// 				`${userAnswersRoute}/${thisQuestionAnswer.id}`,
	// 				{
	// 					isTrue: false,
	// 				},
	// 				{
	// 					headers: { "Content-Type": "application/merge-patch+json" },
	// 				}
	// 			);
	// 			// console.log("patch", patchUser);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	}

	// 	if (isTrue) {
	// 		try {
	// 			await axiosJWT.patch(
	// 				`${userAnswersRoute}/${thisQuestionAnswer.id}`,
	// 				{
	// 					isTrue: true,
	// 				},
	// 				{
	// 					headers: { "Content-Type": "application/merge-patch+json" },
	// 				}
	// 			);

	// 			const { data: userScore } = await axiosJWT.get(
	// 				`${scoresRoute}?game=${gameId}&userId=${thisQuestionAnswer.userId.id}`
	// 			);
	// 			// console.log(userScore);
	// 			if (userScore["hydra:member"].length === 0) {
	// 				const { data: userScore } = await axiosJWT.post(scoresRoute, {
	// 					game: `/api/games/${thisQuestion.game.id}`,
	// 					userId: `/api/users/${thisQuestionAnswer.userId.id}`,
	// 					score: thisQuestion.question.level,
	// 				});
	// 				console.log(userScore);
	// 			}
	// 			//sinon patch le score
	// 			await axiosJWT.patch(
	// 				`${scoresRoute}/${userScore["hydra:member"][0].id}`,
	// 				{
	// 					score:
	// 						userScore["hydra:member"][0].score + thisQuestion.question.level,
	// 				},
	// 				{
	// 					headers: { "Content-Type": "application/merge-patch+json" },
	// 				}
	// 			);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	}
	// 	falseRef.current.classList.remove("false__active");
	// 	trueRef.current.classList.remove("true__active");
	// 	console.log(isLastQuestion);
	// 	if (!isLastAnswer) {
	// 		return setSelectedQuestionAnswer((prev) => prev + 1);
	// 	}
	// 	if (isLastQuestion) {
	// 		return console.log("fin des réponses");
	// 	}
	// 	setSelectedQuestionAnswer(0);
	// 	setSelectedQuestion((prev) => prev + 1);
	// };

	const handleNext = async () => {
		if (isTrue === null) return;

		if (isTrue) {
			try {
				const { data: userScore } = await axiosJWT.get(
					`${scoresRoute}?game=${gameId}&userId=${thisQuestionAnswer.userId.id}`
				);
				// console.log(userScore);
				if (userScore["hydra:member"].length === 0) {
					const { data: userScore } = await axiosJWT.post(scoresRoute, {
						game: `/api/games/${thisQuestion.game.id}`,
						userId: `/api/users/${thisQuestionAnswer.userId.id}`,
						score: thisQuestion.question.level,
					});
					console.log(userScore);
				}
				//sinon patch le score
				await axiosJWT.patch(
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
		}
		if (isTrue === false) {
			try {
				const { data: userScore } = await axiosJWT.get(
					`${scoresRoute}?game=${gameId}&userId=${thisQuestionAnswer.userId.id}`
				);
				// console.log(userScore);
				if (userScore["hydra:member"].length === 0) {
					const { data: userScore } = await axiosJWT.post(scoresRoute, {
						game: `/api/games/${thisQuestion.game.id}`,
						userId: `/api/users/${thisQuestionAnswer.userId.id}`,
						score: 0,
					});
					console.log(userScore);
				}
				//sinon patch le score
				await axiosJWT.patch(
					`${scoresRoute}/${userScore["hydra:member"][0].id}`,
					{
						score: userScore["hydra:member"][0].score + 0,
					},
					{
						headers: { "Content-Type": "application/merge-patch+json" },
					}
				);
			} catch (error) {
				console.log(error);
			}
		}

		if (isUserGameMaster()) {
			falseRef.current.classList.remove("false__active");
			trueRef.current.classList.remove("true__active");
			console.log(isLastQuestion);
			if (!isLastAnswer) {
				return setSelectedQuestionAnswer((prev) => prev + 1);
			}
			if (isLastQuestion) {
				return console.log("fin des réponses");
			}
			setSelectedQuestionAnswer(0);
			setSelectedQuestion((prev) => prev + 1);
		}
	};

	const handleTrue = async () => {
		try {
			await axiosJWT.patch(
				`${userAnswersRoute}/${thisQuestionAnswer.id}`,
				{
					isTrue: true,
				},
				{
					headers: { "Content-Type": "application/merge-patch+json" },
				}
			);
			falseRef.current.classList.remove("false__active");
			trueRef.current.classList.add("true__active");
			setIsTrue(true);
		} catch (error) {
			console.log(error);
		}
	};

	const handleFalse = async () => {
		try {
			trueRef.current.classList.remove("true__active");
			falseRef.current.classList.add("false__active");
			await axiosJWT.patch(
				`${userAnswersRoute}/${thisQuestionAnswer.id}`,
				{
					isTrue: false,
				},
				{
					headers: { "Content-Type": "application/merge-patch+json" },
				}
			);
			setIsTrue(false);
			// console.log("patch", patchUser);
		} catch (error) {
			console.log(error);
		}
	};

	const handleEndCorrection = async () => {
		try {
			await axiosJWT.patch(
				`${gamesRoute}/${gameId}`,
				{ isCorrected: true },
				{ headers: { "Content-Type": "application/merge-patch+json" } }
			);
			navigate(`/palmares/${gameId}`);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Header />
			<main>
				{!isLastQuestion ? (
					<>
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

									{isUserGameMaster() ? (
										<div className="true-false-next">
											<button
												className="true"
												onClick={handleTrue}
												ref={trueRef}
											>
												Vrai
											</button>
											<button className="next" onClick={handleNext}>
												Suivant
											</button>
											<button
												className="false"
												onClick={handleFalse}
												ref={falseRef}
											>
												Faux
											</button>
										</div>
									) : (
										<div className="true-false-next">
											<button className="true" ref={trueRef}>
												Vrai
											</button>

											<button className="false" ref={falseRef}>
												Faux
											</button>
										</div>
									)}
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
					</>
				) : (
					<Button
						label={"Valider la correction"}
						onClick={handleEndCorrection}
					/>
				)}
			</main>
			<Footer />
		</>
	);
};

export default Correction;
