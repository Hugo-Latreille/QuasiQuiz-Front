import "./Connexion.scss";
import { useContext, useState } from "react";
import Register from "./Register.jsx";
import Login from "./Login";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginRoute } from "../../utils/apiRoutes";
//? React Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../App";

const Connexion = () => {
	const navigate = useNavigate();
	const [isLoggingActive, setIsLoggingActive] = useState(false);
	const [pseudo, setPseudo] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	const test = useContext(UserContext);

	console.log(test);

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const result = await axios.post(loginRoute, {
				loginEmail,
				loginPassword,
			});
			console.log(result);
			//! ici : enregistrer utilisateur dans le context global
			//! ici : fermer la modale + redirection vers lobby
			setEmail("");
			setPassword("");
		} catch (error) {
			console.log(error);
			if (error.response.status === 401) {
				return toast.error("Vos identifiants sont incorrects", toastOptions);
			}
		}
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		if (handleValidation()) {
			try {
				const result = await axios.post("https://localhost:8000/api/users", {
					email,
					password,
					pseudo,
				});
				console.log(result);
				toast.success("Vous pouvez désormais vous connecter", toastOptions);
				setEmail("");
				setPseudo("");
				setPassword("");
				//! Ici redirection ?
			} catch (error) {
				console.log(error.message);
				//! gérer le cas de l'email déjà existant, cf réponse back
			}
		}
	};

	const handleValidation = () => {
		if (password !== passwordConfirm) {
			toast.error("Les mots de passe ne correspondent pas", toastOptions);
			return false;
		}
		const validatePassword = new RegExp(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*"'()+,-./:;<=>?[\]^_`{|}~])(?=.{8,})/
		);
		if (!validatePassword.test(password)) {
			toast.error(
				"Votre password doit avoir au moins 8 caractères, dont une majuscule, un chiffre et un caractère spécial",
				toastOptions
			);
			return false;
		}

		return true;
	};

	const toastOptions = {
		position: "top-right",
		autoClose: 6000,
		pauseOnHover: true,
		draggable: true,
		theme: "light",
	};

	return ReactDOM.createPortal(
		<div className="connexion">
			<div className="connexion-container">
				<div className="connexion-container-navigation">
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
					{isLoggingActive && (
						<Login
							email={loginEmail}
							setEmail={setLoginEmail}
							password={loginPassword}
							setPassword={setLoginPassword}
							handleLogin={handleLogin}
						/>
					)}
					{!isLoggingActive && (
						<Register
							setIsLoggingActive={setIsLoggingActive}
							email={email}
							setEmail={setEmail}
							password={password}
							setPassword={setPassword}
							pseudo={pseudo}
							setPseudo={setPseudo}
							handleRegister={handleRegister}
						/>
					)}
				</div>
			</div>
			<ToastContainer />
		</div>,
		document.getElementById("modale")
	);
};

export default Connexion;
