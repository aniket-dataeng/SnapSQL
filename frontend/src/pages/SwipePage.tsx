import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, CheckCircle2, ChevronUp } from 'lucide-react';

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
    <div className="h-screen w-full bg-dark-bg overflow-hidden relative">
      {/* Top Header */}
      <div className="absolute top-0 left-0 right-0 z-40 p-6 flex items-center justify-between glass h-20">
         <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-white hover:bg-opacity-10 rounded-full">
            <X size={24} />
         </button>
         <div className="flex gap-1">
           {LESSONS.map((_, i) => (
             <div 
               key={i} 
               className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-brand-red shadow-glow' : 'w-4 bg-white bg-opacity-20'}`}
             />
           ))}
         </div>
         <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Swipe Container */}
      <div className="h-full w-full flex items-center justify-center p-6 pt-24 pb-20">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={{
              enter: (direction: number) => ({
                y: direction > 0 ? 1000 : -1000,
                opacity: 0,
                scale: 0.8
              }),
              center: {
                zIndex: 1,
                y: 0,
                opacity: 1,
                scale: 1
              },
              exit: (direction: number) => ({
                zIndex: 0,
                y: direction < 0 ? 1000 : -1000,
                opacity: 0,
                scale: 0.8
              })
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              y: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="w-full max-w-sm aspect-[9/16] glass rounded-[3rem] p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden"
          >
            <div className={`absolute inset-0 opacity-10 ${LESSONS[index].color}`} />
            
            <div className="relative">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-red mb-4 block">Concept {index + 1}</span>
              <h2 className="text-3xl font-black mb-6 leading-tight">{LESSONS[index].title}</h2>
              <p className="text-gray-accent leading-relaxed mb-8">{LESSONS[index].content}</p>
              
              <div className="bg-black bg-opacity-40 p-6 rounded-2xl border border-white border-opacity-5 font-mono text-sm leading-relaxed overflow-x-auto scrollbar-hide">
                <span className="text-success-accent font-bold mb-2 block">Example:</span>
                <code className="text-light-accent">{LESSONS[index].example}</code>
              </div>
            </div>

            <div className="relative flex flex-col items-center gap-4">
               <div className="flex items-center gap-2 text-success-accent font-bold text-sm">
                  <CheckCircle2 size={16} /> Got it!
               </div>
               <div className="text-[10px] text-gray-accent uppercase tracking-widest flex flex-col items-center gap-2">
                  <span>Swipe Up for Next</span>
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ChevronUp size={20} className="text-brand-red" />
                  </motion.div>
               </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Swipe Controls (Invisible hit areas) */}
      <div className="absolute inset-0 z-30 pointer-events-none flex flex-col">
         <div 
           className="h-1/2 w-full pointer-events-auto cursor-pointer" 
           onClick={() => paginate(-1)} 
         />
         <div 
           className="h-1/2 w-full pointer-events-auto cursor-pointer" 
           onClick={() => paginate(1)} 
         />
      </div>
    </div>
  );
};
