import { cardList } from '$lib/data';

export function createListByTags() {
	const tagMap = {};

	// tagMap = {mans: [{ name: 'Мирний', description: 'Квасний Сас', myImg: 'Man1', tag: "mans"},...],...}

	for (const card of cardList) {
		if (!tagMap[card.tag]) {
			tagMap[card.tag] = [];
		}
		tagMap[card.tag].push(card);
	}

	return tagMap;
}

export let tagMap = createListByTags();
