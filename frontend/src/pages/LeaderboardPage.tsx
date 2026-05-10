import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Medal, ChevronLeft, Crown, ArrowUp, Zap } from 'lucide-react';

const RANKINGS = [
  { rank: 1, name: 'SQL_God', xp: 12500, avatar: '👑' },
  { rank: 2, name: 'DataWizard', xp: 10200, avatar: '🧙' },
  { rank: 3, name: 'JoinMaster', xp: 9800, avatar: '⚡' },
  { rank: 4, name: 'You (Aniket)', xp: 2450, avatar: 'A', isUser: true },
  { rank: 5, name: 'QueryQueen', xp: 2300, avatar: '💅' },
  { rank: 6, name: 'SelectStar', xp: 1900, avatar: '⭐' },
  { rank: 7, name: 'IndexInator', xp: 1500, avatar: '⚙️' },
];

export const LeaderboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark-bg p-6 pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <button 
          onClick={() => navigate('/dashboard')}
          className="p-2 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-black">Leaderboard</h1>
      </div>

      {/* Podium */}
      <div className="flex items-end justify-center gap-4 mb-20 pt-10">
        {/* 2nd Place */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-dark-bg-surface border-2 border-slate-300 flex items-center justify-center text-2xl relative mb-2">
            <Medal className="absolute -top-4 text-slate-300" size={24} />
            {RANKINGS[1].avatar}
          </div>
          <div className="h-20 w-16 bg-slate-400 bg-opacity-20 rounded-t-xl flex flex-col items-center justify-center">
            <span className="font-bold text-slate-300">#2</span>
          </div>
        </div>

        {/* 1st Place */}
        <div className="flex flex-col items-center">
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-20 h-20 rounded-full bg-dark-bg-surface border-4 border-yellow-400 flex items-center justify-center text-3xl relative mb-2 shadow-[0_0_20px_rgba(250,204,21,0.3)]"
          >
            <Crown className="absolute -top-6 text-yellow-400" size={32} />
            {RANKINGS[0].avatar}
          </motion.div>
          <div className="h-28 w-20 bg-yellow-400 bg-opacity-20 rounded-t-xl flex flex-col items-center justify-center border-t-2 border-yellow-400">
            <span className="font-black text-yellow-400">#1</span>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-dark-bg-surface border-2 border-amber-600 flex items-center justify-center text-xl relative mb-2">
            <Medal className="absolute -top-3 text-amber-600" size={20} />
            {RANKINGS[2].avatar}
          </div>
          <div className="h-16 w-14 bg-amber-700 bg-opacity-20 rounded-t-xl flex flex-col items-center justify-center">
            <span className="font-bold text-amber-600">#3</span>
          </div>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="glass p-4 rounded-3xl mb-8 flex items-center justify-around">
        <div className="text-center">
          <span className="block text-[10px] uppercase text-gray-accent mb-1">Rank</span>
          <span className="text-brand-red font-black text-xl">#4</span>
        </div>
        <div className="h-8 w-px bg-white bg-opacity-10" />
        <div className="text-center">
          <span className="block text-[10px] uppercase text-gray-accent mb-1">XP Today</span>
          <span className="text-light-accent font-black text-xl">+450</span>
        </div>
        <div className="h-8 w-px bg-white bg-opacity-10" />
        <div className="text-center">
          <span className="block text-[10px] uppercase text-gray-accent mb-1">Tier</span>
          <Zap size={20} className="text-yellow-400 mx-auto" />
        </div>
      </div>

      {/* Rankings List */}
      <div className="space-y-3">
        {RANKINGS.slice(3).map((player, i) => (
          <motion.div
            key={player.rank}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-4 rounded-2xl flex items-center gap-4 transition-all ${player.isUser ? 'bg-brand-red bg-opacity-20 border border-brand-red border-opacity-30' : 'bg-dark-bg-surface border border-white border-opacity-5'}`}
          >
            <span className={`w-6 font-black text-sm ${player.isUser ? 'text-brand-red' : 'text-gray-accent'}`}>
              {player.rank}
            </span>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${player.isUser ? 'bg-brand-red text-white' : 'bg-white bg-opacity-5'}`}>
              {player.avatar}
            </div>
            <div className="flex-grow">
              <p className={`font-bold text-sm ${player.isUser ? 'text-white' : ''}`}>
                {player.name}
              </p>
              <div className="flex items-center gap-1 text-[10px] text-gray-accent">
                <ArrowUp size={8} className="text-green-400" />
                <span>2 spots today</span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-black text-sm">{player.xp.toLocaleString()}</span>
              <span className="block text-[8px] uppercase text-gray-accent">XP</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
