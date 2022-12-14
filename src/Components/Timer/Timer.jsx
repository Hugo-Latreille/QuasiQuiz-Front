import { useEffect, useRef, useState } from "react";
import "./timer.scss";

const Timer = ({ time, noMoreTime, setNoMoreTime }) => {
	const [remainingTime, setRemainingTime] = useState(null);
	const timerRef = useRef(null);
	const timerId = useRef();

	useEffect(() => {
		console.log(remainingTime);
		if (remainingTime === 0) {
			console.log("remaintingTIME 0");
			return setNoMoreTime(true);
		}
	}, [remainingTime]);

	const decrementRemainingTime = () => {
		return setRemainingTime((prev) => {
			console.log("PREV", prev);
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

	const setColor = (prev) => {
		if (prev <= 10) {
			timerRef.current.classList.add("warning");
		}
	};

	const startTimer = () => {
		timerId.current = setInterval(decrementRemainingTime, 1000);
	};

	useEffect(() => {
		console.log("ICI", noMoreTime);
		if (!noMoreTime) {
			console.log("TIME", time);
			timerRef.current.setAttribute(
				"style",
				"animation: countdown " + time + "s linear forwards"
			);
			setRemainingTime(time);
			startTimer();

			return () => {
				clearInterval(timerId.current);
			};
		}
		return;
	}, [noMoreTime]);

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
