import { createElement } from "react";
import type { ScrollScrubScene, ScrollScrubTheme } from "@/components/scroll-scrub/scroll-scrub";
export const scrollScrubTheme: ScrollScrubTheme = { accent: "#C5A264", background: "#1E251D", ink: "#F4EFE5", muted: "#DED7C7" };
export const scrollScrubScenes: ScrollScrubScene[] = [{
 id: "the-vessel", label: "The vessel",
 poster: "/assets/world/scene-01-poster.png", mobilePoster: "/assets/world/scene-01-mobile-poster.png",
 clip: "/assets/world/scene-01.mp4", mobileClip: "/assets/world/scene-01-mobile.mp4",
 title: "Pure ghee. Rich heritage.",
 body: "A2 Gir cow ghee, made the traditional Bilona way. From our Phaltan farm to your table.",
 kicker: "SAWAI GIR AMRUT", scroll: 4.2, linger: .12,
 objectPosition: "50% 50%", mobileObjectPosition: "50% 50%",
 actions: createElement("div", { className: "hero-actions" },
  createElement("a", { className: "hero-shop", href: "#products" }, "Shop Now", createElement("span", { "aria-hidden": true }, "↗")),
  createElement("a", { className: "hero-story", href: "#story" }, "Our Story", createElement("span", { "aria-hidden": true }, "↗"))
 )
}];
