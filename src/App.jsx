import React, { useState, useEffect } from 'react';
import MenuContainer from './components/MenuContainer';
import menuData from './data/menu.json';
import menuPruebaData from './data/menu-prueba.json';
import './App.css';

function App() {
  const [isTestMode, setIsTestMode] = useState(false);
  const [currentMenuData, setCurrentMenuData] = useState(menuData);

  useEffect(() => {
    // Check if we're on the /prueba route
    const checkRoute = () => {
      const path = window.location.pathname;
      if (path === '/prueba' || path === '/prueba/') {
        setIsTestMode(true);
        setCurrentMenuData(menuPruebaData);
      } else {
        setIsTestMode(false);
        setCurrentMenuData(menuData);
      }
    };

    checkRoute();

    // Listen for route changes
    window.addEventListener('popstate', checkRoute);
    return () => window.removeEventListener('popstate', checkRoute);
  }, []);

  return (
    <div className="App">
      <MenuContainer menuData={currentMenuData} isTestMode={isTestMode} />
    </div>
  );
}

export default App;
