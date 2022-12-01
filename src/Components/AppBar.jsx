import { AppBar, Toolbar } from "react-admin";
import Typography from "@mui/material/Typography";
import Logo from "../assets/logo.png";

const MyAppBar = (props) => (
	<AppBar {...props} sx={{ backgroundColor: "blueviolet" }}>
		<Typography variant="h6" color="inherit" id="react-admin-title" />
		{/* <Logo /> */}
		<span />
	</AppBar>
);

export default MyAppBar;
