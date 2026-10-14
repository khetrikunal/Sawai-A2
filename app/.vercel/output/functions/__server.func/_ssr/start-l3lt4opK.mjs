import { n as createMiddleware, r as createStart, t as createCsrfMiddleware } from "./createStart-BcgIP9EO.mjs";
import { t as renderErrorPage } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/start-l3lt4opK.js
var errorMiddleware = createMiddleware().server(async ({ next }) => {
	try {
		return await next();
	} catch (error) {
		if (error != null && typeof error === "object" && "statusCode" in error) throw error;
		console.error(error);
		return new Response(renderErrorPage(), {
			status: 500,
			headers: { "content-type": "text/html; charset=utf-8" }
		});
	}
});
var csrfMiddleware = createCsrfMiddleware({ filter: (context) => context.handlerType === "serverFn" });
var startInstance = createStart(() => ({ requestMiddleware: [csrfMiddleware, errorMiddleware] }));
//#endregion
export { startInstance };
