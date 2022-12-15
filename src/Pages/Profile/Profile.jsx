import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";
import Button from "../../Components/Button/Button";
import { MdEdit } from "react-icons/md";

import "./_profile.scss";

const Profile = () => {
  return (
    <>
      <Header />
      <main>
        <div className="profile-content">
          <div className="avatar">
            <img src="https://picsum.photos/200" alt="" />
            <MdEdit className="edit" />
          </div>
          <div className="profile-info">
            <h1 className="pseudo">
              Pseudo <MdEdit className="edit" />
            </h1>

            <a href="">
              machin@mail.com <MdEdit className="edit" />
            </a>
            <Button label="Changer le mdp" />
          </div>

          <div className="parties">
            <h3>Historique :</h3>
            <div className="party">
              <a className="date">Il y a 1h</a>
            </div>
            <div className="party">
              <a className="date">2 juin 2022</a>
            </div>
            <div className="party">
              <a className="date">1 juin 2022</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Profile;
