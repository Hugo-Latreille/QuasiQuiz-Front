import { Menu } from "react-admin";
import PeopleIcon from "@mui/icons-material/People";
import QuizIcon from "@mui/icons-material/Quiz";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PermMediaIcon from "@mui/icons-material/PermMedia";

export const MyMenu = (props) => (
	<Menu {...props}>
		{/* <Menu.DashboardItem /> */}
		<Menu.Item
			to="/users"
			primaryText="Utilisateurs"
			leftIcon={<PeopleIcon />}
		/>
		<Menu.Item
			to="/questions"
			primaryText="Questions"
			leftIcon={<QuizIcon />}
		/>
		<Menu.Item
			to="/answers"
			primaryText="Réponses"
			leftIcon={<QuestionAnswerIcon />}
		/>
		<Menu.Item to="/media" primaryText="Média" leftIcon={<PermMediaIcon />} />
	</Menu>
);
