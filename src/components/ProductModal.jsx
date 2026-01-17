import React, { useState, useEffect } from 'react';
import './components.css';

// Helper function to check if a date-based promotion is active
const isPromotionActive = (promotion) => {
  if (!promotion) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = new Date(promotion.startDate);
  const endDate = new Date(promotion.endDate);
  endDate.setHours(23, 59, 59, 999);

  return today >= startDate && today <= endDate;
};

const ProductModal = ({ product, promo, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { name, description, price, image, images, badge, promotion } = product;

  // Use images array if available, otherwise fallback to single image
  const imageList = images && images.length > 0 ? images : [image];

  // Calculate final price based on promo
  let finalPrice = price;
  let hasDiscount = false;
  let promoLabel = '';
  let hasDatePromotion = false;

  // Check for date-based promotion first
  if (promotion && isPromotionActive(promotion)) {
    finalPrice = promotion.price;
    hasDiscount = true;
    hasDatePromotion = true;
  }

  // Then check for day-based promos (Tuesday/Thursday)
  if (promo && !hasDatePromotion) {
    if (promo.type === 'fixed_price') {
      finalPrice = promo.value;
      hasDiscount = price > finalPrice;
      promoLabel = '¡PROMO HOY!';
    } else if (promo.type === '2x1') {
      promoLabel = '2x1 HOY';
    }
  }

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? imageList.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === imageList.length - 1 ? 0 : prev + 1
    );
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        {/* Close button */}
        <button className="modal-close-btn" onClick={onClose}>
          ×
        </button>

        {/* Image Carousel */}
        <div className="modal-carousel">
          <img
            src={imageList[currentImageIndex]}
            alt={`${name} - ${currentImageIndex + 1}`}
            className="modal-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/600x400/1a1a1a/FFF?text=Novvos";
            }}
          />

          {/* Carousel Navigation - only show if multiple images */}
          {imageList.length > 1 && (
            <>
              <button className="carousel-btn carousel-prev" onClick={handlePrevImage}>
                ‹
              </button>
              <button className="carousel-btn carousel-next" onClick={handleNextImage}>
                ›
              </button>

              {/* Dots indicator */}
              <div className="carousel-dots">
                {imageList.map((_, index) => (
                  <span
                    key={index}
                    className={`carousel-dot ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                  />
                ))}
              </div>
            </>
          )}

          {/* Badge */}
          {(promoLabel || badge) && (
            <div className={`modal-badge ${badge && !promoLabel ? 'new-badge' : ''}`}>
              {promoLabel || badge}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="modal-info">
          <h2 className="modal-title" translate="no">{name}</h2>
          <p className="modal-description">{description}</p>

          <div className="modal-price-container">
            {hasDiscount && hasDatePromotion ? (
              <div className="modal-date-promo-prices">
                <span className="modal-price modal-price-promo">${finalPrice.toLocaleString('es-CO')}</span>
                <span className="modal-price-original">${price.toLocaleString('es-CO')}</span>
              </div>
            ) : (
              <>
                {hasDiscount && (
                  <span className="modal-price-original">
                    ${price.toLocaleString('es-CO')}
                  </span>
                )}
                <span className="modal-price">
                  ${finalPrice.toLocaleString('es-CO')}
                </span>
                {promoLabel && (
                  <span className="modal-promo-label">{promoLabel}</span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
