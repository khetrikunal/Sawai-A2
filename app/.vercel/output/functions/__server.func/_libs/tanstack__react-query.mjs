import { r as __toESM } from "../_runtime.mjs";
import { F as require_jsx_runtime, I as require_react } from "./@base-ui/react+[...].mjs";
//#region node_modules/.bun/@tanstack+react-query@5.101.2+e14d3f224186685e/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var QueryClientContext = import_react.createContext(void 0);
var QueryClientProvider = ({ client, children }) => {
	import_react.useEffect(() => {
		client.mount();
		return () => {
			client.unmount();
		};
	}, [client]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientContext.Provider, {
		value: client,
		children
	});
};
//#endregion
export { QueryClientProvider as t };
