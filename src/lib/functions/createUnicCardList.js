import { cardList, bigDescriptionList } from '$lib/data';
import Randomizer from '$lib/Servises/Randomizer.servise';

export default function createUniqueCardList() {
	const tagMap = {};

	// tagMap = {mans: [{ name: 'Мирний', description: 'Квасний Сас', myImg: 'Man1', tag: "mans"},...],...}

	for (const card of cardList) {
		if (!tagMap[card.tag]) {
			tagMap[card.tag] = [];
		}
		tagMap[card.tag].push(card);
	}

	// selectedCards = [{ name: 'Мирний', description: 'Квасний Сас', myImg: 'Man1', tag: "mans", bigDescription: "Персонажі, що виживають у боротьбі з мафією і намагаються вивести її на чисту воду. Відбір кандидатів на роль мафії відбувається під час денного голосування."},...]
	return Object.entries(tagMap).map(([tag, cards]) => {
		const selectedElement = cards[Randomizer.randomInteger(0, cards.length - 1)];
		return {
			...selectedElement,
			name: bigDescriptionList[tag].name,
			bigDescription: bigDescriptionList[tag].description
		};
	});
}
