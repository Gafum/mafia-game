import { cardRulesConst } from '$lib/data';

export function findSpecialKeys() {
	return Object.keys(cardRulesConst).filter((k) => !['mans', 'mafias'].includes(k));
}

export const maxPlayerAmount =
	findSpecialKeys().length + cardRulesConst.mafias + cardRulesConst.mans;
