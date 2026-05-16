import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, ChevronUp } from 'lucide-react';

const LESSONS = [
  {
    id: 1,
    title: 'The SELECT Statement',
    content: 'SELECT is the foundation of SQL. It tells the database which columns you want to see.',
    example: 'SELECT first_name, last_name FROM employees;',
    color: 'bg-brand-red'
  },
  {
    id: 2,
    title: 'Filtering with WHERE',
    content: 'The WHERE clause allows you to filter rows based on specific conditions.',
    example: "SELECT * FROM products WHERE price > 100;",
    color: 'bg-blue-600'
  },
  {
    id: 3,
    title: 'Table Joins',
    content: 'JOINs allow you to combine data from multiple tables based on a related column.',
    example: 'SELECT * FROM orders JOIN users ON orders.user_id = users.id;',
    color: 'bg-emerald-600'
  }
];

export const SwipePage: React.FC = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    const nextIndex = index + newDirection;
    if (nextIndex >= 0 && nextIndex < LESSONS.length) {
      setDirection(newDirection);
      setIndex(nextIndex);
    } else if (nextIndex >= LESSONS.length) {
       navigate('/practice');
    }
  };

  return (
    <div className="h-screen w-full bg-premium-bg overflow-hidden relative font-sans">
      {/* Top Header */}
      <div className="absolute top-0 left-0 right-0 z-40 p-10 flex items-center justify-between">
         <button 
           onClick={() => navigate('/dashboard')} 
           className="premium-mini-card p-3 hover:bg-premium-dark hover:text-white transition-all group active:scale-95"
         >
            <X size={24} className="group-hover:rotate-90 transition-transform" />
         </button>
         <div className="flex gap-2">
           {LESSONS.map((_, i) => (
             <div 
               key={i} 
               className={`h-2 rounded-full transition-all duration-500 border border-premium-dark ${i === index ? 'w-12 bg-premium-dark shadow-card' : 'w-4 bg-white/50'}`}
             />
           ))}
         </div>
         <div className="premium-badge font-hand text-xl">
           {index + 1} / {LESSONS.length}
         </div>
      </div>

      {/* Swipe Container */}
      <div className="h-full w-full flex items-center justify-center p-6 pt-32 pb-20">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={{
              enter: (direction: number) => ({
                y: direction > 0 ? 1000 : -1000,
                opacity: 0,
                scale: 0.9,
                rotate: direction > 0 ? 5 : -5
              }),
              center: {
                zIndex: 1,
                y: 0,
                opacity: 1,
                scale: 1,
                rotate: 0
              },
              exit: (direction: number) => ({
                zIndex: 0,
                y: direction < 0 ? 1000 : -1000,
                opacity: 0,
                scale: 0.9,
                rotate: direction < 0 ? 5 : -5
              })
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              y: { type: "spring", stiffness: 200, damping: 25 },
              opacity: { duration: 0.3 }
            }}
            className="w-full max-w-[450px] aspect-[3/4.5] premium-slide p-12 flex flex-col justify-between"
          >
            {/* Background Big Number */}
            <div className="absolute top-4 right-8 text-[180px] font-black text-premium-dark/5 leading-none select-none z-0">
              0{LESSONS[index].id}
            </div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="premium-tag self-start mb-8 text-sm uppercase tracking-widest font-black">
                Concept Mastered
              </div>
              
              <h2 className="text-5xl font-black mb-8 leading-[1] text-premium-dark uppercase tracking-tighter">
                {LESSONS[index].title}
              </h2>
              
              <p className="font-hand text-3xl md:text-4xl text-premium-gray leading-[1.3] mb-10">
                {LESSONS[index].content}
              </p>
              
              <div className="mt-auto bg-white border-2 border-premium-dark p-8 rounded-[2rem] shadow-mini font-mono text-lg leading-relaxed relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-2 bg-premium-dark text-white text-[10px] uppercase font-bold px-4 rounded-bl-xl tracking-widest">
                  Live Preview
                </div>
                <span className="text-premium-violet font-black mb-3 block text-base font-sans"># Query Example</span>
                <code className="text-premium-dark break-words">{LESSONS[index].example}</code>
              </div>
            </div>

            <div className="relative z-10 flex justify-between items-center mt-10">
               <div className="flex flex-col">
                  <span className="font-hand text-2xl text-premium-dark font-bold leading-tight">Got this?</span>
                  <span className="font-hand text-3xl text-premium-violet font-bold leading-tight">Scroll Up ⚡</span>
               </div>
               <motion.div
                 animate={{ y: [0, -10, 0] }}
                 transition={{ repeat: Infinity, duration: 1.5 }}
                 className="premium-mini-card p-4 bg-premium-dark text-white rounded-2xl"
               >
                  <ChevronUp size={28} />
               </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Swipe Controls (Invisible hit areas) */}
      <div className="absolute inset-0 z-30 pointer-events-none flex flex-col">
         <div 
           className="h-1/2 w-full pointer-events-auto cursor-pointer flex items-start justify-center pt-24 opacity-0 hover:opacity-20 transition-opacity" 
           onClick={() => paginate(-1)} 
         >
           <div className="bg-premium-dark h-1 w-20 rounded-full" />
         </div>
         <div 
           className="h-1/2 w-full pointer-events-auto cursor-pointer flex items-end justify-center pb-12 opacity-0 hover:opacity-20 transition-opacity" 
           onClick={() => paginate(1)} 
         >
           <div className="bg-premium-dark h-1 w-20 rounded-full" />
         </div>
      </div>
    </div>

  );
};
