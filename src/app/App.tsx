import ChangePasswordButton from "../components/change-password-button";
import { Export, Import } from "../components/exportImport";
import TodoList from "../components/todoList";
import { AuthProvider } from "../context/authProvider";
import RXDBProvider from "../rxDB/rxDBProvider";
import "./App.css";

function App() {
	return (
		<AuthProvider>
			<RXDBProvider>
				<div className="App">Hello world</div>
				<button
					onClick={() => {
						window.location.reload();
					}}
				>
					log out
				</button>
				<ChangePasswordButton />
				<Export />
				<Import />
				<TodoList />
			</RXDBProvider>
		</AuthProvider>
	);
}

export default App;
