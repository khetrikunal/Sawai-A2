import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowUpRight, ArrowDown, Plus, Minus } from "@phosphor-icons/react";
import { ScrollScrub } from "@/components/scroll-scrub/scroll-scrub";
import { scrollScrubScenes, scrollScrubTheme } from "@/scroll-scrub-scenes";
import { useCampaignMotion } from "@/components/sawai/use-campaign-motion";
import { StructuredData } from "@/components/StructuredData";
import { OfferPopup } from "@/components/OfferPopup";
import { PurchaseForm } from "@/components/PurchaseForm";
import type { PurchaseProduct } from "@/components/PurchaseForm";

/** Minimal offer type emitted by OfferPopup's onBuyNow callback */
interface OfferTrigger { id: string; title: string; price: number; }

export const Route = createFileRoute("/")({ component: Home });

const sizes = [
  { id: "ghee-200ml", name: "200 ml", mrp: 800, price: 640, discount: 20, note: "A little richness, every day." },
  { id: "ghee-500ml", name: "500 ml", mrp: 2000, price: 1600, discount: 20, note: "For the heart of your kitchen." },
  { id: "ghee-1l", name: "1 Litre", mrp: 4000, price: 3200, discount: 20, note: "For families and professional kitchens." },
];

const offers = [
  {
    id: "offer-pavitra-bhet",
    tag: "Festive Exclusive",
    title: "Pavitra Bhet Combo",
    desc: "200 ml Pure A2 Gir Cow Bilona Ghee + 50 ml Gomutra + 1 Cow Dung Govari",
    price: 349,
    image: "/offer%201.jpeg",
    alt: "Sawai Gir Amrut Festive Offer - 200ml A2 Gir Cow Ghee, 50ml Gomutra, and 1 Govari for ₹349",
  },
  {
    id: "offer-satvik-sangam",
    tag: "Festive Exclusive",
    title: "Satvik Sangam Combo",
    desc: "200 ml Pure A2 Gir Cow Bilona Ghee + 90 ml Gomutra + 1 Cow Dung Govari",
    price: 349,
    image: "/offer.jpeg",
    alt: "Sawai Gir Amrut Wellness Offer - 200ml A2 Gir Cow Ghee, 90ml Gomutra, and 1 Govari for ₹349",
  },
];

const schema = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", name: "Sawai Gir Amrut", url: "https://sawaighee.com", logo: "https://sawaighee.com/assets/brand/logo.webp", telephone: "+91 91569 96309", address: { "@type": "PostalAddress", streetAddress: "Malwadi, Post Bibi, Tal. Phaltan", addressLocality: "Satara", addressRegion: "Maharashtra", postalCode: "415537", addressCountry: "IN" } },
    { "@type": "WebSite", name: "Sawai Gir Amrut", url: "https://sawaighee.com" },
  ],
});

