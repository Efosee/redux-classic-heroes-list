# Redux Classic Heroes List - Панель администратора для портала с героями

**RUSSIAN** | [**English version README**](./README.md)

Учебный проект на React с классическим Redux (без Redux Toolkit) для управления списком героев с использованием JSON Server в качестве fake backend.

👉[**Версия с RTK**](https://github.com/Efosee/) (*Еще не добавлена*)

## Содержание
- [Цели проекта](#-цели-проекта)
- [Технологии](#-технологии)
- [Структура проекта](#-структура-проекта)
- [Быстрый старт](#-быстрый-старт)
- [Функциональность](#-функциональность)
- [Архитектура Redux](#-архитектура-redux)
- [Ключевые концепции Redux](#-ключевые-концепции-redux)
- [Чему научился](#-чему-научился-в-этом-проекте)
- [Сравнение с RTK](#-сравнение-с-rtk)

## 🎯 Цели проекта

- Изучить основы Redux: store, actions, reducers
- Освоить ручную настройку Redux без абстракций
- Практиковать работу с асинхронными действиями через Redux Thunk
- Реализовать middleware и кастомные enhancers
- Создать собственные selectors через createSelector
- Интегрировать React с классическим Redux через хуки useSelector/useDispatch
- Реализовать сложную фильтрацию с множественным выбором (при помощи кастомного select)

## 🛠 Технологии

**Основные:**
- React 18
- Redux 
- React-Redux
- Redux Thunk

**Вспомогательные:**
- JSON Server (fake backend)
- Concurrently (параллельный запуск)
- Bootstrap 5 (стилизация)
- React Hook Form + Yup (валидация форм)
- React Transition Group (анимации)
- UUID (генерация id)
- SASS/SCSS (стили)

## 📁 Структура проекта

```text
src/
├── actions/          # Action creators
│ └── index.js
├── reducers/         # Reducers
│ ├── heroes.js
│ ├── filters.js
│ └── index.js
├── components/       # React компоненты
│ ├── app/            # Главный компонент
│ ├── heroesList/     # Список героев
│ ├── heroesListItem/ # Элемент списка
│ ├── heroesAddForm/  # Форма добавления
│ ├── heroesFilters/  # Фильтры
│ └── spinner/        # Индикатор загрузки
├── hooks/            # Кастомные хуки
│ └── http.hook.js
├── store/            # Конфигурация store
│ └── index.js
└── styles/           # Стили
└── index.scss
```
## 🚀 Быстрый старт

```bash
# Установить зависимости
npm install
```

```bash
# Запустить приложение и JSON Server (с использованием Concurrently)
npm start
```

Приложение будет доступно на http://localhost:3000, а JSON Server на http://localhost:3001

## 📊 Функциональность

### Управление героями

- Просмотр списка героев с сервера с анимациями
- Добавление нового героя (name, description, element) с валидацией
- Удаление героя (из Redux и JSON Server)
- Автоматическая генерация ID через UUID

### Фильтрация

- Множественные фильтры по стихиям: Огонь, Вода, Ветер, Земля
- Динамические кнопки фильтров формируются из данных сервера
- Select options для формы также из данных сервера
- Сброс фильтров к состоянию "Все"

## Данные

### Структура героя:

```json
{
  "id": "uuid-строка",
  "name": "Имя героя",
  "description": "Описание способностей",
  "element": "enum(fire, water, wind, earth)"
}
```
### Фильтры с сервера:

```json
{
  "all": "Все",
  "fire": "Огонь", 
  "water": "Вода",
  "wind": "Ветер",
  "earth": "Земля"
}
```

## Архитектура Redux

### Store Configuration

**Кастомные middleware и enhancers:**

- stringMiddleware для обработки строковых actions
- loggerEnchancer для логирования состояний
- Redux Thunk для асинхронных действий
- Redux DevTools Extension для отладки

**Reducers:**

- `heroes` reducer - управление состоянием героев и статусом загрузки
- `filters` reducer - управление активными фильтрами
- использование `combineReducers` для объединения

### Actions
- Синхронные: heroesFetched, heroesDelete, heroesAdd, heroesFilters
- Асинхронные: fetching (через Thunk)
- Строковые actions: heroesFetching (обрабатывается кастомным mw - stringMiddleware)
- Обработка ошибок: heroesFetchingError

### 🎓 Ключевые концепции Redux
1. Кастомный Enhancer (loggerEnchancer)
```javascript
const loggerEnchancer = (legacy_createStore) => (...args) => { //args - reducer и initState
	console.log("Original store will modified");

	const store = legacy_createStore(...args);
	const originGetState = store.getState;
	const originalDispatch = store.dispatch;
	let prevState = null;
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

2. Middleware цепочка
```javascript
// stringMiddleware → thunk → dispatch
// Обработка строковых actions и асинхронных функций
```

3. Selectors с Reselect
```javascript
// createSelector для мемоизации фильтрации
const selectFiltredHeroes = createSelector(
  [heroes, filters],
  (heroes, filters) => {
    if (filters.includes("all")) return heroes;
    return heroes.filter(hero => filters.includes(hero.element));
  }
);
```

4. Асинхронные действия с Thunk
```javascript
export const fetching = (request) => (dispatch) => {
  dispatch(heroesFetching());
  request("http://localhost:3001/heroes")
    .then(data => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()))
}
```

## 📚 Чему научился в этом проекте

- Ручная настройка Redux store без RTK
- Создание кастомных middleware и enhancers
- Работа с Redux Thunk для асинхронных операций
- Использование createSelector для мемоизации и сложной логики (фильтрации)
- Интеграция React с Redux через хуки
- Структурирование actions и reducers


## 🔄 Сравнение с RTK
Этот проект демонстрирует "классический" подход к Redux. Версия с RTK показывает как те же функции реализуются с современными инструментами.

**Основные отличия от RTK:**

- Ручная настройка store вместо configureStore
- Ручные action creators вместо createSlice
- Ручные reducers вместо createReducer
- Явное использование combineReducers
- Кастомные middleware вместо встроенных

## _Примечание_:
Проект создан **в учебных целях для глубокого понимания Redux** перед переходом к современным абстракциям.
