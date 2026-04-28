import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const cardRulesConst = {
   mans: 4,
   mafias: 1,
   withDoctor: true,
   withCop: true,
   withKamikaze: false,
   withManiac: false,
   withSecurity: false,
   withLawyer: false
};

export const cardRules = writable(cardRulesConst);

function isValidBySchema(data, schema) {
   if (typeof data !== 'object' || data === null) return false;

   for (const key in schema) {
      if (!(key in data)) return false;

      if (typeof data[key] !== typeof schema[key]) {
         return false;
      }
   }

   return true;
}

function getCookie(name) {
   if (!browser || !document.cookie) return undefined;

   const cookies = {};

   document.cookie.split(';').forEach(el => {
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
      cardRules.set(data);
   } else {
      console.warn('Invalid gameSettings → reset');
      setCookie('gameSettings', cardRulesConst, 30);
      cardRules.set(cardRulesConst);
   }
}

getData();

export function setCookie(name, value, days = 30) {
   if (!browser) return;

   const date = new Date();
   date.setTime(date.getTime() + days * 86400000);

   document.cookie =
      `${name}=${encodeURIComponent(JSON.stringify(value))};` +
      `expires=${date.toUTCString()}; path=/`;
}
