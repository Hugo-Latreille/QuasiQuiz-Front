import "./Connexion.scss";
// import Logo from "./../../assets/logo2.png";
import { useState } from "react";
import Register from "./Register.jsx";
import Login from "./Login";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";

const Connexion = () => {
	const navigate = useNavigate();
	const [isLoggingActive, setIsLoggingActive] = useState(false);

	return ReactDOM.createPortal(
		<div className="connexion">
			<div className="connexion-container">
				<div className="connexion-container-navigation">
					{/* <img className="connexion-logo" src={Logo} alt="logo QuasiQuiz" /> */}
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
						onClick={() => {
							navigate(-1);
						}}
					>
						<i className="fas fa-times-circle"></i>
					</button>
					{isLoggingActive && <Login />}
					{!isLoggingActive && (
						<Register setIsLoggingActive={setIsLoggingActive} />
					)}
				</div>
			</div>
		</div>,
		document.getElementById("modale")
	);
};

export default Connexion;
