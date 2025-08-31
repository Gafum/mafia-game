export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["assets/back-side.png","assets/background.jpg","assets/cards/Commissar.png","assets/cards/Doctor.png","assets/cards/Kamikaze.png","assets/cards/Lawyer.png","assets/cards/Mafia1.png","assets/cards/Mafia2.png","assets/cards/Mafia3.png","assets/cards/Mafia4.png","assets/cards/Man1.png","assets/cards/Man2.png","assets/cards/Man3.png","assets/cards/Man4.png","assets/cards/Man5.png","assets/cards/Maniac.png","assets/cards/Security.png","favicon.png"]),
	mimeTypes: {".png":"image/png",".jpg":"image/jpeg"},
	_: {
		client: {start:"_app/immutable/entry/start.BHrefaBn.js",app:"_app/immutable/entry/app.DxphGo_w.js",imports:["_app/immutable/entry/start.BHrefaBn.js","_app/immutable/chunks/KZSsqoGn.js","_app/immutable/chunks/YuYPJFo0.js","_app/immutable/chunks/CFHDiBWK.js","_app/immutable/entry/app.DxphGo_w.js","_app/immutable/chunks/YuYPJFo0.js","_app/immutable/chunks/IHki7fMi.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js')),
			__memo(() => import('../output/server/nodes/5.js')),
			__memo(() => import('../output/server/nodes/6.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/play",
				pattern: /^\/play\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/roles",
				pattern: /^\/roles\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/rules",
				pattern: /^\/rules\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/settings",
				pattern: /^\/settings\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
