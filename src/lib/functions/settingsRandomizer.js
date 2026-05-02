export const specialRolesList = [
	{ key: 'cop', chance: 0.2 },
	{ key: 'doctor', chance: 0.2 },
	{ key: 'maniac', chance: 0.5 },
	{ key: 'lawyer', chance: 0.7 },
	{ key: 'security', chance: 0.7 },
	{ key: 'kamikaze', chance: 0.8 }
];

export function generateGame(targetTotal) {
	let total = Math.min(50, Math.max(3, targetTotal));

	let roles = {};
	specialRolesList.forEach((r) => (roles[r.key] = false));

	// мафія
	let mafias = Math.min(20, Math.max(1, Math.floor(total / ((Math.random() - 0.5) * 2.4 + 3.5))));
	let remaining = total - mafias;

	// якщо багато людей — включаємо всі ролі
	if (total >= 24) {
		specialRolesList.forEach((r) => {
			roles[r.key] = true;
			remaining--;
		});
	} else {
		for (let r of specialRolesList) {
			if (remaining > 1 && Math.random() > 0.2) {
				roles[r.key] = true;
				remaining--;
			}
		}
	}

	// мирні
	let mans = Math.min(24, Math.max(1, remaining));
	remaining -= mans;

	if (remaining > 0) {
		mafias = Math.min(20, Math.max(1, mafias + remaining));
	}

	return {
		mans,
		mafias,
		...roles
	};
}
