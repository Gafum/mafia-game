import { cardList } from '$lib/data';
import { cards } from '$lib/stores';

export function createListByTags() {
	const tagMap = {};

	for (const card of cardList) {
		if (!tagMap[card.tag]) {
			tagMap[card.tag] = [];
		}
		tagMap[card.tag].push(card);
	}

	return tagMap;
}

export let tagMap = createListByTags();

// Keep tagMap in sync with the reactive cards store dynamically
if (typeof window !== 'undefined') {
	cards.subscribe(($cards) => {
		const newTagMap = {};
		for (const card of $cards) {
			if (!newTagMap[card.tag]) {
				newTagMap[card.tag] = [];
			}
			newTagMap[card.tag].push(card);
		}
		// Empty the map and copy everything from newTagMap
		for (const key in tagMap) {
			delete tagMap[key];
		}
		Object.assign(tagMap, newTagMap);
	});
}
