import "./App.css";
import {
	HydraAdmin,
	fetchHydra,
	hydraDataProvider,
	ResourceGuesser,
	ListGuesser,
	FieldGuesser,
	ShowGuesser,
	CreateGuesser,
	InputGuesser,
	EditGuesser,
} from "@api-platform/admin";
import {
	TextField,
	ReferenceField,
	NumberField,
	Resource,
	useRecordContext,
	List,
	Datagrid,
	EditButton,
	ChipField,
	ReferenceInput,
	AutocompleteInput,
} from "react-admin";
import { parseHydraDocumentation } from "@api-platform/api-doc-parser";

function App() {
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
const QuestionsList = (props) => (
	<ListGuesser {...props}>
		<TextField source="id" />
		<FieldGuesser source="question" />
		<NumberField source="timer" />
		<NumberField source="level" />
		<FieldGuesser source="media" /> */ /*{" "}
		<ReferenceField
			label="Answer"
			source="answer"
			reference="answers"
			link="show"
		>
			<TextField source="answer" />
		</ReferenceField>
	</ListGuesser>
);

// const QuestionsList = () => (
// 	<List>
// 		<Datagrid>
// 			<TextField source="id" />
// 			<TextField source="question" />
// 			<NumberField source="timer" />
// 			<NumberField source="level" />
// 			<ReferenceField label="Answer" source="answer" reference="answers">
// 				<TextField source="answer" />
// 			</ReferenceField>
// 		</Datagrid>
// 	</List>
// );

const QuestionShow = (props) => (
	<ShowGuesser {...props}>
		<TextField source="id" />
		<FieldGuesser source="question" />
		<NumberField source="timer" />
		<NumberField source="level" />
		<FieldGuesser source="media" /> */ /*{" "}
		<ReferenceField label="Answer" source="answer" reference="answers">
			<TextField source="answer" />
		</ReferenceField>
	</ShowGuesser>
);

const QuestionCreate = (props) => (
	<CreateGuesser {...props}>
		<InputGuesser source="question" />
		<InputGuesser source="timer" />
		<InputGuesser source="level" />
		{/* <InputGuesser source="media" />  */}
		<ReferenceInput source="answer" reference="answers">
			<AutocompleteInput
				filterToQuery={(searchText) => ({ answer: searchText })}
				optionText="answer"
				label="Answers"
			/>
		</ReferenceInput>
	</CreateGuesser>
);

const QuestionEdit = (props) => (
	<EditGuesser {...props}>
		<InputGuesser source="question" />
		<InputGuesser source="timer" />
		<InputGuesser source="level" />
		{/* <InputGuesser source="answer" /> */}
		<ReferenceInput source="answer" reference="answers">
			<AutocompleteInput
				filterToQuery={(searchText) => ({ answer: searchText })}
				optionText="answer"
				label="Answers"
			/>
		</ReferenceInput>
	</EditGuesser>
);

export default App;
