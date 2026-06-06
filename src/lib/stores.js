// src/lib/stores.js
import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { cardRulesConst, cardList, bigDescriptionList, iconMap } from '$lib/data';
import { getJSON, setJSON } from '$lib/utils/localStorage.js';

// Keys for localStorage
const CUSTOM_CARDS_KEY = 'customCards';
const CUSTOM_DESCRIPTIONS_KEY = 'customDescriptions';
const CUSTOM_RULES_KEY = 'customRules';

// Core stores (defaults + custom combined)
export const cardRules = writable({ ...cardRulesConst });
export const cards = writable([...cardList]);
export const bigDescriptions = writable({ ...bigDescriptionList });

// Store containing ONLY custom cards for the CRUD page
export const customCardsStore = writable([]);

// Load custom data from localStorage (client‑side only)
let customCards = [];
let customDescriptions = {};
let customRules = {};

if (typeof window !== 'undefined') {
	customCards = getJSON(CUSTOM_CARDS_KEY) ?? [];
	customDescriptions = getJSON(CUSTOM_DESCRIPTIONS_KEY) ?? {};
	customRules = getJSON(CUSTOM_RULES_KEY) ?? {};

	// Set custom cards store
	customCardsStore.set(customCards);
}

function mergeInitialData() {
	const mergedCards = [...cardList, ...customCards];
	cards.set(mergedCards);

	const mappedCustomDescriptions = {};
	for (const tag in customDescriptions) {
		const desc = customDescriptions[tag];
		const iconName = desc.iconName || 'User';
		mappedCustomDescriptions[tag] = {
			...desc,
			icon: iconMap[iconName] || iconMap.User
		};
	}

	const mergedDescriptions = { ...bigDescriptionList, ...mappedCustomDescriptions };
	bigDescriptions.set(mergedDescriptions);

	if (browser) {
		const currentSettingsData = getJSON('gameSettings') || { ...cardRulesConst };

		let updatedRules = { ...cardRulesConst, ...currentSettingsData };

		Object.keys(updatedRules).forEach((key) => {
			if (!Object.keys(cardRulesConst).includes(key) && customRules[key] === undefined) {
				delete updatedRules[key];
			}
		});

		cardRules.set(updatedRules);
	}
}

// Validation helper
function isValidBySchema(data, schema) {
	if (typeof data !== 'object' || data === null) return false;
	for (const key in schema) {
		if (!(key in data)) return false;
		if (typeof data[key] !== typeof schema[key]) return false;
	}
	return true;
}

// Cookie helpers
function getCookie(name) {
	if (!browser || !document.cookie) return undefined;
	const cookies = {};
	document.cookie.split(';').forEach((el) => {
		const [key, ...rest] = el.split('=');
		cookies[key.trim()] = rest.join('=');
	});
	if (!cookies[name]) return undefined;
	try {
		return JSON.parse(decodeURIComponent(cookies[name]));
	} catch {
		return undefined;
	}
}

export function getData() {
	if (!browser) return;
	const data = getJSON('gameSettings');
	if (isValidBySchema(data, cardRulesConst)) {
		cardRules.set({ ...customRules, ...data });
	} else {
		console.warn('Invalid gameSettings → reset');
		setJSON('gameSettings', cardRulesConst);
		cardRules.set({ ...cardRulesConst, ...customRules });
	}
	mergeInitialData();
}

export function setCookie(name, value, days = 30) {
	if (!browser) return;
	const date = new Date();
	date.setTime(date.getTime() + days * 86400000);

	document.cookie =
		`${name}=${encodeURIComponent(JSON.stringify(value))};` + `expires=${date.toUTCString()}`;
}

// ---- Custom Card CRUD API ----
export function addCustomCard(card) {
	customCards = [...customCards, card];
	setJSON(CUSTOM_CARDS_KEY, customCards);
	customCardsStore.set(customCards);
	mergeInitialData();
}

export function updateCustomCard(index, newCard) {
	if (index < 0 || index >= customCards.length) return;
	customCards = customCards.map((c, i) => (i === index ? newCard : c));
	setJSON(CUSTOM_CARDS_KEY, customCards);
	customCardsStore.set(customCards);
	mergeInitialData();
}

export function deleteCustomCard(index) {
	if (index < 0 || index >= customCards.length) return;
	const removed = customCards[index];
	customCards = customCards.filter((_, i) => i !== index);
	setJSON(CUSTOM_CARDS_KEY, customCards);
	customCardsStore.set(customCards);

	const tagUsed = customCards.some((c) => c.tag === removed.tag);
	if (!tagUsed && removed.tag && !Object.keys(cardRulesConst).includes(removed.tag)) {
		deleteCustomDescription(removed.tag);
		deleteCustomRule(removed.tag);
	} else {
		mergeInitialData();
	}
}

export function addCustomDescription(tag, descObj) {
	customDescriptions = { ...customDescriptions, [tag]: descObj };
	setJSON(CUSTOM_DESCRIPTIONS_KEY, customDescriptions);
	mergeInitialData();
}

export function deleteCustomDescription(tag) {
	if (customDescriptions[tag]) {
		const { [tag]: _, ...rest } = customDescriptions;
		customDescriptions = rest;
		setJSON(CUSTOM_DESCRIPTIONS_KEY, customDescriptions);
		mergeInitialData();
	}
}

export function addCustomRule(key, value) {
	customRules = { ...customRules, [key]: value };
	setJSON(CUSTOM_RULES_KEY, customRules);

	if (browser) {
		const data = getJSON('gameSettings') || { ...cardRulesConst };
		setJSON('gameSettings', { ...data, ...customRules });
	}

	mergeInitialData();
}

export function deleteCustomRule(key) {
	if (customRules[key] !== undefined) {
		const { [key]: _, ...rest } = customRules;
		customRules = rest;
		setJSON(CUSTOM_RULES_KEY, customRules);

		if (browser) {
			const data = getJSON('gameSettings') || { ...cardRulesConst };
			if (data[key] !== undefined) {
				delete data[key];
				setJSON('gameSettings', data);
			}
		}

		mergeInitialData();
	}
}

export function isCustomRule(key) {
	return Object.prototype.hasOwnProperty.call(customRules, key);
}

export function setCustomRule(key, value) {
	customRules = { ...customRules, [key]: value };
	setJSON(CUSTOM_RULES_KEY, customRules);
}

// Initialise data on load
if (browser) {
	getData();
}
