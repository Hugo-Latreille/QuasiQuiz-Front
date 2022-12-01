import {
	HydraAdmin,
	fetchHydra,
	hydraDataProvider,
	ResourceGuesser,
} from "@api-platform/admin";
import { parseHydraDocumentation } from "@api-platform/api-doc-parser";
import {
	QuestionsList,
	QuestionCreate,
	QuestionShow,
	QuestionEdit,
} from "./QuestionsCRUD";
import {
	AnswerList,
	AnswerShow,
	AnswerCreate,
	AnswerEdit,
} from "./AnswersCRUD";
import { UsersList, UserShow, UserCreate, UserEdit } from "./UsersCRUD";
import { MediaList, MediaShow, MediaCreate } from "./MediaCRUD";

function Admin() {
	const entrypoint = import.meta.env.VITE_API_ENTRYPOINT;

	const dataProvider = hydraDataProvider({
		entrypoint,
		httpClient: fetchHydra,
		apiDocumentationParser: parseHydraDocumentation,
		mercure: true,
		useEmbedded: false,
	});

	return (
		<HydraAdmin entrypoint={entrypoint} dataProvider={dataProvider}>
			<ResourceGuesser
				name="users"
				list={UsersList}
				show={UserShow}
				edit={UserEdit}
				create={UserCreate}
			/>
			<ResourceGuesser
				name="questions"
				list={QuestionsList}
				show={QuestionShow}
				create={QuestionCreate}
				edit={QuestionEdit}
			/>
			<ResourceGuesser
				name="answers"
				list={AnswerList}
				show={AnswerShow}
				create={AnswerCreate}
				edit={AnswerEdit}
			/>
			<ResourceGuesser
				name="media"
				list={MediaList}
				show={MediaShow}
				create={MediaCreate}
			/>
		</HydraAdmin>
	);
}

export default Admin;
