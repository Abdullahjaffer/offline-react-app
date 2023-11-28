import { useRef } from "react";
import { useRxDB } from "rxdb-hooks";

export const Export = () => {
	const db = useRxDB();

	const downloadFile = ({ data, fileName, fileType }: any) => {
		// Create a blob with the data we want to download as a file
		const blob = new Blob([data], { type: fileType });
		// Create an anchor element and dispatch a click event on it
		// to trigger a download
		const a = document.createElement("a");
		a.download = fileName;
		a.href = window.URL.createObjectURL(blob);
		const clickEvt = new MouseEvent("click", {
			view: window,
			bubbles: true,
			cancelable: true,
		});
		a.dispatchEvent(clickEvt);
		a.remove();
	};
	const exportToJson = (json: any) => {
		downloadFile({
			data: JSON.stringify(json),
			fileName: "back-up.json",
			fileType: "text/json",
		});
	};

	return (
		<>
			<button
				onClick={() => {
					db.exportJSON().then((json) => exportToJson(json));
				}}
			>
				Export
			</button>
		</>
	);
};

export const Import = () => {
	const db = useRxDB();
	const jsonFromFile = useRef();
	const handleChange = (e: any) => {
		const fileReader = new FileReader();
		fileReader.readAsText(e.target.files[0], "UTF-8");
		fileReader.onload = (e) => {
			const jsonString = e.target?.result;
			console.log(jsonString);
			if (jsonString) {
				jsonFromFile.current = JSON.parse(jsonString as string);
			}
		};
	};
	return (
		<div>
			<input type="file" onChange={handleChange} />
			<button
				onClick={() => {
					db.importJSON(jsonFromFile.current as any)
						.then(() => console.log("done"))
						.catch(console.log);
				}}
			>
				Import
			</button>
		</div>
	);
};
