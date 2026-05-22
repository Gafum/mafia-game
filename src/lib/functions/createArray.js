import Randomizer from '$lib/Servises/Randomizer.servise';
import { addKeyToObjects } from '$lib/functions/addKeyToObjects';

export function createArray({ mans = 3, mafias = 1, ...specialRoles }) {
	const result = [];

	for (let i = 0; i < mans; i++) result.push('mans');
	for (let i = 0; i < mafias; i++) result.push('mafias');

	for (const role in specialRoles) {
		if (specialRoles[role]) {
			result.push(role);
		}
	}

	return addKeyToObjects(
		Randomizer.shuffleArray(
			result.map((tag) => {
				return {
					tag
				};
			})
		),
		'myIndex'
	);
}
