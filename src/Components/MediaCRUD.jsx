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
	UrlField,
	FileInput,
	FileField,
} from "react-admin";

const MediaList = (props) => (
	<ListGuesser {...props}>
		<TextField source="id" />
		<UrlField source="contentUrl" />
		<ReferenceField
			label="Question"
			source="question"
			reference="questions"
			link="show"
		>
			<ChipField source="question" />
		</ReferenceField>
		<DateField source="created_at" showTime locales="fr-FR" />
		<DateField source="updated_at" showTime locales="fr-FR" />
	</ListGuesser>
);

const MediaShow = (props) => (
	<ShowGuesser {...props}>
		<TextField source="id" />
		<UrlField source="contentUrl" />
		<ReferenceField
			label="Question"
			source="question"
			reference="questions"
			link="show"
		>
			<ChipField source="question" />
		</ReferenceField>
		<DateField source="created_at" showTime locales="fr-FR" />
		<DateField source="updated_at" showTime locales="fr-FR" />
	</ShowGuesser>
);

const MediaCreate = (props) => (
	<CreateGuesser {...props}>
		<FileInput source="file">
			<FileField source="src" title="title" />
		</FileInput>
		<ReferenceInput source="question" reference="questions">
			<AutocompleteInput
				filterToQuery={(searchText) => ({ question: searchText })}
				optionText="question"
				label="Question"
			/>
		</ReferenceInput>
	</CreateGuesser>
);

export { MediaList, MediaShow, MediaCreate };
