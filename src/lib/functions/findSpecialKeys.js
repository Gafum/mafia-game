import { get } from 'svelte/store';
import cardRulesConst from '$lib/data/cardRulesConst.json';
import { cardRules } from '$lib/stores';

export function findSpecialKeys() {
	if (typeof window === 'undefined') {
		return Object.keys(cardRulesConst).filter((k) => !['mans', 'mafias'].includes(k));
	}

	const currentRules = get(cardRules);

	return Object.keys(currentRules).filter((k) => !['mans', 'mafias'].includes(k));
}

export function getMaxPlayerAmount() {
	const res = findSpecialKeys().length + cardRulesConst.mafias + cardRulesConst.mans;

	return res;
}
