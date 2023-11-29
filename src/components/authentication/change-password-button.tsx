import { useAuth } from "../../context/authProvider";

const ChangePasswordButton = () => {
	const { setShowChangePassword } = useAuth();

	return (
		<button
			onClick={() => {
				setShowChangePassword(true);
			}}
		>
			Change Password
		</button>
	);
};

export default ChangePasswordButton;
