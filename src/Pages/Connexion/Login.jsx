import { useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import Input from "../../Components/Input/Input";
import "./Login.scss";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordVisibility, setPasswordVisibility] = useState(false);

	return (
		<div className="login-container">
			<form className="login-form">
				<div className="login-form-inputs">
					<div className="form">
						<Input
							name="email"
							value={email}
							setValue={setEmail}
							label="Email"
							type="email"
							required={true}
						/>
						<Input
							name="password"
							value={password}
							setValue={setPassword}
							label="Mot de passe"
							type={passwordVisibility ? "text" : "password"}
							required={true}
						/>
						<div
							className="toggle_eye"
							onClick={() => setPasswordVisibility(!passwordVisibility)}
						>
							{passwordVisibility ? (
								<MdOutlineVisibility />
							) : (
								<MdOutlineVisibilityOff />
							)}
						</div>
					</div>
				</div>
				<div className="login-form-buttons">
					<button type="submit" className="main-button-colored">
						Se connecter
					</button>

					{/* <Link
						to={"../forgotpassword"}
						className="third-button-colored width-100"
					>
						Mot de passe oublié ?
					</Link> */}
				</div>
			</form>
		</div>
	);
};

export default Login;
