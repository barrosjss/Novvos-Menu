import React, { useState, useEffect } from 'react';
import MenuContainer from './components/MenuContainer';
import menuData from './data/menu.json';
import menuPruebaData from './data/menu-prueba.json';
import './App.css';

// Map Spanish day names to English
const dayMap = {
  'domingo': 'sunday',
  'lunes': 'monday',
  'martes': 'tuesday',
  'miercoles': 'wednesday',
  'miércoles': 'wednesday',
  'jueves': 'thursday',
  'viernes': 'friday',
  'sabado': 'saturday',
  'sábado': 'saturday'
};

function App() {
  const [isTestMode, setIsTestMode] = useState(false);
  const [currentMenuData, setCurrentMenuData] = useState(menuData);
  const [simulatedDay, setSimulatedDay] = useState(null);

  useEffect(() => {
    // Check if we're on the /prueba route
    const checkRoute = () => {
      const path = window.location.pathname;
      const params = new URLSearchParams(window.location.search);
      const dayParam = params.get('dia');

      if (path === '/prueba' || path === '/prueba/') {
        setIsTestMode(true);
        setCurrentMenuData(menuPruebaData);

        // Check for simulated day parameter
        if (dayParam && dayMap[dayParam.toLowerCase()]) {
          setSimulatedDay(dayMap[dayParam.toLowerCase()]);
        } else {
          setSimulatedDay(null);
        }
      } else {
        setIsTestMode(false);
        setCurrentMenuData(menuData);
        setSimulatedDay(null);
      }
    };

    checkRoute();

    // Listen for route changes
    window.addEventListener('popstate', checkRoute);
    return () => window.removeEventListener('popstate', checkRoute);
  }, []);

  return (
    <div className="App">
      <MenuContainer
        menuData={currentMenuData}
        isTestMode={isTestMode}
        simulatedDay={simulatedDay}
      />
    </div>
  );
}

export default App;
