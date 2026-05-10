import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Flame, Star, Layout as LayoutIcon, Smartphone, Play } from 'lucide-react';
import { useAuth } from '../store/AuthContext';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showTestDrive, setShowTestDrive] = React.useState(false);
  const [testDriveData, setTestDriveData] = React.useState({ name: '', username: '' });

  const handleTestDriveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (testDriveData.name && testDriveData.username) {
      let sessionId: string | undefined;
      try {
        const response = await fetch('http://localhost:5000/api/test-drives', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(testDriveData),
        });
        const data = await response.json();
        sessionId = data.sessionId;
      } catch (err) {
        console.error('Failed to trace test drive user:', err);
      }
      login(testDriveData.name, testDriveData.username, true, sessionId);
      navigate('/dashboard');
    }
  };

  return (
    <div className="bg-dark-bg min-h-screen overflow-hidden">
      {/* Test Drive Modal */}
      {showTestDrive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black bg-opacity-60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-md glass p-8 rounded-[2.5rem] shadow-2xl relative"
          >
            <button 
              onClick={() => setShowTestDrive(false)}
              className="absolute top-6 right-6 text-gray-accent hover:text-white transition-colors"
            >
              ✕
            </button>
            <h2 className="text-3xl font-bold mb-2">Test Drive</h2>
            <p className="text-gray-accent mb-8 text-sm">Experience SnapSQL instantly. No account required.</p>
            
            <form onSubmit={handleTestDriveSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-accent">What's your name?</label>
                <input 
                  type="text" 
                  required
                  value={testDriveData.name}
                  onChange={(e) => setTestDriveData({ ...testDriveData, name: e.target.value })}
                  className="w-full bg-dark-bg-surface border border-white border-opacity-10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-brand-red focus:outline-none transition-all"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-accent">Choose a username</label>
                <input 
                  type="text" 
                  required
                  value={testDriveData.username}
                  onChange={(e) => setTestDriveData({ ...testDriveData, username: e.target.value })}
                  className="w-full bg-dark-bg-surface border border-white border-opacity-10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-brand-red focus:outline-none transition-all"
                  placeholder="e.g. sql_master"
                />
              </div>
              <Button type="submit" className="w-full" size="lg">Jump In</Button>
            </form>
          </motion.div>
        </div>
      )}

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
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => setShowTestDrive(true)}
              className="group"
            >
              <Play size={18} className="mr-2 fill-current group-hover:animate-pulse" />
              Take a Test Drive
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
