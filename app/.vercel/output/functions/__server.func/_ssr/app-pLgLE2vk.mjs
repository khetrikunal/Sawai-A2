import { c as lazyRouteComponent, l as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-pLgLE2vk.js
var $$splitComponentImporter = () => import("./app-DVI5_kwr.mjs");
var Route = createFileRoute("/app")({
	validateSearch: (search) => ({ preview: search.preview === "1" || search.preview === true }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
