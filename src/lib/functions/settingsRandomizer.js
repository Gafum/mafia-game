import cardRulesConst from '$lib/data/cardRulesConst.json';
import { findSpecialKeys, getMaxPlayerAmount } from '$lib/functions/findSpecialKeys';

function createSpecialRolesList(activeKeys) {
	const start = 0.2;
	const step = 1 / (activeKeys.length * 2 || 1);
	const max = 0.7;

	return activeKeys.map((key, i) => {
		let chance = Math.min(max, start + Math.log(i + 1) * step);
		if (chance > max) chance = max;
		return { key, chance };
	});
}

export function generateGame(targetTotal) {
	const currentKeys = findSpecialKeys();
	const specialRolesList = createSpecialRolesList(currentKeys);

	let total = Math.min(getMaxPlayerAmount(), Math.max(3, targetTotal));

	let roles = {};
	specialRolesList.forEach((r) => (roles[r.key] = false));

	// Розрахунок мафії
	let mafias = Math.min(
		cardRulesConst.mafias,
		Math.max(1, Math.floor(total / ((Math.random() - 0.5) * 2.4 + 3.5)))
	);

	let remaining = total - mafias;

	// Якщо багато людей — включаємо всі ролі і кастомні також
	if (total >= cardRulesConst.mans) {
		specialRolesList.forEach((r) => {
			roles[r.key] = true;
			remaining--;
		});
	} else {
		for (let r of specialRolesList) {
			if (remaining > 1 && Math.random() > r.chance) {
				roles[r.key] = true;
				remaining--;
			}
		}
	}

	// Розрахунок мирних
	let mans = Math.min(cardRulesConst.mans, Math.max(1, remaining));
	remaining -= mans;

	if (remaining > 0) {
		mafias = Math.min(cardRulesConst.mafias, mafias + remaining);
	}

	return {
		mans,
		mafias,
		...roles
	};
}
