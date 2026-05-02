import React, { useState, useEffect } from 'react';
import MenuContainer from './components/MenuContainer';
import LinkTree from './components/LinkTree';
import Eventos from './components/Eventos';
import Sugerencias from './components/Sugerencias';
import menuData from './data/menu.json';
import menuPruebaData from './data/menu-prueba.json';
import './App.css';

const dayMap = {
  'domingo': 'sunday',
  'lunes': 'monday',
  'martes': 'tuesday',
  'miercoles': 'wednesday',
  'miércoles': 'wednesday',
  'jueves': 'thursday',
  'viernes': 'friday',
  'sabado': 'saturday',
  'sábado': 'saturday',
};

function pickCategories(data, ids) {
  const catMap = Object.fromEntries(data.categories.map((c) => [c.id, c]));
  return {
    ...data,
    categories: ids
      .map((id) => catMap[id])
      .filter(Boolean)
      .map((c) => ({ ...c, hidden: false })),
  };
}

const ALMUERZOS = ['asados', 'barra-artesanal', 'bebidas', 'cervezas'];
const NOCTURNO = ['k-box', 'k-roll', 'k-cuadrate', 'cocktails', 'asados', 'barra-artesanal', 'bebidas', 'cervezas'];
const BEBIDAS = ['barra-artesanal', 'bebidas', 'cervezas'];

function App() {
  const [view, setView] = useState('menu');
  const [menuProps, setMenuProps] = useState({
    menuData,
    isTestMode: false,
    simulatedDay: null,
    isBarOnly: false,
  });

  useEffect(() => {
    const resolve = () => {
      const path = window.location.pathname.replace(/\/$/, '');
      const params = new URLSearchParams(window.location.search);
      const dayParam = params.get('dia');

      if (path === '/linktree') { setView('linktree'); return; }
      if (path === '/eventos')  { setView('eventos');  return; }
      if (path === '/sugerencias') { setView('sugerencias'); return; }

      setView('menu');

      if (path === '/almuerzos') {
        setMenuProps({ menuData: pickCategories(menuData, ALMUERZOS), isTestMode: false, simulatedDay: null, isBarOnly: false });
      } else if (path === '/nocturno') {
        setMenuProps({ menuData: pickCategories(menuData, NOCTURNO), isTestMode: false, simulatedDay: null, isBarOnly: false });
      } else if (path === '/bebidas' || path === '/barra') {
        setMenuProps({ menuData: pickCategories(menuData, BEBIDAS), isTestMode: false, simulatedDay: null, isBarOnly: true });
      } else if (path === '/prueba') {
        const day = dayParam && dayMap[dayParam.toLowerCase()] ? dayMap[dayParam.toLowerCase()] : null;
        setMenuProps({ menuData: menuPruebaData, isTestMode: true, simulatedDay: day, isBarOnly: false });
      } else {
        setMenuProps({ menuData, isTestMode: false, simulatedDay: null, isBarOnly: false });
      }
    };

    resolve();
    window.addEventListener('popstate', resolve);
    return () => window.removeEventListener('popstate', resolve);
  }, []);

  return (
    <div className="App">
      {view === 'linktree'    && <LinkTree />}
      {view === 'eventos'     && <Eventos />}
      {view === 'sugerencias' && <Sugerencias />}
      {view === 'menu'        && <MenuContainer {...menuProps} />}
    </div>
  );
}

export default App;
