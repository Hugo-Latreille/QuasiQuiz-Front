import logo from "../assets/logo.png";
import "./_header.scss";

const Header = () => {
  return (
    <>
      <div className="header">
        <img src={logo} alt="logoQuasiQuiz" id="logo" />
        <h1>QuasiQuiz</h1>
        <button id="login-btn">Connexion</button>
      </div>
    </>
  );
};

export default Header;
