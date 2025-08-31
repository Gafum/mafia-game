import { c as create_ssr_component, e as escape } from "./ssr.js";
const HomeBtn = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = 100 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  return `<a href="/" class="home-btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" height="${escape(size, true) + "px"}" width="${escape(size, true) + "px"}"><path fill="#fff" d="M1472 992v480q0 26-19 45t-45 19h-384v-384H768v384H384q-26 0-45-19t-19-45V992q0-1 .5-3t.5-3l575-474 575 474q1 2 1 6zm223-69-62 74q-8 9-21 11h-3q-13 0-21-7L896 424l-692 577q-12 8-24 7-13-2-21-11l-62-74q-8-10-7-23.5t11-21.5l719-599q32-26 76-26t76 26l244 204V288q0-14 9-23t23-9h192q14 0 23 9t9 23v408l219 182q10 8 11 21.5t-7 23.5z"></path></svg></a>`;
});
export {
  HomeBtn as H
};
