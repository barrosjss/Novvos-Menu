import React, { useState, useEffect } from 'react';
import './components.css';

const FloatingNav = ({ categories }) => {
  const [activeId, setActiveId] = useState('');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for the sticky header
      const headerOffset = 140; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveId(id);
    }
  };

  // Optional: Update active state on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Logic to determine which section is currently in view
      // Simple implementation: check bounding client rect of each category
      // For now, click-to-activate is sufficient
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="floating-nav">
      <div className="nav-track">
        {categories.map((cat) => (
          <button 
            key={cat.id} 
            className={`nav-pill ${activeId === cat.id ? 'active' : ''}`}
            onClick={() => scrollToSection(cat.id)}
          >
            {cat.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FloatingNav;
