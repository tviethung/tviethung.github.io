import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Trophy, Waves, BookOpen, Flame, Library, Sparkles } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

export default function Hobbies() {
  const { hobbies } = portfolioData;

  const getHobbyIcon = (id) => {
    switch (id) {
      case 'gaming':
        return <Gamepad2 className="h-6 w-6 text-accent-green" />;
      case 'football':
        return <Trophy className="h-6 w-6 text-amber-400" />;
      case 'swimming':
        return <Waves className="h-6 w-6 text-cyan-400" />;
      case 'detective':
        return <BookOpen className="h-6 w-6 text-emerald-400" />;
      case 'running':
        return <Flame className="h-6 w-6 text-rose-400" />;
      case 'manga':
        return <Library className="h-6 w-6 text-purple-400" />;
      default:
        return <Sparkles className="h-6 w-6 text-accent-green" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const cardVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 90 }
    }
  };

  if (!hobbies || hobbies.length === 0) return null;

  return (
    <section id="hobbies" className="py-20 border-b border-border-dark relative bg-card-dark/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="mb-12 font-mono">
          <div className="text-accent-green text-xs mb-2">06 // OFF_DUTY_LOGS</div>
          <h2 className="text-3xl font-bold uppercase tracking-wider text-text-primary">
            Sở Thích & Đời Sống Cá Nhân
          </h2>
          <div className="w-20 h-1 bg-accent-green mt-3"></div>
        </div>

        {/* Hobbies Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 font-mono"
        >
          {hobbies.map((hobby) => (
            <motion.div
              key={hobby.id}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="bg-card-dark border border-border-dark p-5 flex items-center justify-between group hover:border-accent-green/60 transition-all duration-300 relative tech-corner-container"
              style={{ borderRadius: '0px' }}
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-transparent group-hover:border-accent-green transition-all" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-transparent group-hover:border-accent-green transition-all" />

              <div className="flex items-center gap-4">
                <div className="p-3 bg-bg-dark border border-border-dark group-hover:border-accent-green/40 transition-colors shrink-0">
                  {getHobbyIcon(hobby.id)}
                </div>
                <div className="space-y-1">
                  <div className="text-[9px] font-bold text-accent-green/80 tracking-widest uppercase">
                    {hobby.category}
                  </div>
                  <h3 className="text-sm font-bold text-text-primary uppercase tracking-wide group-hover:text-accent-green transition-colors">
                    {hobby.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
