import React from 'react';
import { NavLink } from 'react-router-dom';
import { Flame, User, Search, Home } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-dark-bg text-light-accent flex flex-col">
      <main className="flex-grow pb-20 md:pb-0">
        {children}
      </main>
      
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass h-16 md:hidden flex items-center justify-around px-4 z-50">
        <NavLink to="/dashboard" className={({ isActive }) => `flex flex-col items-center p-2 ${isActive ? 'text-brand-red' : 'text-gray-accent'}`}>
          <Home size={24} />
          <span className="text-[10px] mt-1">Home</span>
        </NavLink>
        <NavLink to="/swipe" className={({ isActive }) => `flex flex-col items-center p-2 ${isActive ? 'text-brand-red' : 'text-gray-accent'}`}>
          <Search size={24} />
          <span className="text-[10px] mt-1">Explore</span>
        </NavLink>
        <NavLink to="/practice" className={({ isActive }) => `flex flex-col items-center p-2 ${isActive ? 'text-brand-red' : 'text-gray-accent'}`}>
          <Flame size={24} />
          <span className="text-[10px] mt-1">Practice</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `flex flex-col items-center p-2 ${isActive ? 'text-brand-red' : 'text-gray-accent'}`}>
          <User size={24} />
          <span className="text-[10px] mt-1">Profile</span>
        </NavLink>
      </nav>
    </div>
  );
};
