
export const setColorClass = (element) => {
	const colors = {
		all: "btn-outline-dark",
		fire: "btn-danger",
		water: "btn-primary",
		wind: "btn-success",
		earth: "btn-secondary"
	};

	return colors[element];
}