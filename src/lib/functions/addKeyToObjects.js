export function addKeyToObjects(list, keyName = 'id') {
	return list.map((element, index) => ({
		...element,
		[keyName]: index
	}));
}
