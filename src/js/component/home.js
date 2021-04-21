import React, { useState, useEffect } from "react";

export function Home() {
	//Función para la lista de tareas
	const [listaDeTareas, setListaDeTareas] = useState([]);

	const MyFunction = e => {
		if (e.key === "Enter") {
			setListaDeTareas([
				...listaDeTareas,
				{ label: e.target.value, done: false }
			]);
			e.target.value = "";
		}
	};

	const EliminarTarea = indexItem => {
		setListaDeTareas(prevState =>
			prevState.filter((todo, index) => index !== indexItem)
		);
	};

	const EliminarTodo = async () => {
		await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/Shar1799",
			{
				method: "DELETE",
				headers: { "Content-Type": "application/json" }
			}
		)
			.then(response => response.json())
			.then(data => console.log(data))
			.catch(error => console.log(error));

		await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/Shar1799",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify([])
			}
		)
			.then(response => response.json())
			.then(data => console.log(data))
			.catch(error => console.log(error));

		fetch("https://assets.breatheco.de/apis/fake/todos/user/Shar1799", {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		})
			.then(response => response.json())
			.then(data => setListaDeTareas(data));
	};

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/Shar1799", {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		})
			.then(response => response.json())
			.then(data => setListaDeTareas(data));
	}, []);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/Shar1799", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(listaDeTareas)
		});
	}, [listaDeTareas]);

	return (
		<div className="container">
			<div className="text-center mt-5">
				<form className="formulario">
					<h1>TO DO LIST </h1>
					<span>Añadir una tarea</span>
					<input
						type="text"
						placeholder="Tarea nueva..."
						onKeyDown={event => MyFunction(event)}
						className="m-2"
					/>
				</form>
			</div>

			<ul className="list-group">
				{listaDeTareas.map((item, index) => {
					return (
						<li
							id="listitem"
							className="list-group-item"
							key={index}>
							{item.label}{" "}
							<span onClick={() => EliminarTarea(index)}>
								<u>Borrar</u>
							</span>
						</li>
					);
				})}

				<div className="container">
					<div className="text-right">
						<button type="button" onClick={() => EliminarTodo()}>
							Eliminar todas las tareas
						</button>
					</div>
				</div>
			</ul>
		</div>
	);
}
