import {
	ExtractDocumentTypeFromTypedRxJsonSchema,
	RxJsonSchema,
	toTypedRxJsonSchema,
} from "rxdb";

const todoSchemaLiteral = {
	title: "todo schema",
	description: "describes a human being",
	version: 0,
	type: "object",
	primaryKey: "id",
	properties: {
		id: {
			type: "string",
			maxLength: 100,
		},
		text: {
			type: "string",
			maxLength: 300,
		},
		description: {
			type: "string",
			maxLength: 3000,
		},
		isCompleted: {
			type: "boolean",
		},
		createdAt: {
			type: "string",
			format: "date-time",
			maxLength: 300,
		},
		updatedAt: {
			type: "string",
			format: "date-time",
		},
	},
	required: ["id", "text", "isCompleted", "createdAt"],
	indexes: ["createdAt"],
} as const;

const schemaTyped = toTypedRxJsonSchema(todoSchemaLiteral);

// aggregate the document type from the schema
export type TodoDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
	typeof schemaTyped
>;

// create the typed RxJsonSchema from the literal typed object.
export const todoSchema: RxJsonSchema<TodoDocType> = todoSchemaLiteral;
