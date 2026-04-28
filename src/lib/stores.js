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
}

export const cardRules = writable(cardRulesConst);

export function getData() {
   function getCookie(name) {
      if (!document.cookie) return undefined;
      let cookie = {};
      document.cookie.split(';').forEach(function (el) {
         let split = el.split('=');
         cookie[split[0].trim()] = split.slice(1).join("=");
      })
      return JSON.parse(cookie[name]);
   }

   if (browser == true) {
      let data = getCookie("gameSettings");
      if (data && data.mans) {
         cardRules.set(data);
      } else {
         console.log("error while reading data");
         setCookie('gameSettings', cardRulesConst, 30);
         cardRules.set(cardRulesConst);
      }
   }

}

getData()

export function setCookie(name, value, days) {
   let expires = "";
   if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
   }
   document.cookie = name + "=" + JSON.stringify(value) + expires + "; path=/";
}