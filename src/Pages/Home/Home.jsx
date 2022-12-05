import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";
import "./_home.scss";
import bouh from "../../assets/bouh.png";
import { Outlet } from "react-router-dom";

const Home = () => {
	return (
		<>
			<Header />
			<div className="home-content">
				<div className="home-title">
					<h1>BOUUUUH !</h1>
				</div>
				<img src={bouh} alt="imagedepetitmonstre" />
				<div className="rules">
					<h4>Voici les règles du jeu :</h4>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis
						neque necessitatibus molestiae unde deserunt fugiat error! Assumenda
						dolor quae ad nobis beatae. Sit earum esse quasi, sed error, minima
						illum eligendi fuga nostrum tenetur ipsum, commodi magni. Sit sed,
						dolore vel blanditiis optio praesentium autem quas minima
						laudantium, provident veritatis.
					</p>
				</div>
			</div>
			<Footer />
			<Outlet />
		</>
	);
};

export default Home;
