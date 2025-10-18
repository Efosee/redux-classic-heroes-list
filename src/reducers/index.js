import { combineReducers } from "@reduxjs/toolkit";

import heroes from "./heroes";
import filters from "./filters";

// Теперь state: {heroes: ... , fiters: ...}
const rootReducer = combineReducers({heroes, filters});
export default rootReducer;




/* Старый reducer (все в одном)
const initialState = {
	heroes: [],
	heroesLoadingStatus: 'idle',
	filters: ["all"]
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'HEROES_FETCHING':
			return {
				...state,
				heroesLoadingStatus: 'loading'
			}
		case 'HEROES_FETCHED':
			return {
				...state,
				heroes: action.payload,
				heroesLoadingStatus: 'idle'
			}
		case 'HEROES_FETCHING_ERROR':
			return {
				...state,
				heroesLoadingStatus: 'error'
			}
		case 'HEROES_DELETE':
			return {
				...state,
				heroes: state.heroes.filter((hero) => hero.id !== action.payload)
			}
		case "HEROES_FILTER":
			return {
				...state,
				filters: action.payload
			}
		case "HEROES_ADD":
			return{
				...state,
				heroes: [action.payload, ...state.heroes]
			}
		default: return state
	}
}

export default reducer;
*/