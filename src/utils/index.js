const dateTransform = (time) => {
	const date = new Date(time * 1000);
	let day = date.getDate().toString().padStart(2, '0');
	let month = (date.getMonth() + 1).toString().padStart(2, '0');
	let year = date.getFullYear();

	return `${day}.${month}.${year}г.`;
};

const dateTransform_2 = (time) => {
	const date = new Date(time * 1000);
	let dd = date.getDate().toString().padStart(2, '0');
	let mm = (date.getMonth() + 1).toString().padStart(2, '0');
	let yyyy = date.getFullYear();
	let hour = date.getHours().toString().padStart(2, '0');
	let min = date.getMinutes().toString().padStart(2, '0');
	return `${hour}:${min} ${dd}.${mm}.${yyyy} г.`;
};

export {
	dateTransform,
	dateTransform_2
}