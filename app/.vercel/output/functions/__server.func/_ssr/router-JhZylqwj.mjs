import { r as __toESM } from "../_runtime.mjs";
import { F as require_jsx_runtime, I as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { c as lazyRouteComponent, d as useRouter, i as HeadContent, l as createFileRoute, o as createRouter, r as Scripts, s as Outlet, u as createRootRouteWithContext } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$4 } from "./app-pLgLE2vk.mjs";
import { n as scrollScrubTheme } from "./scroll-scrub-scenes-B0ArZ5at.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-JhZylqwj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-nAX4Z5Q0.css";
var sawai_default = "/assets/sawai-C-JX6nYI.css";
function reportHiggsfieldError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__higgsfieldEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var app_meta_default = {
	og_title: "Sawai Gir Amrut | Bilona Ghee",
	og_description: "Sawai Gir Amrut A2 Gir cow ghee, made with the traditional Bilona method at our Phaltan farm. Discover the craft and choose a jar for your kitchen.",
	og_image_url: "https://sawai-ghee.higgsfield.app/assets/brand/sawai-og.jpg",
	favicon_url: "https://sawai-ghee.higgsfield.app/favicon.ico",
	marketplace_cover_url: "https://sawai-ghee.higgsfield.app/assets/brand/sawai-cover.jpg",
	og_video_url: null
};
var SITE = "https://sawai-ghee.higgsfield.app";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "sawai-error",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "A different path." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The page you are looking for is unavailable." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "/",
				children: "Return to Sawai"
			})
		]
	});
}
function ErrorComponent({ error, reset }) {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportHiggsfieldError(error instanceof Error ? error : new Error(String(error)), { boundary: "sawai_root" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "sawai-error",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "A moment of patience." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This page could not load. Please try again." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => {
					router.invalidate();
					reset();
				},
				children: "Try again"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "/",
				children: "Return to Sawai"
			})
		]
	});
}
var Route$3 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: app_meta_default.og_title },
			{
				name: "description",
				content: app_meta_default.og_description
			},
			{
				name: "author",
				content: "Sawai Gir Amrut"
			},
			{
				name: "theme-color",
				content: scrollScrubTheme.background
			},
			{
				name: "robots",
				content: "index, follow, max-image-preview:large"
			},
			{
				property: "og:title",
				content: app_meta_default.og_title
			},
			{
				property: "og:description",
				content: app_meta_default.og_description
			},
			{
				property: "og:site_name",
				content: "Sawai Gir Amrut"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:locale",
				content: "en_IN"
			},
			{
				property: "og:url",
				content: SITE
			},
			{
				property: "og:image",
				content: app_meta_default.og_image_url
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: app_meta_default.og_title
			},
			{
				name: "twitter:description",
				content: app_meta_default.og_description
			},
			{
				name: "twitter:image",
				content: "https://sawai-ghee.higgsfield.app/assets/brand/sawai-og-wide.jpg"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "stylesheet",
				href: sawai_default
			},
			{
				rel: "canonical",
				href: SITE
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				sizes: "16x16 32x32"
			},
			{
				rel: "icon",
				href: "/favicon-32.png",
				sizes: "32x32",
				type: "image/png"
			},
			{
				rel: "icon",
				href: "/favicon-16.png",
				sizes: "16x16",
				type: "image/png"
			},
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.png"
			},
			{
				rel: "manifest",
				href: "/site.webmanifest"
			},
			{
				rel: "preload",
				as: "image",
				href: "/assets/world/scene-01-poster.png",
				media: "(min-width: 861px) and (hover: hover) and (pointer: fine)"
			},
			{
				rel: "preload",
				as: "image",
				href: "/assets/world/scene-01-mobile-poster.png",
				media: "(max-width: 860px), (hover: none) and (pointer: coarse)"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		"data-theme": "default-light",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "sawai-body",
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})]
		})]
	});
}
function RootComponent() {
	const { queryClient } = Route$3.useRouteContext();
	(0, import_react.useEffect)(() => {}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter = () => import("./routes-C0SbaHmu.mjs");
var Route$2 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var Route$1 = createFileRoute("/robots.txt")({ server: { handlers: { GET: async ({ request }) => {
	const body = [
		"User-agent: *",
		"Allow: /",
		"",
		`Sitemap: ${new URL(request.url).origin}/sitemap.xml`
	].join("\n");
	return new Response(body, { headers: {
		"Content-Type": "text/plain; charset=utf-8",
		"Cache-Control": "public, max-age=86400"
	} });
} } } });
var Route = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async ({ request }) => {
	const origin = new URL(request.url).origin;
	const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
	const xml = [
		"<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
		"<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
		"  <url>",
		`    <loc>${origin}/</loc>`,
		`    <lastmod>${today}</lastmod>`,
		"    <changefreq>weekly</changefreq>",
		"    <priority>1.0</priority>",
		"  </url>",
		"</urlset>"
	].join("\n");
	return new Response(xml, { headers: {
		"Content-Type": "application/xml; charset=utf-8",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var rootRouteChildren = {
	IndexRoute: Route$2.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$3
	}),
	AppRoute: Route$4.update({
		id: "/app",
		path: "/app",
		getParentRoute: () => Route$3
	}),
	RobotsDottxtRoute: Route$1.update({
		id: "/robots.txt",
		path: "/robots.txt",
		getParentRoute: () => Route$3
	}),
	SitemapDotxmlRoute: Route.update({
		id: "/sitemap.xml",
		path: "/sitemap.xml",
		getParentRoute: () => Route$3
	})
};
var routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
