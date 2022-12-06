import React from "react";
import ReactDOM from "react-dom/client";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import App from "./App";
import Admin from "./Pages/BackOffice/Admin";
import "./styles/index.scss";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="*" element={<App />} />
			<Route path="admin/*" element={<Admin />} />;
		</>
	)
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
