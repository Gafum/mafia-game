import { g as getContext, c as create_ssr_component, a as subscribe, e as escape, v as validate_component } from "../../chunks/ssr.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import { o as onMount } from "../../chunks/ssr2.js";
import { H as HomeBtn } from "../../chunks/HomeBtn.js";
const is_legacy = onMount.toString().includes("$$") || /function \w+\(\) \{\}/.test(onMount.toString());
if (is_legacy) {
  ({
    data: {},
    form: null,
    error: null,
    params: {},
    route: { id: null },
    state: {},
    status: -1,
    url: new URL("https://example.com")
  });
}
const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
const css = {
  code: ".center-conteiner.svelte-1fbpprg.svelte-1fbpprg{display:flex;width:100%;height:100%;justify-content:center;align-items:center;align-content:center;flex-direction:column;gap:15px;padding:10px}.center-conteiner.svelte-1fbpprg>.text.svelte-1fbpprg{color:white;text-align:center}a.text.svelte-1fbpprg.svelte-1fbpprg{color:white;font-weight:bold;text-decoration:underline}.center-conteiner.svelte-1fbpprg>h2.text.svelte-1fbpprg{font-size:35px}",
  map: `{"version":3,"file":"+error.svelte","sources":["+error.svelte"],"sourcesContent":["<script>\\r\\n\\timport { page } from '$app/stores';\\r\\n\\timport HomeBtn from '$lib/UI/HomeBtn.svelte';\\r\\n<\/script>\\r\\n\\r\\n<div class=\\"center-conteiner\\">\\r\\n\\t<h2 class=\\"text\\">{$page.status} : {$page.error.message}</h2>\\r\\n\\t<p class=\\"text\\">\\r\\n\\t\\tВиникла проблема. Якщо після переходу на <a class=\\"text\\" href=\\"/\\">головну сторінку</a> вона не зникне,\\r\\n\\t\\tто повідомте про це адміністратора\\r\\n\\t</p>\\r\\n\\t<HomeBtn size=\\"50\\" />\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n\\t.center-conteiner {\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\twidth: 100%;\\r\\n\\t\\theight: 100%;\\r\\n\\t\\tjustify-content: center;\\r\\n\\t\\talign-items: center;\\r\\n\\t\\talign-content: center;\\r\\n\\t\\tflex-direction: column;\\r\\n\\t\\tgap: 15px;\\r\\n\\t\\tpadding: 10px;\\r\\n\\t}\\r\\n\\r\\n\\t.center-conteiner > .text {\\r\\n\\t\\tcolor: white;\\r\\n\\t\\ttext-align: center;\\r\\n\\t}\\r\\n\\r\\n\\ta.text {\\r\\n\\t\\tcolor: white;\\r\\n\\t\\tfont-weight: bold;\\r\\n\\t\\ttext-decoration: underline;\\r\\n\\t}\\r\\n\\r\\n\\t.center-conteiner > h2.text {\\r\\n\\t\\tfont-size: 35px;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAeC,+CAAkB,CACjB,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,aAAa,CAAE,MAAM,CACrB,cAAc,CAAE,MAAM,CACtB,GAAG,CAAE,IAAI,CACT,OAAO,CAAE,IACV,CAEA,gCAAiB,CAAG,oBAAM,CACzB,KAAK,CAAE,KAAK,CACZ,UAAU,CAAE,MACb,CAEA,CAAC,mCAAM,CACN,KAAK,CAAE,KAAK,CACZ,WAAW,CAAE,IAAI,CACjB,eAAe,CAAE,SAClB,CAEA,gCAAiB,CAAG,EAAE,oBAAM,CAC3B,SAAS,CAAE,IACZ"}`
};
const Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$result.css.add(css);
  $$unsubscribe_page();
  return `<div class="center-conteiner svelte-1fbpprg"><h2 class="text svelte-1fbpprg">${escape($page.status)} : ${escape($page.error.message)}</h2> <p class="text svelte-1fbpprg" data-svelte-h="svelte-1i7qnqh">Виникла проблема. Якщо після переходу на <a class="text svelte-1fbpprg" href="/">головну сторінку</a> вона не зникне,
		то повідомте про це адміністратора</p> ${validate_component(HomeBtn, "HomeBtn").$$render($$result, { size: "50" }, {}, {})} </div>`;
});
export {
  Error$1 as default
};
