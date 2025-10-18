import { createSelector } from "@reduxjs/toolkit";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useEffect, useCallback, useMemo } from "react";

import { useHttp } from '../../hooks/http.hook';
import { fetching, heroesFetchingError, heroesDelete } from '../../actions';

const selectFiltredHeroes = createSelector(
	[
		(state) => state.heroes.heroes,
		(state) => state.filters.filters
	],
	(heroes, filters) => {
		if (filters.includes("all")) {
			return [...heroes]
		}
		return heroes.filter(hero => filters.includes(hero.element));
	})

export const useHeroesList = () => {
	const { filters, heroes, heroesLoadingStatus } = useSelector(state => ({
		filters: state.filters.filters,
		heroes: state.heroes.heroes,
		heroesLoadingStatus: state.heroes.heroesLoadingStatus
	}), shallowEqual);
	const filtredHeroes = useSelector(selectFiltredHeroes);
	const dispatch = useDispatch();
	const { request } = useHttp();

	useEffect(() => {
		dispatch(fetching(request));
		// eslint-disable-next-line
	}, []);

	/* Вместо этой переменной делаем createSelector (reselect)
	const filtredHeroes = useMemo(() => {
		if (filters.includes("all")) {
			return [...heroes]
		}
		return heroes.filter((hero) => filters.includes(hero.element));
	}, [filters, heroes]);
	*/


	const handleDelete = useCallback(async (id, nodeRefs) => {
		try {
			await request(`http://localhost:3001/heroes/${id}`, "DELETE");
			dispatch(heroesDelete(id));
			delete nodeRefs.current[id];
		} catch {
			dispatch(heroesFetchingError());
		}
	}, []);

	return {
		heroes,
		heroesLoadingStatus,
		handleDelete,
		filtredHeroes
	}
}