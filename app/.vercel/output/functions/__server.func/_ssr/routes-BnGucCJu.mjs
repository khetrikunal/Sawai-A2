import { r as __toESM } from "../_runtime.mjs";
import { F as require_jsx_runtime, I as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { a as m, c as c$1, i as n, s as c } from "../_libs/phosphor-icons__react.mjs";
import { n as scrollScrubTheme, t as scrollScrubScenes } from "./scroll-scrub-scenes-B0ArZ5at.mjs";
import { n as gsapWithCSS, t as ScrollTrigger } from "../_libs/gsap.mjs";
import { t as Lenis } from "../_libs/lenis.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BnGucCJu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
var smoothstep = (value) => {
	const x = clamp(value);
	return x * x * (3 - 2 * x);
};
var lingerEase = (value, amount) => {
	const x = clamp(value);
	const linger = clamp(amount, 0, .6);
	const centered = x - .5;
	return (1 - linger) * x + linger * (4 * centered ** 3 + .5);
};
function buildSegments(scenes, connectors) {
	const result = [];
	for (const [index, scene] of scenes.entries()) {
		if (scene.mobileClip && !scene.mobilePoster) throw new Error(`Scene ${scene.id} needs mobilePoster for mobileClip`);
		result.push({
			clip: scene.clip,
			key: `scene:${scene.id}`,
			kind: "scene",
			linger: scene.linger ?? 0,
			mobileClip: scene.mobileClip,
			mobilePoster: scene.mobilePoster,
			mobileObjectPosition: scene.mobileObjectPosition ?? scene.objectPosition ?? "50% 50%",
			nextSectionIndex: index,
			objectPosition: scene.objectPosition ?? "50% 50%",
			poster: scene.poster,
			scene,
			sectionIndex: index,
			weight: scene.scroll ?? 1.4
		});
		const connector = connectors[index];
		if (index < scenes.length - 1 && connector?.clip) {
			if (connector.mobileClip && !connector.mobilePoster) throw new Error(`Connector after ${scene.id} needs mobilePoster for mobileClip`);
			const nextScene = scenes[index + 1];
			result.push({
				clip: connector.clip,
				key: `connector:${scene.id}:${nextScene.id}`,
				kind: "connector",
				linger: 0,
				mobileClip: connector.mobileClip,
				mobilePoster: connector.mobilePoster,
				mobileObjectPosition: nextScene.mobileObjectPosition ?? nextScene.objectPosition ?? "50% 50%",
				nextSectionIndex: index + 1,
				objectPosition: nextScene.objectPosition ?? "50% 50%",
				poster: connector.poster,
				sectionIndex: index,
				weight: connector.scroll ?? .8
			});
		}
	}
	return result;
}
function ScrollScrub({ scenes, connectors, theme, className, onActiveSectionChange }) {
	const rootRef = (0, import_react.useRef)(null);
	const controllerRef = (0, import_react.useRef)(null);
	const onActiveRef = (0, import_react.useRef)(onActiveSectionChange);
	const [activeSection, setActiveSection] = (0, import_react.useState)(0);
	const segments = (0, import_react.useMemo)(() => buildSegments(scenes, connectors ?? []), [connectors, scenes]);
	(0, import_react.useEffect)(() => {
		onActiveRef.current = onActiveSectionChange;
	}, [onActiveSectionChange]);
	(0, import_react.useEffect)(() => {
		const root = rootRef.current;
		if (!root || segments.length === 0) return;
		const layerNodes = [...root.querySelectorAll("[data-scroll-scrub-layer]")];
		const bandNodes = [...root.querySelectorAll("[data-scroll-scrub-band]")];
		if (layerNodes.length !== segments.length || bandNodes.length !== segments.length) throw new Error("ScrollScrub segment markup is out of sync");
		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const coarsePointer = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
		const smallViewport = window.matchMedia("(max-width: 860px)");
		const isMobile = () => coarsePointer || smallViewport.matches;
		const sourceFor = (segment) => isMobile() && segment.mobileClip ? segment.mobileClip : segment.clip;
		const runtime = segments.map((segment, index) => ({
			...segment,
			band: bandNodes[index],
			current: 0,
			end: 0,
			failed: false,
			layer: layerNodes[index],
			loading: false,
			ready: false,
			start: 0,
			target: 0,
			visible: index === 0
		}));
		let active = -1;
		let destroyed = false;
		let dirty = true;
		let frame = 0;
		let rootTop = 0;
		let total = 1;
		let viewportHeight = window.innerHeight;
		let layoutWidth = window.innerWidth;
		let userReady = false;
		const unloadClip = (segment) => {
			segment.abort?.abort();
			segment.video?.remove();
			if (segment.objectUrl) URL.revokeObjectURL(segment.objectUrl);
			delete segment.abort;
			delete segment.video;
			delete segment.objectUrl;
			delete segment.loadedSource;
			segment.loading = false;
			segment.ready = false;
			segment.failed = false;
			segment.current = segment.target;
			delete segment.layer.dataset.videoPainted;
			delete segment.layer.dataset.videoFailed;
		};
		const layout = () => {
			const pageY = window.scrollY || window.pageYOffset;
			rootTop = root.getBoundingClientRect().top + pageY;
			viewportHeight = window.innerHeight;
			layoutWidth = window.innerWidth;
			for (const segment of runtime) {
				if (segment.loadedSource && segment.loadedSource !== sourceFor(segment)) unloadClip(segment);
				const rect = segment.band.getBoundingClientRect();
				segment.start = rect.top + pageY - rootTop;
				segment.end = segment.start + rect.height;
			}
			total = Math.max(runtime.at(-1)?.end ?? viewportHeight, viewportHeight);
			dirty = true;
		};
		const primeVideo = async (video) => {
			if (!video || !isMobile()) return;
			try {
				await video.play();
				video.pause();
			} catch {}
		};
		const loadClip = async (segment) => {
			const source = sourceFor(segment);
			if (reduceMotion || destroyed || segment.loading || segment.ready || segment.failed || !source) return;
			segment.loading = true;
			segment.loadedSource = source;
			segment.abort = new AbortController();
			const request = segment.abort;
			try {
				const response = await fetch(source, { signal: request.signal });
				if (!response.ok) throw new Error(`Clip failed: ${response.status}`);
				const blob = await response.blob();
				if (destroyed || request.signal.aborted || segment.loadedSource !== source) return;
				const objectUrl = URL.createObjectURL(blob);
				const video = document.createElement("video");
				video.className = "scroll-scrub__video";
				video.muted = true;
				video.playsInline = true;
				video.preload = "auto";
				video.setAttribute("muted", "");
				video.setAttribute("playsinline", "");
				video.src = objectUrl;
				video.addEventListener("loadedmetadata", () => {
					if (segment.video !== video || segment.loadedSource !== source) return;
					segment.ready = true;
					segment.loading = false;
					dirty = true;
				}, { once: true });
				video.addEventListener("loadeddata", () => {
					if (userReady && segment.video === video && segment.loadedSource === source) primeVideo(video);
				}, { once: true });
				video.addEventListener("error", () => {
					if (segment.video !== video) return;
					video.remove();
					URL.revokeObjectURL(objectUrl);
					delete segment.video;
					delete segment.objectUrl;
					segment.failed = true;
					segment.loading = false;
					segment.ready = false;
					delete segment.layer.dataset.videoPainted;
					segment.layer.dataset.videoFailed = "true";
				}, { once: true });
				video.addEventListener("seeked", () => {
					if (segment.video === video && segment.loadedSource === source) segment.layer.dataset.videoPainted = "true";
				}, { once: true });
				segment.layer.append(video);
				segment.objectUrl = objectUrl;
				segment.video = video;
			} catch (error) {
				if (request.signal.aborted || error instanceof Error && error.name === "AbortError" || segment.loadedSource !== source) return;
				segment.layer.dataset.videoFailed = "true";
				segment.failed = true;
				segment.loading = false;
			}
		};
		const readScroll = () => {
			const y = clamp((window.scrollY || window.pageYOffset) - rootTop, 0, total);
			const crossfade = .1 * viewportHeight;
			let currentIndex = 0;
			for (const [index, segment] of runtime.entries()) {
				if (y >= segment.start) currentIndex = index;
				const length = Math.max(segment.end - segment.start, 1);
				const local = clamp((y - segment.start) / length);
				segment.target = segment.linger ? lingerEase(local, segment.linger) : local;
				let outside = 0;
				if (y < segment.start) outside = segment.start - y;
				if (y > segment.end) outside = y - segment.end;
				let opacity = smoothstep(1 - outside / Math.max(crossfade, 1));
				if (reduceMotion) opacity = outside === 0 ? 1 : 0;
				segment.visible = opacity > .001;
				segment.layer.style.opacity = String(opacity);
				segment.layer.style.zIndex = index === currentIndex ? "2" : "1";
				if (y > segment.start - 1.5 * viewportHeight && y < segment.end + 1.5 * viewportHeight) loadClip(segment);
			}
			const current = runtime[currentIndex];
			const currentLength = Math.max(current.end - current.start, 1);
			const currentProgress = clamp((y - current.start) / currentLength);
			const nextActive = current.kind === "connector" && currentProgress >= .5 ? current.nextSectionIndex : current.sectionIndex;
			if (nextActive !== active) {
				active = nextActive;
				root.dataset.activeSection = String(active);
				setActiveSection(active);
				onActiveRef.current?.(active);
			}
			root.style.setProperty("--ss-progress", String(clamp(y / total)));
		};
		const updateVideos = () => {
			for (const segment of runtime) {
				const { video } = segment;
				if (!video || !segment.ready || video.seeking) continue;
				if (!segment.visible && Math.abs(segment.current - segment.target) < .002) continue;
				segment.current += (segment.target - segment.current) * .2;
				const targetTime = clamp(segment.current, 0, .999) * (video.duration || 1);
				const epsilon = isMobile() ? .02 : .008;
				if (Math.abs(video.currentTime - targetTime) > epsilon) try {
					video.currentTime = targetTime;
				} catch {}
			}
		};
		const tick = () => {
			if (destroyed) return;
			if (dirty) {
				dirty = false;
				readScroll();
			}
			updateVideos();
			frame = window.requestAnimationFrame(tick);
		};
		const onScroll = () => {
			dirty = true;
		};
		const onResize = () => {
			if (coarsePointer && window.innerWidth === layoutWidth) return;
			layout();
		};
		const onFirstGesture = () => {
			if (userReady) return;
			userReady = true;
			for (const segment of runtime) primeVideo(segment.video);
		};
		controllerRef.current = { jumpToSection(index) {
			const segment = runtime.find((candidate) => candidate.kind === "scene" && candidate.sectionIndex === index);
			if (!segment) return;
			const top = rootTop + segment.start + .15 * (segment.end - segment.start);
			window.scrollTo({
				behavior: reduceMotion ? "auto" : "smooth",
				top
			});
		} };
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onResize);
		window.addEventListener("orientationchange", layout);
		window.addEventListener("pointerdown", onFirstGesture, {
			once: true,
			passive: true
		});
		window.addEventListener("touchstart", onFirstGesture, {
			once: true,
			passive: true
		});
		layout();
		frame = window.requestAnimationFrame(tick);
		return () => {
			destroyed = true;
			controllerRef.current = null;
			window.cancelAnimationFrame(frame);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onResize);
			window.removeEventListener("orientationchange", layout);
			window.removeEventListener("pointerdown", onFirstGesture);
			window.removeEventListener("touchstart", onFirstGesture);
			root.style.removeProperty("--ss-progress");
			delete root.dataset.activeSection;
			for (const segment of runtime) {
				unloadClip(segment);
				segment.layer.style.removeProperty("opacity");
				segment.layer.style.removeProperty("z-index");
			}
		};
	}, [segments]);
	if (scenes.length === 0) return null;
	const themeStyle = {
		"--ss-accent": theme.accent,
		"--ss-bg": theme.background,
		"--ss-ink": theme.ink,
		"--ss-muted": theme.muted
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: ["scroll-scrub", className].filter(Boolean).join(" "),
		ref: rootRef,
		style: themeStyle,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "scroll-scrub__stage",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": "true",
					className: "scroll-scrub__media",
					children: segments.map((segment, index) => {
						const layerStyle = {
							"--ss-mobile-position": segment.mobileObjectPosition,
							"--ss-object-position": segment.objectPosition
						};
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
							className: `scroll-scrub__layer scroll-scrub__layer--${segment.kind}`,
							"data-scroll-scrub-layer": "",
							style: layerStyle,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("picture", {
								className: "scroll-scrub__picture",
								children: [segment.mobilePoster ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
									media: "(hover: none) and (pointer: coarse), (max-width: 860px)",
									srcSet: segment.mobilePoster
								}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									alt: "",
									className: "scroll-scrub__poster",
									decoding: "async",
									fetchPriority: index === 0 ? "high" : "auto",
									loading: index === 0 ? "eager" : "lazy",
									src: segment.poster
								})]
							})
						}, segment.key);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": "true",
					className: "scroll-scrub__progress",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					"aria-label": "Scroll chapters",
					className: "scroll-scrub__route",
					children: scenes.map((scene, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						"aria-current": activeSection === index ? "step" : void 0,
						className: "scroll-scrub__route-button",
						onClick: () => controllerRef.current?.jumpToSection(index),
						type: "button",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: scene.label })
					}, scene.id))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "scroll-scrub__story",
			children: segments.map((segment) => {
				const bandStyle = { minHeight: `${Math.max(segment.weight, .2) * 100}dvh` };
				if (segment.kind === "connector") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": "true",
					className: "scroll-scrub__connector-band",
					"data-scroll-scrub-band": "",
					style: bandStyle
				}, segment.key);
				const { scene } = segment;
				if (!scene) return null;
				const Heading = segment.sectionIndex === 0 ? "h1" : "h2";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
					className: "scroll-scrub__chapter",
					"data-align": scene.align ?? "left",
					"data-scroll-scrub-band": "",
					id: scene.id,
					style: bandStyle,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "scroll-scrub__chapter-pin",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "scroll-scrub__copy",
							children: [
								scene.kicker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "scroll-scrub__kicker",
									children: scene.kicker
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
									className: "scroll-scrub__title",
									children: scene.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "scroll-scrub__body",
									children: scene.body
								}),
								scene.tags?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "scroll-scrub__tags",
									children: scene.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: tag }, tag))
								}) : null,
								scene.actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "scroll-scrub__actions",
									children: scene.actions
								}) : null
							]
						})
					})
				}, segment.key);
			})
		})]
	});
}
function useCampaignMotion() {
	(0, import_react.useEffect)(() => {
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
		let dispose;
		const setup = () => {
			dispose?.();
			const nav = document.getElementById("navigation");
			const updateNav = () => nav?.classList.toggle("is-scrolled", window.scrollY > 60);
			updateNav();
			window.addEventListener("scroll", updateNav, { passive: true });
			const cleanNav = () => window.removeEventListener("scroll", updateNav);
			if (reduce.matches) {
				dispose = cleanNav;
				return;
			}
			gsapWithCSS.registerPlugin(ScrollTrigger);
			const lenis = new Lenis({
				autoRaf: false,
				duration: 1.08,
				smoothWheel: true,
				anchors: { offset: -76 }
			});
			lenis.on("scroll", ScrollTrigger.update);
			const ticker = (time) => lenis.raf(time * 1e3);
			gsapWithCSS.ticker.add(ticker);
			const context = gsapWithCSS.context(() => {
				gsapWithCSS.from(".sawai-film .scroll-scrub__title", {
					y: 30,
					duration: 1.2,
					ease: "power3.out"
				});
				gsapWithCSS.from(".sawai-film .scroll-scrub__body, .scroll-scrub__actions", {
					y: 18,
					duration: 1.1,
					delay: .16,
					ease: "power3.out"
				});
				gsapWithCSS.utils.toArray(".passage-copy").forEach((el) => {
					gsapWithCSS.fromTo(el, { y: 36 }, {
						y: -24,
						ease: "none",
						scrollTrigger: {
							trigger: el,
							start: "top bottom",
							end: "bottom top",
							scrub: true
						}
					});
				});
				gsapWithCSS.utils.toArray("[data-parallax]").forEach((el) => {
					gsapWithCSS.fromTo(el, { y: 20 }, {
						y: -20,
						ease: "none",
						scrollTrigger: {
							trigger: el,
							start: "top bottom",
							end: "bottom top",
							scrub: true
						}
					});
				});
			}, "#sawai");
			const magnet = document.querySelector(".hero-shop");
			let reset = () => {};
			if (magnet && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
				const x = gsapWithCSS.quickTo(magnet, "x", {
					duration: .5,
					ease: "power3.out"
				});
				const y = gsapWithCSS.quickTo(magnet, "y", {
					duration: .5,
					ease: "power3.out"
				});
				const move = (e) => {
					const r = magnet.getBoundingClientRect();
					x((e.clientX - r.left - r.width / 2) * .12);
					y((e.clientY - r.top - r.height / 2) * .15);
				};
				const leave = () => {
					x(0);
					y(0);
				};
				magnet.addEventListener("pointermove", move);
				magnet.addEventListener("pointerleave", leave);
				reset = () => {
					magnet.removeEventListener("pointermove", move);
					magnet.removeEventListener("pointerleave", leave);
					gsapWithCSS.killTweensOf(magnet);
					gsapWithCSS.set(magnet, { clearProps: "transform" });
				};
			}
			dispose = () => {
				cleanNav();
				reset();
				context.revert();
				gsapWithCSS.ticker.remove(ticker);
				lenis.destroy();
			};
		};
		setup();
		reduce.addEventListener("change", setup);
		return () => {
			reduce.removeEventListener("change", setup);
			dispose?.();
		};
	}, []);
}
/**
* SSR-safe JSON-LD structured data component.
* Place at the top of page JSX, before visible content.
* The `json` prop must be a pre-stringified JSON string (module-level const).
*/
function StructuredData({ json }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
		type: "application/ld+json",
		dangerouslySetInnerHTML: { __html: json }
	});
}
var sizes = [
	{
		name: "200 ml",
		price: 640,
		note: "A little richness, every day."
	},
	{
		name: "500 ml",
		price: 1600,
		note: "For the heart of your kitchen."
	},
	{
		name: "1 Litre",
		price: 3200,
		note: "For families and professional kitchens."
	}
];
var schema = JSON.stringify({
	"@context": "https://schema.org",
	"@graph": [{
		"@type": "Organization",
		name: "Sawai Gir Amrut",
		url: "https://sawai-ghee.higgsfield.app",
		logo: "https://sawai-ghee.higgsfield.app/assets/brand/logo.webp",
		telephone: "+91 91569 96309",
		address: {
			"@type": "PostalAddress",
			streetAddress: "Malwadi, Post Bibi, Tal. Phaltan",
			addressLocality: "Satara",
			addressRegion: "Maharashtra",
			postalCode: "415537",
			addressCountry: "IN"
		}
	}, {
		"@type": "WebSite",
		name: "Sawai Gir Amrut",
		url: "https://sawai-ghee.higgsfield.app"
	}]
});
function Home() {
	useCampaignMotion();
	const dialog = (0, import_react.useRef)(null);
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const [size, setSize] = (0, import_react.useState)(0);
	const [quantity, setQuantity] = (0, import_react.useState)(1);
	const film = (0, import_react.useRef)(null);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [filmError, setFilmError] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!menuOpen) return;
		const saved = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = saved;
		};
	}, [menuOpen]);
	const closeMenu = () => {
		dialog.current?.close();
		setMenuOpen(false);
	};
	const orderUrl = "https://wa.me/919156996309?text=" + encodeURIComponent("Hello, I would like to order " + quantity + " jar" + (quantity > 1 ? "s" : "") + " of Sawai Gir Amrut A2 Gir Cow Bilona Ghee (" + sizes[size].name + "). Please confirm the current price, availability and delivery.");
	const toggleFilm = async () => {
		if (!film.current) return;
		if (film.current.paused) try {
			await film.current.play();
			setPlaying(true);
		} catch {
			setFilmError(true);
			setPlaying(false);
		}
		else {
			film.current.pause();
			setPlaying(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "sawai",
		className: "sawai",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StructuredData, { json: schema }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "skip-link",
				href: "#main",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sawai-nav",
				id: "navigation",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						className: "brand-lockup",
						href: "#home",
						"aria-label": "Sawai Gir Amrut, home",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/assets/brand/mark.webp",
							alt: "",
							width: "54",
							height: "54"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "SAWAI" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "GIR AMRUT" })] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "desktop-links",
						"aria-label": "Main navigation",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#home",
								children: "Home"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#story",
								children: "Our Story"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#why",
								children: "Why Our Ghee"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#products",
								children: "Products"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "nav-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							className: "nav-shop",
							href: "#products",
							children: ["Shop Now ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c, { size: 15 })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "menu-open",
							"aria-label": "Open navigation",
							"aria-expanded": menuOpen,
							"aria-controls": "mobile-menu",
							onClick: () => {
								dialog.current?.showModal();
								setMenuOpen(true);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dialog", {
				ref: dialog,
				id: "mobile-menu",
				className: "mobile-menu",
				onClose: () => setMenuOpen(false),
				"aria-label": "Mobile navigation",
				"data-lenis-prevent": "",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "menu-top",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SAWAI GIR AMRUT" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"aria-label": "Close navigation",
							onClick: closeMenu,
							children: "Close ×"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						"aria-label": "Mobile navigation",
						children: [
							["Home", "#home"],
							["Our Story", "#story"],
							["Why Our Ghee", "#why"],
							["Products", "#products"]
						].map(([label, href]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href,
							onClick: closeMenu,
							children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c, { size: 28 })]
						}, href))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Malwadi, Phaltan.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Made with tradition."
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "main",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "cinematic-journey",
						id: "home",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollScrub, {
								scenes: scrollScrubScenes,
								theme: scrollScrubTheme,
								className: "sawai-film"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								className: "scroll-cue",
								href: "#the-gold",
								"aria-label": "Scroll to the golden ghee story",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "THE GOLDEN JOURNEY" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c$1, { size: 17 })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "film-chapters",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
										className: "journey-passage",
										id: "the-gold",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "passage-copy",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "passage-rule" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
													"Golden by nature.",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Extraordinary by craft." })
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Warm aroma. A rich golden colour. The grainy texture of ghee made the traditional Bilona way." }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "chapter-caption",
													children: "THE COLOUR OF CARE"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
										className: "journey-passage",
										id: "the-craft",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "passage-copy",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
													"Good things",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "take their time." })
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Milk becomes curd. Curd becomes butter. A gentle simmer brings out the golden heart of the process." }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
													className: "journey-process",
													href: "#process",
													children: ["Explore the process ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c, { size: 19 })]
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
										className: "journey-passage last-passage",
										id: "the-table",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "passage-copy",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
												"A tradition",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "worth bringing home." })
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "From our Gir cows in Phaltan to the rituals of your kitchen. Sawai Gir Amrut, one spoonful at a time." })]
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "origin-rail",
								children: [
									"SAWAI GIR FARM ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
									" PHALTAN, MAHARASHTRA"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "purity-section",
						"aria-labelledby": "purity-title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "provenance-line",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "GIR COW MILK" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CURD-CHURNED BUTTER" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "THE BILONA METHOD" })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "purity-composition",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "section-kicker",
									children: "THE ESSENCE OF SAWAI"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									id: "purity-title",
									className: "display",
									children: [
										"A simple beginning.",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "A richer everyday." })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "purity-description",
									children: "Our A2 Gir cow ghee begins at Sawai Gir Farm. Cultured into curd, churned into butter, then slowly simmered."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "purity-detail",
									"data-parallax": "",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: "/assets/brand/gold.webp",
										alt: "Golden ghee flowing from a brass ladle",
										loading: "lazy",
										width: "808",
										height: "446"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "vertical-note",
									children: "FROM MILK. THROUGH TRADITION."
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "why-section section-pad",
						id: "why",
						"aria-labelledby": "why-title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "display",
							id: "why-title",
							children: [
								"The difference",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "is in the making." })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "difference-rows",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
									open: true,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "difference-index",
											children: "01"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Gir cow milk" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "row-reveal",
											children: "SOURCED AT OUR FARM"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n, { size: 22 })
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We begin with milk from the Gir cows at our farm in Phaltan, Maharashtra. The story of every jar starts here." })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "difference-index",
										children: "02"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Curd, before butter" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "row-reveal",
										children: "THE TRADITIONAL BILONA WAY"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n, { size: 22 })
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Milk is cultured into dahi. A wooden Bilona churn separates the white butter from buttermilk, preserving the traditional sequence." })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "difference-index",
										children: "03"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "A gentle simmer" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "row-reveal",
										children: "RICH IN AROMA AND TEXTURE"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n, { size: 22 })
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Butter is slowly heated until its moisture evaporates and ghee separates. This final step brings its characteristic aroma and golden colour." })] })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "process-section",
						id: "process",
						"aria-labelledby": "process-title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "process-cinema",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
									ref: film,
									playsInline: true,
									loop: true,
									preload: "none",
									poster: "/assets/brand/pour-poster.jpg",
									"aria-label": "Golden ghee being poured from a brass ladle",
									onPause: () => setPlaying(false),
									onPlay: () => setPlaying(true),
									onError: () => setFilmError(true),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
										src: "/assets/brand/pour.mp4",
										type: "video/mp4"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "process-scrim" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "process-title",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "section-kicker",
											children: "THE BILONA RITUAL"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
											id: "process-title",
											children: [
												"Made slowly.",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Remembered long." })
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											className: "film-control",
											onClick: toggleFilm,
											disabled: filmError,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: playing ? "Ⅱ" : "▷" }), playing ? "Pause film" : filmError ? "Film unavailable" : "Play pour film"]
										}),
										filmError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "film-status",
											role: "status",
											children: "Enjoy the product photograph while the film is unavailable."
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "process-steps",
							children: [
								["Milk", "Milk from our Gir cows begins the process."],
								["Curd", "The milk is cultured and set into dahi."],
								["Butter", "A wooden Bilona churn separates white butter."],
								["Ghee", "A slow simmer brings the ghee into its golden form."]
							].map(([name, text], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["0", i + 1] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: name }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: text })
							] }, name))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "heritage-section section-pad",
						id: "story",
						"aria-labelledby": "story-title",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "heritage-heading",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									id: "story-title",
									className: "display",
									children: [
										"A place. A process.",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "A promise." })
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
								className: "founder-photo",
								"data-parallax": "",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/assets/brand/founders.webp",
									alt: "The Sawai team presenting their original Gir Amrut ghee jars",
									width: "1400",
									height: "646",
									loading: "lazy"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", { children: "The people behind Sawai Gir Amrut. Malwadi, Phaltan, Maharashtra." })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "heritage-prose",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "At Sawai Gir Farm, the familiar rhythm of milk, curd, butter and ghee carries forward a deeply Indian tradition." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Our home is Malwadi, Phaltan. Our purpose is to bring the aroma and texture of Bilona ghee into the everyday kitchen." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										className: "heritage-contact",
										href: "tel:+919156996309",
										children: ["Talk to the farm ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c, { size: 18 })]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "product-section",
						id: "products",
						"aria-labelledby": "product-title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "product-gallery",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/assets/brand/collection.webp",
								srcSet: "/assets/brand/collection-720.webp 720w, /assets/brand/collection-1280.webp 1280w, /assets/brand/collection.webp 1920w",
								sizes: "(max-width: 860px) 100vw, 62vw",
								alt: "Sawai Gir Amrut ghee collection in its original emerald and gold packaging",
								width: "1920",
								height: "1071",
								loading: "lazy"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "AN EVERYDAY RITUAL, BEAUTIFULLY MADE." })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "product-selection",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "section-kicker",
									children: "BRING HOME THE GOLD"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									id: "product-title",
									children: [
										"Sawai",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Gir Amrut." })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "product-subtitle",
									children: "A2 Gir Cow Bilona Ghee"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
									className: "size-options",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "Choose your jar" }), sizes.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: i === size ? "selected" : "",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											name: "jar-size",
											type: "radio",
											checked: i === size,
											onChange: () => setSize(i),
											value: item.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.name })]
									}, item.name))]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "size-note",
									children: sizes[size].note
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "product-price",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", sizes[size].price.toLocaleString("en-IN")] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Catalogue price per jar" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "quantity-line",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										id: "quantity-label",
										children: "Quantity"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"aria-labelledby": "quantity-label",
										className: "quantity-control",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												"aria-label": "Decrease quantity",
												disabled: quantity === 1,
												onClick: () => setQuantity((q) => Math.max(1, q - 1)),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(m, { size: 15 })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("output", {
												"aria-live": "polite",
												children: quantity
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												"aria-label": "Increase quantity",
												disabled: quantity === 20,
												onClick: () => setQuantity((q) => Math.min(20, q + 1)),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(n, { size: 15 })
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									className: "purchase-row",
									href: orderUrl,
									target: "_blank",
									rel: "noopener noreferrer",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Shop Now" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(c, { size: 26 }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "sr-only",
											children: ". Opens a WhatsApp order enquiry in a new tab."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "purchase-note",
									children: "Order with our team on WhatsApp. Current price, availability and delivery are confirmed before payment."
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "trust-section section-pad",
						"aria-labelledby": "trust-title",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "trust-intro",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "display",
									id: "trust-title",
									children: [
										"Know the source.",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Trust the process." })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Good ghee begins with clear answers. Here is the story behind the jar." })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "quality-ledger",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Our source" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "Sawai Gir Farm, Phaltan" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Our milk" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "Gir cow milk" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Our method" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "Curd, Bilona-churned butter, slow simmer" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Our home" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "Malwadi, Satara, Maharashtra" })] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ghee-faq",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: ["What makes the Bilona method different?", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(n, { size: 18 })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "It begins with cultured curd. The curd is churned into butter before being heated into ghee, following the traditional milk-to-curd-to-butter sequence." })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: ["Which jar should I choose?", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(n, { size: 18 })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Choose 500 ml for a smaller kitchen, 1 Litre for regular family cooking, or enquire about 5 Litre for a larger household or business." })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: ["How do I place an order?", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(n, { size: 18 })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Select a size and quantity, then choose Shop Now to open a WhatsApp enquiry. Our team confirms the current price and delivery before payment." })] })
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "lifestyle-section",
						"aria-labelledby": "lifestyle-title",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/assets/brand/collection.webp",
								alt: "Sawai ghee alongside brass utensils, flowers and a traditionally set Indian table",
								loading: "lazy",
								width: "1920",
								height: "1071",
								"data-parallax": ""
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "lifestyle-overlay" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "lifestyle-copy",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									id: "lifestyle-title",
									children: [
										"A spoonful of home.",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Every single day." })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"Over warm dal. On a fresh roti.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"In the moments that bring us together."
								] })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "final-section section-pad",
						"aria-labelledby": "final-title",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							className: "final-purchase",
							href: "#products",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								id: "final-title",
								children: [
									"Make room",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "for something golden." })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "final-orbit",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(c, { size: 38 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Shop Now" })]
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "sawai-footer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "footer-main",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							className: "footer-brand",
							href: "#home",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/assets/brand/mark.webp",
								alt: "Sawai Gir Amrut",
								loading: "lazy",
								width: "78",
								height: "78"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"SAWAI",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "GIR AMRUT" })
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"A2 Gir cow ghee.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Rooted in the Bilona tradition."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							"aria-label": "Footer navigation",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#story",
									children: "Our Story"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#why",
									children: "Why Our Ghee"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#products",
									children: "Products"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "tel:+919156996309",
									children: "Contact"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("address", { children: [
							"Sawai Gir Farm",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Malwadi, Post Bibi, Tal. Phaltan",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Satara, Maharashtra 415537",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "tel:+919156996309",
								children: "+91 91569 96309"
							})
						] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "footer-bottom",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "© 2026 Sawai Gir Amrut. All rights reserved." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Made with tradition. Presented with care." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#home",
							"aria-label": "Back to top",
							children: "Back to top ↑"
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { Home as component };
