import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
// No lucide-react icons used in LandingPage currently
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
        const apiUrl = import.meta.env.PROD ? '' : 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/test-drives`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(testDriveData),
        });
        const data = await response.json();
        sessionId = data.sessionId;
        login(testDriveData.name, testDriveData.username, true, sessionId, data.points || 0, data.streak || 0);
      } catch (err) {
        console.error('Failed to trace test drive user:', err);
        login(testDriveData.name, testDriveData.username, true, sessionId);
      }
      navigate('/dashboard');
    }
  };

  return (
    <div className="bg-premium-bg min-h-screen overflow-hidden py-12 px-6 lg:px-24">
      {/* Test Drive Modal */}
      {showTestDrive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-premium-dark/40 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-md premium-card p-10 relative"
          >
            <button 
              onClick={() => setShowTestDrive(false)}
              className="absolute top-6 right-6 text-premium-light-gray hover:text-premium-dark transition-colors font-bold text-xl"
            >
              ✕
            </button>
            <h2 className="text-4xl font-black mb-2 text-premium-dark leading-tight">Join the Quest 🚀</h2>
            <p className="text-premium-light-gray mb-8 font-hand text-2xl">Experience SnapSQL instantly. No account required.</p>
            
            <form onSubmit={handleTestDriveSubmit} className="space-y-6">
              <div>
                <label className="block text-lg font-bold mb-2 text-premium-dark">What's your name?</label>
                <input 
                  type="text" 
                  required
                  value={testDriveData.name}
                  onChange={(e) => setTestDriveData({ ...testDriveData, name: e.target.value })}
                  className="w-full bg-white border-2 border-premium-dark rounded-2xl px-5 py-4 focus:ring-4 focus:ring-premium-violet/20 focus:outline-none transition-all placeholder:text-gray-400"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-lg font-bold mb-2 text-premium-dark">Choose a username</label>
                <input 
                  type="text" 
                  required
                  value={testDriveData.username}
                  onChange={(e) => setTestDriveData({ ...testDriveData, username: e.target.value })}
                  className="w-full bg-white border-2 border-premium-dark rounded-2xl px-5 py-4 focus:ring-4 focus:ring-premium-violet/20 focus:outline-none transition-all placeholder:text-gray-400"
                  placeholder="e.g. sql_warrior"
                />
              </div>
              <Button type="submit" className="w-full mt-4" size="lg">Start My Journey</Button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Main Slide Content */}
      <section className="premium-slide min-h-[85vh] p-12 md:p-20 flex flex-col justify-between">
        <div className="absolute top-4 right-10 text-[180px] font-black text-premium-dark/5 leading-none select-none">
          01
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-16">
            <div className="premium-badge text-lg">Next-Gen SQL Learning</div>
            <div className="font-hand text-3xl text-premium-light-gray">Join 10,000+ Students</div>
          </div>

          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 bg-white border-2 border-premium-dark rounded-full px-6 py-2 mb-8 shadow-mini font-hand text-2xl"
            >
              🔥 Stop learning SQL the boring way
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-7xl md:text-[100px] font-black leading-[0.9] tracking-tighter text-premium-dark mb-8 uppercase">
                Master SQL Like <br />
                <span className="text-gradient italic">Scrolling Reels</span>
              </h1>

              <p className="font-hand text-4xl md:text-5xl text-premium-gray max-w-2xl leading-tight mb-12">
                Bite-sized challenges, real-time queries, and a community of SQL masters.
              </p>

              <div className="flex flex-wrap gap-6">
                <Button size="lg" onClick={() => navigate('/signup')}>
                  Start Learning Today
                </Button>
                <Button size="lg" variant="secondary" onClick={() => setShowTestDrive(true)}>
                  Take a Test Drive ⚡
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative z-10 flex flex-wrap justify-between items-end gap-6 pt-12">
          <div className="font-hand text-4xl font-bold text-premium-dark">
            @SnapSQL_App
          </div>
          <div className="flex gap-4">
             <div className="premium-mini-card p-6 min-w-[200px]">
                <h3 className="font-hand text-3xl mb-1 text-premium-dark">Daily Streaks</h3>
                <p className="font-hand text-xl text-premium-light-gray">Fuel your progress</p>
             </div>
             <div className="premium-mini-card p-6 min-w-[200px]">
                <h3 className="font-hand text-3xl mb-1 text-premium-dark">Real Data</h3>
                <p className="font-hand text-xl text-premium-light-gray">FAANG-level cases</p>
             </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 grid md:grid-cols-3 gap-8">
        {[
          { title: 'Why People Love It', desc: 'Visual lessons, zero setup, and intuitive explanations that stick.' },
          { title: 'Focus Areas', desc: 'From basic SELECTs to Advanced Window Functions and CTEs.' },
          { title: 'Interview Ready', desc: 'Practice with real-world scenarios used by top tech companies.' }
        ].map((feature, i) => (
          <div key={i} className="premium-mini-card p-10 flex flex-col justify-between min-h-[300px]">
            <h3 className="text-4xl font-black mb-4 text-premium-dark font-hand">{feature.title}</h3>
            <p className="text-2xl text-premium-light-gray font-hand leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </section>
    </div>

  );
};
