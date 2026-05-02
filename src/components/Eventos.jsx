import React from 'react';
import { FaArrowLeft, FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import eventsData from '../data/events.json';
import './components.css';

const formatDate = (dateStr) => {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('es-CO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const todayMidnight = () => new Date(new Date().toDateString());

const Eventos = () => {
  const today = todayMidnight();
  const visible = eventsData.events.filter(e => {
    const end = e.endDate ? new Date(e.endDate) : new Date(e.date);
    return end >= today;
  });

  return (
    <div className="page-container">
      <header className="page-header">
        <a href="/linktree" className="page-back-btn">
          <FaArrowLeft /> Volver
        </a>
        <img src="/logo.webp" alt="Novvos" className="page-header-logo" />
      </header>

      <div className="page-content">
        <h1 className="page-title">Próximos Eventos</h1>

        {visible.length === 0 ? (
          <div className="eventos-empty">
            <FaCalendarAlt className="eventos-empty-icon" />
            <p>Pronto anunciaremos nuevos eventos.</p>
            <p>
              Síguenos en <strong>@novvos.baq</strong> para estar al tanto.
            </p>
          </div>
        ) : (
          <div className="eventos-list">
            {visible.map((event) => (
              <div key={event.id} className="evento-card">
                {event.image && (
                  <div className="evento-img-wrap">
                    <img src={event.image} alt={event.title} className="evento-img" />
                  </div>
                )}
                {event.badge && <span className="evento-badge">{event.badge}</span>}
                <div className="evento-info">
                  <h2 className="evento-title">{event.title}</h2>
                  <div className="evento-meta">
                    <span>
                      <FaCalendarAlt /> {formatDate(event.date)}
                    </span>
                    {event.time && (
                      <span>
                        <FaClock /> {event.time}
                      </span>
                    )}
                    {event.location && (
                      <span>
                        <FaMapMarkerAlt /> {event.location}
                      </span>
                    )}
                  </div>
                  {event.description && <p className="evento-desc">{event.description}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Eventos;
