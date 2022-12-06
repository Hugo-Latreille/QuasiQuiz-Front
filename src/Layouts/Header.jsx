import logo from "../assets/logo-full.svg";
import "./_header.scss";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  return (
    <>
      <div className="header">
        <img src={logo} alt="logoQuasiQuiz" id="logo" />

        <button id="login-btn">
          <Link id="link-mod" to="login" state={{ background: location }}>
            Connexion
          </Link>
        </button>
      </div>
    </>
  );
};

export default Header;
