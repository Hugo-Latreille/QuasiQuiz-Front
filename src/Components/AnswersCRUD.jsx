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
	DateField,
	ReferenceArrayInput,
} from "react-admin";

const AnswerList = (props) => (
	<ListGuesser {...props}>
		<TextField source="id" />
		<FieldGuesser source="answer" />
		<ReferenceField
			label="Question"
			source="questions"
			reference="questions"
			link="show"
		>
			<ChipField source="question" />
		</ReferenceField>
		<DateField source="created_at" showTime locales="fr-FR" />
		<DateField source="updated_at" showTime locales="fr-FR" />
	</ListGuesser>
);

const AnswerShow = (props) => (
	<ShowGuesser {...props}>
		<TextField source="id" />
		<FieldGuesser source="answer" />
		<ReferenceField
			label="Question"
			source="questions"
			reference="questions"
			link="show"
		>
			<ChipField source="question" />
		</ReferenceField>
		<DateField source="created_at" showTime locales="fr-FR" />
		<DateField source="updated_at" showTime locales="fr-FR" />
	</ShowGuesser>
);

const AnswerCreate = (props) => (
	<CreateGuesser {...props}>
		<InputGuesser source="answer" />
		<ReferenceInput source="questions" reference="questions">
			<AutocompleteInput
				filterToQuery={(searchText) => ({ question: searchText })}
				optionText="question"
				label="Question"
			/>
		</ReferenceInput>
	</CreateGuesser>
);

const AnswerEdit = (props) => (
	<EditGuesser {...props}>
		<InputGuesser source="answer" />
		<ReferenceInput source="questions" reference="questions">
			<AutocompleteInput
				filterToQuery={(searchText) => ({ question: searchText })}
				optionText="question"
				label="Question"
			/>
		</ReferenceInput>
	</EditGuesser>
);

export { AnswerList, AnswerShow, AnswerCreate, AnswerEdit };
