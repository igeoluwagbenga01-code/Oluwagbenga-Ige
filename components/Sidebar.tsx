
import React from 'react';
import { View } from '../types';
import { DashboardIcon } from './icons/DashboardIcon';
import { ProductsIcon } from './icons/ProductsIcon';
import { NewProjectIcon } from './icons/NewProjectIcon';
import { SubscriptionIcon } from './icons/SubscriptionIcon';
import { NAVIGATION_ITEMS } from '../constants';

// Populate navigation items here to avoid circular dependency issues
NAVIGATION_ITEMS.push(
    { name: 'Dashboard', view: View.DASHBOARD, icon: DashboardIcon },
    { name: 'Products', view: View.PRODUCTS, icon: ProductsIcon },
    { name: 'New Project', view: View.NEW_PROJECT, icon: NewProjectIcon },
    { name: 'Subscription', view: View.SUBSCRIPTION, icon: SubscriptionIcon }
);

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, onLogout }) => {
  return (
    <div className="w-64 bg-dark-card p-4 flex flex-col h-full border-r border-dark-border">
      <div className="text-2xl font-bold text-white mb-10 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-purple" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <span>AI Studio</span>
      </div>
      <nav className="flex-grow">
        <ul>
          {NAVIGATION_ITEMS.map((item) => (
            <li key={item.name} className="mb-2">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); setView(item.view); }}
                className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                  currentView === item.view
                    ? 'bg-brand-purple text-white'
                    : 'text-dark-text-secondary hover:bg-dark-border hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <button
          onClick={onLogout}
          className="w-full text-left flex items-center p-3 rounded-lg text-dark-text-secondary hover:bg-dark-border hover:text-white"
        >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
           </svg>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
