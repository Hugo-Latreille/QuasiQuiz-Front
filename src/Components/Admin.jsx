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
			<ResourceGuesser name="users" />
			<ResourceGuesser
				name="questions"
				list={QuestionsList}
				show={QuestionShow}
				create={QuestionCreate}
				edit={QuestionEdit}
			/>
			<ResourceGuesser name="answers" />
			<ResourceGuesser name="media" />
		</HydraAdmin>
	);
}

export default Admin;
