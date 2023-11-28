import _ from "lodash";
import { LOCAL_PASS_STORE_KEY, PASSWORD_PREFIX } from "./constants/keys";
import { decryptData, encryptData } from "./encryption";
import makeUniqueId from "./makeId";

export const getRegisteredDatabases = () =>
	indexedDB.databases().then((r) => {
		let t = r.map(({ name }) => {
			let tmp = name?.replace("rxdb-dexie-", "");
			tmp = tmp?.split("--0--")[0];
			return tmp;
		});
		return _.uniq(t);
	});

// As there is no option in RXDB to change password for a database so we
// store a random pass encrypted with the actual pass to get the user signed
// in by decryting the password with user provided password(in short is used as
// secret key)

export const storeDatabasePasswordToLocal = (
	name: string,
	password: string,
	key = makeUniqueId(12)
) => {
	const pass = PASSWORD_PREFIX + key;
	const encryptedPass = encryptData(pass, password);
	let store: any = {};
	if (localStorage.getItem(LOCAL_PASS_STORE_KEY)) {
		store = JSON.parse(localStorage.getItem(LOCAL_PASS_STORE_KEY)!);
	}
	store[name] = encryptedPass;
	localStorage.setItem(LOCAL_PASS_STORE_KEY, JSON.stringify(store));
	return key;
};

export const getDatabasePasswordFromLocal = (
	name: string,
	password: string
) => {
	let store: any = {};
	if (localStorage.getItem(LOCAL_PASS_STORE_KEY)) {
		store = JSON.parse(localStorage.getItem(LOCAL_PASS_STORE_KEY)!);
	}
	const storedPass = store[name];
	if (!storedPass) {
		throw new Error("no existing password found");
	}
	try {
		const decrypted = decryptData(storedPass, password);
		if (!decrypted.includes(PASSWORD_PREFIX)) {
			throw new Error("password doesn't match");
		} else {
			return decrypted.replace(PASSWORD_PREFIX, "");
		}
	} catch (e) {
		throw new Error("password doesn't match");
	}
};

export const changePassword = (
	name: string,
	oldPassword: string,
	newPassword: string
) => {
	const key = getDatabasePasswordFromLocal(name, oldPassword);
	storeDatabasePasswordToLocal(name, newPassword, key);
};
