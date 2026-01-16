import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import menuData from '../data/menu.json';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import './components.css';

const MenuContainer = () => {
  const [currentDay, setCurrentDay] = useState('');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductPromo, setSelectedProductPromo] = useState(null);

  const categories = menuData.categories;

  useEffect(() => {
    const date = new Date();
    const day = date.getDay();
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    setCurrentDay(days[day]);

    // Improved scroll handler to update active section
    const handleScroll = () => {
      const header = document.querySelector('.menu-header-sticky');
      const headerHeight = header ? header.offsetHeight : 180;
      const scrollPosition = window.scrollY + headerHeight + 10; // Add small offset
      
      // Find which section is currently in view
      let currentSectionIndex = 0;
      let minDistance = Infinity;
      
      categories.forEach((category, index) => {
        const element = document.getElementById(category.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          
          if (distance < minDistance) {
            minDistance = distance;
            currentSectionIndex = index;
          }
        }
      });
      
      setCurrentSectionIndex(prevIndex => {
        // Only update if the section has actually changed
        return prevIndex !== currentSectionIndex ? currentSectionIndex : prevIndex;
      });
    };

    // Add scroll listener with debounce for better performance
    let scrollTimeout;
    const scrollListener = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 100);
    };

    window.addEventListener('scroll', scrollListener);
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', scrollListener);
      clearTimeout(scrollTimeout);
    };
  }, [categories]);

  const getPromoForCategory = (categoryId) => {
    // Tuesday: K-Box and K-Rolls at 25.000
    if (currentDay === 'tuesday') {
      if (categoryId === 'k-box' || categoryId === 'k-roll') {
        return { type: 'fixed_price', value: 25000 };
      }
    }
    
    // Thursday: 2x1 Cocktails
    if (currentDay === 'thursday') {
      if (categoryId === 'cocktails') {
        return { type: '2x1' };
      }
    }

    return null;
  };

  const dayBanner = currentDay === 'tuesday' ? "¡HOY MARTES: K-BOX Y K-ROLLS A $25.000!" : 
                    currentDay === 'thursday' ? "¡HOY JUEVES: 2x1 EN COCTELES!" : "";

  const scrollToSection = (index) => {
    if (index < 0 || index >= categories.length) return;
    
    const id = categories[index].id;
    const element = document.getElementById(id);
    if (element) {
      const header = document.querySelector('.menu-header-sticky');
      const headerHeight = header ? header.offsetHeight : 180;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      // Add a small timeout to ensure the DOM has updated
      setTimeout(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }, 100);
      
      setCurrentSectionIndex(index);
    }
  };

  const handlePrev = () => {
    const newIndex = currentSectionIndex - 1;
    if (newIndex >= 0) scrollToSection(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentSectionIndex + 1;
    if (newIndex < categories.length) scrollToSection(newIndex);
  };

  const handleProductClick = (product, promo) => {
    setSelectedProduct(product);
    setSelectedProductPromo(promo);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setSelectedProductPromo(null);
  };

  return (
    <div className="main-scroll-container">
      {/* Header Section */}
      <header className="menu-header-sticky">
        <div className="brand-bar-centered">
           <img src="/logo.webp" alt="Novvos Logo" className="header-logo" />
        </div>
        
        {dayBanner && (
          <div className="sticky-promo-banner">
            {dayBanner}
          </div>
        )}
      </header>

      {/* Content Section */}
      <div className="menu-content-scroll">
        {categories.map((category) => {
          const promo = getPromoForCategory(category.id);

          // List display mode for bebidas and cervezas
          if (category.displayMode === 'list') {
            return (
              <section key={category.id} id={category.id} className="scroll-category-section list-section">
                <h2 className="scroll-category-title">{category.title}</h2>

                <div className="list-section-content">
                  <div className="list-section-image">
                    <img
                      src={category.sectionImage}
                      alt={category.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/300x400/1a1a1a/FFF?text=" + category.title;
                      }}
                    />
                  </div>
                  <div className="list-section-items">
                    {category.items.map((item) => (
                      <div key={item.id} className="list-item">
                        <span className="list-item-name">{item.name}</span>
                        <span className="list-item-dots"></span>
                        <span className="list-item-price">${item.price.toLocaleString('es-CO')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          }

          // Default grid display mode
          return (
            <section key={category.id} id={category.id} className="scroll-category-section">
              <h2 className="scroll-category-title">{category.title}</h2>
               {category.description && <p className="scroll-category-desc">{category.description}</p>}

              <div className="scroll-products-grid">
                {category.items.map((item) => (
                  <ProductCard
                    key={item.id}
                    product={item}
                    promo={promo}
                    onClick={() => handleProductClick(item, promo)}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
      
      <footer className="menu-footer">
        <p>@novvos.baq</p>
        <p>Precios e imágenes sujetos a cambios sin previo aviso.</p>
      </footer>

      {/* Floating Navigation */}
      <div className="floating-nav-container">
        <div className="floating-nav-content">
          <button
            className={`nav-arrow prev ${currentSectionIndex === 0 ? 'disabled' : ''}`}
            onClick={handlePrev}
            disabled={currentSectionIndex === 0}
            aria-label="Previous section"
          >
            <FaChevronLeft className="nav-icon" />
          </button>

          <div className="section-indicator">
            <span className="section-title">{categories[currentSectionIndex].title}</span>
          </div>

          <button
            className={`nav-arrow next ${currentSectionIndex === categories.length - 1 ? 'disabled' : ''}`}
            onClick={handleNext}
            disabled={currentSectionIndex === categories.length - 1}
            aria-label="Next section"
          >
            <FaChevronRight className="nav-icon" />
          </button>
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          promo={selectedProductPromo}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default MenuContainer;
