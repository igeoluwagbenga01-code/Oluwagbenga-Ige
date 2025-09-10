
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ProductGallery from './components/ProductGallery';
import NewProjectWizard from './components/NewProjectWizard';
import SubscriptionPage from './components/SubscriptionPage';
import Login from './components/Login';
import { View } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView(View.DASHBOARD);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const renderView = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard setView={setCurrentView} />;
      case View.PRODUCTS:
        return <ProductGallery setView={setCurrentView} />;
      case View.NEW_PROJECT:
        return <NewProjectWizard />;
      case View.SUBSCRIPTION:
        return <SubscriptionPage />;
      default:
        return <Dashboard setView={setCurrentView} />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-dark-bg text-dark-text">
      <Sidebar currentView={currentView} setView={setCurrentView} onLogout={handleLogout} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header currentView={currentView} />
        <div className="flex-1 overflow-y-auto">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
