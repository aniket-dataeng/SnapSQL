import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Bell, LogOut, ChevronLeft, ShieldCheck, Flame } from 'lucide-react';
import { Button } from '../components/Button';
import { useAuth } from '../store/AuthContext';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const userName = user?.name || 'Guest';
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
    <div className="min-h-screen bg-premium-bg p-6 pb-24 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-6 mb-12">
        <button 
          onClick={() => navigate('/dashboard')}
          className="premium-mini-card p-3 hover:bg-premium-dark hover:text-white transition-all active:scale-90"
        >
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="text-4xl font-black text-premium-dark uppercase tracking-tight">Account</h1>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 rounded-full bg-premium-violet" />
            <span className="text-[10px] font-black text-premium-light-gray uppercase tracking-[0.2em]">SnapSQL Elite</span>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="premium-card p-10 mb-10 flex flex-col items-center text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4">
           <div className="premium-badge font-hand text-lg rotate-3">Pro Member</div>
        </div>
        
        <div className="w-32 h-32 rounded-3xl bg-white border-4 border-premium-dark flex items-center justify-center text-premium-dark text-6xl font-black mb-6 shadow-card group overflow-hidden relative">
          <div className="absolute inset-0 bg-premium-violet opacity-0 group-hover:opacity-10 transition-opacity" />
          <span className="relative z-10">{userName.charAt(0).toUpperCase()}</span>
        </div>
        
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-3xl font-black text-premium-dark uppercase tracking-tighter">{userName}</h2>
          {user?.isTestDrive && (
            <span className="premium-tag bg-premium-violet/10 text-premium-violet border-none mt-2">TEST DRIVE SESSION</span>
          )}
        </div>
        <p className="font-hand text-3xl text-premium-gray mb-8">Level 12 • SQLite Master ⚡</p>
        
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="premium-mini-card p-6 flex flex-col items-center group hover:bg-premium-dark hover:text-white transition-colors">
            <span className="text-3xl font-black tracking-tighter group-hover:text-white">{(user?.points || 0).toLocaleString()}</span>
            <span className="text-[10px] uppercase font-black tracking-widest text-premium-light-gray">Total Points</span>
          </div>
          <div className="premium-mini-card p-6 flex flex-col items-center group hover:bg-premium-dark hover:text-white transition-colors">
            <div className="flex items-center gap-1 group-hover:text-white">
              <Flame size={24} className="text-premium-violet group-hover:text-white" />
              <span className="text-3xl font-black tracking-tighter">{user?.streak || 0}</span>
            </div>
            <span className="text-[10px] uppercase font-black tracking-widest text-premium-light-gray">Day Streak</span>
          </div>
        </div>
      </motion.div>

      {/* Settings List */}
      <div className="flex flex-col gap-6">
        <h3 className="text-sm font-black uppercase tracking-[0.3em] text-premium-dark px-2">Secure Vault</h3>
        <div className="grid gap-4">
          {settings.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="premium-card p-6 flex items-center justify-between group hover:translate-x-2 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-6">
                <div className="p-3 bg-premium-bg rounded-2xl text-premium-dark group-hover:bg-premium-dark group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-premium-light-gray mb-1">{item.label}</p>
                  <p className="font-black text-xl text-premium-dark tracking-tight">{item.value}</p>
                </div>
              </div>
              <div className="font-hand text-2xl text-premium-violet opacity-0 group-hover:opacity-100 transition-opacity">Edit →</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-16 flex flex-col gap-6">
        <Button 
          variant="secondary" 
          className="w-full h-16 text-2xl"
          onClick={handleLogout}
        >
          <LogOut size={24} className="mr-3" />
          Terminate Session
        </Button>
        <div className="flex flex-col items-center gap-2 opacity-30">
          <p className="text-[10px] text-premium-dark font-black uppercase tracking-[0.4em]">
            SnapSQL Protocol v1.0.0
          </p>
          <div className="w-12 h-0.5 bg-premium-dark" />
        </div>
      </div>
    </div>
  );
};
