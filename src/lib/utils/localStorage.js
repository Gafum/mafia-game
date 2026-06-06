// src/lib/utils/localStorage.js
// Simple wrapper around localStorage for JSON data.
// Provides getJSON and setJSON helpers used by the custom cards feature.

/**
 * Retrieve a parsed JSON value from localStorage.
 * @param {string} key - Storage key.
 * @returns {any} Parsed value or null if missing / parse error.
 */
export function getJSON(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error(`Failed to parse localStorage key "${key}":`, e);
    return null;
  }
}

/**
 * Store a value as JSON in localStorage.
 * @param {string} key - Storage key.
 * @param {any} value - Value to stringify and store.
 */
export function setJSON(key, value) {
  try {
    const str = JSON.stringify(value);
    localStorage.setItem(key, str);
  } catch (e) {
    console.error(`Failed to set localStorage key "${key}":`, e);
  }
}
