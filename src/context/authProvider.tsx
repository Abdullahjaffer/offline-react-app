import {
	Dispatch,
	ReactElement,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from "react";

const AuthContext = createContext<{
	showChangePassword: boolean;
	setShowChangePassword: Dispatch<SetStateAction<boolean>>;
	username: string;
	setUsername: Dispatch<SetStateAction<string>>;
}>({
	showChangePassword: false,
	setShowChangePassword: () => {},
	username: "",
	setUsername: () => {},
});

export const AuthProvider = ({ children }: { children: ReactElement }) => {
	const [showChangePassword, setShowChangePassword] = useState(false);
	const [username, setUsername] = useState("");

	return (
		<AuthContext.Provider
			value={{
				showChangePassword: showChangePassword,
				setShowChangePassword: setShowChangePassword,
				username,
				setUsername,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const p = useContext(AuthContext);
	return p;
};
