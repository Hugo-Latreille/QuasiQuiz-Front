import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";
import Button from "../../Components/Button/Button";

import "./_palmares.scss";

const Palmares = () => {
  return (
    <>
      <Header />
      <main>
        <div className="palmares-content">
          <div className="title">
            <h1>Résultats</h1>
          </div>
          <div className="results-box">
            <div className="g-result first">
              <div className="gamer">
                <img src="https://picsum.photos/200" alt="" />
                <a href="" className="pseudo">
                  Coucou
                </a>
              </div>

              <a href="" className="pts">
                50 pts
              </a>
              <a href="" className="position">
                1er
              </a>
            </div>

            <div className="g-result second">
              <div className="gamer">
                <img src="https://picsum.photos/200" alt="" />
                <a href="" className="pseudo">
                  Coucou
                </a>
              </div>

              <a href="" className="pts">
                49 pts
              </a>
              <a href="" className="position">
                2nd
              </a>
            </div>

            <div className="g-result third">
              <div className="gamer">
                <img src="https://picsum.photos/200" alt="" />
                <a href="" className="pseudo">
                  Coucou
                </a>
              </div>

              <a href="" className="pts">
                47 pts
              </a>
              <a href="" className="position">
                3e
              </a>
            </div>

            <div className="g-result others">
              <div className="gamer">
                <img src="https://picsum.photos/200" alt="" />
                <a href="" className="pseudo">
                  Coucou
                </a>
              </div>

              <a href="" className="pts">
                10 pts
              </a>
              <a href="" className="position">
                4e
              </a>
            </div>

            <div className="g-result last">
              <div className="gamer">
                <img src="https://picsum.photos/200" alt="" />
                <a href="" className="pseudo">
                  Coucou
                </a>
              </div>

              <a href="" className="pts">
                2 pts
              </a>
              <a href="" className="position">
                &#x1F602;
              </a>
            </div>
          </div>
          <Button label={"Rejouer"} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Palmares;
