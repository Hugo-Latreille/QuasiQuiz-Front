import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";
import "./_lobby.scss";

const Lobby = () => {
	return (
		<>
			<Header />
			<div className="lobby-content">
				<div className="lobby-title">
					<h1>La partie va bientôt commencer !</h1>
				</div>
				<div className="lobby-gamer">
					<div className="gm-box">
						<h4>Vous lui devez allégeance !</h4>
						<div className="gm-card">
							<div className="gamer-img"></div>
							<h3>Pseudo</h3>
						</div>
					</div>
					<div className="gamer-box">
						<h4>Joueur présents :</h4>
						<div className="gc-grid">
							<div className="gamer-card">
								<div className="gamer-img"></div>
								<h3>Pseudo</h3>
							</div>
							<div className="gamer-card ">
								<div className="gamer-img user"></div>
								<h3>Pseudo</h3>
							</div>
							<div className="gamer-card">
								<div className="gamer-img"></div>
								<h3>Pseudo</h3>
							</div>
							<div className="gamer-card">
								<div className="gamer-img"></div>
								<h3>Pseudo</h3>
							</div>
							<div className="gamer-card">
								<div className="gamer-img"></div>
								<h3>Pseudo</h3>
							</div>
						</div>
						<div className="legend">
							<ul>
								<li id="gm-color">Le MJ</li>
								<li id="g-color">Les autres</li>
								<li id="user-color">Vous</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Lobby;
