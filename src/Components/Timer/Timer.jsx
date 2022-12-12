import { useEffect, useRef, useState } from "react";
import "./timer.scss";

const Timer = () => {
	const [remainingTime, setRemainingTime] = useState(15);
	const timerRef = useRef(null);

	const decrementRemainingTime = () => {
		if (remainingTime > 0) {
			console.log(remainingTime);
			setRemainingTime((prev) => prev - 1);
			setColor();
		}
		clearInterval(timer);
	};

	const setColor = () => {
		if (remainingTime <= 10) {
			timerRef.current.classList.add("warning");
		}
	};

	const timer = setInterval(decrementRemainingTime, 1000);

	const startTimer = () => {
		return timer;
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
