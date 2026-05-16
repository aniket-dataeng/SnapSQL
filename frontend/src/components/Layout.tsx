import React from 'react';
import { NavLink } from 'react-router-dom';
import { Flame, User, Search, Home } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-premium-bg flex flex-col">
      <main className="flex-grow pb-24 md:pt-12">
        {children}
      </main>
      
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-6 left-6 right-6 premium-card h-20 md:hidden flex items-center justify-around px-8 z-50">
        <NavLink to="/dashboard" className={({ isActive }) => `flex flex-col items-center p-2 transition-all ${isActive ? 'text-premium-violet scale-110' : 'text-premium-light-gray opacity-60'}`}>
          <Home size={28} />
          <span className="text-[10px] mt-1 font-black uppercase tracking-widest font-sans">Learn</span>
        </NavLink>
        <NavLink to="/swipe" className={({ isActive }) => `flex flex-col items-center p-2 transition-all ${isActive ? 'text-premium-violet scale-110' : 'text-premium-light-gray opacity-60'}`}>
          <Search size={28} />
          <span className="text-[10px] mt-1 font-black uppercase tracking-widest font-sans">Feed</span>
        </NavLink>
        <NavLink to="/practice" className={({ isActive }) => `flex flex-col items-center p-2 transition-all ${isActive ? 'text-premium-violet scale-110' : 'text-premium-light-gray opacity-60'}`}>
          <Flame size={28} />
          <span className="text-[10px] mt-1 font-black uppercase tracking-widest font-sans">Grind</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `flex flex-col items-center p-2 transition-all ${isActive ? 'text-premium-violet scale-110' : 'text-premium-light-gray opacity-60'}`}>
          <User size={28} />
          <span className="text-[10px] mt-1 font-black uppercase tracking-widest font-sans">You</span>
        </NavLink>
      </nav>
    </div>

  );
};
