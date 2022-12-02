/* eslint-disable react/no-unescaped-entities */
import Input from "../../Components/Input/Input";
import "./Register.scss";
import { useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

const Register = ({ setIsLoggingActive }) => {
	const [pseudo, setPseudo] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [passwordVisibility, setPasswordVisibility] = useState(false);
	const [passwordValidity, setPasswordValidity] = useState({});
	const [passwordValidationWidth, setPassordValidationWidth] = useState(0);

	const isNumberRegex = /\d/;
	const specialCharacterRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
	const oneUppercase = /[A-Z]/;

	const checkPasswordValidity = () => {
		setPasswordValidity({
			minChar: password.length >= 8 ? true : false,
			number: isNumberRegex.test(password) ? true : false,
			uppercase: oneUppercase.test(password) ? true : false,
			specialChar: specialCharacterRegex.test(password) ? true : false,
		});
	};

	return (
		<div className="register-container">
			<div className="content ">
				<form className="form">
					<div className="inputs-container">
						<Input
							name="pseudo"
							value={pseudo}
							label="Pseudo"
							type="text"
							required={true}
							setValue={setPseudo}
						/>
					</div>
					<Input
						name="email"
						value={email}
						label="Email"
						type="email"
						required={true}
						setValue={setEmail}
					/>
					<Input
						name="password"
						value={password}
						label="Mot de passe"
						type={passwordVisibility ? "text" : "password"}
						required={true}
						checkPasswordValidity={checkPasswordValidity}
						setValue={setPassword}
					/>
					{/* <Input
						name="passwordConfirm"
						value={passwordConfirm}
						label="Confirmez votre mot de passe"
						type={passwordVisibility ? "text" : "password"}
						required={true}
					/> */}
					<div
						className="eye_register_pass"
						onClick={() => setPasswordVisibility(!passwordVisibility)}
					>
						{passwordVisibility ? (
							<MdOutlineVisibility />
						) : (
							<MdOutlineVisibilityOff />
						)}
					</div>
					<div
						className="eye_register_confirm"
						onClick={() => setPasswordVisibility(!passwordVisibility)}
					>
						{passwordVisibility ? (
							<MdOutlineVisibility />
						) : (
							<MdOutlineVisibilityOff />
						)}
					</div>

					<div>
						<div className="password-safety">
							Niveau de sécurité du mot de passe :
							<div className="password-safety-container">
								{passwordValidationWidth === 25 && (
									<div className="password-safety-quart"></div>
								)}
								{passwordValidationWidth === 50 && (
									<div className="password-safety-middle"></div>
								)}
								{passwordValidationWidth === 75 && (
									<div className="password-safety-3quart"></div>
								)}
								{passwordValidationWidth === 100 && (
									<div className="password-safety-full"></div>
								)}
							</div>
							<span>
								Au moins{" "}
								<span className={passwordValidity.minChar ? "success" : ""}>
									8 caractères
								</span>
								, dont une{" "}
								<span className={passwordValidity.uppercase ? "success" : ""}>
									{" "}
									majuscule
								</span>
								, un{" "}
								<span className={passwordValidity.number ? "success" : ""}>
									{" "}
									chiffre
								</span>
								, et un
								<span className={passwordValidity.specialChar ? "success" : ""}>
									{" "}
									caractère spécial
								</span>
								.
							</span>
						</div>
					</div>
					<button type="submit" className="main-button-colored">
						S'inscrire
					</button>
					<span
						className="third-button-colored width-100"
						onClick={() => setIsLoggingActive(true)}
					>
						Déjà inscrit ?
					</span>
				</form>
			</div>
		</div>
	);
};

export default Register;
