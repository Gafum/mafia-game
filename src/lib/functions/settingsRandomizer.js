import { cardRulesConst } from '$lib/data';
import { findSpecialKeys, maxPlayerAmount } from '$lib/functions/findSpecialKeys';

function createSpecialRolesList() {
	const start = 0.2;
	const step = 0.05;
	const max = 0.7;

	return findSpecialKeys().map((key, i) => {
		let chance = Math.min(max, start + Math.log(i + 1) * step);

		if (chance > max) chance = max;

		return { key, chance };
	});
}

const specialRolesList = createSpecialRolesList();

export function generateGame(targetTotal) {
	let total = Math.min(maxPlayerAmount, Math.max(3, targetTotal));

	let roles = {};
	specialRolesList.forEach((r) => (roles[r.key] = false));

	// мафія
	let mafias = Math.min(
		cardRulesConst.mafias,
		Math.max(1, Math.floor(total / ((Math.random() - 0.5) * 2.4 + 3.5)))
	);

	let remaining = total - mafias;

	// якщо багато людей — включаємо всі ролі
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

	// мирні
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
