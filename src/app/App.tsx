import TodoList from "../components/todoList";
import RXDBProvider from "../rxDB/rxDBProvider";
import "./App.css";

function App() {
	return (
		<RXDBProvider>
			<div className="App">Hello world</div>
			<TodoList />
		</RXDBProvider>
	);
}

export default App;
