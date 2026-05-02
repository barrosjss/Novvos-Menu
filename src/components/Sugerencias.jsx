import React from 'react';
import { FaArrowLeft, FaHardHat } from 'react-icons/fa';
import './components.css';

const Sugerencias = () => (
  <div className="page-container">
    <header className="page-header">
      <a href="/linktree" className="page-back-btn">
        <FaArrowLeft /> Volver
      </a>
      <img src="/logo.webp" alt="Novvos" className="page-header-logo" />
    </header>

    <div className="page-content">
      <div className="wip-card">
        <FaHardHat className="wip-icon" />
        <h2 className="wip-title">Próximamente</h2>
        <p className="wip-msg">
          Nuestra caja de sugerencias está en construcción. Pronto podrás contarnos qué piensas.
        </p>
        <p className="wip-ig">
          Por ahora, escríbenos en <strong>@novvos.baq</strong>
        </p>
      </div>
    </div>
  </div>
);

export default Sugerencias;
