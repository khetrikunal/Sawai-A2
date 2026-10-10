import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export function useCampaignMotion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dispose: (() => void) | undefined;
    const setup = () => {
      dispose?.();
      const nav = document.getElementById("navigation");
      const updateNav = () => nav?.classList.toggle("is-scrolled", window.scrollY > 60);
      updateNav();
      window.addEventListener("scroll", updateNav, { passive: true });
      const cleanNav = () => window.removeEventListener("scroll", updateNav);
      if (reduce.matches) { dispose = cleanNav; return; }
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ autoRaf: false, duration: 1.08, smoothWheel: true, anchors: { offset: -76 } });
      lenis.on("scroll", ScrollTrigger.update);
      const ticker = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(ticker);
      const context = gsap.context(() => {
        gsap.from(".sawai-film .scroll-scrub__title", { y: 30, duration: 1.2, ease: "power3.out" });
        gsap.from(".sawai-film .scroll-scrub__body, .scroll-scrub__actions", { y: 18, duration: 1.1, delay: .16, ease: "power3.out" });
        gsap.utils.toArray<HTMLElement>(".passage-copy").forEach(el => {
          gsap.fromTo(el, { y: 36 }, { y: -24, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
        });
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach(el => {
          gsap.fromTo(el, { y: 20 }, { y: -20, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
        });
      }, "#sawai");
      const magnet = document.querySelector<HTMLElement>(".hero-shop");
      let reset = () => {};
      if (magnet && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const x = gsap.quickTo(magnet, "x", { duration: .5, ease: "power3.out" });
        const y = gsap.quickTo(magnet, "y", { duration: .5, ease: "power3.out" });
        const move = (e: PointerEvent) => { const r = magnet.getBoundingClientRect(); x((e.clientX-r.left-r.width/2)*.12); y((e.clientY-r.top-r.height/2)*.15); };
        const leave = () => { x(0); y(0); };
        magnet.addEventListener("pointermove", move); magnet.addEventListener("pointerleave", leave);
        reset = () => { magnet.removeEventListener("pointermove", move); magnet.removeEventListener("pointerleave", leave); gsap.killTweensOf(magnet); gsap.set(magnet, { clearProps: "transform" }); };
      }
      dispose = () => { cleanNav(); reset(); context.revert(); gsap.ticker.remove(ticker); lenis.destroy(); };
    };
    setup();
    reduce.addEventListener("change", setup);
    return () => { reduce.removeEventListener("change", setup); dispose?.(); };
  }, []);
}
