import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Experience() {
  const { data, ui, language } = useLanguage();
  const { experience } = data;

  const parseMarkdownLinks = (text) => {
    const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      parts.push(
        <a 
          key={match.index}
          href={match[2]} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-accent-green font-semibold underline hover:text-emerald-300 transition-colors"
        >
          {match[1]}
        </a>
      );
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 90 }
    }
  };

  return (
    <section id="experience" className="py-12 sm:py-16 relative">
      <div className="w-full">
        
        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-green/10 border border-accent-green/25 text-accent-green text-xs font-semibold tracking-wide mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{language === 'en' ? 'CAREER TIMELINE' : 'HÀNH TRÌNH SỰ NGHIỆP'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            {ui.experienceTitle}
          </h2>
          <p className="text-text-secondary text-sm sm:text-base mt-2 max-w-2xl">
            {language === 'en'
              ? 'Over a decade in software engineering, transitioning from Samsung R&D core systems to Unity Mobile game architecture.'
              : 'Hơn 10 năm kinh nghiệm kỹ thuật phần mềm, chuyển giao từ hệ thống lõi tại Samsung R&D sang kiến trúc Unity Mobile Game.'}
          </p>
        </div>

        {/* Timeline container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative border-l-2 border-border-dark pl-6 sm:pl-8 ml-3 sm:ml-4 space-y-8 sm:space-y-10"
        >
          {experience.map((exp, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="relative"
            >
              {/* Timeline dot node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 bg-[#0a0d14] border-2 border-accent-green h-4 w-4 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />

              {/* Card Container */}
              <div className="glass-panel glass-panel-hover p-6 sm:p-7 rounded-2xl border border-border-subtle shadow-xl space-y-4">
                {/* Title & Company Metadata */}
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <span className="px-3 py-1 rounded-full bg-accent-green/10 border border-accent-green/20 text-accent-green text-xs font-semibold flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" />
                      {exp.period}
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm font-semibold text-accent-cyan flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5" />
                    <span>{exp.company}</span>
                  </div>
                </div>

                {/* Bullet points */}
                <ul className="space-y-2.5 pt-2 border-t border-border-dark/60">
                  {exp.bulletPoints.map((point, i) => (
                    <li key={i} className="flex items-start text-xs sm:text-sm text-text-secondary leading-relaxed gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-accent-green shrink-0 mt-0.5" />
                      <span className="text-text-primary/90">{parseMarkdownLinks(point)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

