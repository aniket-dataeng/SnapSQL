import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Crown, Flame, Zap, Trophy } from 'lucide-react';
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
    <div className="h-screen bg-premium-bg flex flex-col overflow-hidden relative">
      {/* Pinned Top Section */}
      <div className="pt-8 px-6 md:px-12 shrink-0 bg-premium-bg z-10 w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/dashboard')}
              className="premium-mini-card p-3 hover:bg-premium-dark hover:text-white transition-all active:scale-90"
            >
              <ChevronLeft size={24} />
            </button>
            <div>
              <h1 className="text-4xl font-black text-premium-dark uppercase tracking-tight">Leaderboard</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 rounded-full bg-premium-violet animate-pulse" />
                <span className="text-[10px] font-black text-premium-light-gray uppercase tracking-[0.2em]">Live Arena</span>
              </div>
            </div>
          </div>
          <div className="premium-badge font-hand text-xl">Top SQL Warriors</div>
        </div>

        {/* Podium */}
        <div className="flex items-end justify-center gap-2 md:gap-6 mb-8 pt-4 max-w-2xl mx-auto relative">
          {/* 2nd Place */}
          <div className="flex flex-col items-center">
            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-white border-2 ${podium[0].username === user?.username ? 'border-premium-violet ring-8 ring-premium-violet/10' : 'border-premium-dark/10'} flex items-center justify-center text-3xl md:text-4xl font-black relative mb-4 transition-all z-10 shadow-mini`}>
              <div className="absolute -top-4 text-premium-gray opacity-40 font-black text-xs uppercase tracking-widest">II</div>
              {podium[0].name && !podium[0].id.startsWith('empty') ? podium[0].name.charAt(0).toUpperCase() : '?'}
            </div>
            <div className="h-32 w-24 md:w-32 premium-card rounded-b-none border-b-0 flex flex-col items-center justify-start pt-4 text-center relative overflow-hidden">
               <span className="font-black text-premium-light-gray text-3xl opacity-20">2</span>
               {podium[0].username && !podium[0].id.startsWith('empty') && (
                <div className="flex flex-col items-center w-full px-2 mt-auto pb-4">
                  <span className="text-[11px] font-black text-premium-dark truncate w-full uppercase tracking-tighter">@{podium[0].username}</span>
                  <div className="font-hand text-2xl font-bold text-premium-violet mt-1">
                    {podium[0].points.toLocaleString()} XP
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center">
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className={`w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white border-4 ${podium[1].username === user?.username ? 'border-premium-violet ring-12 ring-premium-violet/5' : 'border-premium-dark'} flex items-center justify-center text-4xl md:text-6xl font-black relative mb-4 shadow-card z-10 transition-all`}
            >
              <Crown className="absolute -top-8 text-premium-dark" size={48} />
              {podium[1].name && !podium[1].id.startsWith('empty') ? podium[1].name.charAt(0).toUpperCase() : '👑'}
            </motion.div>
            <div className="h-44 w-28 md:w-40 premium-card rounded-b-none border-b-0 flex flex-col items-center justify-start pt-4 text-center relative overflow-hidden bg-gradient-to-t from-premium-violet/5 to-transparent">
               <span className="font-black text-premium-dark text-5xl opacity-10">1</span>
               {podium[1].username && !podium[1].id.startsWith('empty') && (
                <div className="flex flex-col items-center w-full px-2 mt-auto pb-6">
                  <span className="text-[12px] font-black text-premium-dark truncate w-full uppercase tracking-tight">@{podium[1].username}</span>
                  <div className="font-hand text-3xl font-black text-premium-violet mt-1">
                    {podium[1].points.toLocaleString()} XP
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center">
            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-white border-2 ${podium[2].username === user?.username ? 'border-premium-violet ring-8 ring-premium-violet/10' : 'border-premium-dark/10'} flex items-center justify-center text-2xl md:text-3xl font-black relative mb-4 transition-all z-10 shadow-mini`}>
              <div className="absolute -top-4 text-premium-gray opacity-40 font-black text-xs uppercase tracking-widest">III</div>
              {podium[2].name && !podium[2].id.startsWith('empty') ? podium[2].name.charAt(0).toUpperCase() : '?'}
            </div>
            <div className="h-24 w-20 md:w-24 premium-card rounded-b-none border-b-0 flex flex-col items-center justify-start pt-3 text-center relative overflow-hidden">
               <span className="font-black text-premium-light-gray text-2xl opacity-20">3</span>
               {podium[2].username && !podium[2].id.startsWith('empty') && (
                <div className="flex flex-col items-center w-full px-2 mt-auto pb-3">
                  <span className="text-[10px] font-black text-premium-dark truncate w-full uppercase tracking-tighter">@{podium[2].username}</span>
                  <div className="font-hand text-xl font-bold text-premium-violet mt-1">
                    {podium[2].points.toLocaleString()} XP
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-premium-dark/5 max-w-2xl mx-auto" />
      </div>

      {/* Scrollable Rest of the Page */}
      <div className="flex-1 overflow-y-auto px-6 md:px-12 pb-32 scrollbar-hide">
        <div className="max-w-2xl mx-auto h-full space-y-8 mt-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 premium-card">
              <Zap className="text-premium-violet animate-bounce mb-6" size={48} />
              <p className="font-hand text-4xl text-premium-gray">Summoning Champions... ⚡</p>
            </div>
          ) : (
            <>
              {/* Stats Quick View */}
              <div className="grid grid-cols-3 gap-4">
                 <div className="premium-mini-card p-6 text-center">
                    <span className="block text-[10px] uppercase font-black text-premium-light-gray tracking-widest mb-1">Your Rank</span>
                    <span className="text-3xl font-black text-premium-violet tracking-tighter">#{userRank > 0 ? userRank : '--'}</span>
                 </div>
                 <div className="premium-mini-card p-6 text-center">
                    <span className="block text-[10px] uppercase font-black text-premium-light-gray tracking-widest mb-1">Total XP</span>
                    <span className="text-3xl font-black text-premium-dark tracking-tighter">{user?.points || 0}</span>
                 </div>
                 <div className="premium-mini-card p-6 text-center">
                    <span className="block text-[10px] uppercase font-black text-premium-light-gray tracking-widest mb-1">Max Streak</span>
                    <div className="flex items-center gap-1 justify-center">
                       <Flame size={24} className="text-premium-violet" />
                       <span className="text-3xl font-black text-premium-dark tracking-tighter">{user?.streak || 0}</span>
                    </div>
                 </div>
              </div>

              {/* Rankings List */}
              <div className="space-y-4 pb-12">
                <h3 className="text-sm font-black text-premium-dark uppercase tracking-[0.3em] pl-2">The Rankings</h3>
                {leaderboard.length === 0 ? (
                  <div className="premium-card py-20 flex flex-col items-center text-center p-10">
                    <Trophy className="opacity-10 mb-6" size={80} />
                    <h3 className="text-3xl font-black text-premium-dark uppercase">The Arena is Silent</h3>
                    <p className="font-hand text-3xl text-premium-gray mt-4">Be the first to claim your throne!</p>
                  </div>
                ) : (
                  leaderboard.slice(3).map((player, i) => {
                    const rank = i + 4;
                    const isUser = player.username === user?.username || player.id === user?.sessionId;
                    
                    return (
                      <motion.div
                        key={player.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`p-6 premium-card flex items-center gap-6 group hover:translate-x-2 transition-all active:scale-[0.98] ${isUser ? 'border-premium-violet bg-premium-violet/5' : ''}`}
                      >
                         <div className="w-12 shrink-0 flex flex-col items-center justify-center font-black">
                          <span className={`text-2xl tracking-tighter ${isUser ? 'text-premium-violet' : 'text-premium-dark'}`}>#{rank}</span>
                        </div>
                        <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center font-black text-2xl border-2 ${isUser ? 'bg-premium-violet text-white border-premium-violet' : 'bg-premium-bg text-premium-dark border-premium-dark'}`}>
                          {player.name ? player.name.charAt(0).toUpperCase() : '?'}
                        </div>
                        <div className="flex-grow min-w-0">
                          <p className="text-xl font-black text-premium-dark truncate uppercase tracking-tight flex items-center gap-2">
                             {player.name || 'Anonymous'}
                             {isUser && <span className="premium-tag text-[9px] bg-premium-violet text-white border-none">You</span>}
                          </p>
                          <div className="flex items-center gap-3">
                             <span className="font-hand text-2xl text-premium-light-gray truncate">@{player.username}</span>
                             {player.streak > 0 && (
                               <div className="flex items-center gap-1 text-premium-violet font-black text-sm">
                                  <Flame size={14} fill="currentColor" />
                                  <span>{player.streak}D</span>
                               </div>
                             )}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-2xl font-black text-premium-dark tracking-tighter">
                            {player.points.toLocaleString()} <span className="text-sm">XP</span>
                          </div>
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
