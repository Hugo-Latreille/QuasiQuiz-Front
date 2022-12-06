import "./App.scss";
import Home from "./Pages/Home/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import Connexion from "./Pages/Connexion/Connexion";
import Lobby from "./Pages/Lobby/Lobby";
import Admin from "./Pages/BackOffice/Admin";

function App() {
	const location = useLocation();
	const background = location.state && location.state.background;
	return (
		<>
			<Routes location={background || location} errorElement={<p>ERREUR</p>}>
				<Route path="/" element={<Home />}>
					<Route path="login" element={<Connexion />} />
				</Route>
				<Route path="lobby" element={<Lobby />} />
				<Route path="/admin/*" element={<Admin />} />
			</Routes>
			{background && (
				<Routes>
					<Route path="login" element={<Connexion />} />
				</Routes>
			)}
		</>
	);
}

export default App;
