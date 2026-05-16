export function addRandomID(list) {
	return list.map((element, index) => {
		return { ...element, id: index };
	});
}
