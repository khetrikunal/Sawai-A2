import { useState, useEffect, useRef } from "react";
import { X, WhatsappLogo, ArrowUpRight } from "@phosphor-icons/react";

const WHATSAPP_NUMBER = "919156996309";
const PREFILLED_MESSAGE =
  "Hello Sawai Gir Amrut, I would like to order the Diwali Special Combo (200ml Gir Cow Ghee + Gomutra + Govari @ ₹349). Please confirm availability and delivery.";

const ORDER_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PREFILLED_MESSAGE)}`;
const STORAGE_KEY = "sawai_offer_popup_dismissed";

export function OfferPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "true") {
        return;
      }
    } catch {
      // Safe fallback if sessionStorage is inaccessible
    }

    const timer = window.setTimeout(() => {
      previouslyFocusedElement.current = document.activeElement as HTMLElement | null;
      setIsOpen(true);
    }, 2500);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus close button for keyboard accessibility
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleDismiss();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleDismiss = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Safe fallback
    }
    setIsOpen(false);
    previouslyFocusedElement.current?.focus();
  };

  const handleOrderClick = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Safe fallback
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="offer-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="offer-popup-title"
      aria-describedby="offer-popup-desc"
      onClick={handleDismiss}
    >
      <div
        className="offer-modal"
        data-lenis-prevent=""
        onClick={(e) => e.stopPropagation()}
      >
        <div className="offer-modal__header">
          <div className="offer-modal__kicker">
            <span className="offer-modal__dot" />
            <span id="offer-popup-title">FESTIVE EXCLUSIVE OFFER</span>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="offer-modal__close"
            onClick={handleDismiss}
            aria-label="Close offer popup"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <div className="offer-modal__body">
          <div className="offer-modal__image-wrapper">
            <img
              src="/offer.jpeg"
              alt="Sawai Gir Amrut Diwali Special Offer - 200ml A2 Gir Cow Ghee, 90ml Gomutra, and 1 Govari for ₹349"
              className="offer-modal__image"
              width="1254"
              height="1254"
              loading="eager"
            />
          </div>

          <p id="offer-popup-desc" className="sr-only">
            Diwali Special Festive Combo: 200ml Pure Gir Cow Bilona Ghee, 90ml Gomutra, and 1 Pure Cow Dung Govari for ₹349.
          </p>

          <div className="offer-modal__footer">
            <div className="offer-modal__deal-info">
              <span className="offer-modal__deal-label">Festive Combo Pack</span>
              <span className="offer-modal__deal-price">₹349</span>
            </div>

            <a
              href={ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="offer-modal__order-btn"
              onClick={handleOrderClick}
            >
              <WhatsappLogo size={22} weight="fill" />
              <span>Order Now</span>
              <ArrowUpRight size={18} weight="bold" />
            </a>

            <p className="offer-modal__note">
              Instant booking via WhatsApp · Fresh batch directly from Sawai Gir Farm
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
