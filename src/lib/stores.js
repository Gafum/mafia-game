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

// Merge custom data with defaults on start‑up
function mergeInitialData() {
	// Merge cards array
	const mergedCards = [...cardList, ...customCards];
	cards.set(mergedCards);

	// Map custom description icon names (e.g. "Shield") to their actual Lucide components
	const mappedCustomDescriptions = {};
	for (const tag in customDescriptions) {
		const desc = customDescriptions[tag];
		const iconName = desc.iconName || 'User';
		mappedCustomDescriptions[tag] = {
			...desc,
			icon: iconMap[iconName] || iconMap.User
		};
	}

	// Merge big descriptions (object spread)
	const mergedDescriptions = { ...bigDescriptionList, ...mappedCustomDescriptions };
	bigDescriptions.set(mergedDescriptions);
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
	const data = getCookie('gameSettings');
	if (isValidBySchema(data, cardRulesConst)) {
		// Merge cookie settings with custom rules
		cardRules.set({ ...customRules, ...data });
	} else {
		console.warn('Invalid gameSettings → reset');
		setCookie('gameSettings', cardRulesConst, 30);
		cardRules.set({ ...cardRulesConst, ...customRules });
	}
	// After loading cookie data, merge any custom data
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
	// card: { description, myImg, tag, imageBase64? }
	customCards = [...customCards, card];
	setJSON(CUSTOM_CARDS_KEY, customCards);
	customCardsStore.set(customCards);

	// Re-merge data so all stores are updated immediately
	mergeInitialData();
}

export function updateCustomCard(index, newCard) {
	if (index < 0 || index >= customCards.length) return;
	customCards = customCards.map((c, i) => (i === index ? newCard : c));
	setJSON(CUSTOM_CARDS_KEY, customCards);
	customCardsStore.set(customCards);

	// Re-merge data
	mergeInitialData();
}

export function deleteCustomCard(index) {
	if (index < 0 || index >= customCards.length) return;
	const removed = customCards[index];
	customCards = customCards.filter((_, i) => i !== index);
	setJSON(CUSTOM_CARDS_KEY, customCards);
	customCardsStore.set(customCards);

	// Clean up any custom description/rules if no other card uses this tag
	const tagUsed = customCards.some((c) => c.tag === removed.tag);
	if (!tagUsed && removed.tag && !Object.keys(cardRulesConst).includes(removed.tag)) {
		deleteCustomDescription(removed.tag);
		deleteCustomRule(removed.tag);
	} else {
		// Re-merge data
		mergeInitialData();
	}
}

// Custom Description CRUD
export function addCustomDescription(tag, descObj) {
	// descObj: { name, description, iconName }
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

// Custom Rule CRUD – for new role toggles
export function addCustomRule(key, value) {
	customRules = { ...customRules, [key]: value };
	setJSON(CUSTOM_RULES_KEY, customRules);

	// Save to gameSettings cookie too so it keeps synced
	if (browser) {
		const data = getCookie('gameSettings') || { ...cardRulesConst };
		setCookie('gameSettings', { ...data, ...customRules }, 30);
	}

	mergeInitialData();
}

export function deleteCustomRule(key) {
	if (customRules[key] !== undefined) {
		const { [key]: _, ...rest } = customRules;
		customRules = rest;
		setJSON(CUSTOM_RULES_KEY, customRules);

		// Update gameSettings cookie
		if (browser) {
			const data = getCookie('gameSettings') || { ...cardRulesConst };
			if (data[key] !== undefined) {
				delete data[key];
				setCookie('gameSettings', data, 30);
			}
		}

		mergeInitialData();
	}
}

// Initialise data on load
if (browser) {
	getData();
}
