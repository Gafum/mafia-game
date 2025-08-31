

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/rules/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.DgFSMyZ0.js","_app/immutable/chunks/YuYPJFo0.js","_app/immutable/chunks/D-G1zbuE.js","_app/immutable/chunks/IHki7fMi.js"];
export const stylesheets = ["_app/immutable/assets/5.DoecySDQ.css"];
export const fonts = [];
