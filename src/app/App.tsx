import ChangePasswordButton from "../components/change-password-button";
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
				<TodoList />
			</RXDBProvider>
		</AuthProvider>
	);
}

export default App;
