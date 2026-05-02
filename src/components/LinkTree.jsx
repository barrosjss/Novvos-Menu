import React from 'react';
import { FaUtensils, FaMoon, FaBeer, FaCalendarAlt, FaCommentDots, FaInstagram } from 'react-icons/fa';
import './components.css';

const LINKS = [
  {
    icon: FaUtensils,
    label: 'Menú de Almuerzos',
    sub: 'Asados · Bebidas',
    href: '/almuerzos',
    accent: '#f8a048',
  },
  {
    icon: FaMoon,
    label: 'Menú Nocturno',
    sub: 'Asados · K-Box · K-Roll · Cocteles · Bebidas',
    href: '/nocturno',
    accent: '#9f7aea',
  },
  {
    icon: FaBeer,
    label: 'Menú de Bebidas',
    sub: 'Artesanales · Cocteles · Cervezas',
    href: '/bebidas',
    accent: '#48bb78',
  },
  {
    icon: FaCalendarAlt,
    label: 'Próximos Eventos',
    sub: 'Noches especiales y más',
    href: '/eventos',
    accent: '#63b3ed',
  },
  {
    icon: FaCommentDots,
    label: 'Caja de Sugerencias',
    sub: 'Tu opinión nos importa',
    href: '/sugerencias',
    accent: '#f687b3',
  },
];

const LinkTree = () => (
  <div className="linktree-container">
    <div className="linktree-header">
      <img src="/logo.webp" alt="Novvos" className="linktree-logo" />
      <p className="linktree-tagline">Bienvenido a tu lugar de confianza en Barranquilla.</p>
    </div>

    <div className="linktree-links">
      {LINKS.map(({ icon: Icon, label, sub, href, accent }) => (
        <a key={href} href={href} className="linktree-btn" style={{ '--lt-accent': accent }}>
          <span className="linktree-btn-icon">
            <Icon />
          </span>
          <div className="linktree-btn-text">
            <span className="linktree-btn-label">{label}</span>
            <span className="linktree-btn-sub">{sub}</span>
          </div>
        </a>
      ))}
    </div>

    <div className="linktree-footer">
      <a
        href="https://instagram.com/novvos.baq"
        target="_blank"
        rel="noopener noreferrer"
        className="linktree-ig"
      >
        <FaInstagram /> @novvos.baq
      </a>
    </div>
  </div>
);

export default LinkTree;
