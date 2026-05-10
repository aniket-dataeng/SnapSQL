import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Medal, ChevronLeft, Crown, Flame, Zap } from 'lucide-react';
import { useAuth } from '../store/AuthContext';

interface LeaderboardEntry {
  id: string;
  name: string;
  username: string;
  points: number;
  streak: number;
  session_start_time: string;
}

export const LeaderboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const apiUrl = import.meta.env.PROD ? '' : 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/test-drives/leaderboard`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setLeaderboard(data);
          } else {
            console.error('Leaderboard data is not an array:', data);
            setLeaderboard([]);
          }
        }
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
    
    // Live update every 10 seconds for real-time competitive feel
    const interval = setInterval(fetchLeaderboard, 10000);
    return () => clearInterval(interval);
  }, []);

  const userRank = leaderboard.findIndex(p => p.username === user?.username) + 1;
  
  const getTopThree = () => {
    const top = [...leaderboard].slice(0, 3);
    // Ensure we have 3 slots even if less users
    while (top.length < 3) {
      top.push({ id: `empty-${top.length}`, name: '---', username: '', points: 0, streak: 0, session_start_time: '' });
    }
    // Return in order [2nd, 1st, 3rd] for podium layout
    return [top[1], top[0], top[2]];
  };

  const podium = getTopThree();

  return (
    <div className="h-screen bg-dark-bg flex flex-col overflow-hidden relative">
      {/* Pinned Top Section */}
      <div className="pt-6 px-4 md:px-6 shrink-0 bg-dark-bg z-10 w-full shadow-md">
        {/* Header */}
        <div className="flex items-center gap-4 mb-2 max-w-lg mx-auto">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black">Leaderboard</h1>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-brand-red bg-opacity-10 border border-brand-red border-opacity-20 animate-pulse">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />
              <span className="text-[10px] font-black text-brand-red uppercase tracking-wider">Live</span>
            </div>
          </div>
        </div>

        {/* Podium */}
        <div className="flex items-end justify-center gap-2 md:gap-4 mb-4 pt-8 max-w-lg mx-auto relative">
          {/* 2nd Place */}
          <div className="flex flex-col items-center">
            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full bg-dark-bg-surface border-2 ${podium[0].username === user?.username ? 'border-brand-red ring-4 ring-brand-red ring-opacity-20' : 'border-slate-300'} flex items-center justify-center text-xl md:text-2xl relative mb-2 transition-all z-10`}>
              <Medal className="absolute -top-3 md:-top-4 text-slate-300" size={20} />
              {podium[0].name && !podium[0].id.startsWith('empty') ? podium[0].name.charAt(0).toUpperCase() : '?'}
              {podium[0].username === user?.username && <div className="absolute -bottom-1 bg-brand-red text-[8px] px-1 rounded-full text-white font-bold tracking-wider">YOU</div>}
            </div>
            <div className="h-28 w-[72px] md:w-20 bg-gradient-to-t from-slate-500/10 to-slate-400/30 rounded-t-xl flex flex-col items-center justify-start pt-2 border-t-2 border-slate-300 shadow-[0_-5px_15px_rgba(203,213,225,0.05)] text-center relative overflow-hidden">
              <span className="font-bold text-slate-300 drop-shadow-md">#2</span>
              {podium[0].username && !podium[0].id.startsWith('empty') && (
                <div className="flex flex-col items-center w-full px-1">
                  <span className="text-[9px] md:text-[10px] font-bold text-white truncate w-full">@{podium[0].username}</span>
                  <div className="flex items-center justify-center mt-1 w-full gap-0.5">
                    <span className="text-[10px] md:text-[11px] font-black text-slate-300 tracking-tight">{podium[0].points.toLocaleString()}</span>
                    <Zap size={8} className="text-yellow-400" />
                  </div>
                  {podium[0].streak > 0 && (
                    <div className="flex items-center text-[9px] text-brand-red font-bold mt-1 bg-black/20 px-1 py-0.5 rounded-full">
                      <Flame size={8} fill="currentColor" className="mr-0.5"/> {podium[0].streak}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center">
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-dark-bg-surface border-4 ${podium[1].username === user?.username ? 'border-brand-red ring-4 ring-brand-red ring-opacity-20' : 'border-yellow-400'} flex items-center justify-center text-2xl md:text-3xl relative mb-2 shadow-[0_0_20px_rgba(250,204,21,0.3)] z-10 transition-all`}
            >
              <Crown className="absolute -top-5 md:-top-6 text-yellow-400" size={28} />
              {podium[1].name && !podium[1].id.startsWith('empty') ? podium[1].name.charAt(0).toUpperCase() : '👑'}
              {podium[1].username === user?.username && <div className="absolute -bottom-2 bg-brand-red text-[10px] px-2 py-0.5 rounded-full text-white font-bold shadow-lg tracking-wider">YOU</div>}
            </motion.div>
            <div className="h-32 w-[84px] md:w-24 bg-gradient-to-t from-yellow-500/10 to-yellow-400/30 rounded-t-xl flex flex-col items-center justify-start pt-3 border-t-2 border-yellow-400 shadow-[0_-5px_15px_rgba(250,204,21,0.1)] text-center relative overflow-hidden">
              <span className="font-black text-yellow-400 text-lg drop-shadow-md">#1</span>
              {podium[1].username && !podium[1].id.startsWith('empty') && (
                <div className="flex flex-col items-center w-full px-1">
                  <span className="text-[10px] md:text-[11px] font-bold text-white truncate w-full">@{podium[1].username}</span>
                  <div className="flex items-center justify-center mt-1 w-full gap-0.5">
                    <span className="text-[11px] md:text-xs font-black text-yellow-400 tracking-tight">{podium[1].points.toLocaleString()}</span>
                    <Zap size={10} className="text-yellow-400" fill="currentColor" />
                  </div>
                  {podium[1].streak > 0 && (
                    <div className="flex items-center text-[10px] text-brand-red font-bold mt-1 bg-black/20 px-1.5 py-0.5 rounded-full">
                      <Flame size={10} fill="currentColor" className="mr-0.5"/> {podium[1].streak}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center">
            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-dark-bg-surface border-2 ${podium[2].username === user?.username ? 'border-brand-red ring-4 ring-brand-red ring-opacity-20' : 'border-amber-600'} flex items-center justify-center text-lg md:text-xl relative mb-2 transition-all z-10`}>
              <Medal className="absolute -top-3 text-amber-600" size={16} />
              {podium[2].name && !podium[2].id.startsWith('empty') ? podium[2].name.charAt(0).toUpperCase() : '?'}
              {podium[2].username === user?.username && <div className="absolute -bottom-1 bg-brand-red text-[8px] px-1 rounded-full text-white font-bold tracking-wider">YOU</div>}
            </div>
            <div className="h-24 w-[64px] md:w-[72px] bg-gradient-to-t from-amber-700/10 to-amber-700/30 rounded-t-xl flex flex-col items-center justify-start pt-2 border-t-2 border-amber-600 shadow-[0_-5px_15px_rgba(217,119,6,0.05)] text-center relative overflow-hidden">
              <span className="font-bold text-amber-600 drop-shadow-md">#3</span>
              {podium[2].username && !podium[2].id.startsWith('empty') && (
                <div className="flex flex-col items-center w-full px-1">
                  <span className="text-[8px] md:text-[9px] font-bold text-white truncate w-full">@{podium[2].username}</span>
                  <div className="flex items-center justify-center mt-1 w-full gap-0.5">
                    <span className="text-[9px] md:text-[10px] font-black text-amber-500 tracking-tight">{podium[2].points.toLocaleString()}</span>
                    <Zap size={8} className="text-yellow-400" />
                  </div>
                  {podium[2].streak > 0 && (
                    <div className="flex items-center text-[8px] text-brand-red font-bold mt-1 bg-black/20 px-1 py-0.5 rounded-full">
                      <Flame size={6} fill="currentColor" className="mr-0.5"/> {podium[2].streak}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-white bg-opacity-5 mb-2 max-w-lg mx-auto" />
      </div>

      {/* Scrollable Rest of the Page */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-24 scrollbar-hide">
        <div className="max-w-lg mx-auto h-full space-y-5 mt-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-dark-bg-surface rounded-3xl animate-pulse">
              <Zap className="text-brand-red animate-bounce mb-4" size={32} />
              <p className="text-gray-accent font-bold">Summoning Champions...</p>
            </div>
          ) : (
            <>
              {/* Stats Quick View */}
              <div className="glass p-4 rounded-3xl flex items-center justify-around border border-white border-opacity-5">
                <div className="text-center">
                  <span className="block text-[10px] uppercase text-gray-accent mb-1">Rank</span>
                  <span className="text-brand-red font-black text-xl">#{userRank > 0 ? userRank : '--'}</span>
                </div>
                <div className="h-8 w-px bg-white bg-opacity-10" />
                <div className="text-center">
                  <span className="block text-[10px] uppercase text-gray-accent mb-1">Points</span>
                  <span className="text-light-accent font-black text-xl">{user?.points || 0}</span>
                </div>
                <div className="h-8 w-px bg-white bg-opacity-10" />
                <div className="text-center">
                  <span className="block text-[10px] uppercase text-gray-accent mb-1">Streak</span>
                  <div className="flex items-center gap-1 justify-center">
                    <Flame size={20} className="text-brand-red" />
                    <span className="font-black text-xl">{user?.streak || 0}</span>
                  </div>
                </div>
              </div>

              {/* Rankings List containing ALL Users */}
              <div className="space-y-3 pb-8">
                <h3 className="text-xs font-black text-gray-accent uppercase tracking-wider pl-2 mb-2">All Participants</h3>
                {leaderboard.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 glass rounded-3xl text-center p-8">
                    <Crown className="text-gray-accent opacity-20 mb-4" size={48} />
                    <h3 className="text-lg font-bold mb-2 text-white">The Throne is Empty</h3>
                    <p className="text-gray-accent text-sm">Be the first to claim your spot!</p>
                  </div>
                ) : (
                  leaderboard.map((player, i) => {
                    const rank = i + 1;
                    const isUser = player.username === user?.username || player.id === user?.sessionId;
                    
                    return (
                      <motion.div
                        key={player.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`p-4 rounded-2xl flex items-center gap-3 md:gap-4 transition-all duration-500 ${isUser ? 'bg-brand-red bg-opacity-10 border border-brand-red border-opacity-30 ring-1 ring-brand-red ring-opacity-20 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'bg-dark-bg-surface border border-white border-opacity-5 hover:bg-opacity-80'}`}
                      >
                        <div className={`w-8 shrink-0 flex flex-col items-center justify-center font-black ${
                          rank === 1 ? 'text-yellow-400' : 
                          rank === 2 ? 'text-slate-300' : 
                          rank === 3 ? 'text-amber-600' : 
                          isUser ? 'text-brand-red' : 'text-gray-accent'
                        }`}>
                          {rank <= 3 && <Medal size={12} className="mb-0.5 opacity-80" />}
                          <span className="text-sm">{rank}</span>
                        </div>
                        <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-bold text-sm shadow-inner ${
                          rank === 1 ? 'bg-yellow-400 bg-opacity-20 text-yellow-500 border border-yellow-400 border-opacity-30' :
                          rank === 2 ? 'bg-slate-300 bg-opacity-20 text-slate-300 border border-slate-300 border-opacity-30' :
                          rank === 3 ? 'bg-amber-600 bg-opacity-20 text-amber-500 border border-amber-600 border-opacity-30' :
                          isUser ? 'bg-brand-red text-white' : 'bg-white bg-opacity-5 text-gray-accent'
                        }`}>
                          {player.name ? player.name.charAt(0).toUpperCase() : '?'}
                        </div>
                        <div className="flex-grow min-w-0">
                          <p className={`font-bold text-sm truncate flex items-center gap-2 ${isUser ? 'text-white' : 'text-light-accent'}`}>
                            {player.name || 'Anonymous'}
                            {isUser && <span className="shrink-0 text-[8px] bg-brand-red px-1.5 py-0.5 rounded text-white uppercase font-black">You</span>}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                             <span className="text-[10px] text-gray-accent font-mono truncate">@{player.username}</span>
                             {player.streak > 0 && (
                               <div className="shrink-0 flex items-center gap-0.5 text-[10px] text-brand-red font-bold bg-brand-red bg-opacity-10 px-1.5 rounded-sm">
                                 <Flame size={10} fill="currentColor" />
                                 <span>{player.streak}</span>
                               </div>
                             )}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="flex items-center gap-0.5 justify-end">
                            <span className="font-black text-sm text-white">{player.points.toLocaleString()}</span>
                            <Zap size={10} className="text-yellow-400" fill="currentColor" />
                          </div>
                          <span className="block text-[8px] uppercase text-gray-accent font-bold tracking-tight mt-0.5">Points</span>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
