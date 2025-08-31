import { c as create_ssr_component, s as setContext, v as validate_component, m as missing_component } from "./ssr.js";
import { a as afterUpdate } from "./ssr2.js";
import "./environment.js";
let public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
let read_implementation = null;
function set_read_implementation(fn) {
  read_implementation = fn;
}
function set_manifest(_) {
}
const Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { constructors } = $$props;
  let { components = [] } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0) $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0) $$bindings.page(page);
  if ($$props.constructors === void 0 && $$bindings.constructors && constructors !== void 0) $$bindings.constructors(constructors);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0) $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0) $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0) $$bindings.data_1(data_1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      stores.page.set(page);
    }
    $$rendered = `  ${constructors[1] ? `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      {
        data: data_0,
        params: page.params,
        this: components[0]
      },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            {
              data: data_1,
              form,
              params: page.params,
              this: components[1]
            },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )}` : `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      {
        data: data_0,
        form,
        params: page.params,
        this: components[0]
      },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )}`} ${``}`;
  } while (!$$settled);
  return $$rendered;
});
const options = {
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  csrf_trusted_origins: [],
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hash_routing: false,
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root: Root,
  service_worker: false,
  service_worker_options: void 0,
  templates: {
    app: ({ head, body, assets, nonce, env }) => '<!DOCTYPE html>\r\n<html lang="en">\r\n\r\n<head>\r\n	<meta charset="utf-8" />\r\n	<title>Mafia</title>\r\n	<link rel="icon" href="' + assets + `/favicon.png" />\r
	<meta name="viewport" content="width=device-width, initial-scale=1" />\r
	<link rel="preconnect" href="https://fonts.googleapis.com">\r
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\r
	<link href="https://fonts.googleapis.com/css2?family=Marmelad&display=swap" rel="stylesheet">\r
	<style>\r
		* {\r
			padding: 0;\r
			margin: 0;\r
			border: 0;\r
			background: none;\r
			box-sizing: border-box;\r
			color: #000;\r
			font-family: 'Marmelad', sans-serif;\r
			font-style: normal;\r
			font-weight: 700;\r
			font-size: 18px;\r
			-ms-user-select: none;\r
			-webkit-user-select: none;\r
			user-select: none;\r
			-webkit-tap-highlight-color: rgba(255, 255, 255, 0);\r
			-webkit-tap-highlight-color: transparent;\r
		}\r
\r
		*,\r
		*:before,\r
		*:after {\r
			-moz-box-sizing: border-box;\r
			-webkit-box-sizing: border-box;\r
			box-sizing: border-box;\r
		}\r
\r
		:focus,\r
		:active {\r
			outline: none;\r
		}\r
\r
		a:focus,\r
		a:active,\r
		input:focus,\r
		input:active {\r
			outline: none;\r
		}\r
\r
		nav,\r
		footer,\r
		header,\r
		aside {\r
			display: block;\r
		}\r
\r
		html,\r
		body {\r
			height: 100%;\r
			width: 100%;\r
			font-size: 100%;\r
			font-size: 14px;\r
			background-color: #111;\r
			-ms-text-size-adjust: 100%;\r
			-moz-text-size-adjust: 100%;\r
			-webkit-text-size-adjust: 100%;\r
		}\r
\r
		input,\r
		button,\r
		textarea {\r
			font-family: inherit;\r
		}\r
\r
		input::-ms-clear {\r
			display: none;\r
		}\r
\r
		button {\r
			cursor: pointer;\r
			-webkit-tap-highlight-color: rgba(255, 255, 255, 0);\r
			-webkit-tap-highlight-color: transparent;\r
		}\r
\r
		button::-moz-focus-inner {\r
			padding: 0;\r
			border: 0;\r
		}\r
\r
		a,\r
		a:visited {\r
			text-decoration: none;\r
		}\r
\r
		a:hover {\r
			text-decoration: none;\r
		}\r
\r
		ul li,\r
		nav li {\r
			list-style: none;\r
		}\r
\r
		img {\r
			vertical-align: top;\r
			width: 100%;\r
		}\r
\r
		h1,\r
		h2,\r
		h3,\r
		h4,\r
		h5,\r
		h6 {\r
			font-size: inherit\r
		}\r
	</style>\r
	` + head + '\r\n</head>\r\n\r\n<body data-sveltekit-preload-data="hover">\r\n	<div style="display: contents">' + body + "</div>\r\n</body>\r\n\r\n</html>",
    error: ({ status, message }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "ekucaj"
};
async function get_hooks() {
  let handle;
  let handleFetch;
  let handleError;
  let handleValidationError;
  let init;
  let reroute;
  let transport;
  return {
    handle,
    handleFetch,
    handleError,
    handleValidationError,
    init,
    reroute,
    transport
  };
}
export {
  set_public_env as a,
  set_read_implementation as b,
  set_manifest as c,
  get_hooks as g,
  options as o,
  public_env as p,
  read_implementation as r,
  set_private_env as s
};
