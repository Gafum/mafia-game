// src/lib/utils/customCardsUtils.js
// Business logic helpers for custom cards management

/**
 * Transliterates Ukrainian text to Latin slug format.
 * @param {string} text
 * @returns {string} Cleaned slug
 */
export function slugify(text) {
	if (!text || typeof text !== 'string') {
		return 'role_' + Math.random().toString(36).substring(2, 6);
	}

	const backupWords = [
		'hero', 'champion', 'phantom', 'ghost', 'shadow',
		'mystic', 'bandit', 'beast', 'ninja', 'titan',
		'agent', 'mutant', 'wizard', 'hacker', 'unknown'
	];

	const charMap = {
		а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ж: 'zh', з: 'z',
		и: 'y', і: 'i', ї: 'yi', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n',
		о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh',
		ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch', ь: '', ю: 'yu', я: 'ya',
		ä: 'a', ö: 'o', ü: 'u', ß: 'ss', é: 'e', è: 'e', à: 'a', ç: 'c',
		є: 'ye', ґ: 'g'
	};

	let result = text
		.toLowerCase()
		.split('')
		.map((char) => (charMap[char] !== undefined ? charMap[char] : char))
		.join('')
		.split(' ')
		.join('_')
		.replace(/[^a-z0-9_]/g, '');

	if (!result.trim()) {
		const randomIndex = Math.floor(Math.random() * backupWords.length);
		result = backupWords[randomIndex];
	}

	return result;
}

/**
 * Validates the card form fields.
 * @param {object} state
 * @param {string} mode
 * @returns {object} Error messages object
 */
export function validateForm(state, mode) {
	const currentErrors = {};

	if (!state.cardDescription || !state.cardDescription.trim()) {
		currentErrors.cardDescription = 'Фраза на карті не може бути порожньою.';
	} else if (state.cardDescription.length > 50) {
		currentErrors.cardDescription = 'Максимум 50 символів.';
	}

	if (!state.imageBase64) {
		currentErrors.imageBase64 = 'Необхідно завантажити зображення для карти.';
	}

	if (mode === 'new') {
		if (!state.newRoleName || !state.newRoleName.trim()) {
			currentErrors.newRoleName = 'Вкажіть назву ролі.';
		} else if (state.newRoleName.length > 20) {
			currentErrors.newRoleName = 'Максимум 20 символів.';
		}
		if (!state.newRoleDescription || !state.newRoleDescription.trim()) {
			currentErrors.newRoleDescription = 'Опис здібностей ролі не може бути порожнім.';
		} else if (state.newRoleDescription.length > 300) {
			currentErrors.newRoleDescription = 'Максимум 300 символів.';
		}
	}

	return currentErrors;
}
