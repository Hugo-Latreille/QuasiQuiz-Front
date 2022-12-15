import "./_game.scss";
import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";
import {
	axiosJWT,
	gameQuestions,
	userAnswersRoute,
	usersRoute,
} from "../../utils/axios";
import { useContext, useEffect, useRef, useState } from "react";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import { useParams } from "react-router-dom";
import Timer from "../../Components/Timer/Timer";
import { UserContext } from "../../App";

//? set FOCUS sur le champ de réponse (inputRef.current.focus())
const Game = () => {
	// on récupère gameId des paramètres de la route
	const { gameId } = useParams();
	const [questions, setQuestions] = useState([]);
	const [selectedQuestion, setSelectedQuestion] = useState(0);
	const [noMoreTime, setNoMoreTime] = useState(false);
	const [thisQuestion, setThisQuestion] = useState(null);
	const [remainingTime, setRemainingTime] = useState(null);
	const [time, setTime] = useState(null);
	const timerId = useRef();
	const timerRef = useRef(null);
	const inputRef = useRef(null);
	const isLastQuestion = selectedQuestion === questions.length;
	const { user } = useContext(UserContext);
	const [userId, setUserId] = useState(null);
	const [answer, setAnswer] = useState("");

	//!calculer % complétion pour progressBar

	// récuperer les questions de cette partie + le temps de chacune + le niveau
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
		getQuestions();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [gameId]);

	useEffect(() => {
		questions && setThisQuestion(questions[`${selectedQuestion}`]);
	}, [questions, selectedQuestion]);

	useEffect(() => {
		thisQuestion && console.log(thisQuestion);
		thisQuestion && setTime(thisQuestion.question.timer);
	}, [thisQuestion]);

	useEffect(() => {
		const postUserAnswers = async () => {
			await axiosJWT.post(userAnswersRoute, {
				answer: answer,
				userId: `/api/users/${userId}`,
				question: `/api/questions/${thisQuestion.question.id}`,
				game: `/api/games/${gameId}`,
			});
		};

		if (!noMoreTime && time) {
			if (isLastQuestion) {
				return;
			}
			timerRef.current.setAttribute(
				"style",
				"animation: countdown " + time + "s linear forwards"
			);
			inputRef.current.focus();
			setRemainingTime(time);
			startTimer();
		}
		if (noMoreTime && selectedQuestion <= questions.length) {
			// on poste la réponse de l'utilisateur
			postUserAnswers();
			setAnswer("");
			setNoMoreTime((prev) => !prev);
			setSelectedQuestion((prev) => prev + 1);

			return;
		}
		return () => {
			clearInterval(timerId.current);
		};
	}, [noMoreTime, time]);

	useEffect(() => {
		if (remainingTime === 0) {
			return setNoMoreTime(true);
		}
	}, [remainingTime]);

	const startTimer = () => {
		timerId.current = setInterval(decrementRemainingTime, 1000);
	};

	const setColor = (prev) => {
		if (prev <= 10) {
			timerRef.current.classList.add("warning");
		}
	};

	const decrementRemainingTime = () => {
		return setRemainingTime((prev) => {
			if (prev > 0) {
				setColor(prev - 1);
				return prev - 1;
			} else {
				// setNoMoreTime(true);
				clearInterval(timerId.current);
				timerId.current = 0;
				return 0;
			}
		});
	};

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
	return (
		<>
			<Header />
			<main>
				<p style={{ color: "white" }}>{selectedQuestion}</p>
				{thisQuestion && (
					<div className="game-content">
						<Timer
							remainingTime={remainingTime}
							forwardRef={timerRef}
							time={time}
						/>
						<div className="game-box">
							<div className="media">{getParseMedia()}</div>
							<div className="question">
								<p>{thisQuestion.question.question}</p>
							</div>
							<div className="answer">
								<form>
									<input
										ref={inputRef}
										type="text"
										name=""
										value={answer}
										onChange={(e) => setAnswer(e.target.value)}
									/>
								</form>
							</div>
						</div>

						<ProgressBar
							level={thisQuestion.question.level}
							progress={progressBarCalc()}
						/>
					</div>
				)}
				{isLastQuestion && <p> CORRIGER</p>}
			</main>
			<Footer />
		</>
	);
};

export default Game;
