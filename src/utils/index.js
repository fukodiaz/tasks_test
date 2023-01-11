const dateTransform = (time) => {
	const date = new Date(time * 1000);
	let day = date.getDate().toString().padStart(2, '0');
	let month = (date.getMonth() + 1).toString().padStart(2, '0');
	let year = date.getFullYear();

	return `${day}.${month}.${year}г.`;
};

export {
	dateTransform
}