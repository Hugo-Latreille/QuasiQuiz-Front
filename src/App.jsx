import "./App.scss";
import Home from "./Pages/Home/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import Connexion from "./Pages/Connexion/Connexion";
import Lobby from "./Pages/Lobby/Lobby";
import { createContext, useReducer } from "react";
import RequireAuth from "./utils/RequireAuth";
import AuthTest from "./Pages/JWTTest/AuthTest";
import WelcomeTest from "./Pages/JWTTest/WelcomeTest";

export const UserContext = createContext();

const initialState = {
	user: {
		token: "",
		email: "",
		role: [],
	},
};

const action = {
	ADD_USER: "ADD_USER",
	REMOVE_USER: "REMOVE_USER",
};

const userReducer = (state, action) => {
	if (action.type === "ADD_USER") {
		return {
			...state,
			user: {
				...state.user,
				token: action.payload.token,
				email: action.payload.email,
				role: action.payload.role,
			},
		};
	}
	if (action.type === "REMOVE_USER") {
		return {
			...state,
			user: {
				...state.user,
				token: "",
				email: "",
				role: "",
			},
		};
	}
};
const Provider = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, initialState);
	// console.log(state.user);
	const value = {
		user: state.user,
		addUser: (payload) => {
			dispatch({ type: action.ADD_USER, payload });
		},
		removeUser: () => {
			dispatch({ type: action.REMOVE_USER });
		},
	};
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

function App() {
	const location = useLocation();
	const background = location.state && location.state.background;

	return (
		<Provider>
			<Routes location={background || location}>
				<Route path="/" element={<Home />}>
					<Route path="login" element={<Connexion />} />
				</Route>
				<Route path="/test" element={<WelcomeTest />} />
				<Route path="/authTest" element={<AuthTest />} />

				{/* Routes privées */}
				<Route element={<RequireAuth />}>
					<Route path="lobby" element={<Lobby />} />
				</Route>

				<Route path="*" element={<p style={{ color: "white" }}>404</p>} />
			</Routes>
			{background && (
				<Routes>
					<Route path="login" element={<Connexion />} />
				</Routes>
			)}
		</Provider>
	);
}

export default App;
