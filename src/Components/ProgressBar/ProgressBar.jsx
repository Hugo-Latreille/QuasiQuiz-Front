import { useEffect, useState } from "react";
import "./progressBar.scss";

const ProgressBar = ({ level, progress }) => {
	const [style, setStyle] = useState({});

	useEffect(() => {
		setTimeout(() => {
			// const newStyle = { ...style, opacity: 1, width: `${progress}%` };

			setStyle((prev) => ({ ...prev, opacity: 1, width: `${progress}%` }));
		}, 200);
	}, [progress]);

	const questionLevel = () => {
		if (level === 1) {
			return `levelOne`;
		} else if (level === 2) {
			return `levelTwo`;
		} else {
			return `levelThree`;
		}
	};

	return (
		<div id="progress">
			<div className="progress-bar">
				<div className="progress-bar__bar">
					<div
						className={`progress-bar__progress ${questionLevel()}`}
						key={progress}
						style={style}
					></div>
					<div className="progressLegend">
						<ul>
							<li className="progressLegend__one">Niveau 1</li>
							<li className="progressLegend__two">Niveau 2</li>
							<li className="progressLegend__three">Niveau 3</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProgressBar;
