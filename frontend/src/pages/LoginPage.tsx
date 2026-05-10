import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Flame } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('user_token', 'mock_token_' + Date.now());
    localStorage.setItem('user_name', email.split('@')[0]);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass p-10 rounded-[2.5rem] shadow-2xl border border-white border-opacity-5"
      >
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-brand-red flex items-center justify-center shadow-glow">
            <Flame className="text-white" size={32} />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
        <p className="text-gray-accent text-center mb-10">Sign in to continue your SQL streak.</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-accent">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-dark-bg-surface border border-white border-opacity-10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-brand-red focus:outline-none transition-all"
              placeholder="alex@hacker.io"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-accent">Password</label>
            <input 
              type="password" 
              className="w-full bg-dark-bg-surface border border-white border-opacity-10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-brand-red focus:outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full" size="lg">Log In</Button>
        </form>
        
        <p className="text-center mt-8 text-gray-accent">
          Don't have an account? <button onClick={() => navigate('/signup')} className="text-brand-red font-bold">Sign Up</button>
        </p>
      </motion.div>
    </div>
  );
};

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('user_token', 'mock_token_' + Date.now());
    localStorage.setItem('user_name', email.split('@')[0]);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass p-10 rounded-[2.5rem] shadow-2xl border border-white border-opacity-5"
      >
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-brand-red flex items-center justify-center shadow-glow">
            <Flame className="text-white" size={32} />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-2">Join SnapSQL</h2>
        <p className="text-gray-accent text-center mb-10">Start your journey to SQL mastery today.</p>
        
        <form onSubmit={handleSignup} className="space-y-6">
           <div>
            <label className="block text-sm font-medium mb-2 text-gray-accent">Full Name</label>
            <input 
              type="text" 
              className="w-full bg-dark-bg-surface border border-white border-opacity-10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-brand-red focus:outline-none transition-all"
              placeholder="Alex Smith"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-accent">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-dark-bg-surface border border-white border-opacity-10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-brand-red focus:outline-none transition-all"
              placeholder="alex@hacker.io"
            />
          </div>
          <Button type="submit" className="w-full" size="lg">Create Account</Button>
        </form>
        
        <p className="text-center mt-8 text-gray-accent">
          Already have an account? <button onClick={() => navigate('/login')} className="text-brand-red font-bold">Log In</button>
        </p>
      </motion.div>
    </div>
  );
};
