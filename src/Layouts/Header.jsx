import logo from "../assets/logo-full.svg";
import "./_header.scss";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  return (
    <>
      <div className="header">
        <img src={logo} alt="logoQuasiQuiz" className="logo" />

        {/* <button className="login-btn">
          <Link
            className="link-mod"
            to="login"
            state={{ background: location }}
          >
            Connexion
          </Link>
        </button> */}

        <div className="dropdown">
          <img src="https://picsum.photos/200" className="user-vatar"></img>
          <div className="dropdown-content">
            <ul>
              <li>
                <a href="#" className="profile">
                  Profile
                </a>
              </li>
              <li>
                <a href="#" className="logout">
                  Déconnexion
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
