import { useState } from "react";
import { useAuth } from "../context/authProvider";
import { changePassword } from "../utils/auth";

const ChangePassword = ({ onComplete, error, setError }: any) => {
	const [oldPassword, setOldPassword] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");

	const { setShowChangePassword, username } = useAuth();

	return (
		<>
			<input
				placeholder="old password"
				onChange={(e) => {
					setOldPassword(e.target.value);
				}}
			/>
			<input
				placeholder="new password"
				onChange={(e) => {
					setPassword(e.target.value);
				}}
			/>
			<input
				placeholder="confirm password"
				onChange={(e) => {
					setConfirmPassword(e.target.value);
				}}
			/>
			<button
				onClick={() => {
					changePassword(username, oldPassword, password);
					setShowChangePassword(false);
				}}
				disabled={!password || password !== confirmPassword}
			>
				Change
			</button>
			{error}
		</>
	);
};

export default ChangePassword;
