import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Flame, Trophy, Target, Zap, ChevronRight, Crown } from 'lucide-react';
import { useAuth } from '../store/AuthContext';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userName = user?.name || localStorage.getItem('user_name') || 'Scholar';

  const topics = [
    { id: 'basics', title: 'SQL Basics', progress: 80, icon: <Target className="text-blue-400" /> },
    { id: 'filtering', title: 'Filtering Data', progress: 45, icon: <Flame className="text-orange-400" /> },
    { id: 'joins', title: 'Table Joins', progress: 10, icon: <Zap className="text-yellow-400" /> },
    { id: 'aggregation', title: 'Aggregation', progress: 0, icon: <Trophy className="text-purple-400" /> },
  ];

  return (
    <div className="max-w-md mx-auto px-6 pt-12 pb-24">
      {/* Header / Profile */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold">Hey, {userName.charAt(0).toUpperCase() + userName.slice(1)}!</h1>
          <p className="text-gray-accent text-sm">You're doing great today.</p>
        </div>
        <div 
          onClick={() => navigate('/profile')}
          className="w-12 h-12 rounded-full border-2 border-brand-red p-0.5 cursor-pointer hover:scale-105 transition-transform"
        >
          <div className="w-full h-full rounded-full bg-dark-bg-surface flex items-center justify-center text-brand-red font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3 mb-10">
        <div className="glass p-4 rounded-3xl flex flex-col items-center text-center">
          <Flame className="text-brand-red mb-2" size={24} />
          <span className="text-lg font-black tracking-tight">12</span>
          <span className="text-[8px] text-gray-accent uppercase tracking-widest">Streak</span>
        </div>
        <div className="glass p-4 rounded-3xl flex flex-col items-center text-center">
          <Trophy className="text-yellow-400 mb-2" size={24} />
          <span className="text-lg font-black tracking-tight">2.4k</span>
          <span className="text-[8px] text-gray-accent uppercase tracking-widest">XP</span>
        </div>
        <div 
          onClick={() => navigate('/leaderboard')}
          className="glass p-4 rounded-3xl flex flex-col items-center text-center cursor-pointer hover:border-brand-red hover:border-opacity-30 transition-all active:scale-95 group"
        >
          <Crown className="text-purple-400 mb-2 group-hover:scale-110 transition-transform" size={24} />
          <span className="text-lg font-black tracking-tight text-brand-red">#4</span>
          <span className="text-[8px] text-gray-accent uppercase tracking-widest">Rank</span>
        </div>
      </div>

      {/* Recommended/Continue */}
      <div className="mb-10">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          Keep Going <div className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
        </h2>
        <div 
          onClick={() => navigate('/swipe')}
          className="relative overflow-hidden bg-brand-red p-6 rounded-3xl cursor-pointer shadow-glow transform transition-all active:scale-95"
        >
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-1">SQL Joins Deep Dive</h3>
            <p className="text-white text-opacity-80 text-sm mb-4">Learn about INNER and LEFT JOINS</p>
            <div className="flex items-center justify-between">
               <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Lesson 4/12</span>
               <div className="flex items-center gap-1 font-bold">Continue <ChevronRight size={16} /></div>
            </div>
          </div>
          <Zap className="absolute -right-4 -bottom-4 text-white opacity-10" size={120} />
        </div>
      </div>

      {/* Topics List */}
      <div>
        <h2 className="text-lg font-bold mb-4">Your Courses</h2>
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="glass p-4 rounded-3xl flex items-center gap-4 border-white border-opacity-5 hover:border-brand-red transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-white bg-opacity-5 flex items-center justify-center">
                {topic.icon}
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-sm">{topic.title}</h4>
                <div className="w-full h-1.5 bg-dark-bg-surface rounded-full mt-2 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${topic.progress}%` }}
                    className="h-full bg-brand-red shadow-glow"
                  />
                </div>
              </div>
              <div className="text-xs font-bold text-gray-accent">
                {topic.progress}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
