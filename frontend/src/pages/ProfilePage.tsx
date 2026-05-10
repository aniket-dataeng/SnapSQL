import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Bell, LogOut, ChevronLeft, ShieldCheck } from 'lucide-react';
import { Button } from '../components/Button';
import { useAuth } from '../store/AuthContext';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const userName = user?.name || localStorage.getItem('user_name') || 'Guest';
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const settings = [
    { icon: <Mail size={20} />, label: 'Email', value: user?.isTestDrive ? 'test_drive@snapsql.io' : 'aniket@example.com' },
    { icon: <Lock size={20} />, label: 'Password', value: '••••••••' },
    { icon: <Bell size={20} />, label: 'Notifications', value: 'Enabled' },
    { icon: <ShieldCheck size={20} />, label: 'Account Privacy', value: 'Public' },
  ];

  return (
    <div className="min-h-screen bg-dark-bg p-6 pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/dashboard')}
          className="p-2 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-black">My Profile</h1>
      </div>

      {/* Profile Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-8 mb-8 flex flex-col items-center text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-brand-red" />
        
        <div className="w-24 h-24 rounded-full bg-brand-red flex items-center justify-center text-white text-4xl font-black mb-4 shadow-glow">
          {userName.charAt(0).toUpperCase()}
        </div>
        
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-1">{userName}</h2>
          {user?.isTestDrive && (
            <span className="px-2 py-0.5 bg-white bg-opacity-10 rounded-full text-[10px] text-brand-red font-bold mb-1">TEST SESSION</span>
          )}
        </div>
        <p className="text-gray-accent text-sm mb-6">Level 12 • SQLite Master</p>
        
        <div className="flex gap-4 w-full">
          <div className="flex-1 bg-white bg-opacity-5 rounded-2xl p-4">
            <span className="block text-brand-red font-black text-xl">1.2k</span>
            <span className="text-[10px] uppercase tracking-widest text-gray-accent">XP</span>
          </div>
          <div className="flex-1 bg-white bg-opacity-5 rounded-2xl p-4">
            <span className="block text-brand-red font-black text-xl">15</span>
            <span className="text-[10px] uppercase tracking-widest text-gray-accent">Streak</span>
          </div>
        </div>
      </motion.div>

      {/* Settings List */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-accent px-2">Account Settings</h3>
        {settings.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-dark-bg-surface border border-white border-opacity-5 rounded-2xl p-5 flex items-center justify-between group hover:border-brand-red hover:border-opacity-30 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="text-brand-red group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div>
                <p className="text-xs text-gray-accent mb-0.5">{item.label}</p>
                <p className="font-bold text-sm">{item.value}</p>
              </div>
            </div>
            <div className="text-gray-accent text-xs">Edit</div>
          </motion.div>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-12 flex flex-col gap-4">
        <Button 
          variant="outline" 
          className="w-full justify-start gap-3 border-white border-opacity-10 text-light-accent hover:bg-white hover:bg-opacity-5"
          onClick={handleLogout}
        >
          <LogOut size={20} className="text-gray-accent" />
          Logout
        </Button>
        <p className="text-center text-[10px] text-gray-accent opacity-50 uppercase tracking-[0.3em]">
          SnapSQL v1.0.0
        </p>
      </div>
    </div>
  );
};
