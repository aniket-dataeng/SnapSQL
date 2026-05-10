import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, X, MessageSquare } from 'lucide-react';
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
    <div className="min-h-screen bg-dark-bg p-6 flex flex-col items-center pt-20">
      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div 
            key="question"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-sm"
          >
             <div className="glass p-8 rounded-[2.5rem] border border-white border-opacity-5">
                <div className="flex items-center gap-2 text-brand-red font-bold text-xs uppercase tracking-widest mb-4">
                   <MessageSquare size={14} /> Knowledge Check
                </div>
                <h2 className="text-2xl font-bold mb-8 leading-tight">{question.text}</h2>
                <div className="space-y-4">
                   {question.options.map((opt, i) => (
                     <button
                       key={i}
                       onClick={() => handleAnswer(i)}
                       className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 font-medium ${
                         selected === i 
                           ? i === question.correct ? 'bg-success-accent bg-opacity-20 border-success-accent' : 'bg-brand-red bg-opacity-20 border-brand-red'
                           : 'bg-dark-bg-surface border-white border-opacity-5 hover:border-white hover:border-opacity-20'
                       }`}
                     >
                       {opt}
                     </button>
                   ))}
                </div>
             </div>
          </motion.div>
        ) : (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm text-center"
          >
             <div className="glass p-10 rounded-[3rem] shadow-2xl overflow-hidden relative">
                <div className={`absolute inset-0 opacity-10 ${isCorrect ? 'bg-success-accent' : 'bg-brand-red'}`} />
                
                <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6 shadow-glow relative ${isCorrect ? 'bg-success-accent' : 'bg-brand-red'}`}>
                   {isCorrect ? <Check size={48} className="text-white" /> : <X size={48} className="text-white" />}
                </div>

                <h3 className="text-3xl font-black mb-2 relative">{isCorrect ? 'Awesome!' : 'Oops!'}</h3>
                <p className="text-gray-accent mb-8 relative">
                   {isCorrect ? 'You earned +50 XP and kept your streak alive!' : 'Not quite. Let\'s review this concept again soon.'}
                </p>

                <div className="flex flex-col gap-3 relative">
                   <Button size="lg" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
                   <Button size="lg" variant="secondary" onClick={() => setStep(0)}>Try Another</Button>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
