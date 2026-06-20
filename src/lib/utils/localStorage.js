export function getJSON(key) {
	try {
		const raw = localStorage.getItem(key);
		return raw ? JSON.parse(raw) : null;
	} catch (e) {
		console.error(`Failed to parse localStorage key "${key}":`, e);
		return null;
	}
}

export function setJSON(key, value) {
	try {
		const str = JSON.stringify(value);
		localStorage.setItem(key, str);
	} catch (e) {
		console.error(`Failed to set localStorage key "${key}":`, e);
	}
}
