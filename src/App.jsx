import Admin from "./Pages/BackOffice/Admin";
import "./App.scss";
import Home from "./Pages/Home/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import Connexion from "./Pages/Connexion/Connexion";
import Lobby from "./Pages/Lobby/Lobby";
import Error from "./Pages/404/Error";
import Game from "./Pages/Game/Game";
import Correction from "./Pages/Correction/Correction";

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Home />}>
          <Route path="login" element={<Connexion />} />
        </Route>
        <Route path="lobby" element={<Lobby />} />
        <Route path="game" element={<Game />} />
        <Route path="correction" element={<Correction />} />
        <Route path="admin" element={<Admin />} />
        <Route path="*" element={<Error />} />
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
