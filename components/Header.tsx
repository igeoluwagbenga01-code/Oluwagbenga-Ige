
import React from 'react';
import { View } from '../types';

interface HeaderProps {
  currentView: View;
}

const viewTitles: Record<View, string> = {
  [View.DASHBOARD]: 'Dashboard',
  [View.PRODUCTS]: 'My Products',
  [View.NEW_PROJECT]: 'Create New Marketing Visual',
  [View.SUBSCRIPTION]: 'Subscription Plans',
};

const Header: React.FC<HeaderProps> = ({ currentView }) => {
  return (
    <header className="bg-dark-card p-4 flex justify-between items-center border-b border-dark-border">
      <h1 className="text-xl font-bold text-white">{viewTitles[currentView]}</h1>
      <div className="flex items-center gap-4">
        <button className="text-dark-text-secondary hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <img src="https://picsum.photos/seed/user/40/40" alt="User" className="w-8 h-8 rounded-full" />
          <span className="text-white">Jane Doe</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
