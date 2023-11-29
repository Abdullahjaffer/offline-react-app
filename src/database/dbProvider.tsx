import { useEffect, useState } from "react";
import { RxDatabase } from "rxdb";
import { Provider } from "rxdb-hooks";
import ChangePassword from "../components/authentication/change-password";
import EnterPassword from "../components/authentication/enter-password";
import { useAuth } from "../context/authProvider";
import { getRegisteredDatabases } from "../utils/auth";
import initializeDB from "./initializeDB";

const RXDBProvider = ({ children }: any) => {
	const [db, setDb] = useState<RxDatabase>();
	const [error, setError] = useState("");
	const { setUsername } = useAuth();

	const { showChangePassword } = useAuth();

	const [registerDB, setRegisteredDBs] = useState([]);
	useEffect(() => {
		getRegisteredDatabases().then((r: any) => {
			setRegisteredDBs(r);
		});
	}, []);

	const init = (username: string, password: string) => {
		initializeDB(username, password)
			.then((db) => {
				setDb(db);
				setUsername(username);
			})
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
			<>
				<EnterPassword onComplete={init} error={error} setError={setError} />
				<ul>
					{registerDB.map((dbName) => (
						<li>{dbName}</li>
					))}
				</ul>
			</>
		);
	}

	if (showChangePassword) {
		return <ChangePassword />;
	}

	return <Provider db={db}>{children}</Provider>;
};

export default RXDBProvider;
