import { RxDatabase, createRxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";

import { wrappedKeyEncryptionCryptoJsStorage } from "rxdb/plugins/encryption-crypto-js";

import { addRxPlugin } from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";

import { RxDBQueryBuilderPlugin } from "rxdb/plugins/query-builder";
import { todoSchema } from "./schema/todoList";

addRxPlugin(RxDBQueryBuilderPlugin);
addRxPlugin(RxDBDevModePlugin);

// wrap the normal storage with the encryption plugin
const encryptedDexieStorage = wrappedKeyEncryptionCryptoJsStorage({
	storage: getRxStorageDexie(),
});

// 12345678901112

const createDb = (username: string, password: string) =>
	createRxDatabase({
		name: username, // <- name
		storage: encryptedDexieStorage, // <- RxStorage
		/* Optional parameters: */
		password: password, // <- password (optional)
		multiInstance: false, // <- multiInstance (optional, default: true)
		eventReduce: true, // <- eventReduce (optional, default: false)
		cleanupPolicy: {}, // <- custom cleanup policy (optional)
		ignoreDuplicate: true,
	});

const initializeDB = async (username: string, password: string) => {
	// create RxDB
	let databaseConnection: RxDatabase;
	try {
		databaseConnection = await createDb(username, password);
		await databaseConnection.addCollections({
			characters: {
				schema: todoSchema,
			},
		});
	} catch (err: any) {
		console.log(err);
		return Promise.reject(err.code);
	}
	console.log("hehre", databaseConnection);
	return Promise.resolve(databaseConnection);
};

export default initializeDB;
