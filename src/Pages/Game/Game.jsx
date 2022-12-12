import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";
import "./_game.scss";

// récuperer les questions de cette partie + le temps de chacune + le niveau

const Game = () => {
	return (
		<>
			<Header />
			<main>
				<div className="game-content">
					<div className="timer">
						<p>30 s</p>
					</div>
					<div className="game-box">
						<div className="media">
							<img src="https://picsum.photos/300/200" alt="image" />
						</div>
						<div className="question">
							<p>Une question ?</p>
						</div>
						<div className="answer">
							<form action="">
								<input type="text" name="" id="" />
							</form>
						</div>
					</div>
					<div className="lvl-box">
						<div className="lvl-border">
							<div className="lvl-content"></div>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
};

export default Game;
