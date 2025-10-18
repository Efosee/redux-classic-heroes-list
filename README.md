# Redux Classic Heroes List - Admin Panel for Heroes Portal

[**Russian version README**](./README_RU.md) | **ENGLISH**

Educational project on React with classic Redux (without Redux Toolkit) for managing a list of heroes using JSON Server as a fake backend.

👉[**RTK Version**](https://github.com/Efosee/) (*Not yet added*)

## Table of Contents
- [Project Goals](#-project-goals)
- [Technologies](#-technologies)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Features](#-features)
- [Redux Architecture](#-redux-architecture)
- [Key Redux Concepts](#-key-redux-concepts)
- [What I Learned](#-what-i-learned-in-this-project)
- [Comparison with RTK](#-comparison-with-rtk)

## 🎯 Project Goals

- Learn Redux fundamentals: store, actions, reducers
- Master manual Redux setup without abstractions
- Practice working with asynchronous actions via Redux Thunk
- Implement middleware and custom enhancers
- Create custom selectors using createSelector
- Integrate React with classic Redux through useSelector/useDispatch hooks
- Implement complex filtering with multiple selection (using custom select)

## 🛠 Technologies

**Core:**
- React 18
- Redux 
- React-Redux
- Redux Thunk

**Additional:**
- JSON Server (fake backend)
- Concurrently (parallel execution)
- Bootstrap 5 (styling)
- React Hook Form + Yup (form validation)
- React Transition Group (animations)
- UUID (id generation)
- SASS/SCSS (styles)

## 📁 Project Structure
```text
src/
├── actions/          # Action creators
│ └── index.js
├── reducers/         # Reducers
│ ├── heroes.js
│ ├── filters.js
│ └── index.js
├── components/       # React components
│ ├── app/            # Main component
│ ├── heroesList/     # Heroes list
│ ├── heroesListItem/ # List item
│ ├── heroesAddForm/  # Add form
│ ├── heroesFilters/  # Filters
│ └── spinner/        # Loading indicator
├── hooks/            # Custom hooks
│ └── http.hook.js
├── store/            # Store configuration
│ └── index.js
└── styles/           # Styles
    └── index.scss
```

## 🚀 Quick Start
```bash
# Install dependencies
npm install
```
```bash
# Run application and JSON Server (using Concurrently)
npm start
```

The application will be available at http://localhost:3000, and JSON Server at http://localhost:3001

## 📊 Features

### Hero Management

- View list of heroes from server with animations
- Add new hero (name, description, element) with validation
- Delete hero (from Redux and JSON Server)
- Automatic ID generation via UUID

### Filtering

- Multiple filters by elements: Fire, Water, Wind, Earth
- Dynamic filter buttons formed from server data
- Select options for form also from server data
- Reset filters to "All" state

## Data

### Hero Structure:
```json
{
  "id": "uuid-string",
  "name": "Hero name",
  "description": "Abilities description",
  "element": "enum(fire, water, wind, earth)"
}
```

### Filters from Server:
```json
{
  "all": "All",
  "fire": "Fire", 
  "water": "Water",
  "wind": "Wind",
  "earth": "Earth"
}
```

## Redux Architecture

### Store Configuration

**Custom middleware and enhancers:**

- stringMiddleware for handling string actions
- loggerEnchancer for state logging
- Redux Thunk for asynchronous actions
- Redux DevTools Extension for debugging

**Reducers:**

- `heroes` reducer - manages heroes state and loading status
- `filters` reducer - manages active filters
- using `combineReducers` for combination

### Actions
- Synchronous: heroesFetched, heroesDelete, heroesAdd, heroesFilters
- Asynchronous: fetching (via Thunk)
- String actions: heroesFetching (handled by custom mw - stringMiddleware)
- Error handling: heroesFetchingError

### 🎓 Key Redux Concepts

1. Custom Enhancer (loggerEnchancer)
```javascript
const loggerEnchancer = (legacy_createStore) => (...args) => { //args - reducer and initState
	console.log("Original store will modified");

	const store = legacy_createStore(...args);
	const originGetState = store.getState;
	const originalDispatch = store.dispatch;
	let prevState = null;
	let flagWasChange = false;

	// More correct to log new and prev state in dispatch, but for educational purposes it was decided to do in getState
	store.dispatch = (action) => {
		prevState = originGetState();
		flagWasChange = true;
		const result = originalDispatch(action);
		console.log("dispatch returned:", result);
		return result;
	}

	store.getState = () => {
		if (flagWasChange) {
			console.log("prev state:", prevState);
			console.log("new state", originGetState())
			flagWasChange = false;
		}
		return originGetState();
	}

	return store;
}
```

2. Middleware Chain
```javascript
// stringMiddleware → thunk → dispatch
// Handling string actions and asynchronous functions
```

3. Selectors with Reselect
```javascript
// createSelector for memoized filtering
const selectFiltredHeroes = createSelector(
  [heroes, filters],
  (heroes, filters) => {
    if (filters.includes("all")) return heroes;
    return heroes.filter(hero => filters.includes(hero.element));
  }
);
```

4. Asynchronous Actions with Thunk
```javascript
export const fetching = (request) => (dispatch) => {
  dispatch(heroesFetching());
  request("http://localhost:3001/heroes")
    .then(data => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()))
}
```

## 📚 What I Learned in This Project

- Manual Redux store setup without RTK
- Creating custom middleware and enhancers
- Working with Redux Thunk for asynchronous operations
- Using createSelector for memoization and complex logic (filtering)
- Integrating React with Redux through hooks
- Structuring actions and reducers

## 🔄 Comparison with RTK

This project demonstrates the "classic" approach to Redux. The RTK version shows how the same features are implemented with modern tools.

**Main Differences from RTK:**

- Manual store setup instead of configureStore
- Manual action creators instead of createSlice
- Manual reducers instead of createReducer
- Explicit use of combineReducers
- Custom middleware instead of built-in ones

## _Note_:
Project created **for educational purposes to deeply understand Redux** before moving to modern abstractions.
