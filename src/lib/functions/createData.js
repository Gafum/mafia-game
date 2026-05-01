import { cardList } from '$lib/data';
import Randomizer from '$lib/Servises/Randomizer.servise';

export default function createArray({ mans = 3, mafias = 1 }) {
	let result = [];

	for (let i = 0; i < mans; i++) {
		const mansList = cardList.filter((element) => element.tag === 'mans');
		if (mansList.length > 0) {
			result.push(mansList[Randomizer.randomInteger(0, mansList.length - 1)]);
		}
	}

	for (let i = 0; i < mafias; i++) {
		const mafiaList = cardList.filter((element) => element.tag === 'mafias');
		if (mafiaList.length > 0) {
			result.push(mafiaList[Randomizer.randomInteger(0, mafiaList.length - 1)]);
		}
	}

	const tagsToInclude = JSON.parse(JSON.stringify(arguments));
	delete tagsToInclude.mans;
	delete tagsToInclude.mafias;

	result = [...result, ...cardList.filter((element) => tagsToInclude[element.tag])];

	return Randomizer.shuffleArray(result);
}
