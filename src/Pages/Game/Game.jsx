import "./_game.scss";
import "./../../Components/Timer/timer.scss";
import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";
import { axiosJWT, gameQuestions } from "../../utils/axios";
import { useEffect, useRef, useState } from "react";
// import Timer from "../../Components/Timer/Timer";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import { useParams } from "react-router-dom";

//? set FOCUS sur le champ de réponse (inputRef.current.focus())
const Game = () => {
	// on récupère gameId des paramètres de la route
	const { gameId } = useParams();
	const [questions, setQuestions] = useState([]);
	const [selectedQuestion, setSelectedQuestion] = useState(0);
	const [noMoreTime, setNoMoreTime] = useState(false);
	const [thisQuestion, setThisQuestion] = useState(null);
	const [remainingTime, setRemainingTime] = useState(null);
	// const [circleCss, setCircleCss] = useState(null);
	const [time, setTime] = useState(null);
	const timerId = useRef();
	const timerRef = useRef(null);

	const isLastQuestion = selectedQuestion === questions.length;
	//!calculer % complétion pour progressBar

	// récuperer les questions de cette partie + le temps de chacune + le niveau
	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();
		const getQuestions = async () => {
			try {
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

	const startTimer = () => {
		timerId.current = setInterval(decrementRemainingTime, 1000);
	};

	useEffect(() => {
		console.log(isLastQuestion);

		if (!noMoreTime && time) {
			if (isLastQuestion) {
				return <p style={{ color: "white" }}>FIN</p>;
			}
			// timerRef.current.classList.add("svgCircle");
			timerRef.current.setAttribute(
				"style",
				"animation: countdown " + time + "s linear forwards"
			);
			setRemainingTime(time);
			console.log(time);
			startTimer();
		}
		if (noMoreTime && selectedQuestion <= questions.length) {
			setNoMoreTime((prev) => !prev);
			setSelectedQuestion((prev) => prev + 1);
			return;
		}
		return () => {
			clearInterval(timerId.current);
			// timerRef.current.removeAttribute("style");
		};
	}, [noMoreTime, time]);

	useEffect(() => {
		if (remainingTime === 0) {
			// timerRef.current.classList.remove("svgCircle");

			return setNoMoreTime(true);
		}
	}, [remainingTime]);

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
						<div className="timer-container">
							<div className="circular-timer">
								<svg>
									<circle
										className="svgCircle"
										ref={timerRef}
										key={time}
										id="circle"
										r="40"
										cx="50"
										cy="50"
									></circle>
								</svg>
								<div className="thin-circle"></div>
							</div>
							<div className="timer-text">{remainingTime} s</div>
						</div>
						<div className="game-box">
							<div className="media">{getParseMedia()}</div>
							<div className="question">
								<p>{thisQuestion.question.question}</p>
							</div>
							<div className="answer">
								<form action="">
									<input type="text" name="" id="" />
								</form>
							</div>
						</div>

						<ProgressBar level={thisQuestion.question.level} progress={50} />
					</div>
				)}
			</main>
			<Footer />
		</>
	);
};

export default Game;
