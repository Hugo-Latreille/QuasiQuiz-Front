import logo from "../assets/logo.png";
import "./_header.scss";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
	const location = useLocation();
	return (
		<>
			<div className="header">
				<img src={logo} alt="logoQuasiQuiz" id="logo" />
				<h1>QuasiQuiz</h1>
				<button id="login-btn">
					<Link to="login" state={{ background: location }}>
						Connexion
					</Link>
				</button>
			</div>
		</>
	);
};

export default Header;
