import { useState } from "react";
import { useRxCollection, useRxQuery } from "rxdb-hooks";

function TodoList() {
	const [todoString, setTodoString] = useState<string>();
	const collection = useRxCollection("characters");
	const query = collection?.find();
	const { result } = useRxQuery(query);

	return (
		<div className="App">
			<div>
				todo list
				<ul>
					{result.map((todo) => (
						<li>
							{todo.get("text")}

							<button
								onClick={() => {
									todo.remove();
								}}
							>
								delete
							</button>
						</li>
					))}
				</ul>
			</div>
			<div>
				create todo
				<div>
					<input
						value={todoString}
						onChange={(e) => {
							setTodoString(e.target.value);
						}}
					/>
					<button
						onClick={() => {
							collection?.insert({
								id: todoString,
								text: todoString,
								isCompleted: false,
								createdAt: new Date(),
							});
						}}
					>
						create
					</button>
				</div>
			</div>
		</div>
	);
}

export default TodoList;
