import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext, useRouter, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import sawaiCss from "../sawai.css?url";
import { reportHiggsfieldError } from "../lib/higgsfield-error-reporting";
import appMeta from "../app-meta.json";
import { scrollScrubTheme } from "../scroll-scrub-scenes";
declare const __HF_DESIGN_INSPECTOR__: boolean;
const SITE = "https://sawai-ghee.higgsfield.app";
function NotFoundComponent() { return <div className="sawai-error"><h1>A different path.</h1><p>The page you are looking for is unavailable.</p><a href="/">Return to Sawai</a></div>; }
function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
 const router = useRouter();
 useEffect(() => { reportHiggsfieldError(error instanceof Error ? error : new Error(String(error)), { boundary: "sawai_root" }); }, [error]);
 return <div className="sawai-error"><h1>A moment of patience.</h1><p>This page could not load. Please try again.</p><button onClick={() => { router.invalidate(); reset(); }}>Try again</button><a href="/">Return to Sawai</a></div>;
}
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
 head: () => ({
 meta: [
 { charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" },
 { title: appMeta.og_title }, { name: "description", content: appMeta.og_description },
 { name: "author", content: "Sawai Gir Amrut" }, { name: "theme-color", content: scrollScrubTheme.background },
 { name: "robots", content: "index, follow, max-image-preview:large" },
 { property: "og:title", content: appMeta.og_title }, { property: "og:description", content: appMeta.og_description },
 { property: "og:site_name", content: "Sawai Gir Amrut" }, { property: "og:type", content: "website" },
 { property: "og:locale", content: "en_IN" }, { property: "og:url", content: SITE },
 { property: "og:image", content: appMeta.og_image_url },
 { name: "twitter:card", content: "summary_large_image" }, { name: "twitter:title", content: appMeta.og_title },
 { name: "twitter:description", content: appMeta.og_description }, { name: "twitter:image", content: SITE + "/assets/brand/sawai-og-wide.jpg" },
 ],
 links: [
 { rel: "stylesheet", href: appCss }, { rel: "stylesheet", href: sawaiCss },
 { rel: "canonical", href: SITE }, { rel: "icon", href: "/favicon.ico", sizes: "16x16 32x32" },
 { rel: "icon", href: "/favicon-32.png", sizes: "32x32", type: "image/png" },
 { rel: "icon", href: "/favicon-16.png", sizes: "16x16", type: "image/png" },
 { rel: "apple-touch-icon", href: "/apple-touch-icon.png" }, { rel: "manifest", href: "/site.webmanifest" },
 { rel: "preload", as: "image", href: "/assets/world/scene-01-poster.png", media: "(min-width: 861px) and (hover: hover) and (pointer: fine)" },
 { rel: "preload", as: "image", href: "/assets/world/scene-01-mobile-poster.png", media: "(max-width: 860px), (hover: none) and (pointer: coarse)" },
 ]
 }),
 shellComponent: RootShell, component: RootComponent, notFoundComponent: NotFoundComponent, errorComponent: ErrorComponent,
});
function RootShell({ children }: { children: ReactNode }) {
 return <html lang="en" data-theme="default-light"><head><HeadContent /></head><body className="sawai-body">{children}<Scripts /></body></html>;
}
function RootComponent() {
 const { queryClient } = Route.useRouteContext();
 useEffect(() => {
  if (!__HF_DESIGN_INSPECTOR__) return;
  void import("../module/design-inspector/runtime").then(({ installHiggsfieldDesignInspector }) => installHiggsfieldDesignInspector()).catch(error => reportHiggsfieldError(error instanceof Error ? error : new Error("Design inspector unavailable"), { boundary: "design_inspector" }));
 }, []);
 return <QueryClientProvider client={queryClient}><Outlet /></QueryClientProvider>;
}
