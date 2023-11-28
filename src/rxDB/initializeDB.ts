import { RxDatabase, createRxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";

import { wrappedKeyEncryptionCryptoJsStorage } from "rxdb/plugins/encryption-crypto-js";

import { addRxPlugin } from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";

import { RxDBJsonDumpPlugin } from "rxdb/plugins/json-dump";
import { RxDBQueryBuilderPlugin } from "rxdb/plugins/query-builder";
import {
	getDatabasePasswordFromLocal,
	getRegisteredDatabases,
	storeDatabasePasswordToLocal,
} from "../utils/auth";
import { todoSchema } from "./schema/todoList";

addRxPlugin(RxDBJsonDumpPlugin);
addRxPlugin(RxDBQueryBuilderPlugin);
addRxPlugin(RxDBDevModePlugin);

// wrap the normal storage with the encryption plugin
const encryptedDexieStorage = wrappedKeyEncryptionCryptoJsStorage({
	storage: getRxStorageDexie(),
});

const createDb = async (name: string, password: string) => {
	return createRxDatabase({
		name: name, // <- name
		storage: encryptedDexieStorage, // <- RxStorage
		/* Optional parameters: */
		password: password, // <- password (optional)
		multiInstance: false, // <- multiInstance (optional, default: true)
		eventReduce: true, // <- eventReduce (optional, default: false)
		cleanupPolicy: {}, // <- custom cleanup policy (optional)
		ignoreDuplicate: true,
		instanceCreationOptions: {},
	});
};

const initializeDB = async (name: string, password: string) => {
	// create RxDB
	let databaseConnection: RxDatabase;
	let gPassword = "";
	try {
		let existingDBs = await getRegisteredDatabases();
		if (existingDBs.includes(name)) {
			gPassword = getDatabasePasswordFromLocal(name, password);
		} else {
			gPassword = storeDatabasePasswordToLocal(name, password);
		}
		databaseConnection = await createDb(name, gPassword);
		await databaseConnection.addCollections({
			characters: {
				schema: todoSchema,
			},
		});
	} catch (err: any) {
		console.error(err);
		return Promise.reject(err.code);
	}
	return Promise.resolve(databaseConnection);
};

export default initializeDB;
