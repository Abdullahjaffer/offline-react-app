import { useState } from "react";
import { RxDatabase } from "rxdb";
import { Provider } from "rxdb-hooks";
import EnterPassword from "../../components/enter-password";
import initializeDB from "../initializeDB";

const RXDBProvider = ({ children }: any) => {
	const [db, setDb] = useState<RxDatabase>();
	const [error, setError] = useState("");

	const init = (username: string, password: string) => {
		console.log(password);
		initializeDB(username, password)
			.then(setDb)
			.catch((errCode) => {
				if (errCode === "DB1") {
					console.log("wrong password");
					setError("Wrong password!");
				}
				if (errCode === "EN2") {
					setError("Password must be 8 characters long!");
				}
			});
	};

	if (!db) {
		return (
			<EnterPassword onComplete={init} error={error} setError={setError} />
		);
	}

	return <Provider db={db}>{children}</Provider>;
};

export default RXDBProvider;
