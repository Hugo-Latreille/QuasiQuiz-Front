import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";

import "./_correction.scss";

const Correction = () => {
  return (
    <>
      <Header />
      <div className="game-content">
        <div className="game-box">
          <div className="media">
            <img src="https://picsum.photos/300/200" alt="image" />
          </div>
          <div className="question">
            <p>Une question ?</p>
          </div>
          <div className="answer">
            <div className="good-answer">
              <p>Réponse attendue :</p>
              <p>Ceci est la bonne réponse.</p>
            </div>
            <div className="gamer-answer">
              <p>Voici ma réponse</p>
            </div>
          </div>
          <div className="gamer-pseudo">
            <p>Pseudo</p>
          </div>
          <div className="true-false-next">
            <button className="true">Vrai</button>
            <button className="next">Suivant</button>
            <button className="false">Faux</button>
          </div>
        </div>
        <div className="progressbar-box">
          <div className="lvl-border">
            <div className="lvl-content"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Correction;
