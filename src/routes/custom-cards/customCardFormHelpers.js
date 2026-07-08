import { slugify } from '$lib/utils/customCardsUtils';
import { TEAMS } from '$lib/data/teams';
const MAX_ROLE_NAME = 20;
const MAX_ROLE_DESC = 300;
const MAX_CARD_TEXT = 50;
const DEFAULT_ICON = 'User';
const DEFAULT_TEAM = TEAMS[3].value;

export function isCustomRoleTag(tag) {
	return typeof tag === 'string' && tag.startsWith('custom_');
}

export function buildCustomRoleTag(rawName) {
	const prefix = slugify(rawName).substring(0, MAX_ROLE_NAME) || 'role';
	const timestamp = Date.now().toString(36);
	const randomHash = Math.random().toString(36).substring(2, 6);
	return `custom_${prefix}_${timestamp}_${randomHash}`;
}

export function buildCardSubmission({
	formMode,
	selectedTag,
	cardDescription,
	imageBase64,
	newRoleName,
	newRoleDescription,
	selectedIconName,
	editIndex
}) {
	const description = String(cardDescription || '')
		.substring(0, MAX_CARD_TEXT)
		.trim();
	const tag =
		formMode === 'new' && (!isCustomRoleTag(selectedTag) || editIndex === null)
			? buildCustomRoleTag(newRoleName)
			: selectedTag;

	return {
		cardData: {
			description,
			myImg: imageBase64,
			tag
		},
		customDescription:
			formMode === 'new'
				? {
					name: String(newRoleName || '')
						.substring(0, MAX_ROLE_NAME)
						.trim(),
					description: String(newRoleDescription || '')
						.substring(0, MAX_ROLE_DESC)
						.trim(),
					iconName: selectedIconName || DEFAULT_ICON,
					team: DEFAULT_TEAM
				}
				: null,
		shouldAddRule: formMode === 'new' && (!isCustomRoleTag(selectedTag) || editIndex === null)
	};
}

export function getFormStateFromCard(card, bigDescriptions) {
	const isCustom = isCustomRoleTag(card.tag);
	const roleDescription = bigDescriptions[card.tag] || {};
	return {
		formMode: isCustom ? 'new' : 'existing',
		selectedTag: card.tag,
		cardDescription: card.description || '',
		imageBase64: card.myImg?.startsWith('data:') ? card.myImg : '',
		newRoleName: isCustom ? roleDescription.name || '' : '',
		newRoleDescription: isCustom ? roleDescription.description || '' : '',
		selectedIconName: isCustom ? roleDescription.iconName || DEFAULT_ICON : DEFAULT_ICON,
		team: DEFAULT_TEAM
	};
}

export function resizeImageFile(file, maxWidth = 400) {
	return new Promise((resolve, reject) => {
		if (!file?.type?.startsWith('image/')) {
			reject(new Error('invalid-image'));
			return;
		}

		const reader = new FileReader();
		reader.onload = () => {
			const img = new Image();
			img.src = reader.result;
			img.onload = () => {
				const scale = Math.min(1, maxWidth / img.width);
				const canvas = document.createElement('canvas');
				canvas.width = img.width * scale;
				canvas.height = img.height * scale;
				const ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				resolve(canvas.toDataURL('image/jpeg', 0.7));
			};
			img.onerror = reject;
		};
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}
