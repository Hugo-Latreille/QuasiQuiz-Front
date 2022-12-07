import "./Connexion.scss";
import { useContext, useEffect, useState } from "react";
import Register from "./Register.jsx";
import Login from "./Login";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginRoute, usersRoute } from "../../utils/apiRoutes";
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
	// const { addUser, user } = useContext(UserContext);
	const { user, setUser } = useContext(UserContext);

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(
				loginRoute,
				{
					email: loginEmail,
					password: loginPassword,
				},
				{
					withCredentials: true,
				}
			);
			console.log(data);
			// const { data: userData } = await axios.get(
			// 	`${usersRoute}?email=${loginEmail}`
			// );
			// console.log(data);
			// console.log(userData);
			// await addUser({
			// email: loginEmail,
			// token: data.token,
			// role: userData["hydra:member"][0].roles,
			// });
			setUser({
				token: data.token,
			});
			setLoginEmail("");
			setLoginPassword("");
			console.log("User", user);

			// if (userData["hydra:member"][0].roles[0] === "ROLE_ADMIN") {
			// 	console.log(userData["hydra:member"][0].roles[0]);
			// 	return navigate("/admin");
			// }
			// navigate("/lobby");
			console.log("AVANT REDIRECTION");
			navigate("/test");
		} catch (error) {
			console.log(error);
			if (error.response.status === 401) {
				return toast.error("Vos identifiants sont incorrects", toastOptions);
			}
			return toast.error(`${error.response.data.detail}`, toastOptions);
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
				setPasswordConfirm("");
				setTimeout(() => {
					setIsLoggingActive(true);
				}, 3000);
			} catch (error) {
				console.log(error);
				if (error.message === "Request failed with status code 500") {
					return toast.error("Cet email est déjà enregistré", toastOptions);
				}
				return toast.error(`Erreur ${error.response.status}`, toastOptions);
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
							passwordConfirm={passwordConfirm}
							setPasswordConfirm={setPasswordConfirm}
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
