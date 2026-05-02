import React from 'react';
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

const ProductCard = ({ product, promo, onClick }) => {
  const { name, description, price, image, badge, promotion, isComingSoon } = product;

  // Determine final price and correct display based on promo
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
      // Use the lower price between the regular price and the promo price
      finalPrice = Math.min(price, promo.value);
      hasDiscount = price > finalPrice;
      // Only show promo label if the price is actually discounted
      if (hasDiscount) {
        promoLabel = '¡PROMO HOY!';
      }
    } else if (promo.type === '2x1') {
      promoLabel = '2x1 HOY';
    }
  }

  // Use product badge if no promo label
  let displayBadge = promoLabel || badge;
  
  // Special label for free items
  if (finalPrice === 0) {
    displayBadge = '¡RECLAMA TU SODA GRATIS!';
  }

  if (isComingSoon) {
    displayBadge = 'PRÓXIMAMENTE';
  }

  return (
    <div className={`product-card ${isComingSoon ? 'coming-soon' : ''}`} onClick={isComingSoon ? null : onClick}>
      <div className="product-image-container">
        {/* Placeholder if image load fails or is missing, but ideally we have images */}
        <img
          src={image}
          alt={name}
          className="product-image"
          loading="lazy"
          decoding="async"
          onError={(e) => {e.target.onerror = null; e.target.src="https://placehold.co/400x300/1a1a1a/FFF?text=Novvos"}}
        />
        {displayBadge && <div style={{position: 'absolute', top: 10, right: 10}} className={`promo-badge ${badge && !promoLabel ? 'new-badge' : ''} ${isComingSoon ? 'coming-soon-badge' : ''}`}>{displayBadge}</div>}
      </div>
      
      <div className="product-details">
        <h3 className="product-title" translate="no">{name}</h3>
        <p className="product-description">{description}</p>
        
        {!isComingSoon && (
          <div className="product-footer">
            <div className="price-container">
              {hasDiscount ? (
                <div className="date-promo-prices">
                  <span className="product-price promo-price">
                    {finalPrice === 0 ? 'GRATIS' : `$${finalPrice.toLocaleString('es-CO')}`}
                  </span>
                  <span className="price-original">${price.toLocaleString('es-CO')}</span>
                </div>
              ) : (
                <span className="product-price">
                  {finalPrice === 0 ? 'GRATIS' : `$${finalPrice.toLocaleString('es-CO')}`}
                </span>
              )}
            </div>
            {finalPrice === 0 && (
              <div className="free-item-tc">
                *Válido 1 por mujer con consumo mínimo
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
