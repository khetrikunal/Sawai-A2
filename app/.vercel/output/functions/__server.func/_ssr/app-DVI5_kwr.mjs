import { r as __toESM } from "../_runtime.mjs";
import { C as DialogPopup, D as FieldControl, E as DialogBackdrop, F as require_jsx_runtime, I as require_react, M as FieldRoot, N as useRender, O as FieldDescription, S as DialogPortal, T as DialogClose, _ as AvatarImage, a as MenuSubmenuTrigger, b as DialogTitle, c as MenuSubmenuRoot, d as MenuPortal, f as MenuPopup, g as AvatarFallback, h as MenuCheckboxItem, i as CheckboxRoot, j as FieldLabel, k as FieldError, l as MenuRoot, m as MenuGroup, n as SwitchRoot, o as Separator$1, p as MenuItem, r as CheckboxIndicator, s as MenuTrigger, t as SwitchThumb, u as MenuPositioner, v as AvatarRoot, w as DialogDescription, x as DialogRoot, y as DialogTrigger } from "../_libs/@base-ui/react+[...].mjs";
import { t as Route } from "./app-pLgLE2vk.mjs";
import { C as ChevronUp, D as ChartColumn, E as Check, O as Blocks, S as ChevronsUpDown, T as ChevronLeft, _ as Download, a as Sparkle, b as Clock3, c as Plus, d as PanelLeftClose, f as Info, g as EllipsisVertical, h as Ellipsis, i as Sparkles, k as Activity, l as Pin, m as FolderOpen, n as Video, o as Share2, p as Heart, r as Trash2, s as Search, t as X, u as PanelRightClose, v as Copy, w as ChevronRight, x as CircleCheck, y as Cloud } from "../_libs/lucide-react.mjs";
import { n as s, o as s$1, r as i, t as n } from "../_libs/phosphor-icons__react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-DVI5_kwr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Minimal class-name joiner. No tailwind-merge: components apply a single
*  composite `menu-*` class plus an optional caller `className`.
*/
function cx(...values) {
	return values.filter(Boolean).join(" ");
}
/**
* Variant/size → literal class strings. These literals (not a `q-button-${x}`
* template) are what Tailwind's scanner extracts from this file — see the
* `@source "./button.tsx"` in button.css — so every utility is generated.
* `satisfies Record<…>` makes the unions the single source of truth: adding a
* variant or size fails to compile until its class is registered here.
*/
var VARIANT_CLASS$3 = {
	primary: "q-button-primary",
	secondary: "q-button-secondary",
	tertiary: "q-button-tertiary",
	outline: "q-button-outline",
	ghost: "q-button-ghost",
	danger: "q-button-danger",
	dangerSoft: "q-button-danger-soft",
	brandSoft: "q-button-brand-soft",
	marketingPrimary: "q-button-marketing-primary",
	marketingSecondary: "q-button-marketing-secondary",
	marketingTertiary: "q-button-marketing-tertiary",
	marketingGhost: "q-button-marketing-ghost",
	specialBrand: "q-button-special-brand",
	specialPink: "q-button-special-pink"
};
var SIZE_CLASS$9 = {
	xxs: "q-button-xxs",
	xs: "q-button-xs",
	sm: "q-button-sm",
	md: "q-button-md",
	lg: "q-button-lg"
};
/** Marketing primary/secondary have no xxs (start at xs); glass variants keep xxs. */
var MARKETING_NO_XXS_VARIANTS = /* @__PURE__ */ new Set(["marketingPrimary", "marketingSecondary"]);
/** Build the button class string. Also usable to style non-button elements. */
function button(options = {}, ...extra) {
	const { variant = "primary", size = "sm", iconOnly = false } = options;
	const effectiveSize = size === "xxs" && MARKETING_NO_XXS_VARIANTS.has(variant) ? "xs" : size;
	return cx("q-button", VARIANT_CLASS$3[variant], SIZE_CLASS$9[effectiveSize], iconOnly && "q-button-icon-only", ...extra);
}
/**
* Button — composite + AI-friendly: every part is a replaceable node with a
* sensible default (nothing). The label is `children`; `start` / `end` are slots
* that take any node, so you compose OTHER quanta components into the button
* rather than hand-rolling markup:
*
*   <Button>Save</Button>                                  // label only
*   <Button start={<PlusIcon/>}>New project</Button>       // leading icon
*   <Button end={<Badge variant="nBrand">new</Badge>}>Upgrade</Button>
*   <Button iconOnly aria-label="Search" start={<SearchIcon/>} />
*   <Button as="a" href="/x">Link</Button>  ·  <Button asChild><a/></Button>
*/
function Button(props) {
	const { as, asChild, variant, size, iconOnly, className, children, start, end, ref, ...rest } = props;
	const cls = button({
		variant,
		size,
		iconOnly
	}, className);
	const hasSlots = start != null || end != null;
	const content = hasSlots ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		start,
		hasSlots && !iconOnly && children != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "q-button-label-frame",
			children
		}) : children,
		end
	] }) : children;
	return useRender({
		render: asChild ? children : as ? (0, import_react.createElement)(as) : void 0,
		defaultTagName: "button",
		ref,
		props: {
			className: cls,
			...!asChild && (as === void 0 || as === "button") ? { type: "button" } : {},
			...asChild ? {} : { children: content },
			...rest
		}
	});
}
var SIZE_CLASS$8 = {
	xs: "q-icon-xs",
	sm: "q-icon-sm",
	md: "q-icon-md",
	lg: "q-icon-lg",
	xl: "q-icon-xl"
};
var COLOR_CLASS$2 = {
	primary: "text-q-icon-primary",
	secondary: "text-q-icon-secondary",
	tertiary: "text-q-icon-tertiary",
	brand: "text-q-icon-brand",
	accent: "text-q-icon-accent",
	inverse: "text-q-icon-inverse",
	disabled: "text-q-icon-disabled",
	error: "text-q-icon-error",
	success: "text-q-icon-success",
	warning: "text-q-icon-warning",
	info: "text-q-icon-info"
};
/** Recipe — the composite icon class string, for styling a glyph element directly. */
function icon(options = {}, ...extra) {
	const { size = "md", color } = options;
	return cx("q-icon", SIZE_CLASS$8[size], color && COLOR_CLASS$2[color], ...extra);
}
function Icon({ size = "md", color, as: As, children, label, className, ref, role, "aria-label": ariaLabel, "aria-hidden": ariaHidden }) {
	const accessibleLabel = ariaLabel ?? label;
	const glyphProps = {
		ref,
		role: role ?? (accessibleLabel ? "img" : void 0),
		"aria-label": accessibleLabel,
		"aria-hidden": ariaHidden ?? (accessibleLabel ? void 0 : true),
		className: icon({
			size,
			color
		}, className)
	};
	if (As) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(As, { ...glyphProps });
	if ((0, import_react.isValidElement)(children)) return (0, import_react.cloneElement)(children, glyphProps);
	return null;
}
function Input({ label, description, error, invalid: invalidProp, required = false, start, end, prefix, suffix, render, className, controlClassName, inputClassName, fieldProps, ...controlProps }) {
	const invalid = invalidProp ?? error != null;
	const lead = start ?? prefix;
	const trail = end ?? suffix;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldRoot, {
		className: cx("q-field", className),
		...fieldProps,
		children: [
			label != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldLabel, {
				className: cx("q-field-label", invalid && "q-field-label-invalid"),
				children: [label, required ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					className: "q-field-required",
					children: "*"
				}) : null]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cx("q-field-control", invalid && "q-field-control-invalid", controlClassName),
				children: [
					lead != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "q-field-affix",
						children: lead
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldControl, {
						className: cx("q-field-input", inputClassName),
						"aria-invalid": invalid || void 0,
						render,
						...controlProps
					}),
					trail != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "q-field-affix",
						children: trail
					}) : null
				]
			}),
			invalid && error != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, {
				match: true,
				className: "q-field-error",
				children: error
			}) : description != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, {
				className: "q-field-description",
				children: description
			}) : null
		]
	});
}
var glyph = (icon) => icon;
var IconMagnifyingGlass2Outlined = glyph(Search);
var IconMagnifyingGlassOutlined = glyph(Search);
var IconCheckmark2MediumOutlined = glyph(Check);
var IconPinFilledThin = glyph(Pin);
var IconCrossMediumOutlined = glyph(X);
var IconChevronRightMediumOutlined = glyph(ChevronRight);
var IconChevronLeftMediumOutlined = glyph(ChevronLeft);
var IconChevronGrabberVerticalOutlined = glyph(ChevronsUpDown);
var SIZE_CLASS$7 = {
	sm: "q-close-sm",
	md: "q-close-md",
	lg: "q-close-lg",
	xl: "q-close-xl"
};
/**
* Build the close-button class string. Use this to apply the styling to a
* non-`<button>` close element, e.g. a Base UI `Dialog.Close` / `Toast.Close`.
*/
function closeButton({ size = "md" } = {}, ...extra) {
	return cx("q-close", SIZE_CLASS$7[size], ...extra);
}
var SIZE_CLASS$6 = {
	xs: "q-modal-size-xs",
	sm: "q-modal-size-sm",
	md: "q-modal-size-md",
	lg: "q-modal-size-lg",
	xl: "q-modal-size-xl",
	"2xl": "q-modal-size-2xl"
};
/** Build the modal popup class string. Also usable to style a non-popup element. */
function modal(options = {}, ...extra) {
	const { size = "md" } = options;
	return cx("q-modal", SIZE_CLASS$6[size], ...extra);
}
/** Populate every ref in `refs` with the same node (object or callback refs). */
function mergeRefs$1(...refs) {
	return (node) => {
		for (const ref of refs) if (typeof ref === "function") ref(node);
		else if (ref) ref.current = node;
	};
}
var Root$4 = DialogRoot;
var Trigger$1 = DialogTrigger;
/** Raw dismiss trigger — wrap a Button via `render`, or pass your own children. */
var Close = DialogClose;
function Title$1({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		className: cx("q-modal-title", className),
		...props
	});
}
function Description({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
		className: cx("q-modal-description", className),
		...props
	});
}
/** Styled round dismiss button (Figma disc) — sits at the trailing end of a header. */
function CloseButton({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
		"aria-label": "Close",
		className: closeButton({}, className),
		...props,
		children: children ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			as: IconCrossMediumOutlined,
			size: "md"
		})
	});
}
/** Styled round back button (Figma disc) for the "back" header. */
function BackButton({ className, children, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: type ?? "button",
		"aria-label": "Back",
		className: closeButton({}, className),
		...props,
		children: children ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			as: IconChevronLeftMediumOutlined,
			size: "md"
		})
	});
}
/** Search row for the "search" header (magnifier + input). */
function Search$2({ className, inputClassName, icon, placeholder = "Search", type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cx("q-modal-search", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "q-modal-search-icon",
			children: icon ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				as: IconMagnifyingGlass2Outlined,
				size: "md"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			className: cx("q-modal-search-input", inputClassName),
			placeholder,
			type: type ?? "search",
			...props
		})]
	});
}
function Content$1({ size = "md", backdropClassName, container, className, children, initialFocus, ref, ...props }) {
	const popupRef = (0, import_react.useRef)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, {
		container,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogBackdrop, { className: cx("q-modal-backdrop", backdropClassName) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPopup, {
			ref: mergeRefs$1(popupRef, ref),
			initialFocus: initialFocus ?? popupRef,
			className: modal({ size }, className),
			...props,
			children
		})]
	});
}
function Header$1({ flush = false, className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cx("q-modal-header", flush && "q-modal-header-flush", className),
		...props
	});
}
/** Leading group inside a header (e.g. a BackButton + Title) for the "back" layout. */
function HeaderLead({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cx("q-modal-header-lead", className),
		...props
	});
}
/** Flex spacer — pushes following controls to the trailing end (header or footer). */
function Spacer({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-hidden": true,
		className: cx("q-modal-spacer", className),
		...props
	});
}
/**
* The inset "window" — a frosted, lighter pane inside the body. Place a single
* one to fill the body, or several inside your own layout div (flex row /
* column / grid) for split layouts like the Figma "Left sidebar" / "Selector".
*/
function Workspace({ className, padded = true, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cx("q-modal-workspace", padded && "q-modal-workspace-padded", className),
		...props
	});
}
/**
* Body — the scrollable region between header and footer. It imposes NO layout:
* arrange Workspaces however you like, or pass a single `Modal.Workspace`. Plain
* content with no Workspace anywhere is auto-wrapped in one full Workspace so the
* window effect still applies. Scrolls (never crops) when content overflows.
*/
function Body$2({ className, padded = true, children, ...props }) {
	const hasWorkspace = (nodes) => import_react.Children.toArray(nodes).some((c) => (0, import_react.isValidElement)(c) && (c.type === Workspace || hasWorkspace(c.props.children)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cx("q-modal-body", className),
		...props,
		children: hasWorkspace(children) ? children : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Workspace, {
			padded,
			children
		})
	});
}
function Footer$1({ full = false, className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cx("q-modal-footer", full && "q-modal-footer-full", className),
		...props
	});
}
/** Leading footer caption (muted helper text). */
function FooterCaption({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cx("q-modal-caption", className),
		...props
	});
}
/** Trailing footer actions (buttons), pushed to the right by default. */
function FooterActions({ full = false, className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cx("q-modal-actions", full && "q-modal-actions-full", className),
		...props
	});
}
var Modal = {
	Root: Root$4,
	Trigger: Trigger$1,
	Close,
	Content: Content$1,
	Header: Header$1,
	HeaderLead,
	Spacer,
	Title: Title$1,
	Description,
	CloseButton,
	BackButton,
	Search: Search$2,
	Body: Body$2,
	Workspace,
	Footer: Footer$1,
	FooterCaption,
	FooterActions
};
var VARIANT_CLASS$2 = {
	"accent-2xs-bold": "text-q-accent-2xs-bold",
	"accent-xs-bold": "text-q-accent-xs-bold",
	"accent-sm-bold": "text-q-accent-sm-bold",
	"accent-md-bold": "text-q-accent-md-bold",
	"accent-lg-bold": "text-q-accent-lg-bold",
	"accent-xl-bold": "text-q-accent-xl-bold",
	"accent-2xl-bold": "text-q-accent-2xl-bold",
	"accent-3xl-bold": "text-q-accent-3xl-bold",
	"accent-4xl-bold": "text-q-accent-4xl-bold",
	"accent-5xl-bold": "text-q-accent-5xl-bold",
	"accent-6xl-bold": "text-q-accent-6xl-bold",
	"body-sm-regular": "text-q-body-sm-regular",
	"body-sm-medium": "text-q-body-sm-medium",
	"body-sm-semi-bold": "text-q-body-sm-semi-bold",
	"body-md-regular": "text-q-body-md-regular",
	"body-md-medium": "text-q-body-md-medium",
	"body-md-semi-bold": "text-q-body-md-semi-bold",
	"body-lg-regular": "text-q-body-lg-regular",
	"body-lg-medium": "text-q-body-lg-medium",
	"body-lg-semi-bold": "text-q-body-lg-semi-bold",
	"caption-xs-regular": "text-q-caption-xs-regular",
	"caption-xs-medium": "text-q-caption-xs-medium",
	"caption-xs-semi-bold": "text-q-caption-xs-semi-bold",
	"caption-sm-regular": "text-q-caption-sm-regular",
	"caption-sm-medium": "text-q-caption-sm-medium",
	"caption-sm-semi-bold": "text-q-caption-sm-semi-bold",
	"display-sm-medium": "text-q-display-sm-medium",
	"display-sm-semi-bold": "text-q-display-sm-semi-bold",
	"display-sm-bold": "text-q-display-sm-bold",
	"display-md-medium": "text-q-display-md-medium",
	"display-md-semi-bold": "text-q-display-md-semi-bold",
	"display-md-bold": "text-q-display-md-bold",
	"display-lg-medium": "text-q-display-lg-medium",
	"display-lg-semi-bold": "text-q-display-lg-semi-bold",
	"display-lg-bold": "text-q-display-lg-bold",
	"headline-sm-medium": "text-q-headline-sm-medium",
	"headline-sm-semi-bold": "text-q-headline-sm-semi-bold",
	"headline-sm-bold": "text-q-headline-sm-bold",
	"headline-md-medium": "text-q-headline-md-medium",
	"headline-md-semi-bold": "text-q-headline-md-semi-bold",
	"headline-md-bold": "text-q-headline-md-bold",
	"headline-lg-medium": "text-q-headline-lg-medium",
	"headline-lg-semi-bold": "text-q-headline-lg-semi-bold",
	"headline-lg-bold": "text-q-headline-lg-bold",
	"label-xs-regular": "text-q-label-xs-regular",
	"label-xs-medium": "text-q-label-xs-medium",
	"label-xs-semi-bold": "text-q-label-xs-semi-bold",
	"label-xs-bold": "text-q-label-xs-bold",
	"label-sm-regular": "text-q-label-sm-regular",
	"label-sm-medium": "text-q-label-sm-medium",
	"label-sm-semi-bold": "text-q-label-sm-semi-bold",
	"label-sm-bold": "text-q-label-sm-bold",
	"label-md-regular": "text-q-label-md-regular",
	"label-md-medium": "text-q-label-md-medium",
	"label-md-semi-bold": "text-q-label-md-semi-bold",
	"label-md-bold": "text-q-label-md-bold",
	"label-lg-regular": "text-q-label-lg-regular",
	"label-lg-medium": "text-q-label-lg-medium",
	"label-lg-semi-bold": "text-q-label-lg-semi-bold",
	"label-lg-bold": "text-q-label-lg-bold",
	"mono-xs-regular": "text-q-mono-xs-regular",
	"mono-xs-medium": "text-q-mono-xs-medium",
	"mono-xs-semi-bold": "text-q-mono-xs-semi-bold",
	"mono-sm-regular": "text-q-mono-sm-regular",
	"mono-sm-medium": "text-q-mono-sm-medium",
	"mono-sm-semi-bold": "text-q-mono-sm-semi-bold",
	"mono-md-regular": "text-q-mono-md-regular",
	"mono-md-medium": "text-q-mono-md-medium",
	"mono-md-semi-bold": "text-q-mono-md-semi-bold",
	"mono-lg-regular": "text-q-mono-lg-regular",
	"mono-lg-medium": "text-q-mono-lg-medium",
	"mono-lg-semi-bold": "text-q-mono-lg-semi-bold",
	"title-sm-medium": "text-q-title-sm-medium",
	"title-sm-semi-bold": "text-q-title-sm-semi-bold",
	"title-sm-bold": "text-q-title-sm-bold",
	"title-md-medium": "text-q-title-md-medium",
	"title-md-semi-bold": "text-q-title-md-semi-bold",
	"title-md-bold": "text-q-title-md-bold",
	"title-lg-medium": "text-q-title-lg-medium",
	"title-lg-semi-bold": "text-q-title-lg-semi-bold",
	"title-lg-bold": "text-q-title-lg-bold"
};
var COLOR_CLASS$1 = {
	primary: "text-q-text-primary",
	secondary: "text-q-text-secondary",
	tertiary: "text-q-text-tertiary",
	inverse: "text-q-text-inverse",
	disabled: "text-q-text-disabled",
	link: "text-q-text-link",
	brand: "text-q-text-brand",
	danger: "text-q-text-danger",
	success: "text-q-text-success",
	warning: "text-q-text-warning",
	info: "text-q-text-info",
	"on-overlay-secondary": "text-q-text-on-overlay-secondary",
	"on-overlay-tertiary": "text-q-text-on-overlay-tertiary"
};
/**
* Recipe — the class string for a given variant/color/truncate, so non-Typography
* elements (a Base UI part, an existing tag) can be styled identically:
* `<Trigger className={typography({ variant: 'label-md-semi-bold' })} />`.
*/
function typography(options = {}, ...extra) {
	const { variant = "body-md-regular", color, truncate } = options;
	return cx(VARIANT_CLASS$2[variant], color && COLOR_CLASS$1[color], truncate && "truncate", ...extra);
}
function Typography(props) {
	const { as, variant = "body-md-regular", color, truncate, className, ...rest } = props;
	return (0, import_react.createElement)(as ?? "p", {
		className: typography({
			variant,
			color,
			truncate
		}, className),
		...rest
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var SURFACE_CLASS$1 = {
	plain: "",
	glass: "q-prompt-box-glass"
};
function Root$3({ surface = "plain", className, children: childrenProp, ...props }) {
	const children = import_react.Children.toArray(childrenProp);
	const modeRailChildren = [];
	const dockChildren = [];
	for (const child of children) if ((0, import_react.isValidElement)(child) && child.type === ModeRail) modeRailChildren.push(child);
	else dockChildren.push(child);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("q-prompt-box", SURFACE_CLASS$1[surface], className),
		...props,
		children: [modeRailChildren, dockChildren.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "q-prompt-box-dock",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "q-prompt-box-dock-surface",
				children: dockChildren
			})
		}) : null]
	});
}
function ModeRail({ hidden = false, className, ...props }) {
	if (hidden) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("q-prompt-box-mode-rail", className),
		...props
	});
}
function Mode({ active = false, hidden = false, start, children, render, className, ref, ...props }) {
	const element = useRender({
		render,
		defaultTagName: "button",
		ref,
		props: {
			className: cn("q-prompt-box-mode", active && "q-prompt-box-mode-active", className),
			...render == null ? { type: "button" } : {},
			...active ? { "aria-pressed": true } : {},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [start != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "q-prompt-box-mode-icon",
				children: start
			}) : null, children != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "q-prompt-box-mode-label",
				children
			}) : null] }),
			...props
		}
	});
	return hidden ? null : element;
}
function Body$1({ className, surfaceClassName, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("q-prompt-box-body", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("q-prompt-box-surface", surfaceClassName),
			children
		})
	});
}
function Field$1({ className, rows = 1, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		rows,
		className: cn("q-prompt-box-field", className),
		...props
	});
}
function Actions({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("q-prompt-box-actions", className),
		...props
	});
}
function Pill({ start, end, children, iconOnly = false, hidden = false, render, className, ref, ...props }) {
	const element = useRender({
		render,
		defaultTagName: "button",
		ref,
		props: {
			className: cn("q-prompt-box-pill", iconOnly && "q-prompt-box-pill-icon-only", className),
			...render == null ? { type: "button" } : {},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				start != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "q-prompt-box-pill-start",
					children: start
				}) : null,
				children != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "q-prompt-box-pill-label",
					children
				}) : null,
				end != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "q-prompt-box-pill-end",
					children: end
				}) : null
			] }),
			...props
		}
	});
	return hidden ? null : element;
}
function Uploads({ hidden = false, className, ...props }) {
	if (hidden) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("q-prompt-box-uploads", className),
		...props
	});
}
function Upload({ label, src, alt = "", hidden = false, add, children, render, className, ref, ...props }) {
	const element = useRender({
		render,
		defaultTagName: "button",
		ref,
		props: {
			className: cn("q-prompt-box-upload", src != null && "q-prompt-box-upload-filled", className),
			...render == null ? { type: "button" } : {},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				src != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					className: "q-prompt-box-upload-media",
					src,
					alt
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "q-prompt-box-upload-add",
					children: add ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlusGlyph, {})
				}),
				label != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "q-prompt-box-upload-label",
					children: label
				}) : null,
				children
			] }),
			...props
		}
	});
	return hidden ? null : element;
}
/** The small "+" corner glyph rendered inside an empty Upload tile by default. */
function PlusGlyph() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": true,
		width: "16",
		height: "16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M8 3.5v9M3.5 8h9",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round"
		})
	});
}
function Generate({ cost, oldCost, start, children = "Generate", render, className, ref, ...props }) {
	const hasMeta = cost != null || oldCost != null || start != null;
	return useRender({
		render,
		defaultTagName: "button",
		ref,
		props: {
			className: cn("q-prompt-box-generate", className),
			...render == null ? { type: "button" } : {},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "q-prompt-box-generate-label",
				children
			}), hasMeta ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "q-prompt-box-generate-meta",
				children: [
					start ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkle, {}),
					oldCost != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "q-prompt-box-generate-old",
						children: oldCost
					}) : null,
					cost != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "q-prompt-box-generate-cost",
						children: cost
					}) : null
				]
			}) : null] }),
			...props
		}
	});
}
var PromptBox = {
	Root: Root$3,
	ModeRail,
	Mode,
	Body: Body$1,
	Field: Field$1,
	Actions,
	Pill,
	Uploads,
	Upload,
	Generate
};
/** Guaranteed-present token used as the universal degrade target. */
var FALLBACK = "var(--hf-color-brand-primary)";
/** color → the four `--q-tint*` properties (all sourced from `--hf-color-*`). */
var SLOT = {
	brand: {
		"--q-tint": "var(--hf-color-brand-primary)",
		"--q-tint-fg": "var(--hf-color-text-inverse)"
	},
	neutral: {
		"--q-tint": `var(--hf-color-text-primary, ${FALLBACK})`,
		"--q-tint-bg": `var(--hf-color-background-secondary-strong, ${FALLBACK})`,
		"--q-tint-fg": "var(--hf-color-text-primary)",
		"--q-tint-border": `var(--hf-color-border-strong, ${FALLBACK})`
	},
	success: {
		"--q-tint": `var(--hf-color-state-success-fg, ${FALLBACK})`,
		"--q-tint-fg": "var(--hf-color-text-inverse)"
	},
	error: {
		"--q-tint": `var(--hf-color-state-error-fg, ${FALLBACK})`,
		"--q-tint-fg": "var(--hf-color-text-inverse)"
	},
	warning: {
		"--q-tint": `var(--hf-color-state-warning-fg, ${FALLBACK})`,
		"--q-tint-fg": "var(--hf-color-text-inverse)"
	},
	info: {
		"--q-tint": `var(--hf-color-state-info-fg, ${FALLBACK})`,
		"--q-tint-fg": "var(--hf-color-text-inverse)"
	}
};
/**
* Inline style object that wires a `color` prop into the slot custom properties.
* Spread it into a component's `style`, then style surfaces with `q-slot-*`.
*
*   style={{ ...slotStyle(color), ...style }}
*/
function slotStyle(color) {
	return SLOT[color];
}
var SIZE_CLASS$5 = {
	xxs: "q-loader-xxs",
	xs: "q-loader-xs",
	sm: "q-loader-sm",
	md: "q-loader-md",
	lg: "q-loader-lg"
};
var VARIANT_CLASS$1 = {
	dots: "q-loader-dots",
	circle: "q-loader-circle",
	stars: "q-loader-stars",
	shine: "q-loader-shine"
};
/** Four-point sparkle (Figma "AI" star). Scales with the loader box. */
function Sparkle$2({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		className,
		viewBox: "0 0 24 24",
		fill: "currentColor",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 0c.6 6.7 5.3 11.4 12 12-6.7.6-11.4 5.3-12 12-.6-6.7-5.3-11.4-12-12C6.7 11.4 11.4 6.7 12 0Z" })
	});
}
function Loader({ variant = "circle", size = "md", color = "brand", animated = true, className, style, "aria-label": ariaLabel = "Loading", ...props }) {
	const common = {
		role: "status",
		"aria-label": ariaLabel,
		"aria-live": "polite",
		"data-static": animated ? void 0 : "",
		style: {
			...slotStyle(color),
			...style
		},
		...props
	};
	const rootClass = cx("q-loader", VARIANT_CLASS$1[variant], SIZE_CLASS$5[size], className);
	if (variant === "dots") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		...common,
		className: rootClass,
		children: Array.from({ length: 4 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "q-loader-dot" }, i))
	});
	if (variant === "stars") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		...common,
		className: rootClass,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkle$2, { className: "q-loader-star q-loader-star-main" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkle$2, { className: "q-loader-star q-loader-star-sub" })]
	});
	if (variant === "shine") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		...common,
		className: rootClass
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		...common,
		className: rootClass,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			className: "q-loader-spinner",
			viewBox: "0 0 24 24",
			fill: "none",
			"aria-hidden": true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				className: "q-loader-spinner-track",
				cx: "12",
				cy: "12",
				r: "9",
				strokeWidth: "2.5"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				className: "q-loader-spinner-arc",
				d: "M12 3a9 9 0 0 1 9 9",
				strokeWidth: "2.5",
				strokeLinecap: "round"
			})]
		})
	});
}
function useInView(options = {}) {
	const { threshold = .5, rootMargin, root = null, once = false } = options;
	const [node, setNode] = (0, import_react.useState)(null);
	const [inView, setInView] = (0, import_react.useState)(false);
	const ref = (0, import_react.useCallback)((next) => setNode(next), []);
	(0, import_react.useEffect)(() => {
		if (node == null || typeof IntersectionObserver === "undefined") return;
		const observer = new IntersectionObserver((entries) => {
			const entry = entries[0];
			if (entry == null) return;
			const visible = entry.isIntersecting && entry.intersectionRatio >= threshold;
			setInView(visible);
			if (visible && once) observer.disconnect();
		}, {
			threshold,
			rootMargin: rootMargin ?? void 0,
			root
		});
		observer.observe(node);
		return () => observer.disconnect();
	}, [
		node,
		threshold,
		rootMargin,
		root,
		once
	]);
	return {
		ref,
		inView
	};
}
var RATIO_CLASS = {
	square: "aspect-square",
	video: "aspect-video",
	portrait: "q-media-portrait",
	wide: "q-media-wide",
	auto: ""
};
var FIT_CLASS = {
	cover: "object-cover",
	contain: "object-contain"
};
var ROUNDED_CLASS$1 = {
	none: "rounded-q-0",
	sm: "rounded-q-150",
	md: "rounded-q-300",
	lg: "rounded-q-500",
	full: "rounded-q-full"
};
var OVERLAY_PLACEMENT_CLASS = {
	fill: "q-media-overlay-fill",
	top: "q-media-overlay-top",
	bottom: "q-media-overlay-bottom",
	center: "q-media-overlay-center"
};
function Root$2({ ratio = "video", rounded = "md", className, style, children, ...props }) {
	const numeric = typeof ratio === "number";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cx("q-media", numeric ? void 0 : RATIO_CLASS[ratio], ROUNDED_CLASS$1[rounded], className),
		style: numeric ? {
			"--q-media-ratio": ratio,
			...style
		} : style,
		...props,
		children
	});
}
function Image({ fit = "cover", loading = "lazy", decoding = "async", className, alt = "", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		alt,
		loading,
		decoding,
		className: cx("q-media-fill", FIT_CLASS[fit], className),
		...props
	});
}
function Video$1({ fit = "cover", autoPlayInView = false, inViewThreshold = .5, muted, playsInline, preload, className, ref: forwardedRef, ...props }) {
	const { ref: inViewRef, inView } = useInView({ threshold: inViewThreshold });
	const videoRef = (0, import_react.useRef)(null);
	const setRef = (0, import_react.useCallback)((node) => {
		videoRef.current = node;
		inViewRef(node);
		if (typeof forwardedRef === "function") forwardedRef(node);
		else if (forwardedRef != null) forwardedRef.current = node;
	}, [inViewRef, forwardedRef]);
	(0, import_react.useEffect)(() => {
		if (!autoPlayInView) return;
		const video = videoRef.current;
		if (video == null) return;
		if (inView) video.play()?.catch(() => {});
		else video.pause();
	}, [autoPlayInView, inView]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
		ref: autoPlayInView ? setRef : forwardedRef,
		className: cx("q-media-fill", FIT_CLASS[fit], className),
		muted: autoPlayInView ? true : muted,
		playsInline: autoPlayInView ? true : playsInline,
		preload: preload ?? (autoPlayInView ? "metadata" : void 0),
		...props
	});
}
/** The empty / broken-source slot — a tinted box with centered content. */
function Fallback({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cx("q-media-fallback", className),
		...props
	});
}
/** An absolutely-positioned layer — gradient scrim, play button, corner badge. */
function Overlay({ placement = "fill", className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cx("q-media-overlay", OVERLAY_PLACEMENT_CLASS[placement], className),
		...props
	});
}
/** A small label region. Compose Typography / Badge / text inside it. */
function Caption({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cx("q-media-caption", className),
		...props
	});
}
var Media = Object.assign(Root$2, {
	Root: Root$2,
	Image,
	Video: Video$1,
	Fallback,
	Overlay,
	Caption
});
/** The pulsing top glow + "Generating" status pill (Cinema-Studio-V4 20037:25838). */
function GeneratingOverlay({ label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "q-generation-card-generating",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "q-generation-card-glow",
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "q-generation-card-status",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, {
				variant: "circle",
				size: "xs",
				color: "brand",
				"aria-label": typeof label === "string" ? label : "Generating"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
				as: "span",
				variant: "body-sm-medium",
				color: "brand",
				"aria-hidden": "true",
				children: label
			})]
		})]
	});
}
function GenerationCard({ state = "ready", src, alt = "", ratio = "video", media, title, generatingLabel = "Generating", className, children, render, ref, ...props }) {
	const generating = state === "generating";
	const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Media, {
			ratio,
			rounded: "md",
			className: "q-generation-card-media",
			children: generating ? media ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Media.Fallback, { className: "q-generation-card-canvas" }) : media ?? (src != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Media.Image, {
				src,
				alt
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Media.Fallback, {}))
		}),
		!generating && title != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Media.Overlay, {
			placement: "bottom",
			className: "q-generation-card-caption",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
				as: "span",
				variant: "body-sm-semi-bold",
				color: "primary",
				className: "q-generation-card-title",
				children: title
			})
		}) : null,
		generating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GeneratingOverlay, { label: generatingLabel }) : null,
		children
	] });
	return useRender({
		render,
		defaultTagName: "div",
		ref,
		props: {
			className: cn("q-generation-card", className),
			"data-state": state,
			children: content,
			...props
		}
	});
}
var SIZE_CLASS$4 = {
	md: "size-q-200",
	sm: "size-q-150",
	xs: "size-q-100"
};
var RING = {
	md: "border-q-thick",
	sm: "border-q-medium",
	xs: "border-q-medium"
};
var RING_COLOR = {
	green: {
		md: "border-q-background-glass",
		sm: "border-q-background-glass",
		xs: "border-q-transparent-light-05"
	},
	yellow: {
		md: "border-q-background-glass",
		sm: "border-q-background-glass",
		xs: "border-q-background-glass"
	},
	red: {
		md: "border-q-background-glass",
		sm: "border-q-background-glass",
		xs: "border-q-background-glass"
	},
	grey: {
		md: "border-q-background-glass",
		sm: "border-q-background-glass",
		xs: "border-q-background-glass"
	}
};
var FILL = {
	green: "bg-q-palette-mint-bg",
	yellow: "bg-q-brand-yellow",
	red: "bg-q-palette-pink-bg",
	grey: "bg-q-icon-secondary"
};
/**
* Sets `color` to the fill so the animations (which use `currentColor` for their
* rings / halo) inherit the dot's colour. Applied only when animating.
*/
var INK = {
	green: "text-q-palette-mint-bg",
	yellow: "text-q-brand-yellow",
	red: "text-q-palette-pink-bg",
	grey: "text-q-icon-secondary"
};
var ANIMATION = {
	pulse: "q-dot-pulse",
	glow: "q-dot-glow"
};
function Dot({ color = "green", size = "md", animation, label, className, role, "aria-label": ariaLabel, "aria-hidden": ariaHidden, ...props }) {
	const accessibleLabel = ariaLabel ?? label;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		role: role ?? (accessibleLabel ? "img" : void 0),
		"aria-label": accessibleLabel,
		"aria-hidden": ariaHidden ?? (accessibleLabel ? void 0 : true),
		className: cx("q-dot box-content block shrink-0 rounded-q-full", SIZE_CLASS$4[size], RING[size], RING_COLOR[color][size], FILL[color], animation && ANIMATION[animation], animation && INK[color], className),
		...props
	});
}
var SIZE_BOX = {
	xxs: "size-q-500",
	xs: "size-q-600",
	sm: "size-q-800",
	md: "size-q-1000",
	lg: "size-q-1200",
	xl: "size-q-1400"
};
var SIZE_TEXT_VARIANT = {
	xxs: "mono-xs-semi-bold",
	xs: "mono-xs-semi-bold",
	sm: "mono-sm-semi-bold",
	md: "mono-lg-semi-bold",
	lg: "mono-lg-semi-bold",
	xl: "mono-lg-semi-bold"
};
var SIZE_TEXT_DASHED_VARIANT = {
	xxs: "mono-xs-semi-bold",
	xs: "mono-sm-semi-bold",
	sm: "mono-sm-semi-bold",
	md: "mono-sm-semi-bold",
	lg: "mono-md-semi-bold",
	xl: "mono-lg-semi-bold"
};
var PENDING_BORDER = {
	xxs: "border-q-thin",
	xs: "border-q-thin",
	sm: "border-q-thin",
	md: "border-q-medium",
	lg: "border-q-medium",
	xl: "border-q-medium"
};
var COLOR_BG = {
	orange: "bg-q-palette-orange-bg",
	mint: "bg-q-palette-mint-bg",
	blue: "bg-q-palette-blue-bg",
	pink: "bg-q-palette-pink-bg",
	purple: "bg-q-palette-purple-bg",
	brown: "bg-q-palette-brown-bg",
	yellow: "bg-q-brand-yellow",
	neutral: "bg-q-background-elevated-start"
};
var COLOR_FG = {
	orange: "text-q-text-primary",
	mint: "text-q-palette-mint-text",
	blue: "text-q-palette-blue-text",
	pink: "text-q-text-primary",
	purple: "text-q-text-primary",
	brown: "text-q-palette-brown-text",
	yellow: "text-q-text-inverse",
	neutral: "text-q-text-primary"
};
/** Presence colour the Figma dot uses for each avatar status. */
var STATUS_DOT_COLOR = {
	online: "green",
	away: "yellow",
	busy: "red",
	offline: "grey"
};
/** Dot scale the design pairs with each avatar size. */
var STATUS_DOT_SIZE = {
	xxs: "xs",
	xs: "xs",
	sm: "sm",
	md: "md",
	lg: "md",
	xl: "md"
};
var AUTO = [
	"orange",
	"mint",
	"blue",
	"pink",
	"purple",
	"brown",
	"yellow"
];
function Avatar$1({ size = "md", src, alt, fallback, color, status, badge, variant = "filled", imageProps, className, ...props }) {
	const sizeKey = normalizeSize(size);
	const pending = variant === "pending" || variant === "dashed";
	const avatarColor = pending ? "neutral" : color ?? (src ? "neutral" : autoColor(alt));
	const textVariant = (pending ? SIZE_TEXT_DASHED_VARIANT : SIZE_TEXT_VARIANT)[sizeKey];
	const textClass = typography({ variant: textVariant });
	const { className: imageClassName, decoding = "async", loading = "lazy", ...restImageProps } = imageProps ?? {};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarRoot, {
		className: (state) => cx("relative inline-flex shrink-0 select-none items-center justify-center overflow-visible rounded-q-full", SIZE_BOX[sizeKey], textClass, pending ? cx("border-dashed border-q-transparent-light-30 text-q-text-primary", PENDING_BORDER[sizeKey]) : cx(COLOR_BG[avatarColor], COLOR_FG[avatarColor]), typeof className === "function" ? className(state) : className),
		...props,
		children: [
			src && !pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
				src,
				alt: alt ?? "",
				loading,
				decoding,
				className: cx("pointer-events-none absolute inset-0 size-full rounded-q-full object-cover", imageClassName),
				...restImageProps
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
				className: "flex size-full items-center justify-center overflow-hidden rounded-q-full",
				children: fallback ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					as: "span",
					variant: textVariant,
					children: initials(alt, sizeKey)
				})
			}),
			badge != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "q-avatar-status",
				children: badge
			}) : status != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dot, {
				label: status,
				color: STATUS_DOT_COLOR[status],
				size: STATUS_DOT_SIZE[sizeKey],
				className: "q-avatar-status"
			}) : null
		]
	});
}
function normalizeSize(size) {
	return size === "2xs" ? "xxs" : size;
}
function initials(name, size) {
	if (!name) return "";
	if (size === "xs" || size === "xxs") return name.trim()[0]?.toUpperCase() ?? "";
	return name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
}
function autoColor(name) {
	if (!name) return "neutral";
	let h = 0;
	for (let i = 0; i < name.length; i++) h = Math.imul(h, 31) + name.charCodeAt(i) >>> 0;
	return AUTO[h % AUTO.length];
}
var BLUR_CLASS = {
	sm: "q-glass-blur-sm",
	md: "q-glass-blur-md",
	lg: "q-glass-blur-lg"
};
var ELEVATION_CLASS = {
	flat: "",
	raised: "q-glass-raised"
};
var ROUNDED_CLASS = {
	200: "q-glass-rounded-200",
	300: "q-glass-rounded-300",
	400: "q-glass-rounded-400",
	500: "q-glass-rounded-500",
	600: "q-glass-rounded-600",
	full: "q-glass-rounded-full"
};
/** Build the glass surface class string — usable to skin any element as glass. */
function glass(options = {}, ...extra) {
	const { blur = "md", elevation = "flat", rounded = "600", interactive = false } = options;
	return cx("q-glass", BLUR_CLASS[blur], ELEVATION_CLASS[elevation], ROUNDED_CLASS[rounded], interactive && "q-glass-interactive", ...extra);
}
var EXTENSION_BY_TYPE = {
	"image/jpeg": "jpg",
	"image/png": "png",
	"image/webp": "webp",
	"image/gif": "gif",
	"video/mp4": "mp4",
	"video/webm": "webm"
};
function filenameFromUrl(url, contentType) {
	try {
		const name = new URL(url, window.location.href).pathname.split("/").pop();
		if (name && name.includes(".")) return decodeURIComponent(name);
	} catch {}
	return `generation.${(contentType ? EXTENSION_BY_TYPE[contentType.split(";")[0] ?? ""] : void 0) ?? "bin"}`;
}
function clickDownload(href, filename, openInNewTab = false) {
	const anchor = document.createElement("a");
	anchor.href = href;
	anchor.download = filename;
	anchor.rel = "noopener";
	if (openInNewTab) anchor.target = "_blank";
	document.body.appendChild(anchor);
	anchor.click();
	anchor.remove();
}
/**
* Download a generated image or video. Fetching to a blob makes `download`
* reliable for same-origin and CORS-enabled media; the direct-link fallback
* still handles storage URLs that intentionally disallow fetch access.
*/
async function downloadMedia(url, filename) {
	if (typeof document === "undefined" || !url) return;
	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error(`Download failed with ${response.status}`);
		const blob = await response.blob();
		const objectUrl = URL.createObjectURL(blob);
		clickDownload(objectUrl, filename ?? filenameFromUrl(url, blob.type));
		window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1e3);
	} catch {
		clickDownload(url, filename ?? filenameFromUrl(url), true);
	}
}
var DEMO_GENERATION = {
	src: "/presets/how-product-works.png",
	mediaType: "image",
	aspectRatio: 2 / 3,
	author: {
		name: "retro_strawberry",
		role: "Author"
	},
	status: "Uploaded",
	fileType: "JPG",
	size: "2.4 MB",
	uploadedAt: "12.05.2026, 01:22",
	lastUsedAt: "12.05.2026, 16:43",
	prompt: "A model in a translucent floral raincoat standing beside pale horses in a windswept meadow, editorial fashion photography, soft daylight."
};
/** The canonical lime CTA — used when `primaryAction` is omitted. */
var DEFAULT_PRIMARY_ACTION = {
	label: "Turn to video",
	icon: Video
};
/** The canonical footer action row — used when `actions` is omitted. */
var DEFAULT_ACTIONS = [
	{
		id: "download",
		label: "Download",
		icon: Download
	},
	{
		id: "like",
		label: "Like",
		icon: Heart,
		iconOnly: true
	},
	{
		id: "share",
		label: "Share",
		icon: Share2,
		iconOnly: true
	},
	{
		id: "more",
		label: "More",
		icon: Ellipsis,
		iconOnly: true
	}
];
/** A single "label ⋯ value" detail row. `value` may embed an icon/node. */
function DetailRow({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
			as: "span",
			variant: "body-sm-regular",
			className: "shrink-0 text-q-transparent-light-50",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-w-0 flex-1 items-center justify-end gap-1.5",
			children: typeof value === "string" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
				as: "span",
				variant: "body-sm-regular",
				color: "primary",
				truncate: true,
				className: "text-right",
				children: value
			}) : value
		})]
	});
}
function InfoPanel({ generation, detailRows, primaryAction, actions }) {
	const [detailsOpen, setDetailsOpen] = (0, import_react.useState)(true);
	const data = {
		...DEMO_GENERATION,
		...generation,
		author: {
			...DEMO_GENERATION.author,
			...generation.author
		}
	};
	const rows = detailRows ?? [
		{
			id: "status",
			label: "Status",
			value: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				as: Cloud,
				size: "sm",
				color: "secondary"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
				as: "span",
				variant: "body-sm-regular",
				color: "primary",
				truncate: true,
				children: data.status
			})] })
		},
		{
			id: "type",
			label: "Type",
			value: data.fileType
		},
		{
			id: "size",
			label: "Size",
			value: data.size
		},
		{
			id: "uploaded",
			label: "Uploaded",
			value: data.uploadedAt
		},
		{
			id: "lastUsed",
			label: "Last used",
			value: data.lastUsedAt
		}
	];
	const primary = primaryAction === void 0 ? DEFAULT_PRIMARY_ACTION : primaryAction;
	const footerActions = (actions ?? DEFAULT_ACTIONS).map((action) => action.id === "download" && action.onSelect == null ? {
		...action,
		onSelect: () => void downloadMedia(data.src)
	} : action);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "flex h-full w-full flex-col gap-2 p-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 p-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar$1, {
						size: "sm",
						src: data.author?.avatarSrc,
						alt: data.author?.name,
						color: "mint"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 flex-1 flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							as: "span",
							variant: "body-sm-medium",
							color: "primary",
							truncate: true,
							children: data.author?.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							as: "span",
							variant: "caption-xs-regular",
							color: "secondary",
							truncate: true,
							children: data.author?.role ?? "Author"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
						"aria-label": "Close",
						className: "flex size-8 shrink-0 items-center justify-center rounded-q-full bg-q-transparent-light-05 text-q-icon-primary transition-colors hover:bg-q-transparent-light-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							as: X,
							size: "md"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 rounded-q-300 bg-q-transparent-light-05 p-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setDetailsOpen((o) => !o),
					className: "flex items-center gap-2 px-1 py-1.5",
					"aria-expanded": detailsOpen,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							as: Info,
							size: "sm",
							color: "secondary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							as: "span",
							variant: "label-xs-medium",
							color: "secondary",
							className: "flex-1 text-left uppercase",
							children: "Details"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							as: ChevronUp,
							size: "sm",
							color: "secondary",
							className: detailsOpen ? void 0 : "rotate-180"
						})
					]
				}), detailsOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [rows.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-1 rounded-q-200 bg-q-transparent-light-05 p-3",
					children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
						label: row.label,
						value: row.value
					}, row.id))
				}) : null, data.prompt != null && data.prompt !== "" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-1 rounded-q-200 bg-q-transparent-light-05 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						as: "span",
						variant: "body-sm-regular",
						className: "text-q-transparent-light-50",
						children: "Prompt"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						as: "p",
						variant: "body-sm-regular",
						color: "primary",
						children: data.prompt
					})]
				}) : null] }) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: "flex-1"
			}),
			primary != null || footerActions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 p-2",
				children: [primary != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "marketingPrimary",
					size: "sm",
					className: "w-full",
					onClick: primary.onSelect,
					start: primary.icon != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						as: primary.icon,
						size: "sm"
					}) : void 0,
					children: primary.label
				}) : null, footerActions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: footerActions.map((action) => action.iconOnly ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "marketingTertiary",
						size: "sm",
						iconOnly: true,
						"aria-label": action.label,
						onClick: action.onSelect,
						start: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							as: action.icon,
							size: "sm"
						})
					}, action.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "marketingTertiary",
						size: "sm",
						className: "flex-1",
						onClick: action.onSelect,
						start: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							as: action.icon,
							size: "sm"
						}),
						children: action.label
					}, action.id))
				}) : null]
			}) : null
		]
	});
}
function GenerationDetailModal({ trigger, generation, detailRows, primaryAction, actions, open, onOpenChange, defaultOpen }) {
	const data = {
		...DEMO_GENERATION,
		...generation
	};
	const stageRatio = data.aspectRatio ?? 2 / 3;
	const stageFrameClass = stageRatio >= 1 ? "max-h-full max-w-full shadow-q-overlay" : "h-full max-h-full w-auto! max-w-full shadow-q-overlay";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogRoot, {
		open,
		onOpenChange,
		defaultOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, { render: trigger }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogBackdrop, { className: "q-modal-backdrop" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPopup, {
			"aria-label": "Generation preview",
			className: "fixed inset-0 z-q-modal flex outline-none transition-opacity duration-200 ease-out data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"aria-hidden": true,
					className: "pointer-events-none absolute inset-0 overflow-hidden bg-q-background-primary",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: data.src,
							alt: "",
							className: "absolute inset-0 size-full object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-q-transparent-dark-80" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 backdrop-blur-3xl" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative flex min-h-0 min-w-0 flex-1 items-center justify-center overflow-hidden p-6",
					children: data.mediaType === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Media, {
						ratio: stageRatio,
						rounded: "md",
						className: stageFrameClass,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Media.Video, {
							src: data.src,
							poster: data.poster,
							autoPlayInView: true,
							loop: true,
							fit: "cover"
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Media, {
						ratio: stageRatio,
						rounded: "md",
						className: stageFrameClass,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Media.Image, {
							src: data.src,
							alt: "",
							fit: "cover"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative flex w-[366px] shrink-0 p-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: glass({
							blur: "md",
							rounded: "500"
						}, "flex min-h-0 flex-1 flex-col overflow-y-auto"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoPanel, {
							generation: generation ?? DEMO_GENERATION,
							detailRows,
							primaryAction,
							actions
						})
					})
				})
			]
		})] })]
	});
}
/**
* Indicator glyphs inlined to match the Figma checkbox EXACTLY (node 481:795):
* a chunky 2px-stroke check on a 10×8 grid with round caps/joins — distinct from
* the package `IconCheckmark2MediumOutlined`, which is a different shape on a
* 24×24 grid at stroke 1.5 (≈half the weight). `currentColor` inherits the
* indicator fg (icon-inverse on the filled disk). The minus mirrors the check's
* weight so checked/indeterminate read as one family.
*/
function CheckGlyph() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 10 8",
		fill: "none",
		"aria-hidden": "true",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M1 4.06L3.34 6.4L8.56 1",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function MinusGlyph() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 10 8",
		fill: "none",
		"aria-hidden": "true",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M2 4H8",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round"
		})
	});
}
var COLOR_CLASS = {
	brand: "q-checkbox-brand",
	white: "q-checkbox-white"
};
var SIZE_CLASS$3 = {
	sm: "q-checkbox-sm",
	md: "q-checkbox-md",
	lg: "q-checkbox-lg"
};
function checkbox(options = {}, ...extra) {
	const { color = "brand", size = "md" } = options;
	return cx("q-checkbox", COLOR_CLASS[color], SIZE_CLASS$3[size], ...extra);
}
function Checkbox$1({ color, size, className, indeterminate, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxRoot, {
		indeterminate,
		className: (state) => checkbox({
			color,
			size
		}, typeof className === "function" ? className(state) : className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "q-checkbox-box",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
				className: "q-checkbox-indicator",
				children: indeterminate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MinusGlyph, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckGlyph, {})
			})
		})
	});
}
function Divider({ orientation = "horizontal", className, children, ...props }) {
	if (children != null && orientation === "horizontal") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "separator",
		"aria-orientation": "horizontal",
		className: cx("flex w-full items-center gap-2 align-middle", className),
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "q-divider flex-1",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
				as: "span",
				variant: "caption-sm-medium",
				color: "tertiary",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "q-divider flex-1",
				"aria-hidden": true
			})
		]
	});
	if (orientation === "vertical") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", {
		"aria-orientation": "vertical",
		className: cx("q-divider-vertical m-0 inline-block self-stretch", className),
		...props
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", {
		className: cx("q-divider m-0 block w-full", className),
		...props
	});
}
var SIZE_CLASS$2 = {
	sm: "q-not-found-sm",
	md: "q-not-found-md",
	lg: "q-not-found-lg"
};
var VARIANT_CLASS = {
	plain: "q-not-found-plain",
	card: "q-not-found-card",
	outline: "q-not-found-outline"
};
var TITLE_VARIANT = {
	sm: "caption-xs-medium",
	md: "caption-sm-medium",
	lg: "body-sm-medium"
};
var SUBTITLE_VARIANT = {
	sm: "caption-xs-regular",
	md: "caption-sm-regular",
	lg: "body-sm-regular"
};
function NotFound({ icon, title, subtitle, actions, size = "md", variant = "plain", className, children, render, ref, ...props }) {
	return useRender({
		render,
		defaultTagName: "div",
		ref,
		props: {
			className: cx("q-not-found", SIZE_CLASS$2[size], VARIANT_CLASS[variant], className),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				icon != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "q-not-found-icon",
					children: icon
				}) : null,
				title != null || subtitle != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "q-not-found-text",
					children: [title != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						as: "span",
						variant: TITLE_VARIANT[size],
						color: "secondary",
						children: title
					}) : null, subtitle != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						as: "span",
						variant: SUBTITLE_VARIANT[size],
						color: "tertiary",
						children: subtitle
					}) : null]
				}) : null,
				actions != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "q-not-found-actions",
					children: actions
				}) : null,
				children
			] }),
			...props
		}
	});
}
var SIZE_CLASS$1 = {
	small: "q-switch-small",
	medium: "q-switch-medium",
	default: "q-switch-default"
};
function Switch$1({ className, color = "brand", size = "small", style, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchRoot, {
		style: {
			...slotStyle(color),
			...style
		},
		className: (state) => cx("q-switch", SIZE_CLASS$1[size], typeof className === "function" ? className(state) : className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "q-switch-thumb" })
	});
}
var QueryContext = (0, import_react.createContext)("");
/**
* Render-time match tally. The old static walk (subtreeMatches) couldn't see
* Items wrapped in custom components, so search broke for every composed row.
* Instead each Item bumps this counter when it actually renders (matched), and a
* gate rendered AFTER the list reads the total — works for any composition.
*/
var MatchCountContext = (0, import_react.createContext)(null);
/** Per-Group tally (same idea, scoped) so a Group can hide when all ITS rows filter out. */
var GroupCountContext = (0, import_react.createContext)(null);
/** Pull the plain text out of an arbitrary ReactNode (best-effort, for search). */
function extractText(node) {
	if (node == null || node === false || node === true) return "";
	if (typeof node === "string" || typeof node === "number") return String(node);
	if (Array.isArray(node)) return node.map(extractText).join(" ");
	if ((0, import_react.isValidElement)(node)) return extractText(node.props.children);
	return "";
}
/** All whitespace-split terms must appear (case-insensitive substring). */
function matchQuery(text, query) {
	if (!query) return true;
	const haystack = text.toLowerCase();
	return query.toLowerCase().split(/\s+/).filter(Boolean).every((term) => haystack.includes(term));
}
/** Searchable / selection-key text for an Item: explicit `value`, else its `title`, else its children. */
function itemText(props) {
	if (props.value != null) return props.value;
	return extractText(props.title) || extractText(props.children);
}
var SelectionContext = (0, import_react.createContext)(null);
var noop = () => {};
var OpenContext = (0, import_react.createContext)({
	open: false,
	openOnHover: false,
	scheduleHoverOpen: noop,
	scheduleHoverClose: noop,
	cancelHoverClose: noop
});
var HOVER_OPEN_DELAY = 80;
var HOVER_CLOSE_DELAY = 120;
var ItemContext = (0, import_react.createContext)({
	checked: false,
	disabled: false,
	selectable: false
});
function Trigger({ className, onPointerEnter, onPointerLeave, ...props }) {
	const { open, openOnHover, scheduleHoverOpen, scheduleHoverClose, cancelHoverClose } = (0, import_react.useContext)(OpenContext);
	const handlePointerEnter = (0, import_react.useCallback)((event) => {
		onPointerEnter?.(event);
		if (!event.defaultPrevented && openOnHover) {
			cancelHoverClose();
			scheduleHoverOpen();
		}
	}, [
		cancelHoverClose,
		onPointerEnter,
		openOnHover,
		scheduleHoverOpen
	]);
	const handlePointerLeave = (0, import_react.useCallback)((event) => {
		onPointerLeave?.(event);
		if (!event.defaultPrevented && openOnHover) scheduleHoverClose();
	}, [
		onPointerLeave,
		openOnHover,
		scheduleHoverClose
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuTrigger, {
		...props,
		className: cx("q-dropdown-trigger", className),
		"data-open": open ? "" : void 0,
		"data-popup-open": open ? "" : void 0,
		onPointerEnter: handlePointerEnter,
		onPointerLeave: handlePointerLeave
	});
}
/**
* Root owns selection state. Uncontrolled by default (internal `useState`
* seeded by `defaultSelected`); pass `selected` to control it. Either way,
* `onSelected` fires with the next array on every change.
*/
function Root$1({ open, defaultOpen, onOpenChange, selected, defaultSelected, onSelected, selectionMode = "multiple", openOnHover = false, ...props }) {
	const [internal, setInternal] = (0, import_react.useState)(defaultSelected ?? []);
	const [internalOpen, setInternalOpen] = (0, import_react.useState)(defaultOpen ?? false);
	const hoverOpenTimeoutRef = (0, import_react.useRef)(null);
	const hoverCloseTimeoutRef = (0, import_react.useRef)(null);
	const isControlled = selected != null;
	const current = isControlled ? selected : internal;
	const isOpenControlled = open != null;
	const currentOpen = isOpenControlled ? open : internalOpen;
	const isSelected = (0, import_react.useCallback)((value) => current.includes(value), [current]);
	const toggle = (0, import_react.useCallback)((value, next) => {
		const compute = (prev) => {
			if (selectionMode === "single") return next ? [value] : prev.filter((v) => v !== value);
			if (next) return prev.includes(value) ? prev : [...prev, value];
			return prev.filter((v) => v !== value);
		};
		if (isControlled) onSelected?.(compute(current));
		else setInternal((prev) => {
			const nextState = compute(prev);
			onSelected?.(nextState);
			return nextState;
		});
	}, [
		current,
		isControlled,
		onSelected,
		selectionMode
	]);
	const ctx = (0, import_react.useMemo)(() => ({
		selected: current,
		isSelected,
		toggle
	}), [
		current,
		isSelected,
		toggle
	]);
	const cancelHoverOpen = (0, import_react.useCallback)(() => {
		if (hoverOpenTimeoutRef.current == null) return;
		clearTimeout(hoverOpenTimeoutRef.current);
		hoverOpenTimeoutRef.current = null;
	}, []);
	const cancelHoverClose = (0, import_react.useCallback)(() => {
		if (hoverCloseTimeoutRef.current == null) return;
		clearTimeout(hoverCloseTimeoutRef.current);
		hoverCloseTimeoutRef.current = null;
	}, []);
	const updateOpen = (0, import_react.useCallback)((next, event) => {
		cancelHoverOpen();
		cancelHoverClose();
		if (currentOpen === next) return;
		if (!isOpenControlled) setInternalOpen(next);
		onOpenChange?.(next, event);
	}, [
		cancelHoverClose,
		cancelHoverOpen,
		currentOpen,
		isOpenControlled,
		onOpenChange
	]);
	const scheduleHoverOpen = (0, import_react.useCallback)(() => {
		if (!openOnHover || currentOpen) return;
		cancelHoverClose();
		cancelHoverOpen();
		hoverOpenTimeoutRef.current = setTimeout(() => {
			hoverOpenTimeoutRef.current = null;
			updateOpen(true);
		}, HOVER_OPEN_DELAY);
	}, [
		cancelHoverClose,
		cancelHoverOpen,
		currentOpen,
		openOnHover,
		updateOpen
	]);
	const scheduleHoverClose = (0, import_react.useCallback)(() => {
		if (!openOnHover) return;
		cancelHoverOpen();
		cancelHoverClose();
		hoverCloseTimeoutRef.current = setTimeout(() => updateOpen(false), HOVER_CLOSE_DELAY);
	}, [
		cancelHoverClose,
		cancelHoverOpen,
		openOnHover,
		updateOpen
	]);
	const openCtx = (0, import_react.useMemo)(() => ({
		open: currentOpen,
		openOnHover,
		scheduleHoverOpen,
		scheduleHoverClose,
		cancelHoverClose
	}), [
		cancelHoverClose,
		currentOpen,
		openOnHover,
		scheduleHoverClose,
		scheduleHoverOpen
	]);
	const handleOpenChange = (0, import_react.useCallback)((next, event) => {
		updateOpen(next, event);
	}, [updateOpen]);
	(0, import_react.useEffect)(() => () => {
		cancelHoverOpen();
		cancelHoverClose();
	}, [cancelHoverClose, cancelHoverOpen]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenContext.Provider, {
		value: openCtx,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectionContext.Provider, {
			value: ctx,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuRoot, {
				open: currentOpen,
				onOpenChange: handleOpenChange,
				...props
			})
		})
	});
}
var SIZE_CLASS = {
	compact: "q-dropdown-content-compact",
	default: "",
	large: "q-dropdown-content-large"
};
var SURFACE_CLASS = {
	glass: "",
	solid: "q-dropdown-content-solid"
};
var SHAPE_CLASS = {
	default: "",
	panel: "q-dropdown-content-panel"
};
function contentClass(size, surface, shape, className) {
	return cx("q-dropdown-content", SIZE_CLASS[size], SURFACE_CLASS[surface], SHAPE_CLASS[shape], className);
}
function Content({ className, positionerClassName, size = "default", surface = "glass", shape = "default", side = "bottom", align = "start", sideOffset = 4, alignOffset, collisionPadding, container, withSearch = false, searchPlaceholder = "Search", notFound, children, onPointerEnter, onPointerLeave, ...props }) {
	const { openOnHover, scheduleHoverClose, cancelHoverClose } = (0, import_react.useContext)(OpenContext);
	const handlePointerEnter = (0, import_react.useCallback)((event) => {
		onPointerEnter?.(event);
		if (!event.defaultPrevented && openOnHover) cancelHoverClose();
	}, [
		cancelHoverClose,
		onPointerEnter,
		openOnHover
	]);
	const handlePointerLeave = (0, import_react.useCallback)((event) => {
		onPointerLeave?.(event);
		if (!event.defaultPrevented && openOnHover) scheduleHoverClose();
	}, [
		onPointerLeave,
		openOnHover,
		scheduleHoverClose
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuPortal, {
		container,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuPositioner, {
			className: positionerClassName,
			side,
			align,
			sideOffset,
			alignOffset,
			collisionPadding,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuPopup, {
				className: contentClass(size, surface, shape, className),
				onPointerEnter: handlePointerEnter,
				onPointerLeave: handlePointerLeave,
				...props,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchableContent, {
					withSearch,
					placeholder: searchPlaceholder,
					notFound,
					children
				})
			})
		})
	});
}
/** Holds query state INSIDE the popup so it resets every time the menu reopens. */
function SearchableContent({ withSearch, placeholder, notFound, children }) {
	const [query, setQuery] = (0, import_react.useState)("");
	const inputRef = (0, import_react.useRef)(null);
	const rootRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!withSearch) return;
		const id = requestAnimationFrame(() => inputRef.current?.focus());
		return () => cancelAnimationFrame(id);
	}, [withSearch]);
	if (!withSearch) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
	const focusFirstItem = () => {
		(rootRef.current?.querySelector("[role^=\"menuitem\"]:not([data-disabled])"))?.focus();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: rootRef,
		className: "q-dropdown-search-wrap",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "q-dropdown-search",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "q-dropdown-search-icon",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconMagnifyingGlass2Outlined, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: inputRef,
					className: "q-dropdown-search-input",
					placeholder,
					value: query,
					onChange: (e) => setQuery(e.target.value),
					onKeyDown: (e) => {
						if (e.key === "ArrowDown") {
							e.preventDefault();
							focusFirstItem();
							return;
						}
						if (e.key === "Escape") return;
						e.stopPropagation();
					}
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { className: "shrink-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryContext.Provider, {
				value: query,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MatchCountContext.Provider, {
					value: { n: 0 },
					children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchEmpty, { fallback: notFound })]
				})
			})
		]
	});
}
/** Rendered LAST in the search scope, so the match tally is complete: shows the
* NotFound fallback iff the query matched nothing. Composition-safe — no static
* introspection of children (which broke for wrapped Items). */
function SearchEmpty({ fallback }) {
	const query = (0, import_react.useContext)(QueryContext);
	const matchCount = (0, import_react.useContext)(MatchCountContext);
	if (query !== "" && matchCount != null && matchCount.n === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: fallback ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotFound, {
		title: "No results found",
		subtitle: "Try a different search"
	}) });
	return null;
}
function Separator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {
		render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
		className: cx("shrink-0", className),
		...props
	});
}
function Group({ className, children, ...props }) {
	const query = (0, import_react.useContext)(QueryContext);
	const [empty, setEmpty] = (0, import_react.useState)(false);
	const groupCount = { n: 0 };
	(0, import_react.useLayoutEffect)(() => {
		setEmpty(query !== "" && groupCount.n === 0);
	});
	if (empty) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuGroup, {
		className: cx("q-dropdown-group", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupCountContext.Provider, {
			value: groupCount,
			children
		})
	});
}
/** Section label (Figma _MenuLabel). Standalone, or as a Group's heading.
* Reuses the shared `q-menu-group-label` primitive (also used by cmdk). */
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cx("q-menu-group-label", className),
		...props
	});
}
function ItemIcon$1({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cx("q-menu-item-icon", className),
		...props
	});
}
/** Leading media tile (image/icon, 36px) for rich rows. */
function ItemMedia({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cx("q-dropdown-item-media", className),
		...props
	});
}
/** Content column — stacks the title row and description (Figma 2px gap). */
function ItemContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cx("q-menu-item-label", className),
		...props
	});
}
function ItemTitleRow({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cx("q-menu-item-title-row", className),
		...props
	});
}
function ItemTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cx("q-menu-item-title", className),
		...props
	});
}
function ItemDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cx("q-menu-item-description", className),
		...props
	});
}
/** Inline meta inside the title row (e.g. a count). */
function ItemMeta$1({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cx("q-dropdown-item-meta", className),
		...props
	});
}
/** Trailing slot — count, indicator, chevron, button… (pushed to the right). */
function ItemTrailing({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cx("q-menu-item-trailing", className),
		...props
	});
}
/** Small inset metadata chip. */
function ItemMetaChip({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cx("q-dropdown-meta-chip", className),
		...props
	});
}
/** Submenu affordance chevron for use inside a SubTrigger's ItemTrailing. */
function ItemSubChevron({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconChevronRightMediumOutlined, { className: cx("q-dropdown-check", className) });
}
/**
* Selection indicator for a `selectable` Item. Reads the row's checked state
* from context, so place it anywhere (typically inside ItemTrailing). The
* `indicator` style mirrors a real Checkbox / Switch, or a trailing check.
*/
function ItemIndicator({ indicator = "check" }) {
	const { checked } = (0, import_react.useContext)(ItemContext);
	if (indicator === "checkbox") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
		checked,
		size: "sm",
		tabIndex: -1,
		"aria-hidden": true,
		className: "pointer-events-none"
	});
	if (indicator === "switch") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		checked,
		size: "small",
		tabIndex: -1,
		"aria-hidden": true,
		className: "pointer-events-none"
	});
	return checked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconCheckmark2MediumOutlined, { className: "q-dropdown-check" }) : null;
}
function Item$1(props) {
	const { className, value, selectable = false, disabled, danger = false, checked, onCheckedChange, onSelect, start, media, title, subtitle, badge, end, indicator = "check", children, ...rest } = props;
	const query = (0, import_react.useContext)(QueryContext);
	const selection = (0, import_react.useContext)(SelectionContext);
	const matchCount = (0, import_react.useContext)(MatchCountContext);
	const groupCount = (0, import_react.useContext)(GroupCountContext);
	const [selfChecked, setSelfChecked] = (0, import_react.useState)(false);
	const disabledState = disabled === true;
	if (query && !matchQuery(itemText(props), query)) return null;
	if (matchCount) matchCount.n++;
	if (groupCount) groupCount.n++;
	const body = title != null || subtitle != null || start != null || media != null || badge != null || end != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		media != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemMedia, { children: media }) : start != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIcon$1, { children: start }) : null,
		title != null || subtitle != null || badge != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ItemContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ItemTitleRow, { children: [title != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemTitle, { children: title }) : null, badge] }), subtitle != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemDescription, { children: subtitle }) : null] }) : null,
		end != null || selectable ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ItemTrailing, { children: [end, selectable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator, { indicator }) : null] }) : null
	] }) : children;
	if (!selectable) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemContext.Provider, {
		value: {
			checked: false,
			disabled: disabledState,
			selectable: false,
			value
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
			className: cx("q-menu-item", danger && "q-menu-item-danger", className),
			disabled,
			onClick: onSelect,
			...rest,
			children: body
		})
	});
	const resolvedValue = itemText(props);
	const controlled = checked !== void 0;
	const rootKeyed = !controlled && selection != null && resolvedValue !== "";
	const resolvedChecked = controlled ? checked : rootKeyed ? selection.isSelected(resolvedValue) : selfChecked;
	const handleCheckedChange = (next, event) => {
		if (rootKeyed) selection.toggle(resolvedValue, next);
		else if (!controlled) setSelfChecked(next);
		onCheckedChange?.(next, event);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemContext.Provider, {
		value: {
			checked: resolvedChecked,
			disabled: disabledState,
			selectable: true,
			value: value ?? (resolvedValue || void 0)
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuCheckboxItem, {
			className: cx("q-menu-item", danger && "q-menu-item-danger", className),
			checked: resolvedChecked,
			onCheckedChange: handleCheckedChange,
			disabled,
			closeOnClick: false,
			...rest,
			children: body
		})
	});
}
function Sub({ children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuSubmenuRoot, {
		...props,
		children
	});
}
function SubTrigger({ className, disabled, start, title, subtitle, end, children, ...props }) {
	const hasSlots = title != null || subtitle != null || start != null || end != null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuSubmenuTrigger, {
		className: cx("q-menu-item", "q-dropdown-submenu-trigger", className),
		disabled,
		...props,
		children: hasSlots ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			start != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIcon$1, { children: start }) : null,
			title != null || subtitle != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ItemContent, { children: [title != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemTitleRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemTitle, { children: title }) }) : null, subtitle != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemDescription, { children: subtitle }) : null] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ItemTrailing, { children: [end, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemSubChevron, {})] })
		] }) : children
	});
}
function SubContent({ className, sideOffset = 4, alignOffset = -8, container, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuPortal, {
		container,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuPositioner, {
			side: "right",
			align: "start",
			sideOffset: sideOffset + 8,
			alignOffset,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuPopup, {
				className: cx("q-dropdown-content", className),
				...props,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryContext.Provider, {
					value: "",
					children
				})
			})
		})
	});
}
var Dropdown = {
	Root: Root$1,
	Trigger,
	Content,
	Group,
	Label,
	Separator,
	Item: Item$1,
	ItemIcon: ItemIcon$1,
	ItemMedia,
	ItemContent,
	ItemTitleRow,
	ItemTitle,
	ItemDescription,
	ItemMeta: ItemMeta$1,
	ItemTrailing,
	ItemMetaChip,
	ItemIndicator,
	ItemSubChevron,
	Sub,
	SubTrigger,
	SubContent
};
/** Glass circular icon button shared by the inline actions and the more-trigger. */
var GLASS_BUTTON = "pointer-events-auto flex size-8 shrink-0 items-center justify-center rounded-q-full bg-q-transparent-dark-40 text-q-icon-primary backdrop-blur-md transition-colors hover:bg-q-transparent-dark-60 focus-visible:outline-2 focus-visible:outline-q-border-focus";
function stop(event) {
	event.stopPropagation();
}
/** One inline glass icon button. */
function ActionButton$1({ action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": action.label,
		className: GLASS_BUTTON,
		onPointerDown: stop,
		onClick: (event) => {
			event.stopPropagation();
			action.onSelect?.();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			as: action.icon,
			size: "sm"
		})
	});
}
/** The overflow menu — a three-dots trigger over a Dropdown of the extra rows. */
function MoreMenu({ actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dropdown.Root, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dropdown.Trigger, {
		"aria-label": "More actions",
		className: GLASS_BUTTON,
		onPointerDown: stop,
		onClick: stop,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			as: EllipsisVertical,
			size: "sm"
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dropdown.Content, {
		surface: "solid",
		side: "bottom",
		align: "end",
		sideOffset: 6,
		children: actions.map((action) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dropdown.Item, {
			value: action.id,
			danger: action.danger,
			start: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				as: action.icon,
				size: "sm"
			}),
			title: action.label,
			onSelect: () => action.onSelect?.()
		}, action.id))
	})] });
}
function CardActions({ actions, max = 3 }) {
	if (actions.length === 0) return null;
	const overflow = actions.length > max;
	const inline = overflow ? actions.slice(0, max - 1) : actions;
	const extra = overflow ? actions.slice(max - 1) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute right-2 top-2 z-[2] flex flex-col items-center gap-1.5 opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 group-focus-within:opacity-100",
		children: [inline.map((action) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionButton$1, { action }, action.id)), extra.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoreMenu, { actions: extra }) : null]
	});
}
function GenerationTile({ state = "ready", generation, src, alt = "", media, ratio = "auto", title, generatingLabel = "Generating", actions, children, openable, detail, openLabel, className, style, onMouseEnter, onMouseLeave, onFocus, onBlur }) {
	if (state === "generating") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenerationCard, {
		state: "generating",
		ratio,
		generatingLabel,
		className,
		style
	});
	const canOpen = openable !== false && generation != null;
	const downloadUrl = generation?.src ?? src;
	const resolvedActions = actions?.map((action) => action.id === "download" && action.onSelect == null && downloadUrl ? {
		...action,
		onSelect: () => void downloadMedia(downloadUrl)
	} : action);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GenerationCard, {
		ratio,
		src: media == null ? src ?? generation?.src : void 0,
		alt,
		title,
		media,
		className: cn("group", className),
		style,
		onMouseEnter,
		onMouseLeave,
		children: [
			canOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenerationDetailModal, {
				generation,
				detailRows: detail?.rows,
				primaryAction: detail?.primaryAction,
				actions: detail?.actions,
				trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": openLabel ?? (generation?.prompt != null ? `Open generation: ${generation.prompt}` : "Open generation"),
					className: "absolute inset-0 z-[1] cursor-pointer rounded-q-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-q-border-focus",
					onFocus,
					onBlur
				})
			}) : null,
			children,
			resolvedActions != null && resolvedActions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardActions, { actions: resolvedActions }) : null
		]
	});
}
function rectStyle(rect, top) {
	return {
		left: rect.x,
		top,
		width: rect.width,
		height: rect.height
	};
}
/** Neutral fallback behind media that has not painted yet. */
function Placeholder() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "qg-placeholder",
		"aria-hidden": "true"
	});
}
/** Still image with native tier-driven loading and no remount fade. */
function StillMedia({ item, tier }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Placeholder, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		className: "absolute inset-0 size-full object-cover",
		src: item.src,
		alt: item.alt,
		loading: tier === "full" ? "eager" : "lazy",
		decoding: "async"
	})] });
}
/**
* Hover-to-play video: poster still by default, plays (muted / looped /
* playsInline) on hover & focus, pauses and resets on leave. Respects reduced
* motion — when set, the poster stays put and the clip never autoplays on hover.
*/
function HoverVideo({ item, tier, playing, reducedMotion }) {
	const ref = (0, import_react.useRef)(null);
	const [videoLoaded, setVideoLoaded] = (0, import_react.useState)(false);
	const active = playing && !reducedMotion;
	const hasPoster = item.src.length > 0;
	const showVideo = active && videoLoaded;
	(0, import_react.useEffect)(() => {
		const v = ref.current;
		if (v == null) return;
		if (active) v.play()?.catch(() => {});
		else {
			v.pause();
			try {
				v.currentTime = 0;
			} catch {}
		}
	}, [active]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Placeholder, {}),
		hasPoster ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			className: "absolute inset-0 size-full object-cover",
			src: item.src,
			alt: item.alt,
			loading: tier === "full" ? "eager" : "lazy",
			decoding: "async",
			style: { opacity: showVideo ? 0 : 1 }
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
			ref,
			className: "absolute inset-0 size-full object-cover",
			muted: true,
			loop: true,
			playsInline: true,
			preload: "none",
			poster: hasPoster ? item.src : void 0,
			onLoadedData: () => setVideoLoaded(true),
			style: { opacity: showVideo ? 1 : 0 },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
				src: item.videoSrc,
				type: "video/mp4"
			})
		})
	] });
}
function GalleryTileComponent({ item, rect, top, tier, reducedMotion }) {
	const [hovered, setHovered] = (0, import_react.useState)(false);
	const [liked, setLiked] = (0, import_react.useState)(false);
	if (item.status === "generating") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenerationTile, {
		state: "generating",
		ratio: "auto",
		className: "qg-tile",
		style: rectStyle(rect, top)
	});
	const isVideo = item.kind === "video";
	const media = isVideo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoverVideo, {
		item,
		tier,
		playing: hovered,
		reducedMotion
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StillMedia, {
		item,
		tier
	});
	const actions = [
		{
			id: "like",
			label: liked ? "Unlike" : "Like",
			icon: Heart,
			onSelect: () => setLiked((v) => !v)
		},
		{
			id: "download",
			label: "Download",
			icon: Download
		},
		{
			id: "copy",
			label: "Copy prompt",
			icon: Copy,
			onSelect: () => void navigator.clipboard?.writeText(item.prompt)
		},
		{
			id: "share",
			label: "Share",
			icon: Share2
		},
		{
			id: "delete",
			label: "Delete",
			icon: Trash2,
			danger: true
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenerationTile, {
		ratio: "auto",
		className: "qg-tile",
		style: rectStyle(rect, top),
		media,
		actions,
		generation: {
			src: isVideo ? item.videoSrc ?? item.src : item.src,
			poster: isVideo ? item.src : void 0,
			mediaType: isVideo ? "video" : "image",
			aspectRatio: item.width / item.height,
			prompt: item.prompt
		},
		openLabel: `Open generation: ${item.prompt}`,
		onMouseEnter: isVideo ? () => setHovered(true) : void 0,
		onMouseLeave: isVideo ? () => setHovered(false) : void 0,
		onFocus: isVideo ? () => setHovered(true) : void 0,
		onBlur: isVideo ? () => setHovered(false) : void 0
	});
}
var GalleryTile = (0, import_react.memo)(GalleryTileComponent);
var clamp = (n, min, max) => Math.max(min, Math.min(max, n));
function mergeRefs(...refs) {
	return (node) => {
		for (const ref of refs) if (typeof ref === "function") ref(node);
		else if (ref) ref.current = node;
	};
}
function Slider(rawProps) {
	const { mode = "stepped", value, defaultValue, onChange, onChangeEnd, disabled = false, showTicks, className, onKeyDown, ref, "aria-label": ariaLabel, ...rest } = rawProps;
	const steps = Math.max(2, rawProps.steps ?? (mode === "stepped" ? 3 : 0));
	const min = rawProps.min ?? 0;
	const max = rawProps.max ?? 1;
	const snap = rawProps.step ?? 0;
	const ticksVisible = showTicks ?? mode === "stepped";
	const initial = (() => {
		if (defaultValue !== void 0) return defaultValue;
		if (mode === "stepped") return 0;
		return min;
	})();
	const [internal, setInternal] = (0, import_react.useState)(() => sanitize(initial, mode, steps, min, max, snap));
	const isControlled = value !== void 0;
	const current = isControlled ? sanitize(value, mode, steps, min, max, snap) : internal;
	const trackRef = (0, import_react.useRef)(null);
	const [isDragging, setIsDragging] = (0, import_react.useState)(false);
	const latestRef = (0, import_react.useRef)(current);
	latestRef.current = current;
	const commitValue = (0, import_react.useCallback)((next) => {
		const clean = sanitize(next, mode, steps, min, max, snap);
		if (clean === latestRef.current) return;
		latestRef.current = clean;
		if (!isControlled) setInternal(clean);
		onChange?.(clean);
	}, [
		isControlled,
		max,
		min,
		mode,
		onChange,
		snap,
		steps
	]);
	const valueFromPointer = (0, import_react.useCallback)((clientX) => {
		const track = trackRef.current;
		if (!track) return latestRef.current;
		const rect = track.getBoundingClientRect();
		if (rect.width <= 0) return latestRef.current;
		const f = clamp((clientX - rect.left) / rect.width, 0, 1);
		if (mode === "stepped") return clamp(Math.round(f * (steps - 1)), 0, steps - 1);
		return min + f * (max - min);
	}, [
		max,
		min,
		mode,
		steps
	]);
	const handlePointerDown = (e) => {
		if (disabled || e.button !== 0 && e.pointerType === "mouse") return;
		e.preventDefault();
		const track = trackRef.current;
		if (!track) return;
		try {
			track.setPointerCapture(e.pointerId);
		} catch {}
		setIsDragging(true);
		commitValue(valueFromPointer(e.clientX));
	};
	const handlePointerMove = (e) => {
		if (!isDragging || disabled) return;
		commitValue(valueFromPointer(e.clientX));
	};
	const handlePointerEnd = (e) => {
		if (!isDragging) return;
		setIsDragging(false);
		const track = trackRef.current;
		if (track && track.hasPointerCapture?.(e.pointerId)) try {
			track.releasePointerCapture(e.pointerId);
		} catch {}
		onChangeEnd?.(latestRef.current);
	};
	const keyboardStep = (() => {
		if (mode === "stepped") return 1;
		if (snap > 0) return snap;
		return (max - min) / 100;
	})();
	const handleKeyDown = (e) => {
		onKeyDown?.(e);
		if (e.defaultPrevented || disabled) return;
		switch (e.key) {
			case "ArrowLeft":
			case "ArrowDown":
				e.preventDefault();
				commitValue(current - keyboardStep);
				break;
			case "ArrowRight":
			case "ArrowUp":
				e.preventDefault();
				commitValue(current + keyboardStep);
				break;
			case "PageDown":
				e.preventDefault();
				commitValue(current - keyboardStep * 10);
				break;
			case "PageUp":
				e.preventDefault();
				commitValue(current + keyboardStep * 10);
				break;
			case "Home":
				e.preventDefault();
				commitValue(mode === "stepped" ? 0 : min);
				break;
			case "End":
				e.preventDefault();
				commitValue(mode === "stepped" ? steps - 1 : max);
				break;
		}
	};
	const fillPct = (() => {
		if (mode === "stepped") return current / (steps - 1) * 100;
		if (max === min) return 0;
		return (current - min) / (max - min) * 100;
	})();
	const isFull = fillPct >= 99.999999;
	const contTickCount = ticksVisible && mode === "continuous" ? rawProps.steps ?? 0 : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: mergeRefs(trackRef, ref),
		role: "slider",
		tabIndex: disabled ? -1 : 0,
		"aria-label": ariaLabel,
		"aria-valuemin": mode === "stepped" ? 0 : min,
		"aria-valuemax": mode === "stepped" ? steps - 1 : max,
		"aria-valuenow": current,
		"aria-orientation": "horizontal",
		"aria-disabled": disabled || void 0,
		"data-disabled": disabled ? "" : void 0,
		"data-dragging": isDragging ? "" : void 0,
		"data-mode": mode,
		onKeyDown: handleKeyDown,
		onPointerDown: handlePointerDown,
		onPointerMove: handlePointerMove,
		onPointerUp: handlePointerEnd,
		onPointerCancel: handlePointerEnd,
		className: cx("q-slider q-focus-ring relative inline-flex h-7 items-center overflow-hidden rounded-lg", "cursor-pointer touch-none select-none outline-none", disabled && "pointer-events-none cursor-not-allowed opacity-50", className),
		...rest,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				style: { width: `${fillPct}%` },
				className: cx("pointer-events-none absolute inset-y-0 left-0 bg-q-overlay-hover", "border-r-q-thin border-q-border-strong", "rounded-l-lg", "ease-out", isDragging ? "transition-none" : "transition-[width] duration-200", isFull && "rounded-r-lg border-r-0")
			}),
			ticksVisible && mode === "stepped" && steps > 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-0",
				children: Array.from({ length: steps - 2 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute top-1/2 h-2 w-px -translate-x-1/2 -translate-y-1/2 rounded-sm bg-q-border-strong",
					style: { left: `${(i + 1) / (steps - 1) * 100}%` }
				}, i))
			}),
			contTickCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-0.5 grid items-center",
				style: {
					gridTemplateColumns: `repeat(${contTickCount}, minmax(0, 1fr))`,
					gap: "var(--hf-space-050)"
				},
				children: Array.from({ length: contTickCount }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex h-full items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-px rounded-sm bg-q-border-strong" })
				}, i))
			})
		]
	});
}
function sanitize(value, mode, steps, min, max, snap) {
	if (mode === "stepped") return clamp(Math.round(value), 0, Math.max(0, steps - 1));
	const lo = Math.min(min, max);
	const hi = Math.max(min, max);
	let v = clamp(value, lo, hi);
	if (snap > 0) v = clamp(lo + Math.round((v - lo) / snap) * snap, lo, hi);
	return v;
}
var DEFAULT_CONFIG = {
	containerWidth: 0,
	targetRowHeight: 200,
	gap: 6,
	headerHeight: 44,
	groupGap: 20,
	maxRowHeight: 460,
	grouped: true
};
var JustifiedLayoutEngine = class {
	items = [];
	groups = [];
	config = { ...DEFAULT_CONFIG };
	layout = {
		rows: [],
		totalHeight: 0,
		itemCount: 0
	};
	/** Per-item resolved geometry, indexed by item index — powers scroll anchoring. */
	itemTops = [];
	itemHeights = [];
	dirty = true;
	setItems(items) {
		this.items = items;
		this.recomputeGroups();
		this.dirty = true;
	}
	/** Returns true if any geometry field actually changed. */
	setConfig(patch) {
		let changed = false;
		let groupingChanged = false;
		for (const key of Object.keys(patch)) {
			const next = patch[key];
			if (next != null && next !== this.config[key]) {
				this.config[key] = next;
				changed = true;
				if (key === "grouped") groupingChanged = true;
			}
		}
		if (groupingChanged) this.recomputeGroups();
		if (changed) this.dirty = true;
		return changed;
	}
	getConfig() {
		return this.config;
	}
	recomputeGroups() {
		if (!this.config.grouped) {
			this.groups = this.items.length > 0 ? [{
				id: "all",
				label: "",
				start: 0,
				end: this.items.length
			}] : [];
			return;
		}
		const groups = [];
		let current = null;
		for (let i = 0; i < this.items.length; i++) {
			const item = this.items[i];
			if (current == null || current.id !== item.groupId) {
				if (current != null) current.end = i;
				current = {
					id: item.groupId,
					label: item.groupLabel,
					start: i,
					end: i + 1
				};
				groups.push(current);
			}
		}
		if (current != null) current.end = this.items.length;
		this.groups = groups;
	}
	/** Compute (or return cached) layout for the current items + config. */
	compute() {
		if (!this.dirty) return this.layout;
		const { containerWidth, targetRowHeight, gap, headerHeight, groupGap, maxRowHeight } = this.config;
		const rows = [];
		const itemTops = new Array(this.items.length).fill(0);
		const itemHeights = new Array(this.items.length).fill(0);
		if (containerWidth <= 0) {
			this.layout = {
				rows: [],
				totalHeight: 0,
				itemCount: this.items.length
			};
			this.itemTops = itemTops;
			this.itemHeights = itemHeights;
			this.dirty = false;
			return this.layout;
		}
		let y = 0;
		let rowKey = 0;
		const { grouped } = this.config;
		for (const group of this.groups) {
			if (grouped) {
				rows.push({
					type: "header",
					y,
					height: headerHeight,
					key: `h-${group.id}`,
					label: group.label
				});
				y += headerHeight;
			}
			let rowStart = group.start;
			let aspectSum = 0;
			const flushRow = (endExclusive, isLastRowOfGroup) => {
				const n = endExclusive - rowStart;
				if (n <= 0) return;
				const totalGap = gap * (n - 1);
				let rowHeight = (containerWidth - totalGap) / aspectSum;
				if (isLastRowOfGroup && rowHeight > targetRowHeight) rowHeight = targetRowHeight;
				rowHeight = Math.min(rowHeight, maxRowHeight);
				const tiles = [];
				let x = 0;
				for (let i = rowStart; i < endExclusive; i++) {
					const item = this.items[i];
					const aspect = item.width / item.height;
					const w = rowHeight * aspect;
					tiles.push({
						index: i,
						item,
						x,
						width: w,
						height: rowHeight
					});
					itemTops[i] = y;
					itemHeights[i] = rowHeight;
					x += w + gap;
				}
				rows.push({
					type: "tiles",
					y,
					height: rowHeight,
					key: `r-${rowKey++}`,
					tiles
				});
				y += rowHeight + gap;
			};
			for (let i = group.start; i < group.end; i++) {
				const item = this.items[i];
				const aspect = item.width / item.height;
				aspectSum += aspect;
				if (targetRowHeight * aspectSum + gap * (i - rowStart) >= containerWidth) {
					flushRow(i + 1, false);
					rowStart = i + 1;
					aspectSum = 0;
				}
			}
			if (rowStart < group.end) flushRow(group.end, true);
			y = y - gap + groupGap;
		}
		const totalHeight = Math.max(0, y - groupGap);
		this.layout = {
			rows,
			totalHeight,
			itemCount: this.items.length
		};
		this.itemTops = itemTops;
		this.itemHeights = itemHeights;
		this.dirty = false;
		return this.layout;
	}
	getLayout() {
		return this.compute();
	}
	/**
	* The visible window: the [startRow, endRow) slice of rows intersecting the
	* viewport expanded by `overscanPx` on each edge. Binary-searches the rows
	* (which are sorted by `y`) so cost is O(log n), independent of dataset size.
	*/
	getWindow(scrollTop, viewportHeight, overscanPx) {
		const { rows } = this.compute();
		if (rows.length === 0) return {
			startRow: 0,
			endRow: 0
		};
		const top = scrollTop - overscanPx;
		const bottom = scrollTop + viewportHeight + overscanPx;
		let lo = 0;
		let hi = rows.length - 1;
		let startRow = rows.length;
		while (lo <= hi) {
			const mid = lo + hi >> 1;
			const row = rows[mid];
			if (row.y + row.height >= top) {
				startRow = mid;
				hi = mid - 1;
			} else lo = mid + 1;
		}
		lo = 0;
		hi = rows.length - 1;
		let endRow = rows.length;
		while (lo <= hi) {
			const mid = lo + hi >> 1;
			if (rows[mid].y > bottom) {
				endRow = mid;
				hi = mid - 1;
			} else lo = mid + 1;
		}
		return {
			startRow: Math.min(startRow, rows.length),
			endRow
		};
	}
	/** Top offset of an item — used to re-pin the scroll after a re-layout. */
	getItemTop(index) {
		this.compute();
		return this.itemTops[index] ?? 0;
	}
	getItemHeight(index) {
		this.compute();
		return this.itemHeights[index] ?? 0;
	}
	/**
	* The topmost item at least partially visible at `scrollTop`, plus the pixel
	* offset between the viewport top and that item's top. The React layer stores
	* this before a density/resize re-layout and restores it afterwards so the
	* content under the user's eyes stays put (scroll anchoring).
	*/
	findAnchor(scrollTop) {
		this.compute();
		if (this.items.length === 0) return {
			index: 0,
			offset: 0
		};
		let lo = 0;
		let hi = this.itemTops.length - 1;
		let index = 0;
		while (lo <= hi) {
			const mid = lo + hi >> 1;
			if (this.itemTops[mid] <= scrollTop) {
				index = mid;
				lo = mid + 1;
			} else hi = mid - 1;
		}
		return {
			index,
			offset: scrollTop - (this.itemTops[index] ?? 0)
		};
	}
};
/**
* Demo data for the History gallery.
*
* Everything is generated deterministically (seeded PRNG) so the justified
* layout is stable across renders — which keeps scroll-anchoring exact and makes
* the virtualization behaviour reproducible. The pool mixes real still assets
* (`/presets/*.png`) with the ffmpeg-generated hover-to-play clips
* (`/gallery/*.mp4`) and spans a wide spread of aspect ratios: tall portraits,
* wide landscapes, squares and true panoramas.
*/
function mulberry32(seed) {
	let a = seed >>> 0;
	return () => {
		a |= 0;
		a = a + 1831565813 | 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
var STILLS = [
	{
		src: "/presets/cover.png",
		alt: "Renaissance portrait holding a jar of dill pickles",
		prompt: "A renaissance oil-painting portrait of a woman cradling a glowing jar of Picklehaus dill pickles, candlelit chiaroscuro, rich golden fabrics."
	},
	{
		src: "/presets/how-product-works.png",
		alt: "Cinematic product hero shot",
		prompt: "Cinematic product hero shot explaining how the pickling process works, warm studio light, shallow depth of field."
	},
	{
		src: "/presets/explain.png",
		alt: "Candlelit concept explainer scene",
		prompt: "Moody candlelit scene explaining a concept, editorial photography, deep shadows and warm highlights."
	},
	{
		src: "/presets/hyper-motion.png",
		alt: "Caramel popcorn splash in motion",
		prompt: "Hyper-motion macro of caramel popcorn bursting mid-air with sugar crystals, high-speed capture, glossy amber tones."
	}
];
var VIDEOS = [
	{
		videoSrc: "/gallery/motion-landscape.mp4",
		poster: "/presets/hyper-motion.png",
		alt: "Popcorn burst, animated",
		prompt: "Slow push-in on caramel popcorn bursting mid-air, high-speed macro loop, glossy amber tones.",
		width: 854,
		height: 480
	},
	{
		videoSrc: "/gallery/product-portrait.mp4",
		poster: "/presets/how-product-works.png",
		alt: "Product hero, animated",
		prompt: "Vertical hero reveal of the product with a gentle parallax zoom, warm studio light.",
		width: 480,
		height: 854
	},
	{
		videoSrc: "/gallery/explain-square.mp4",
		poster: "/presets/explain.png",
		alt: "Candlelit concept, animated",
		prompt: "Square looping candlelit scene with drifting highlights, editorial mood.",
		width: 600,
		height: 600
	},
	{
		videoSrc: "/gallery/cover-tall.mp4",
		poster: "/presets/cover.png",
		alt: "Renaissance portrait, animated",
		prompt: "Tall portrait with a slow breathing zoom, candlelit chiaroscuro, golden fabrics.",
		width: 512,
		height: 768
	}
];
var ASPECTS = [
	[9, 16],
	[2, 3],
	[3, 4],
	[1, 1],
	[4, 3],
	[3, 2],
	[16, 9],
	[2, 1],
	[21, 9],
	[5, 4]
];
/**
* A dated batch definition: the label plus how many items land in it. Later
* batches are appended lazily by `makeBatch` to simulate infinite history.
*/
var GROUPS = [
	{
		id: "today",
		label: "Today",
		count: 34
	},
	{
		id: "yesterday",
		label: "Yesterday",
		count: 42
	},
	{
		id: "this-week",
		label: "Earlier this week",
		count: 56
	},
	{
		id: "last-week",
		label: "Last week",
		count: 60
	}
];
/** Long side (px) used to synthesize still dimensions from an aspect ratio. */
var LONG_SIDE = 1280;
function makeStill(index, groupId, groupLabel, rand) {
	const base = STILLS[index % STILLS.length];
	const [aw, ah] = ASPECTS[Math.floor(rand() * ASPECTS.length)];
	const landscape = aw >= ah;
	const width = landscape ? LONG_SIDE : Math.round(LONG_SIDE * aw / ah);
	const height = landscape ? Math.round(LONG_SIDE * ah / aw) : LONG_SIDE;
	return {
		id: `${groupId}-img-${index}`,
		kind: "image",
		status: "ready",
		src: base.src,
		width,
		height,
		prompt: base.prompt,
		alt: base.alt,
		groupId,
		groupLabel
	};
}
function makeVideo(index, groupId, groupLabel) {
	const base = VIDEOS[index % VIDEOS.length];
	return {
		id: `${groupId}-vid-${index}`,
		kind: "video",
		status: "ready",
		src: base.poster,
		videoSrc: base.videoSrc,
		width: base.width,
		height: base.height,
		prompt: base.prompt,
		alt: base.alt,
		groupId,
		groupLabel
	};
}
/**
* Build one dated batch of items. Roughly every 5th item is a video so the
* feed reliably shows hover-to-play tiles. When `withGenerating` is set the
* batch leads with a single `generating` placeholder tile (the pulsing card).
*/
function makeBatch(groupId, groupLabel, count, seed, withGenerating = false) {
	const rand = mulberry32(seed);
	const items = [];
	if (withGenerating) items.push({
		id: `${groupId}-generating`,
		kind: "image",
		status: "generating",
		src: "",
		width: 3,
		height: 4,
		prompt: "",
		alt: "",
		groupId,
		groupLabel
	});
	for (let i = 0; i < count; i++) {
		const kind = i % 5 === 2 ? "video" : "image";
		items.push(kind === "video" ? makeVideo(i, groupId, groupLabel) : makeStill(i, groupId, groupLabel, rand));
	}
	return items;
}
/** The initial dataset — the four seeded batches, a generating tile up top. */
function makeInitialItems() {
	return GROUPS.flatMap((group, gi) => makeBatch(group.id, group.label, group.count, 1e3 + gi * 97, gi === 0));
}
/**
* Lazily-appended "older" batch, used by the infinite-scroll loader. Each call
* yields a fresh dated group ("Earlier · N") so appending never reflows the
* batches already on screen above.
*/
function makeOlderBatch(page) {
	return makeBatch(`earlier-${page}`, page === 0 ? "Earlier" : `Earlier · ${page + 1}`, 48, 5e3 + page * 131);
}
/**
* Tile-size presets, indexed by the slider step. The slider runs left → right =
* smaller → LARGER tiles, so this array is ASCENDING: step 0 is the smallest /
* densest, the last step the largest / least-dense. The value is the target row
* height in px that the engine packs against. The scale is biased toward larger
* tiles (base default sits above the old minimum) since the small end read too
* cramped.
*/
var DENSITY_ROW_HEIGHTS = [
	220,
	280,
	360,
	460,
	580
];
var GAP = 6;
/** Rows within this many px of the viewport edge are rendered (windowing). */
var OVERSCAN_PX = 400;
/** Load the next batch when the viewport bottom is within this px of the end. */
var INFINITE_MARGIN = 1200;
/** Cap total items so the demo can't grow without bound. */
var MAX_ITEMS = 1400;
function useJustifiedGallery(items, grouped = true, { demo = false, hasMore = false, loadingMore = false, onLoadMore } = {}) {
	const viewportRef = (0, import_react.useRef)(null);
	const engineRef = (0, import_react.useRef)(null);
	if (engineRef.current == null) engineRef.current = new JustifiedLayoutEngine();
	const engine = engineRef.current;
	const [width, setWidth] = (0, import_react.useState)(0);
	const [density, setDensityState] = (0, import_react.useState)(1);
	const scrollTopRef = (0, import_react.useRef)(0);
	const [viewportHeight, setViewportHeight] = (0, import_react.useState)(0);
	const [range, setRange] = (0, import_react.useState)({
		startRow: 0,
		endRow: 0
	});
	const [olderItems, setOlderItems] = (0, import_react.useState)([]);
	const [demoLoadingMore, setDemoLoadingMore] = (0, import_react.useState)(false);
	const pageRef = (0, import_react.useRef)(0);
	const allItems = (0, import_react.useMemo)(() => demo && olderItems.length > 0 ? [...items, ...olderItems] : items, [
		demo,
		items,
		olderItems
	]);
	const targetRowHeight = DENSITY_ROW_HEIGHTS[density] ?? DENSITY_ROW_HEIGHTS[1];
	const layout = (0, import_react.useMemo)(() => {
		engine.setItems(allItems);
		engine.setConfig({
			containerWidth: width,
			targetRowHeight,
			gap: GAP,
			grouped
		});
		return engine.getLayout();
	}, [
		engine,
		allItems,
		width,
		targetRowHeight,
		grouped
	]);
	const anchorRef = (0, import_react.useRef)({
		index: 0,
		offset: 0
	});
	const readRange = (0, import_react.useCallback)(() => {
		const el = viewportRef.current;
		if (el == null) return;
		const st = el.scrollTop;
		const vh = el.clientHeight;
		const win = engine.getWindow(st, vh, OVERSCAN_PX);
		scrollTopRef.current = st;
		setViewportHeight(vh);
		setRange((prev) => prev.startRow === win.startRow && prev.endRow === win.endRow ? prev : win);
	}, [engine]);
	(0, import_react.useLayoutEffect)(() => {
		const el = viewportRef.current;
		if (el == null || typeof ResizeObserver === "undefined") return;
		const ro = new ResizeObserver(() => {
			setWidth(el.clientWidth);
			setViewportHeight(el.clientHeight);
		});
		ro.observe(el);
		setWidth(el.clientWidth);
		setViewportHeight(el.clientHeight);
		return () => ro.disconnect();
	}, []);
	(0, import_react.useLayoutEffect)(() => {
		const el = viewportRef.current;
		if (el == null) return;
		const anchor = anchorRef.current;
		if (anchor.index > 0) {
			const nextTop = engine.getItemTop(anchor.index) + anchor.offset;
			if (Math.abs(nextTop - el.scrollTop) > .5) el.scrollTop = nextTop;
		}
		readRange();
	}, [
		engine,
		layout,
		readRange
	]);
	const loadingRef = (0, import_react.useRef)(false);
	const lastAutoLoadKeyRef = (0, import_react.useRef)(null);
	const countRef = (0, import_react.useRef)(allItems.length);
	countRef.current = allItems.length;
	const feedEdgeKeyRef = (0, import_react.useRef)("");
	feedEdgeKeyRef.current = `${allItems.length}:${allItems[0]?.id ?? ""}:${allItems.at(-1)?.id ?? ""}`;
	const triggerLoadMore = (0, import_react.useCallback)(() => {
		if (loadingRef.current) return;
		if (!demo && (loadingMore || !hasMore || onLoadMore == null)) return;
		if (demo && countRef.current >= MAX_ITEMS) return;
		if (lastAutoLoadKeyRef.current === feedEdgeKeyRef.current) return;
		lastAutoLoadKeyRef.current = feedEdgeKeyRef.current;
		loadingRef.current = true;
		if (demo) {
			setDemoLoadingMore(true);
			window.setTimeout(() => {
				const page = pageRef.current++;
				setOlderItems((prev) => [...prev, ...makeOlderBatch(page)]);
				loadingRef.current = false;
				setDemoLoadingMore(false);
			}, 120);
			return;
		}
		Promise.resolve(onLoadMore?.()).catch(() => void 0).finally(() => {
			loadingRef.current = false;
		});
	}, [
		demo,
		hasMore,
		loadingMore,
		onLoadMore
	]);
	(0, import_react.useEffect)(() => {
		const el = viewportRef.current;
		if (el != null && width > 0 && el.clientHeight > 0 && el.scrollTop + el.clientHeight >= layout.totalHeight - INFINITE_MARGIN) triggerLoadMore();
	}, [
		layout.totalHeight,
		loadingMore,
		triggerLoadMore,
		width
	]);
	(0, import_react.useEffect)(() => {
		const el = viewportRef.current;
		if (el == null) return;
		let raf = 0;
		const onScroll = () => {
			if (raf !== 0) return;
			raf = requestAnimationFrame(() => {
				raf = 0;
				const st = el.scrollTop;
				anchorRef.current = engine.findAnchor(st);
				readRange();
				if (st + el.clientHeight >= engine.getLayout().totalHeight - INFINITE_MARGIN) triggerLoadMore();
			});
		};
		el.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			el.removeEventListener("scroll", onScroll);
			if (raf !== 0) cancelAnimationFrame(raf);
		};
	}, [
		engine,
		readRange,
		triggerLoadMore
	]);
	const setDensity = (0, import_react.useCallback)((level) => {
		const el = viewportRef.current;
		if (el != null) anchorRef.current = engine.findAnchor(el.scrollTop);
		setDensityState(level);
	}, [engine]);
	return {
		viewportRef,
		layout,
		visibleRows: (0, import_react.useMemo)(() => layout.rows.slice(range.startRow, range.endRow), [
			layout,
			range.startRow,
			range.endRow
		]),
		scrollTop: scrollTopRef.current,
		viewportHeight,
		density,
		setDensity,
		itemCount: allItems.length,
		loadingMore: demo ? demoLoadingMore : loadingMore
	};
}
function DensityControl({ value, onChange }) {
	const steps = DENSITY_ROW_HEIGHTS.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center gap-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
			"aria-label": "Tile density",
			steps,
			value,
			onChange,
			className: "w-32"
		})
	});
}
/**
* Tracks the `prefers-reduced-motion` media query. When true, the gallery does
* NOT autoplay videos on hover (posters stay put) and skips fade-in transitions.
*/
function useReducedMotion() {
	const [reduced, setReduced] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined" || window.matchMedia == null) return;
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const update = () => setReduced(mq.matches);
		update();
		mq.addEventListener("change", update);
		return () => mq.removeEventListener("change", update);
	}, []);
	return reduced;
}
var numberFormat = new Intl.NumberFormat("en-US");
function JustifiedGallery(props) {
	const { grouped = true } = props;
	const initial = (0, import_react.useMemo)(() => props.demo ? makeInitialItems() : props.items, [props.demo, props.items]);
	const reducedMotion = useReducedMotion();
	const { viewportRef, layout, visibleRows, scrollTop, viewportHeight, density, setDensity, itemCount, loadingMore } = useJustifiedGallery(initial, grouped, {
		demo: props.demo === true,
		hasMore: props.hasMore,
		loadingMore: props.loadingMore,
		onLoadMore: props.onLoadMore
	});
	const viewTop = scrollTop;
	const viewBottom = scrollTop + viewportHeight;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex shrink-0 items-center justify-between gap-4 px-0.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						as: "h2",
						variant: "body-sm-semi-bold",
						color: "primary",
						children: "Your generations"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
						as: "span",
						variant: "caption-sm-regular",
						color: "tertiary",
						children: [numberFormat.format(itemCount), " items"]
					}),
					loadingMore && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5 text-q-text-tertiary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, {
							variant: "circle",
							size: "xs",
							color: "neutral",
							"aria-label": "Loading more"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							as: "span",
							variant: "caption-sm-regular",
							color: "tertiary",
							children: "Loading"
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DensityControl, {
				value: density,
				onChange: setDensity
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: viewportRef,
			className: "qg-viewport relative min-h-0 flex-1 overflow-y-auto",
			children: itemCount === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-full flex-col items-center justify-center gap-1 px-6 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					as: "p",
					variant: "body-md-semi-bold",
					color: "primary",
					children: "No generations yet"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					as: "p",
					variant: "caption-sm-regular",
					color: "secondary",
					children: "Generated results will appear here."
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative w-full",
				style: { height: layout.totalHeight },
				children: visibleRows.map((row) => {
					if (row.type === "header") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-x-0 flex items-end px-0.5 pb-2",
						style: {
							top: row.y,
							height: row.height
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							as: "h3",
							variant: "caption-sm-medium",
							color: "tertiary",
							children: row.label
						})
					}, row.key);
					const tier = row.y < viewBottom && row.y + row.height > viewTop ? "full" : "near";
					return row.tiles.map((rect) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GalleryTile, {
						item: rect.item,
						rect,
						top: row.y,
						tier,
						reducedMotion
					}, rect.item.id));
				})
			})
		})]
	});
}
function UserGenerations(props) {
	return props.demo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JustifiedGallery, {
		demo: true,
		grouped: false
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JustifiedGallery, {
		items: props.items,
		grouped: false,
		hasMore: props.hasMore,
		loadingMore: props.loadingMore,
		onLoadMore: props.onLoadMore
	});
}
var SidebarCollapseContext = (0, import_react.createContext)(null);
function Root({ collapsed: collapsedProp, defaultCollapsed = false, onCollapsedChange, product, flush = false, className, children, ...props }) {
	const [internalCollapsed, setInternalCollapsed] = (0, import_react.useState)(defaultCollapsed);
	const isControlled = collapsedProp != null;
	const collapsed = isControlled ? collapsedProp : internalCollapsed;
	const setCollapsed = (0, import_react.useCallback)((next) => {
		if (!isControlled) setInternalCollapsed(next);
		onCollapsedChange?.(next);
	}, [isControlled, onCollapsedChange]);
	const collapseContext = (0, import_react.useMemo)(() => ({
		collapsed,
		toggle: () => setCollapsed(!collapsed)
	}), [collapsed, setCollapsed]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarCollapseContext.Provider, {
		value: collapseContext,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			"data-collapsed": collapsed ? "" : void 0,
			"data-product": product,
			className: cx("q-sidebar", collapsed && "q-sidebar-collapsed", flush && "q-sidebar-flush", className),
			...props,
			children
		})
	});
}
function Header({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cx("q-sidebar-header", className),
		...props
	});
}
/**
* The workspace switcher button (compose a Logo + Title inside). When the rail is
* collapsed the Toggle is hidden, so clicking the switcher (just the logo then)
* expands the rail — the collapse round-trips with no wiring. A custom `onClick`
* runs first and can `preventDefault()` to keep the rail collapsed; when expanded
* the switcher never auto-toggles, so its workspace-switching role is untouched.
*/
function Switcher({ className, type, onClick, ...props }) {
	const collapse = (0, import_react.useContext)(SidebarCollapseContext);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: type ?? "button",
		className: cx("q-sidebar-switcher", className),
		onClick: (event) => {
			onClick?.(event);
			if (!event.defaultPrevented && collapse?.collapsed) collapse.toggle();
		},
		...props
	});
}
/** Brand mark slot. */
function Logo({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cx("q-sidebar-logo", className),
		...props
	});
}
/** Workspace name (compose a SwitcherChevron after the text if wanted). */
function Title({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cx("q-sidebar-switcher-name", "text-q-body-sm-medium", className),
		...props
	});
}
/** The up/down workspace-switcher chevron. */
function SwitcherChevron({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
		as: IconChevronGrabberVerticalOutlined,
		size: "sm",
		color: "secondary",
		className: cx("q-sidebar-switcher-chevron", className)
	});
}
/**
* Square icon button that collapses / expands the rail. Inside a `Sidebar.Root`
* it is self-wiring: clicking flips the Root's collapsed state, it carries
* `aria-expanded`, and an icon-only Toggle gets a default Collapse/Expand label.
* A custom `onClick` runs first and can `preventDefault()` to suppress the flip.
*/
function Toggle({ className, type, children, onClick, "aria-label": ariaLabel, ...props }) {
	const collapse = (0, import_react.useContext)(SidebarCollapseContext);
	const resolvedLabel = ariaLabel ?? (typeof children === "string" || collapse == null ? void 0 : collapse.collapsed ? "Expand sidebar" : "Collapse sidebar");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: type ?? "button",
		"aria-expanded": collapse ? !collapse.collapsed : void 0,
		"aria-label": resolvedLabel,
		className: cx("q-sidebar-toggle", className),
		onClick: (event) => {
			onClick?.(event);
			if (!event.defaultPrevented) collapse?.toggle();
		},
		...props,
		children
	});
}
function Body({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cx("q-sidebar-body", className),
		...props
	});
}
function Search$1({ icon, className, inputClassName, placeholder = "Search", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cx("q-sidebar-search", className),
		children: [icon ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			as: IconMagnifyingGlassOutlined,
			size: "lg",
			className: "q-sidebar-search-icon"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			className: cx("q-sidebar-search-input", "text-q-body-sm-medium", inputClassName),
			placeholder,
			...props
		})]
	});
}
function Section$1({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cx("q-sidebar-section", className),
		...props
	});
}
/** The section heading row (compose a SectionTitle + optional SectionActions). */
function SectionHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cx("q-sidebar-section-header", className),
		...props
	});
}
function SectionTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cx("q-sidebar-section-title", "text-q-label-xs-medium", className),
		...props
	});
}
/** Trailing section-header actions (search / sort / add icon buttons). */
function SectionActions({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cx("q-sidebar-section-actions", className),
		...props
	});
}
/** The items stack inside a Section. */
function SectionItems({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cx("q-sidebar-section-items", className),
		...props
	});
}
function ItemIcon({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cx("q-sidebar-icon", className),
		...props
	});
}
function ItemLabel({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cx("q-sidebar-label", "text-q-body-sm-medium", className),
		...props
	});
}
function ItemMeta({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cx("q-sidebar-meta", "text-q-caption-sm-regular", className),
		...props
	});
}
function ItemEnd({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cx("q-sidebar-end", className),
		...props
	});
}
/** A bare icon button for section-header / row actions (e.g. a menu trigger). */
function ActionButton({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: type ?? "button",
		className: cx("q-sidebar-action-button", className),
		...props
	});
}
/** Build a row body from slots; falls back to `children` when no slot is set (back-compat). */
function rowBody({ start, title, meta, end }, children) {
	if (start == null && title == null && meta == null && end == null) return children;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		start != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIcon, { children: start }) : null,
		title != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemLabel, { children: title }) : null,
		meta != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemMeta, { children: meta }) : null,
		end != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemEnd, { children: end }) : null
	] });
}
/**
* A sidebar row. The common row is one tag — pass `start` / `title` / `meta` /
* `end` slot props and the row builds the standard anatomy; compose `ItemIcon` /
* `ItemLabel` / `ItemMeta` / `ItemEnd` (via `children`) for a bespoke layout.
* Renders a `<button>`, an `<a>` when `href` is set, or any element via `render`.
* Pass `onPinChange` for a hover-revealed pin toggle (it self-manages its pinned
* state when `pinned` is omitted), or `action` for a sibling overlay control.
*/
function Item({ action, actionVisibility = "always", size = "md", variant = "nav", selected = false, pinned, onPinChange, href, render, className, start, title, meta, end, children, ...rest }) {
	const [selfPinned, setSelfPinned] = (0, import_react.useState)(false);
	const pinnedResolved = pinned ?? selfPinned;
	const isLink = href != null;
	const main = useRender({
		render,
		defaultTagName: isLink ? "a" : "button",
		props: {
			className: cx("q-sidebar-row", size === "sm" ? "q-sidebar-item-sm" : "q-sidebar-item", variant === "project" && "q-sidebar-projectitem", selected && "q-sidebar-selected", className),
			...isLink ? { href } : { type: "button" },
			...selected ? { "aria-current": "page" } : {},
			...rest,
			children: rowBody({
				start,
				title,
				meta,
				end
			}, children)
		}
	});
	const hasPin = onPinChange != null;
	if (action == null && !hasPin) return main;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cx("q-sidebar-actionrow", hasPin && "q-sidebar-pinrow", actionVisibility === "hover" && "q-sidebar-actionrow-hover", variant === "project" && "q-sidebar-actionrow-project", selected && "q-sidebar-actionrow-selected", pinnedResolved && "q-sidebar-pinned"),
		children: [
			main,
			action != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "q-sidebar-action",
				children: action
			}) : null,
			hasPin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "q-sidebar-pin",
				"data-pinned": pinnedResolved ? "" : void 0,
				"aria-pressed": pinnedResolved,
				"aria-label": pinnedResolved ? "Unpin" : "Pin",
				onClick: () => {
					if (pinned == null) setSelfPinned(!pinnedResolved);
					onPinChange(!pinnedResolved);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPinFilledThin, {})
			}) : null
		]
	});
}
function Footer({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cx("q-sidebar-footer", className),
		...props
	});
}
function FooterItem({ variant = "default", href, render, className, start, title, meta, end, children, ...rest }) {
	const isLink = href != null;
	return useRender({
		render,
		defaultTagName: isLink ? "a" : "button",
		props: {
			className: cx("q-sidebar-row", "q-sidebar-footeritem", variant === "promo" ? "q-sidebar-footeritem-promo" : variant === "login" ? "q-sidebar-footeritem-login" : void 0, className),
			...isLink ? { href } : { type: "button" },
			...rest,
			children: rowBody({
				start,
				title,
				meta,
				end
			}, children)
		}
	});
}
/**
* Thumbnail tile. Any corner overlay — e.g. a composed `Sidebar.SharedBadge` —
* is passed as `children`; the badge is NOT a built-in feature of the thumbnail
* (the thumb's CSS positions a `.q-sidebar-shared-badge` child at the corner).
*/
function ProjectThumbnail({ src, alt = "", fallback, className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cx("q-sidebar-project-thumb", className),
		...props,
		children: [src != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "q-sidebar-project-thumb-fallback",
			children: fallback
		}), children]
	});
}
function Collaborators({ avatars = [], count, className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cx("q-sidebar-collaborators", className),
		...props,
		children: [avatars.map((avatar, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "q-sidebar-collaborator-avatar",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: avatar.src,
				alt: avatar.alt ?? ""
			})
		}, `${avatar.src}-${index}`)), count != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "q-sidebar-collaborator-count text-q-caption-xs-medium",
			children: count
		}) : null]
	});
}
function PromoBadge({ className, children = "50% OFF", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cx("q-sidebar-promo-badge", className),
		...props,
		children
	});
}
var Sidebar = {
	Root,
	Header,
	Switcher,
	Logo,
	Title,
	SwitcherChevron,
	Toggle,
	Body,
	Search: Search$1,
	Section: Section$1,
	SectionHeader,
	SectionTitle,
	SectionActions,
	SectionItems,
	Item,
	ItemIcon,
	ItemLabel,
	ItemMeta,
	ItemEnd,
	ActionButton,
	Footer,
	FooterItem,
	ProjectThumbnail,
	Collaborators,
	PromoBadge
};
var ICON_TILE_GRADIENT = {
	blue: "linear-gradient(135deg, rgb(65, 136, 190) 0%, rgb(14, 39, 114) 100%)",
	teal: "linear-gradient(135deg, rgb(81, 226, 224) 3.8675%, rgb(18, 92, 141) 93.451%)",
	purple: "linear-gradient(135deg, rgb(158, 120, 226) 0%, rgb(63, 26, 130) 100%)",
	pink: "linear-gradient(135deg, rgb(226, 110, 178) 0%, rgb(130, 20, 74) 100%)",
	orange: "linear-gradient(135deg, rgb(245, 168, 88) 0%, rgb(168, 66, 18) 100%)",
	green: "linear-gradient(135deg, rgb(104, 205, 128) 0%, rgb(20, 96, 58) 100%)",
	red: "linear-gradient(135deg, rgb(235, 108, 104) 0%, rgb(140, 22, 34) 100%)",
	indigo: "linear-gradient(135deg, rgb(110, 128, 226) 0%, rgb(30, 34, 130) 100%)"
};
function IconTile({ as, gradient, className, style, ...props }) {
	const Glyph = as;
	const isGradient = gradient != null;
	const backgroundImage = isGradient ? ICON_TILE_GRADIENT[gradient] ?? gradient : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("q-icon-tile", isGradient ? "q-icon-tile-gradient" : "q-icon-tile-neutral", className),
		style: isGradient ? {
			backgroundImage,
			...style
		} : style,
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Glyph, {
			weight: isGradient ? "fill" : "regular",
			"aria-hidden": true,
			className: cn(icon({
				size: "sm",
				color: isGradient ? void 0 : "secondary"
			}), "q-icon-tile-glyph")
		})
	});
}
function FilledNavigationIcon({ glyph: Glyph }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Glyph, {
		weight: "fill",
		"aria-hidden": true,
		className: icon({ size: "sm" })
	});
}
var TOP_GLOW = "radial-gradient(60% 80% at 50% 0%, var(--hf-color-transparent-light-10) 0%, var(--hf-color-transparent-light-05) 42%, transparent 72%)";
var TOP_DOTS = "radial-gradient(var(--hf-color-transparent-light-20) 1px, transparent 1px)";
var TOP_DOTS_MASK = "radial-gradient(55% 70% at 50% 0%, var(--hf-color-transparent-dark-100) 0%, var(--hf-color-transparent-dark-40) 45%, transparent 75%)";
function NavigationSidebar({ brand, navigation, activeId, onNavigate, footer, side }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sidebar.Root, {
		className: "m-2.5 hidden lg:flex",
		style: {
			height: "calc(100% - 20px)",
			["--q-sidebar-radius"]: "12px"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sidebar.Header, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sidebar.Switcher, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar.Logo, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-6 items-center justify-center rounded-q-200 bg-q-brand-primary text-q-icon-inverse",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					as: Blocks,
					size: "sm"
				})
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar.Title, { children: brand })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar.Toggle, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				as: side === "left" ? PanelLeftClose : PanelRightClose,
				size: "md"
			}) })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar.Body, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar.Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar.SectionItems, { children: navigation.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar.Item, {
				selected: activeId === item.id,
				onClick: () => onNavigate(item.id),
				start: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconTile, {
					as: item.icon,
					gradient: item.gradient ?? "blue"
				}),
				title: item.label
			}, item.id)) }) }) }),
			footer != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar.Footer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-2 py-1",
				children: footer
			}) }) : null
		]
	});
}
/**
* The mandatory custom-template shell. It owns responsive navigation, page
* background, content overflow, spacing, and the maximum readable width.
*/
function CustomAppShell({ brand, navigation, activeId, onNavigate, children, footer, navigationSide = "left", leftRail, rightRail }) {
	const navigationSidebar = navigationSide === "none" ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavigationSidebar, {
		brand,
		navigation,
		activeId,
		onNavigate,
		footer,
		side: navigationSide
	});
	const left = navigationSide === "left" ? navigationSidebar : leftRail;
	const right = navigationSide === "right" ? navigationSidebar : rightRail;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh min-h-0 bg-q-background-primary text-q-text-primary",
		children: [
			left,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex shrink-0 items-center gap-2 overflow-x-auto border-b border-q-border-subtle px-3 py-2 lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						as: "span",
						variant: "label-sm-semi-bold",
						color: "primary",
						className: "mr-2",
						children: brand
					}), navigation.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: activeId === item.id ? "secondary" : "ghost",
						size: "xs",
						"aria-label": item.label,
						start: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilledNavigationIcon, { glyph: item.icon }),
						onClick: () => onNavigate(item.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: item.label
						})
					}, item.id))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "relative min-h-0 flex-1 overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"aria-hidden": true,
							className: "pointer-events-none absolute inset-x-0 top-0 h-[600px]",
							style: {
								backgroundImage: TOP_DOTS,
								backgroundSize: "14px 14px",
								maskImage: TOP_DOTS_MASK,
								WebkitMaskImage: TOP_DOTS_MASK
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"aria-hidden": true,
							className: "pointer-events-none absolute inset-x-0 top-0 h-[600px]",
							style: { backgroundImage: TOP_GLOW }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative h-full min-h-0",
							children
						})
					]
				})]
			}),
			right
		]
	});
}
/**
* Central shell window: scrolling page, fixed custom canvas, or the canonical
* generations feed. Use one mode per view; side rails remain shell siblings.
*/
function WorkspaceContent({ mode = "page", children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("relative h-full min-h-0", mode === "page" && "overflow-y-auto", mode === "canvas" && "overflow-hidden", mode === "generations" && "flex flex-col overflow-hidden p-4", className),
		children
	});
}
function Page({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mx-auto flex w-full max-w-7xl flex-col gap-10 p-5 md:gap-12 md:p-8 lg:p-10", className),
		...props
	});
}
function PageHeader({ eyebrow, title, description, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex flex-col items-center gap-6 py-8 text-center md:py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex max-w-3xl flex-col items-center gap-3",
			children: [
				eyebrow != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					as: "span",
					variant: "label-xs-semi-bold",
					color: "brand",
					children: eyebrow
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					as: "h1",
					variant: "title-lg-semi-bold",
					color: "primary",
					children: title
				}),
				description != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					as: "p",
					variant: "body-md-regular",
					color: "secondary",
					children: description
				}) : null
			]
		}), actions != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap items-center justify-center gap-2",
			children: actions
		}) : null]
	});
}
function Section({ title, description, actions, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("flex flex-col gap-5", className),
		children: [title != null || actions != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1",
				children: [title != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					as: "h2",
					variant: "title-sm-semi-bold",
					color: "primary",
					children: title
				}) : null, description != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					as: "p",
					variant: "body-sm-regular",
					color: "secondary",
					children: description
				}) : null]
			}), actions]
		}) : null, children]
	});
}
function Panel({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-q-500 border border-q-border-subtle bg-q-transparent-light-05 p-5 shadow-q-raised-sm md:p-6", className),
		...props
	});
}
var VOLUMETRIC_ICON_TILE_SIZE = {
	sm: {
		root: "size-9 rounded-q-300",
		icon: "sm"
	},
	md: {
		root: "size-10 rounded-q-300",
		icon: "sm"
	},
	lg: {
		root: "size-12 rounded-q-300",
		icon: "md"
	}
};
/** Canonical raised icon surface — Figma Left_lg (3617:50814). */
function VolumetricIconTile({ icon, size = "md", className }) {
	const dimensions = VOLUMETRIC_ICON_TILE_SIZE[size];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("relative flex shrink-0 items-center justify-center overflow-hidden border border-q-border-subtle bg-gradient-to-b from-q-transparent-light-20 via-q-transparent-dark-10 to-q-transparent-light-05 text-q-icon-primary shadow-q-raised", dimensions.root, className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			as: icon,
			size: dimensions.icon
		})
	});
}
function MetricCard({ label, value, badge, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "relative flex min-w-0 items-center gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumetricIconTile, {
				icon,
				size: "md"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("flex min-w-0 flex-1 flex-col gap-1", badge != null && "pr-12"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					as: "strong",
					variant: "title-md-semi-bold",
					color: "primary",
					truncate: true,
					children: value
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					as: "span",
					variant: "caption-sm-medium",
					color: "secondary",
					children: label
				})]
			}),
			badge != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
				as: "span",
				variant: "caption-xs-medium",
				color: "secondary",
				className: "absolute right-4 top-4 rounded-q-200 bg-q-transparent-light-10 px-2 py-1",
				children: badge
			}) : null
		]
	});
}
function EmptyState({ icon, title, description, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-64 flex-col items-center justify-center gap-4 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumetricIconTile, {
				icon,
				size: "lg"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex max-w-sm flex-col gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					as: "h3",
					variant: "label-md-semi-bold",
					color: "primary",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					as: "p",
					variant: "body-sm-regular",
					color: "secondary",
					children: description
				})]
			}),
			action
		]
	});
}
var NAVIGATION = [
	{
		id: "overview",
		label: "Overview",
		icon: n,
		gradient: "blue"
	},
	{
		id: "generations",
		label: "Generations",
		icon: s,
		gradient: "green"
	},
	{
		id: "activity",
		label: "Activity",
		icon: i,
		gradient: "purple"
	},
	{
		id: "settings",
		label: "Settings",
		icon: s$1,
		gradient: "orange"
	}
];
var INITIAL_ACTIVITY = [
	{
		id: "1",
		title: "First workflow completed",
		detail: "A few minutes ago",
		icon: CircleCheck
	},
	{
		id: "2",
		title: "New item added",
		detail: "Today",
		icon: Plus
	},
	{
		id: "3",
		title: "Workspace updated",
		detail: "Yesterday",
		icon: Sparkles
	}
];
function ActivityList({ items }) {
	if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: Activity,
		title: "No activity yet",
		description: "Meaningful changes will appear here when work begins."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "divide-y divide-q-border-subtle",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 py-3 first:pt-0 last:pb-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumetricIconTile, {
				icon: item.icon,
				size: "sm"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					as: "span",
					variant: "body-sm-medium",
					color: "primary",
					truncate: true,
					children: item.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					as: "span",
					variant: "caption-sm-regular",
					color: "tertiary",
					children: item.detail
				})]
			})]
		}, item.id))
	});
}
function NewItemModal({ onCreate }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const trimmedName = name.trim();
	const handleSubmit = (event) => {
		event.preventDefault();
		if (!trimmedName) return;
		onCreate(trimmedName);
		setName("");
		setOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal.Root, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal.Trigger, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			size: "sm",
			start: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				as: Plus,
				size: "sm"
			}),
			children: "New item"
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal.Content, {
			size: "sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal.Header, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal.Title, { children: "Create item" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal.CloseButton, {})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal.Body, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
					id: "new-item-form",
					onSubmit: handleSubmit,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						required: true,
						autoFocus: true,
						label: "Name",
						placeholder: "Give it a clear name",
						value: name,
						onChange: (event) => setName(event.target.value)
					})
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal.Footer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal.FooterActions, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal.Close, {
					render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm"
					}),
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					form: "new-item-form",
					variant: "secondary",
					size: "sm",
					disabled: !trimmedName,
					children: "Create"
				})] }) })
			]
		})]
	});
}
function Overview({ activity, onCreate, onOpenActivity }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Workspace overview",
			title: "Keep your workspace moving",
			description: "Track progress and move the most important work forward.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewItemModal, { onCreate })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "At a glance",
			description: "A concise view of current performance.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						icon: ChartColumn,
						label: "Completed",
						value: "128",
						badge: "+12"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						icon: Clock3,
						label: "In progress",
						value: "8",
						badge: "3 due"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						icon: FolderOpen,
						label: "Collections",
						value: "24",
						badge: "Today"
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "Recent activity",
			description: "Only the latest changes appear here.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "xs",
				onClick: onOpenActivity,
				children: "View all"
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityList, { items: activity.slice(0, 3) }) })
		})
	] });
}
function ActivityView({ activity, onCreate }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Activity",
		description: "Review recent changes across your workspace.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewItemModal, { onCreate })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		title: "Latest changes",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityList, { items: activity }) })
	})] });
}
function SettingsFields({ workspaceName, onWorkspaceNameChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
		label: "Workspace name",
		value: workspaceName,
		onChange: (event) => onWorkspaceNameChange(event.target.value)
	});
}
function SettingsView({ workspaceName, onWorkspaceNameChange, onSave, saved }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Settings",
		description: "Manage the details that shape this workspace."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		title: "Workspace",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "flex flex-col gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsFields, {
				workspaceName,
				onWorkspaceNameChange
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					size: "sm",
					disabled: saved,
					onClick: onSave,
					children: "Save changes"
				})
			})]
		})
	})] });
}
function GenerationsWorkspace({ prompt, generating, onPromptChange, onGenerateToggle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WorkspaceContent, {
		mode: "generations",
		className: "pb-36",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserGenerations, { demo: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-x-4 bottom-4 flex justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PromptBox.Root, {
				surface: "glass",
				className: "pointer-events-auto w-[900px] max-w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptBox.Body, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptBox.Field, {
					"aria-label": "Generation prompt",
					placeholder: "Describe what you want to generate...",
					value: prompt,
					onChange: (event) => onPromptChange(event.target.value)
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptBox.Generate, {
					disabled: !generating && prompt.trim().length === 0,
					onClick: onGenerateToggle,
					children: generating ? "Cancel" : "Generate"
				})]
			})
		})]
	});
}
function CustomTemplate({ previewMode = false }) {
	const [activeId, setActiveId] = (0, import_react.useState)("overview");
	const [activity, setActivity] = (0, import_react.useState)(INITIAL_ACTIVITY);
	const [prompt, setPrompt] = (0, import_react.useState)("");
	const [generating, setGenerating] = (0, import_react.useState)(false);
	const [workspaceName, setWorkspaceName] = (0, import_react.useState)("Custom workspace");
	const [savedWorkspaceName, setSavedWorkspaceName] = (0, import_react.useState)(workspaceName);
	const handleCreate = (name) => {
		setActivity((current) => [{
			id: crypto.randomUUID(),
			title: `${name} created`,
			detail: "Just now",
			icon: Plus
		}, ...current]);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-dvh",
		"data-app-preview": previewMode ? "true" : void 0,
		inert: previewMode ? true : void 0,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomAppShell, {
			brand: "Custom App",
			navigation: NAVIGATION,
			activeId,
			onNavigate: setActiveId,
			children: activeId === "generations" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenerationsWorkspace, {
				prompt,
				generating,
				onPromptChange: setPrompt,
				onGenerateToggle: () => setGenerating((current) => !current)
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceContent, {
				mode: "page",
				children: activeId === "overview" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overview, {
					activity,
					onCreate: handleCreate,
					onOpenActivity: () => setActiveId("activity")
				}) : activeId === "activity" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityView, {
					activity,
					onCreate: handleCreate
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsView, {
					workspaceName,
					onWorkspaceNameChange: setWorkspaceName,
					onSave: () => setSavedWorkspaceName(workspaceName),
					saved: !workspaceName.trim() || workspaceName === savedWorkspaceName
				})
			})
		})
	});
}
function AppRoute() {
	const { preview } = Route.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomTemplate, { previewMode: preview });
}
//#endregion
export { AppRoute as component };
