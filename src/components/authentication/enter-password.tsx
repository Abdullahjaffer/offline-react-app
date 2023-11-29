import { useState } from "react";

const EnterPassword = ({ onComplete, error, setError }: any) => {
	const [password, setPassword] = useState<string>("");
	const [username, setUsername] = useState<string>("");

	return (
		<>
			<input
				onChange={(e) => {
					setUsername(e.target.value);
				}}
			/>
			<input
				type="password"
				onChange={(e) => {
					setPassword(e.target.value);
					setError("");
				}}
			/>
			<button
				onClick={() => {
					onComplete(username, password);
				}}
			>
				Login
			</button>
			{error}
		</>
	);
};

export default EnterPassword;
