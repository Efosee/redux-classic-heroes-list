import { useSelector, useDispatch } from "react-redux";
import { heroesFilters } from "../../actions";
import { useHttp } from "../../hooks/http.hook";
import { useCallback, useEffect, useState } from "react";
export const useFilters = () => {
	const [filtersConfig, setFiltersConfig] = useState({});
	const { request } = useHttp();
	const filters = useSelector(state => state.filters.filters);
	const dispatch = useDispatch();

	const toggleFilters = useCallback((filter) => {
		let newFilters = [...filters];
		//Если есть фильтр all, то убираем его
		if (filters.includes("all")) {
			newFilters = filters.filter(f => f !== "all");
		}
		// Если фильтр есть, то убираем его из массива, а если его там нет - добавляем!
		if (filters.includes(filter)) {
			newFilters = newFilters.filter(f => f !== filter);
			// Если фильтров больше нет, то сбрасываем
			newFilters.length > 0 ?
				dispatch(heroesFilters(newFilters)) :
				resetFilters();
		} else {
			dispatch(heroesFilters([...newFilters, filter]))
		}


	}, [filters]);

	const resetFilters = useCallback(() => {
		dispatch(heroesFilters(["all"]));
	}, []);

	const isActive = useCallback((filter) => {
		return filters?.includes(filter) || false;
	}, [filters]);

	const hasActiveFilters = useCallback(() => {
		return filters.some(f => f !== "all");
	}, [filters]);

	useEffect(() => {
		request("http://localhost:3001/filters")
			.then(data => setFiltersConfig(data));
	}, [])

	return {
		toggleFilters,
		isActive,
		resetFilters,
		hasActiveFilters,
		filtersConfig
	}
}