function Home() {
  useCampaignMotion();
  const dialog = useRef<HTMLDialogElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const film = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [filmError, setFilmError] = useState(false);

  // Purchase form state
  const [purchaseProduct, setPurchaseProduct] = useState<PurchaseProduct | null>(null);
  const [purchaseQty, setPurchaseQty] = useState(1);

  useEffect(() => {
    if (!menuOpen) return;
    const saved = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = saved; };
  }, [menuOpen]);

  const closeMenu = () => { dialog.current?.close(); setMenuOpen(false); };

  const toggleFilm = async () => {
    if (!film.current) return;
    if (film.current.paused) {
      try { await film.current.play(); setPlaying(true); }
      catch { setFilmError(true); setPlaying(false); }
    } else { film.current.pause(); setPlaying(false); }
  };

  /** Open the purchase form for the selected ghee jar */
  const openGheePurchase = useCallback(() => {
    const s = sizes[size];
    setPurchaseProduct({
      id: s.id,
      name: `Sawai Gir Amrut A2 Gir Cow Bilona Ghee – ${s.name}`,
      price: s.price,
      requiresDelivery: true,
      maxQuantity: 20,
    });
    setPurchaseQty(quantity);
  }, [size, quantity]);

  /** Open the purchase form for a combo offer */
  const openOfferPurchase = useCallback((offer: OfferTrigger) => {
    setPurchaseProduct({
      id: offer.id,
      name: offer.title,
      price: offer.price,
      requiresDelivery: true,
      maxQuantity: 10,
    });
    setPurchaseQty(1);
  }, []);

  const closePurchaseForm = useCallback(() => {
    setPurchaseProduct(null);
  }, []);

  const handleOrderSuccess = useCallback((_orderNumber: string) => {
    // Form handles its own success state; we can do extra things here if needed
  }, []);

  return (
    <div id="sawai" className="sawai">
      <StructuredData json={schema} />
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="sawai-nav" id="navigation">
        <a className="brand-lockup" href="#home" aria-label="Sawai Gir Amrut, home">
          <img src="/assets/brand/mark.webp" alt="" width="54" height="54" />
          <span><strong>SAWAI</strong><small>GIR AMRUT</small></span>
        </a>
        <nav className="desktop-links" aria-label="Main navigation">
          <a href="#home">Home</a><a href="#offers">Offers</a><a href="#story">Our Story</a><a href="#why">Why Our Ghee</a><a href="#products">Products</a>
        </nav>
        <div className="nav-end"><a className="nav-shop" href="#products">Shop Now <ArrowUpRight size={15} /></a>
          <button className="menu-open" aria-label="Open navigation" aria-expanded={menuOpen} aria-controls="mobile-menu"
            onClick={() => { dialog.current?.showModal(); setMenuOpen(true); }}><span /><span /></button>
        </div>
      </header>
      <dialog ref={dialog} id="mobile-menu" className="mobile-menu" onClose={() => setMenuOpen(false)} aria-label="Mobile navigation" data-lenis-prevent="">
        <div className="menu-top"><span>SAWAI GIR AMRUT</span><button aria-label="Close navigation" onClick={closeMenu}>Close ×</button></div>
        <nav aria-label="Mobile navigation">{[["Home", "#home"], ["Offers", "#offers"], ["Our Story", "#story"], ["Why Our Ghee", "#why"], ["Products", "#products"]].map(([label, href]) => <a key={href} href={href} onClick={closeMenu}>{label}<ArrowUpRight size={28} /></a>)}</nav>
        <p>Malwadi, Phaltan.<br />Made with tradition.</p>
      </dialog>
      <main id="main">
        <div className="cinematic-journey" id="home">
          <ScrollScrub scenes={scrollScrubScenes} theme={scrollScrubTheme} className="sawai-film" />
          <a className="scroll-cue" href="#the-gold" aria-label="Scroll to the golden ghee story"><span>THE GOLDEN JOURNEY</span><ArrowDown size={17} /></a>
          <div className="film-chapters">
            <article className="journey-passage" id="the-gold">
              <div className="passage-copy"><span className="passage-rule" /><h2>Golden by nature.<br /><em>Extraordinary by craft.</em></h2>
                <p>Warm aroma. A rich golden colour. The grainy texture of ghee made the traditional Bilona way.</p>
                <span className="chapter-caption">THE COLOUR OF CARE</span>
              </div>
            </article>
            <article className="journey-passage" id="the-craft">
              <div className="passage-copy"><h2>Good things<br /><em>take their time.</em></h2>
                <p>Milk becomes curd. Curd becomes butter. A gentle simmer brings out the golden heart of the process.</p>
                <a className="journey-process" href="#process">Explore the process <ArrowUpRight size={19} /></a>
              </div>
            </article>
            <article className="journey-passage last-passage" id="the-table">
              <div className="passage-copy"><h2>A tradition<br /><em>worth bringing home.</em></h2>
                <p>From our Gir cows in Phaltan to the rituals of your kitchen. Sawai Gir Amrut, one spoonful at a time.</p>
              </div>
            </article>
          </div>
          <div className="origin-rail">SAWAI GIR FARM <span /> PHALTAN, MAHARASHTRA</div>
        </div>
        <section className="offers-section section-pad" id="offers" aria-labelledby="offers-title">
          <div className="offers-header">
            <p className="section-kicker">FESTIVE BLESSINGS &amp; TRADITION</p>
            <h2 id="offers-title" className="display">Exclusive<br /><em>Festive Offers.</em></h2>
            <p className="offers-subtitle">Bring home purity, tradition, and well-being this festive season with our handcrafted Gir cow combos directly from Sawai Gir Farm, Phaltan.</p>
          </div>
          <div className="offers-grid">
            {offers.map((offer) => (
              <article key={offer.id} className="offer-card">
                <div className="offer-card__image-container">
                  <span className="offer-card__tag">{offer.tag}</span>
                  <img src={offer.image} alt={offer.alt} className="offer-card__image" width="1254" height="1254" loading="lazy" />
                </div>
                <div className="offer-card__content">
                  <h3>{offer.title}</h3>
                  <p className="offer-card__desc">{offer.desc}</p>
                  <div className="offer-card__pricing">
                    <span className="offer-card__price-val">₹{offer.price}</span>
                    <span className="offer-card__price-sub">Special Festive Price · All Inclusive</span>
                  </div>
                  <button
                    type="button"
                    className="offer-card__btn"
                    id={`buy-${offer.id}`}
                    onClick={() => openOfferPurchase(offer)}
                  >
                    <span>Order Now – ₹{offer.price}</span>
                    <ArrowUpRight size={17} weight="bold" />
                  </button>
                  <p className="offer-card__reassurance">Secure payment via Razorpay · Direct from Sawai Gir Farm</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="purity-section" aria-labelledby="purity-title">
          <div className="provenance-line"><span>GIR COW MILK</span><span>CURD-CHURNED BUTTER</span><span>THE BILONA METHOD</span></div>
          <div className="purity-composition">
            <p className="section-kicker">THE ESSENCE OF SAWAI</p>
            <h2 id="purity-title" className="display">A simple beginning.<br /><em>A richer everyday.</em></h2>
            <p className="purity-description">Our A2 Gir cow ghee begins at Sawai Gir Farm. Cultured into curd, churned into butter, then slowly simmered.</p>
            <div className="purity-detail" data-parallax=""><img src="/assets/brand/gold.webp" alt="Golden ghee flowing from a brass ladle" loading="lazy" width="808" height="446" /></div>
            <span className="vertical-note">FROM MILK. THROUGH TRADITION.</span>
          </div>
        </section>
        <section className="why-section section-pad" id="why" aria-labelledby="why-title">
          <h2 className="display" id="why-title">The difference<br /><em>is in the making.</em></h2>
          <div className="difference-rows">
            <details open><summary><span className="difference-index">01</span><h3>Gir cow milk</h3><span className="row-reveal">SOURCED AT OUR FARM</span><Plus size={22} /></summary><p>We begin with milk from the Gir cows at our farm in Phaltan, Maharashtra. The story of every jar starts here.</p></details>
            <details><summary><span className="difference-index">02</span><h3>Curd, before butter</h3><span className="row-reveal">THE TRADITIONAL BILONA WAY</span><Plus size={22} /></summary><p>Milk is cultured into dahi. A wooden Bilona churn separates the white butter from buttermilk, preserving the traditional sequence.</p></details>
            <details><summary><span className="difference-index">03</span><h3>A gentle simmer</h3><span className="row-reveal">RICH IN AROMA AND TEXTURE</span><Plus size={22} /></summary><p>Butter is slowly heated until its moisture evaporates and ghee separates. This final step brings its characteristic aroma and golden colour.</p></details>
          </div>
        </section>
        <section className="process-section" id="process" aria-labelledby="process-title">
          <div className="process-cinema">
            <video ref={film} playsInline loop preload="none" poster="/assets/brand/pour-poster.jpg"
              aria-label="Golden ghee being poured from a brass ladle" onPause={() => setPlaying(false)} onPlay={() => setPlaying(true)} onError={() => setFilmError(true)}>
              <source src="/assets/brand/pour.mp4" type="video/mp4" />
            </video>
            <div className="process-scrim" />
            <div className="process-title"><p className="section-kicker">THE BILONA RITUAL</p><h2 id="process-title">Made slowly.<br /><em>Remembered long.</em></h2>
              <button className="film-control" onClick={toggleFilm} disabled={filmError}><span>{playing ? "Ⅱ" : "▷"}</span>{playing ? "Pause film" : filmError ? "Film unavailable" : "Play pour film"}</button>
              {filmError && <p className="film-status" role="status">Enjoy the product photograph while the film is unavailable.</p>}
            </div>
          </div>
          <ol className="process-steps">
            {[["Milk", "Milk from our Gir cows begins the process."], ["Curd", "The milk is cultured and set into dahi."], ["Butter", "A wooden Bilona churn separates white butter."], ["Ghee", "A slow simmer brings the ghee into its golden form."]].map(([name, text], i) => <li key={name}><span>0{i + 1}</span><h3>{name}</h3><p>{text}</p></li>)}
          </ol>
        </section>
        <section className="heritage-section section-pad" id="story" aria-labelledby="story-title">
          <div className="heritage-heading"><h2 id="story-title" className="display">A place. A process.<br /><em>A promise.</em></h2></div>
          <figure className="founder-photo" data-parallax=""><img src="/assets/brand/founders.webp" alt="The Sawai team presenting their original Gir Amrut ghee jars" width="1400" height="646" loading="lazy" /><figcaption>The people behind Sawai Gir Amrut. Malwadi, Phaltan, Maharashtra.</figcaption></figure>
          <div className="heritage-prose"><p>At Sawai Gir Farm, the familiar rhythm of milk, curd, butter and ghee carries forward a deeply Indian tradition.</p><p>Our home is Malwadi, Phaltan. Our purpose is to bring the aroma and texture of Bilona ghee into the everyday kitchen.</p><a className="heritage-contact" href="tel:+919156996309">Talk to the farm <ArrowUpRight size={18} /></a></div>
        </section>
        <section className="product-section" id="products">
          <div className="product-gallery"><img src="/assets/brand/collection.webp" srcSet="/assets/brand/collection-720.webp 720w, /assets/brand/collection-1280.webp 1280w, /assets/brand/collection.webp 1920w" sizes="(max-width: 860px) 100vw, 62vw" alt="Sawai Gir Amrut ghee collection in its original emerald and gold packaging" width="1920" height="1071" loading="lazy" /><span>AN EVERYDAY RITUAL, BEAUTIFULLY MADE.</span></div>
          <div className="product-selection"><p className="section-kicker">BRING HOME THE GOLD</p><h2 id="product-title">Sawai<br /><em>Gir Amrut.</em></h2><p className="product-subtitle">A2 Gir Cow Bilona Ghee</p>
            <fieldset className="size-options"><legend>Choose your jar</legend>{sizes.map((item, i) => <label key={item.name} className={i === size ? "selected" : ""}><input name="jar-size" type="radio" checked={i === size} onChange={() => setSize(i)} value={item.name} /><span>{item.name}</span></label>)}</fieldset>
            <p className="size-note">{sizes[size].note}</p>
            <div className="product-price">
              <span className="price-badge">{sizes[size].discount}% OFF</span>
              <div className="price-row">
                <span className="price-mrp">₹{sizes[size].mrp.toLocaleString("en-IN")}</span>
                <span className="price-sale">₹{sizes[size].price.toLocaleString("en-IN")}</span>
              </div>
              <small>Price per jar · MRP ₹{sizes[size].mrp.toLocaleString("en-IN")}</small>
            </div>
            <div className="quantity-line"><span id="quantity-label">Quantity</span><div aria-labelledby="quantity-label" className="quantity-control"><button aria-label="Decrease quantity" disabled={quantity === 1} onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus size={15} /></button><output aria-live="polite">{quantity}</output><button aria-label="Increase quantity" disabled={quantity === 20} onClick={() => setQuantity(q => Math.min(20, q + 1))}><Plus size={15} /></button></div></div>
            <button
              id="shop-now-btn"
              type="button"
              className="purchase-row"
              onClick={openGheePurchase}
            >
              <span>Shop Now</span><ArrowUpRight size={26} />
            </button>
            <p className="purchase-note">Secure online payment via Razorpay · UPI, Cards &amp; Net Banking accepted</p>
          </div>
        </section>
        <section className="trust-section section-pad" aria-labelledby="trust-title">
          <div className="trust-intro"><h2 className="display" id="trust-title">Know the source.<br /><em>Trust the process.</em></h2><p>Good ghee begins with clear answers. Here is the story behind the jar.</p></div>
          <dl className="quality-ledger"><div><dt>Our source</dt><dd>Sawai Gir Farm, Phaltan</dd></div><div><dt>Our milk</dt><dd>Gir cow milk</dd></div><div><dt>Our method</dt><dd>Curd, Bilona-churned butter, slow simmer</dd></div><div><dt>Our home</dt><dd>Malwadi, Satara, Maharashtra</dd></div></dl>
          <div className="ghee-faq"><details><summary>What makes the Bilona method different?<Plus size={18} /></summary><p>It begins with cultured curd. The curd is churned into butter before being heated into ghee, following the traditional milk-to-curd-to-butter sequence.</p></details><details><summary>Which jar should I choose?<Plus size={18} /></summary><p>Choose 200 ml for a taste, 500 ml for a smaller kitchen, or 1 Litre for regular family cooking.</p></details><details><summary>How do I place an order?<Plus size={18} /></summary><p>Select a size and quantity, then click Shop Now to proceed to secure checkout via Razorpay.</p></details></div>
        </section>
        <section className="lifestyle-section" aria-labelledby="lifestyle-title">
          <img src="/assets/brand/collection.webp" alt="Sawai ghee alongside brass utensils, flowers and a traditionally set Indian table" loading="lazy" width="1920" height="1071" data-parallax="" />
          <div className="lifestyle-overlay" /><div className="lifestyle-copy"><h2 id="lifestyle-title">A spoonful of home.<br /><em>Every single day.</em></h2><p>Over warm dal. On a fresh roti.<br />In the moments that bring us together.</p></div>
        </section>
        <section className="final-section section-pad" aria-labelledby="final-title">
          <button id="final-shop-btn" type="button" className="final-purchase" onClick={() => { window.location.hash = "#products"; openGheePurchase(); }}>
            <h2 id="final-title">Make room<br /><em>for something golden.</em></h2>
            <span className="final-orbit"><ArrowUpRight size={38} /><small>Shop Now</small></span>
          </button>
        </section>
      </main>
      <footer className="sawai-footer">
        <div className="footer-main"><a className="footer-brand" href="#home"><img src="/assets/brand/mark.webp" alt="Sawai Gir Amrut" loading="lazy" width="78" height="78" /><span>SAWAI<br /><small>GIR AMRUT</small></span></a><p>A2 Gir cow ghee.<br />Rooted in the Bilona tradition.</p><nav aria-label="Footer navigation"><a href="#offers">Offers</a><a href="#story">Our Story</a><a href="#why">Why Our Ghee</a><a href="#products">Products</a><a href="tel:+919156996309">Contact</a></nav><address>Sawai Gir Farm<br />Malwadi, Post Bibi, Tal. Phaltan<br />Satara, Maharashtra 415537<br /><a href="tel:+919156996309">+91 91569 96309</a></address></div>
        <div className="footer-bottom"><span>© 2026 Sawai Gir Amrut. All rights reserved.</span><span>Made with tradition. Presented with care.</span><a href="#home" aria-label="Back to top">Back to top ↑</a></div>
      </footer>
      <OfferPopup onBuyNow={openOfferPurchase} />

      {/* Purchase Form Dialog — rendered only when a product is selected */}
      {purchaseProduct && (
        <PurchaseForm
          product={purchaseProduct}
          quantity={purchaseQty}
          onClose={closePurchaseForm}
          onSuccess={handleOrderSuccess}
        />
      )}
    </div>
  );
}
