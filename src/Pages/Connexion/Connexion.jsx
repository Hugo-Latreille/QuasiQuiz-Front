import "./Connexion.scss";
import Logo from "./../../assets/logo.png";
import { useState } from "react";
import Register from "./Register.jsx";
import Login from "./Login";

const Connexion = () => {
	const [isLoggingActive, setIsLoggingActive] = useState(false);

	return (
		<div className="connexion">
			<div className="connexion-container">
				<div className="connexion-container-navigation">
					<img className="connexion-logo" src={Logo} alt="logo QuasiQuiz" />
					<div className="navigation-links">
						<span
							className={isLoggingActive ? "link-is-active" : ""}
							onClick={() => setIsLoggingActive(!isLoggingActive)}
						>
							Connexion
						</span>
						<span
							className={!isLoggingActive ? "link-is-active" : ""}
							onClick={() => setIsLoggingActive(!isLoggingActive)}
						>
							Inscription
						</span>
					</div>
				</div>
				<div className="connexion-container-form">
					<button
						className="close-modal"
						// onClick={() => {
						// 	dispatch(toggleLoggingModalOpen());
						// 	navigate(-1);
						// }}
					>
						<i className="fas fa-times-circle"></i>
					</button>
					{isLoggingActive && <Login />}
					{!isLoggingActive && <Register />}
				</div>
			</div>
		</div>
	);
};

export default Connexion;
