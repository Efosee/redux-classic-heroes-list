import * as Yup from "yup";

export const schemaValidatiton = (elementsOptions) => {
	const elements = elementsOptions || [
		"fire",
		"water",
		"wind",
		"earth"
	]

	return Yup.object({
		"name": Yup.string().required("Обязательное поле!").min(3, "Минимум символов 3"),
		"description": Yup.string().required("Обязательное поле!").min(5, "Минимум символов 5"),
		"element": Yup.string().required("Обязательное поле!").oneOf(elements, 'Можно выбрать только из "Вода", "Огонь", "Земля", "Воздух"')
	})
}