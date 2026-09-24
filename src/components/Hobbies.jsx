import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Trophy, Waves, BookOpen, Flame, Library, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hobbies() {
  const { data, ui, language } = useLanguage();
  const { hobbies } = data;

  const getHobbyIcon = (id) => {
    switch (id) {
      case 'gaming':
        return <Gamepad2 className="h-5 w-5 text-accent-green" />;
      case 'football':
        return <Trophy className="h-5 w-5 text-amber-400" />;
      case 'swimming':
        return <Waves className="h-5 w-5 text-cyan-400" />;
      case 'detective':
        return <BookOpen className="h-5 w-5 text-emerald-400" />;
      case 'running':
        return <Flame className="h-5 w-5 text-rose-400" />;
      case 'manga':
        return <Library className="h-5 w-5 text-purple-400" />;
      default:
        return <Sparkles className="h-5 w-5 text-accent-green" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 90 }
    }
  };

  if (!hobbies || hobbies.length === 0) return null;

  return (
    <section id="hobbies" className="py-12 sm:py-16 relative">
      <div className="w-full">
        
        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-green/10 border border-accent-green/25 text-accent-green text-xs font-semibold tracking-wide mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{language === 'en' ? 'PERSONAL INTERESTS' : 'SỞ THÍCH CÁ NHÂN'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            {ui.hobbiesTitle}
          </h2>
        </div>

        {/* Hobbies Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {hobbies.map((hobby) => (
            <motion.div
              key={hobby.id}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="glass-panel glass-panel-hover p-5 rounded-2xl flex items-center gap-4 border border-border-subtle shadow-md cursor-default group"
            >
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-accent-green/30 transition-colors shrink-0">
                {getHobbyIcon(hobby.id)}
              </div>
              <div className="space-y-0.5">
                <div className="text-[10px] font-semibold text-accent-green uppercase tracking-wider">
                  {hobby.category}
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-accent-green transition-colors">
                  {hobby.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

