import { cardRulesConst } from '$lib/data';
import { cardRules } from '$lib/stores';

export function findSpecialKeys() {
	let currentRules = cardRulesConst;
	if (typeof window !== 'undefined') {
		cardRules.subscribe(($rules) => {
			currentRules = $rules;
		})();
	}
	return Object.keys(currentRules).filter((k) => !['mans', 'mafias'].includes(k));
}

// Generous upper limit or dynamic calculation
export const maxPlayerAmount = 100;
