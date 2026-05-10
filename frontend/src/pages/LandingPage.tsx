import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Flame, Star, Layout as LayoutIcon, Smartphone } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-dark-bg min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 flex flex-col items-center text-center">
        {/* Animated background blobs */}
        <div className="absolute top-0 -left-20 w-80 h-80 bg-brand-red opacity-10 blur-[100px] rounded-full" />
        <div className="absolute top-40 -right-20 w-80 h-80 bg-success-accent opacity-10 blur-[100px] rounded-full" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-8">
            <Flame className="text-brand-red" size={18} />
            <span className="text-sm font-medium">New Way to Master SQL</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Learn SQL Like <br />
            <span className="text-brand-red italic">Scrolling Reels</span>
          </h1>
          
          <p className="text-gray-accent text-lg md:text-xl max-w-2xl mb-10 mx-auto">
            Swipe through bite-sized SQL lessons, solve daily challenges, and level up your data skills in minutes a day.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/signup')}>
              Get Started for Free
            </Button>
            <Button size="lg" variant="secondary" onClick={() => navigate('/login')}>
              Log Into Account
            </Button>
          </div>
        </motion.div>

        {/* Floating Phone Mockup Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 50 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-20 relative w-full max-w-[300px] aspect-[9/19] glass rounded-[3rem] border-[8px] border-background-surface shadow-2xl p-4 overflow-hidden"
        >
          <div className="w-1/3 h-1.5 bg-dark-bg-surface rounded-full mx-auto mb-4" />
          <div className="space-y-4">
            <div className="w-full aspect-[4/5] rounded-2xl bg-brand-red bg-opacity-20 flex items-center justify-center border border-brand-red border-opacity-30">
               <span className="text-brand-red font-mono font-bold">SELECT * FROM goals</span>
            </div>
            <div className="h-4 w-3/4 bg-white bg-opacity-5 rounded-full" />
            <div className="h-4 w-1/2 bg-white bg-opacity-5 rounded-full" />
            <div className="h-12 w-full rounded-full bg-brand-red bg-opacity-10 border border-brand-red border-opacity-20" />
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-dark-bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Smartphone />, title: 'Swipe-to-Learn', desc: 'Addictive vertical feed of interactive SQL concepts.' },
              { icon: <Star />, title: 'Gamified XP', desc: 'Gain points, maintain streaks, and climb the leaderboard.' },
              { icon: <LayoutIcon />, title: 'Byte-sized', desc: 'Each lesson is designed to be completed in under 30 seconds.' }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 border border-white border-opacity-5 rounded-3xl hover:bg-white hover:bg-opacity-[0.02] transition-colors">
                <div className="w-16 h-16 rounded-2xl bg-brand-red bg-opacity-10 flex items-center justify-center text-brand-red mb-6">
                  {React.cloneElement(feature.icon as React.ReactElement<any>, { size: 32 })}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-accent leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
