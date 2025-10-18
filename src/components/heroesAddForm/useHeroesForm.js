import { useEffect, useState, useCallback } from "react"
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import { useHttp } from "../../hooks/http.hook";
import { heroesAdd } from "../../actions";

export const useHeroesForm = () => {
	const [elements, setElements] = useState([]);
	const { request } = useHttp();
	const dispatch = useDispatch();

	// Запрос данных для options в select
	useEffect(() => {
		request("http://localhost:3001/filters")
			.then(data => {
				if (data["all"]) {
					delete data["all"];
				}
				setElements(data);
			});
	}, []);

	const handleSubmit = useCallback((body) => {
		body.id = uuidv4();
		request("http://localhost:3001/heroes", "POST", JSON.stringify(body))
			.then(() => dispatch(heroesAdd(body)))
			.catch((err) => console.error(err));
	}, []);

	return {
		elements,
		handleSubmit
	}
}