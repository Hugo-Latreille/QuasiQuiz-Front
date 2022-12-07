import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./styles/index.scss";
import Admin from "./Pages/BackOffice/Admin";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/*" element={<App />} />;
				<Route path="admin/*" element={<Admin />} />;
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
