import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo-full.svg";
import "./_header.scss";
import Button from "../Components/Button/Button";

const Header = () => {
  const location = useLocation();

  //** callback pour le dropdown */
  // const dropdownFunc = () => {
  //   document.getElementById("myDropdown").classList.toggle("show");
  // };

  //** Désactiver le dropdown en cliquand n'importe où sur l'écran */
  // window.onclick = function (event) {
  //   if (!event.target.matches(".dropbtn")) {
  //     var dropdowns = document.getElementsByClassName("dropdown-content");
  //     var i;
  //     for (i = 0; i < dropdowns.length; i++) {
  //       var openDropdown = dropdowns[i];
  //       if (openDropdown.classList.contains("show")) {
  //         openDropdown.classList.remove("show");
  //       }
  //     }
  //   }
  // };

  return (
    <>
      <div className="header">
        <img src={logo} alt="logoQuasiQuiz" className="logo" />
        <Link className="link-mod" to="login" state={{ background: location }}>
          <Button label="Connexion" />
        </Link>

        {/* <div className="dropdown">
          <img
            onClick={dropdownFunc}
            src="https://picsum.photos/200"
            className="dropbtn"
          ></img>
          <div id="myDropdown" className="dropdown-content">
            <div className="list">
              <a href="#" className="profile">
                Profile
              </a>
              <a href="#" className="logout">
                Déconnexion
              </a>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Header;
