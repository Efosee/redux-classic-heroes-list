import { legacy_createStore, compose, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

import rootReducer from '../reducers';

const loggerEnchancer = (legacy_createStore) => (...args) => { //args - reducer и initState
	console.log("Original store will modified");

	const store = legacy_createStore(...args);
	const originGetState = store.getState;
	const originalDispatch = store.dispatch;
	let prevState = null;
	// Чтобы prev/new state логировались в getState 1 раз и не дублировались, при вызове каждого useSelect
	let flagWasChange = false;

	// Правильнее логировать было new и prev state в dispatch, но в учебных целях было решено в getState
	store.dispatch = (action) => {
		prevState = originGetState();
		flagWasChange = true;
		const result = originalDispatch(action);
		console.log("dispatch вернул:", result);
		return result;
	}

	store.getState = () => {
		// Если были новые изменения, толко тогда логирование
		// Если не было новых изменений, то не дублировать при каждом вызове через useSelect / connect
		if (flagWasChange) {
			console.log("prev state:", prevState);
			console.log("new state", originGetState())
			flagWasChange = false;
		}
		return originGetState();
	}

	return store;

	// Также можно добавить свое свойство или метод в store:
	// return {...store, newField: "Hello"}
}

// store - только getState и dispatch
// next - следующий middleware, если это последний mw (самый правый), то next = dispatch
const stringMiddleware = (store) => (next) => (action) => { 
	
	if (typeof action === "string"){
		// Можно просто вызвать без return, но если есть mw thunk, то необходимо return
		// И как лучшая практика всегда возвращать значение от mw или dispatch (dispatch возвращает переданный в него action)
		return next({type: action})
	}
	return next(action)
}


const store = legacy_createStore(
	rootReducer,
	compose(
		applyMiddleware(stringMiddleware, thunk),
		loggerEnchancer,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	));

// const store = legacy_createStore(combineReducers({heroes, filters}), 
// 	



export default store;