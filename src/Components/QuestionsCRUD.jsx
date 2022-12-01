import {
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
	ChipField,
	ReferenceInput,
	AutocompleteInput,
} from "react-admin";

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
			<ChipField source="answer" />
		</ReferenceField>
	</ListGuesser>
);

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

export { QuestionsList, QuestionCreate, QuestionShow, QuestionEdit };
