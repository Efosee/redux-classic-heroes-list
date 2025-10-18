
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";

import { schemaValidatiton } from './config';

import { useHeroesForm } from './useHeroesForm';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
	const {elements, handleSubmit: onSubmit} = useHeroesForm();
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({ resolver: yupResolver(schemaValidatiton()) });

	return (
		<form className="border p-4 shadow-lg rounded" onSubmit={handleSubmit(onSubmit)}>
			<div className="mb-3">
				<label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
				<input
				{...register("name")}
					type="text"
					className="form-control"
					id="name"
					placeholder="Как меня зовут?" />
				<div className="error">{errors?.name?.message}</div>
			</div>

			<div className="mb-3">
				<label htmlFor="description" className="form-label fs-4">Описание</label>
				<textarea
				{...register("description")}
					className="form-control"
					id="description"
					placeholder="Что я умею?"
					style={{ "height": '130px' }} />
				<div className="description">{errors?.description?.message}</div>
			</div>

			<div className="mb-3">
				<label htmlFor="element" className="form-label">Выбрать элемент героя</label>
				<select
					{...register("element")}
					className="form-select"
					id="element"
					defaultValue="">
					<option value="" disabled>Я владею элементом...</option>
					{Object.entries(elements).map(([value, label]) =>{
						return <option key={value} value={value}>{label}</option>
					})}
				</select>
				<div className="element">{errors?.element?.message}</div>
			</div>

			<button type="submit" className="btn btn-primary">Создать</button>
		</form>
	)
}

export default HeroesAddForm;