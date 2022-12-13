import { useEffect, useRef, useState } from "react";
import "./timer.scss";

const Timer = () => {
	const [remainingTime, setRemainingTime] = useState(10);
	const timerRef = useRef(null);
	const timerId = useRef(20);

	console.log(timerId.current);

	const decrementRemainingTime = () => {
		if (remainingTime > 0) {
			setColor();
			return setRemainingTime((prev) => prev - 1);
		}
		clearInterval(timerId.current);
		timerId.current = 0;
		return;
	};

	const setColor = () => {
		if (remainingTime <= 10) {
			timerRef.current.classList.add("warning");
		}
	};

	const startTimer = () => {
		timerId.current = setInterval(decrementRemainingTime, 1000);
	};

	useEffect(() => {
		timerRef.current.setAttribute(
			"style",
			"animation: countdown " + remainingTime + "s linear forwards"
		);
		startTimer();
	}, []);

	return (
		<div className="timer-container">
			<div className="circular-timer">
				<svg>
					<circle ref={timerRef} id="circle" r="40" cx="50" cy="50"></circle>
				</svg>
				<div className="thin-circle"></div>
			</div>
			<div className="timer-text">{remainingTime} s</div>
		</div>
	);
};

export default Timer;
