import React from 'react';
import './components.css';

const ProductCard = ({ product, promo, onClick }) => {
  const { name, description, price, image, badge } = product;

  // Determine final price and correct display based on promo
  let finalPrice = price;
  let hasDiscount = false;
  let promoLabel = '';

  if (promo) {
    if (promo.type === 'fixed_price') {
      finalPrice = promo.value;
      hasDiscount = price > finalPrice;
      promoLabel = '¡PROMO HOY!';
    } else if (promo.type === '2x1') {
      // 2x1 logic: price stays same but you get 2.
      // Or show badge. Let's show badge.
      promoLabel = '2x1 HOY';
    }
  }

  // Use product badge if no promo label
  const displayBadge = promoLabel || badge;

  return (
    <div className="product-card" onClick={onClick}>
      <div className="product-image-container">
        {/* Placeholder if image load fails or is missing, but ideally we have images */}
        <img
          src={image}
          alt={name}
          className="product-image"
          onError={(e) => {e.target.onerror = null; e.target.src="https://placehold.co/400x300/1a1a1a/FFF?text=Novvos"}}
        />
        {displayBadge && <div style={{position: 'absolute', top: 10, right: 10}} className={`promo-badge ${badge && !promoLabel ? 'new-badge' : ''}`}>{displayBadge}</div>}
      </div>
      
      <div className="product-details">
        <h3 className="product-title">{name}</h3>
        <p className="product-description">{description}</p>
        
        <div className="product-footer">
          <div className="price-container">
            {hasDiscount && (
              <span className="price-original">${price.toLocaleString('es-CO')}</span>
            )}
            <span className="product-price">
              ${finalPrice.toLocaleString('es-CO')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
