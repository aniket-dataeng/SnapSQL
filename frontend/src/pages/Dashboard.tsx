import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Flame, Trophy, Target, Zap, ChevronRight, Crown } from 'lucide-react';
import { useAuth } from '../store/AuthContext';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [rank, setRank] = React.useState<number | string>('?');
  const userName = user?.name || 'Scholar';

  const [courses, setCourses] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchRank = async () => {
      if (user?.isTestDrive && user?.sessionId) {
        try {
          const apiUrl = import.meta.env.PROD ? '' : 'http://localhost:5000';
          const response = await fetch(`${apiUrl}/api/test-drives/leaderboard`);
          if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data)) {
              const userRank = data.findIndex((p: any) => p.username === user.username) + 1;
              setRank(userRank > 0 ? `#${userRank}` : '#50+');
            }
          }
        } catch (err) {
          console.error('Failed to fetch rank:', err);
        }
      }
    };

    const fetchCourses = async () => {
      try {
        const apiUrl = import.meta.env.PROD ? '' : 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/courses`);
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        }
      } catch (err) {
        console.error('Failed to fetch courses:', err);
      }
    };

    fetchRank();
    fetchCourses();
  }, [user?.username, user?.isTestDrive, user?.sessionId]);

  const hasCourses = user?.courses_enrolled && user.courses_enrolled.length > 0;
  
  const getIconForCategory = (category: string) => {
    switch (category) {
      case 'Fundamentals': return <Target className="text-blue-400" />;
      case 'Querying': return <Flame className="text-orange-400" />;
      case 'Architecture': return <Trophy className="text-purple-400" />;
      default: return <Zap className="text-yellow-400" />;
    }
  };

  const handleEnroll = async (courseId: string) => {
    // Dummy enroll action: here we assume the backend will implement an enroll endpoint.
    // For now we'll just redirect to the swipe page or optimistic update.
    console.log(`Enrolling in ${courseId}`);
    navigate('/swipe');
  };

  return (
    <div className="max-w-2xl mx-auto px-6 pt-12 pb-32">
      {/* Header / Profile */}
      <div className="flex items-center justify-between mb-16">
        <div>
          <h1 className="text-5xl font-black text-premium-dark uppercase tracking-tight">Hey, {userName.split(' ')[0]}!</h1>
          <p className="font-hand text-3xl text-premium-gray mt-2">Ready to master some data today? 🚀</p>
        </div>
        <div 
          onClick={() => navigate('/profile')}
          className="w-16 h-16 rounded-full border-2 border-premium-dark p-1 cursor-pointer hover:scale-110 transition-all shadow-mini active:scale-95"
        >
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-premium-dark font-black text-2xl">
            {userName.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-16">
        <div className="premium-mini-card p-6 flex flex-col items-center text-center">
          <Flame className="text-premium-violet mb-3" size={32} />
          <span className="text-3xl font-black tracking-tight text-premium-dark">{user?.streak || 0}</span>
          <span className="text-[10px] text-premium-light-gray uppercase tracking-[0.2em] font-black mt-1">Streak</span>
        </div>
        <div className="premium-mini-card p-6 flex flex-col items-center text-center">
          <Trophy className="text-premium-indigo mb-3" size={32} />
          <span className="text-3xl font-black tracking-tight text-premium-dark">{(user?.points || 0).toLocaleString()}</span>
          <span className="text-[10px] text-premium-light-gray uppercase tracking-[0.2em] font-black mt-1">XP</span>
        </div>
        <div 
          onClick={() => navigate('/leaderboard')}
          className="premium-mini-card p-6 flex flex-col items-center text-center cursor-pointer hover:bg-premium-dark hover:text-white transition-all group active:scale-95"
        >
          <Crown className="text-premium-purple mb-3 group-hover:scale-110 transition-transform" size={32} />
          <span className="text-3xl font-black tracking-tight">{rank}</span>
          <span className="text-[10px] opacity-60 uppercase tracking-[0.2em] font-black mt-1">Rank</span>
        </div>
      </div>

      {!hasCourses ? (
        // Empty State: Explore Courses
        <div className="mb-16">
          <h2 className="text-3xl font-black mb-8 text-premium-dark uppercase tracking-tight flex items-center gap-4">
            Hot Right Now <div className="w-4 h-4 rounded-full bg-premium-violet animate-pulse" />
          </h2>
          
          <div className="space-y-8">
            {courses.slice(0, 3).map((course) => (
              <div key={course.course_id} className="premium-card p-10 group hover:translate-y-[-4px] transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 font-hand text-2xl text-premium-violet opacity-40">
                  #{course.category}
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-black mb-2 text-premium-dark">{course.title}</h3>
                  <p className="font-hand text-2xl text-premium-gray mb-8 leading-snug">{course.description}</p>
                  
                  <div className="flex gap-3 mb-8">
                    <span className="premium-tag">{course.difficulty}</span>
                    <span className="premium-tag bg-premium-dark text-white border-none">{course.estimated_duration}</span>
                  </div>
                  
                  <div className="flex gap-4">
                    <button onClick={() => handleEnroll(course.course_id)} className="flex-1 bg-premium-dark text-white font-hand text-2xl py-4 rounded-2xl shadow-mini hover:shadow-card transition-all active:scale-95">
                      Join Course
                    </button>
                    <button onClick={() => navigate('/swipe')} className="flex-1 bg-white border-2 border-premium-dark text-premium-dark font-hand text-2xl py-4 rounded-2xl shadow-mini hover:shadow-card transition-all active:scale-95">
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {courses.length === 0 && (
              <div className="text-center p-12 premium-mini-card">
                <p className="font-hand text-3xl text-premium-gray animate-bounce">Summoning courses... 🧙‍♂️</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Has Courses: Shows Progress
        <>
          <div className="mb-16">
            <h2 className="text-3xl font-black mb-8 text-premium-dark uppercase tracking-tight flex items-center gap-4">
              Your Grind <div className="w-4 h-4 rounded-full bg-premium-violet animate-pulse" />
            </h2>
            <div className="space-y-6">
              {user?.courses_enrolled.map((courseId, i) => {
                const course = courses.find(c => c.course_id === courseId) || { title: `Course ${courseId}`, progress: 25 + (i * 20), category: 'Fundamentals' };
                const progressNum = course.progress || (25 + (i * 15));
                return (
                  <div key={courseId} className="premium-card p-6 flex items-center gap-6 cursor-pointer hover:bg-white transition-all active:scale-[0.98]" onClick={() => navigate('/swipe')}>
                    <div className="w-16 h-16 rounded-[1.5rem] bg-premium-bg border-2 border-premium-dark flex items-center justify-center">
                      {getIconForCategory(course.category)}
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-xl font-black text-premium-dark">{course.title}</h4>
                      <div className="w-full h-3 bg-premium-bg border border-premium-dark/10 rounded-full mt-3 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${progressNum}%` }}
                          className="h-full bg-premium-violet shadow-mini"
                        />
                      </div>
                    </div>
                    <div className="font-hand text-3xl font-black text-premium-dark">
                      {progressNum}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
             <h2 className="text-3xl font-black mb-8 text-premium-dark uppercase tracking-tight">Level Up</h2>
             <div className="space-y-4">
               {courses.filter(c => !user?.courses_enrolled?.includes(c.course_id)).slice(0, 2).map((course) => (
                 <div key={course.course_id} className="premium-mini-card p-6 flex items-center justify-between group cursor-pointer active:scale-95 transition-all" onClick={() => handleEnroll(course.course_id)}>
                   <div className="flex gap-5 items-center">
                     <div className="w-12 h-12 rounded-2xl bg-premium-bg border-2 border-premium-dark flex items-center justify-center">
                       {getIconForCategory(course.category)}
                     </div>
                     <div>
                       <h4 className="text-xl font-black text-premium-dark leading-none">{course.title}</h4>
                       <p className="font-hand text-xl text-premium-light-gray mt-1">{course.difficulty} • {course.estimated_duration}</p>
                     </div>
                   </div>
                   <div className="bg-premium-dark text-white w-10 h-10 flex items-center justify-center rounded-xl group-hover:translate-x-2 transition-transform">
                     <ChevronRight size={20} />
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </>
      )}
    </div>

  );
};
