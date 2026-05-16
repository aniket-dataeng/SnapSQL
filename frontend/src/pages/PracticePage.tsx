import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { Button } from '../components/Button';

export const PracticePage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0: Question, 1: Result
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const question = {
    id: 1,
    text: "Which SQL clause is used to sort the result-set?",
    options: ["SORT BY", "ORDER BY", "ARRANGE BY", "GROUP BY"],
    correct: 1
  };

  const handleAnswer = (idx: number) => {
    setSelected(idx);
    setIsCorrect(idx === question.correct);
    setTimeout(() => setStep(1), 500);
  };

  return (
    <div className="min-h-screen bg-premium-bg p-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-5">
         <div className="absolute -top-24 -left-24 w-96 h-96 bg-premium-violet rounded-full blur-[120px]" />
         <div className="absolute top-1/2 -right-24 w-64 h-64 bg-premium-violet rounded-full blur-[100px]" />
      </div>

      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div 
            key="question"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="w-full max-w-lg"
          >
             <div className="premium-card p-10 relative">
                <div className="flex items-center justify-between mb-8">
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-premium-violet animate-pulse" />
                      <span className="text-[10px] font-black text-premium-light-gray uppercase tracking-[0.2em]">Practice Mode</span>
                   </div>
                   <div className="premium-badge font-hand text-lg rotate-2">+50 XP</div>
                </div>

                <h2 className="text-4xl font-black text-premium-dark uppercase tracking-tight mb-10 leading-[0.95]">
                   {question.text}
                </h2>

                <div className="grid gap-4">
                   {question.options.map((opt, i) => (
                     <button
                       key={i}
                       onClick={() => handleAnswer(i)}
                       className={`w-full text-left p-6 rounded-3xl border-2 transition-all duration-300 group active:scale-[0.98] ${
                         selected === i 
                           ? i === question.correct ? 'bg-premium-violet text-white border-premium-violet shadow-mini' : 'bg-red-500 text-white border-red-500 shadow-mini'
                           : 'bg-white border-premium-dark/5 hover:border-premium-dark/20 hover:translate-x-2'
                       }`}
                     >
                       <div className="flex items-center justify-between">
                          <span className={`text-xl font-black uppercase tracking-tight ${selected === i ? 'text-white' : 'text-premium-dark'}`}>
                             {opt}
                          </span>
                          {selected === i && (
                             <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                {i === question.correct ? <Check size={24} /> : <X size={24} />}
                             </motion.div>
                          )}
                       </div>
                     </button>
                   ))}
                </div>
             </div>
             
             <div className="mt-8 flex justify-center">
                <p className="font-hand text-3xl text-premium-gray">Select the correct command to continue →</p>
             </div>
          </motion.div>
        ) : (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md text-center"
          >
             <div className="premium-card p-12 overflow-hidden relative">
                <div className={`absolute top-0 left-0 w-full h-2 ${isCorrect ? 'bg-premium-violet' : 'bg-red-500'}`} />
                
                <div className={`w-28 h-28 rounded-3xl mx-auto flex items-center justify-center mb-8 shadow-card relative transition-transform ${isCorrect ? 'bg-premium-violet text-white rotate-3' : 'bg-red-500 text-white -rotate-3'}`}>
                   {isCorrect ? <Check size={56} strokeWidth={3} /> : <X size={56} strokeWidth={3} />}
                </div>

                <h3 className="text-5xl font-black text-premium-dark uppercase tracking-tighter mb-4">
                   {isCorrect ? 'Legendary!' : 'Not Quite!'}
                </h3>
                
                <p className="font-hand text-3xl text-premium-gray mb-10">
                   {isCorrect ? 'Your SQL skills are becoming god-like. Keep pushing!' : 'Even masters fail sometimes. Practice makes perfect!'}
                </p>

                <div className="flex flex-col gap-4 relative">
                   <Button 
                     variant="primary" 
                     className="h-16 text-2xl uppercase tracking-widest"
                     onClick={() => navigate('/dashboard')}
                   >
                     Continue Mission
                   </Button>
                   <Button 
                     variant="secondary" 
                     className="h-16 text-2xl uppercase tracking-widest"
                     onClick={() => {
                        setSelected(null);
                        setStep(0);
                     }}
                   >
                     Re-Try Arena
                   </Button>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
