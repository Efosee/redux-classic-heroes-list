// При вызове передаем request и возвращаем в dispatch функцию (а не объект)
// А mw "thunk" получит функцию (dispatch) => ... и сам передаст dispatch
export const fetching = (request) => (dispatch) => {
	dispatch(heroesFetching());
	request("http://localhost:3001/heroes")
		.then(data => dispatch(heroesFetched(data)))
		.catch(() => dispatch(heroesFetchingError()))
}

export const heroesFetching = () => {
	// middleware (mw) stringMiddleware обработает текстовый action и вернет:
	// {type: action}, где action = 'HEROES_FETCHING'
	return 'HEROES_FETCHING';
}

export const heroesFetched = (heroes) => {
	return {
		type: 'HEROES_FETCHED',
		payload: heroes
	}
}

export const heroesFetchingError = () => {
	return {
		type: 'HEROES_FETCHING_ERROR'
	}
}

export const heroesDelete = (id) => {
	return {
		type: 'HEROES_DELETE',
		payload: id
	}
}

export const heroesFilters = (filters) => {
	return {
		type: "HEROES_FILTER",
		payload: filters
	}
}

export const heroesAdd = (hero) => {
	return {
		type: "HEROES_ADD",
		payload: hero
	}
}

