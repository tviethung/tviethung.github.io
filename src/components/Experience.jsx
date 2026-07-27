import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckSquare } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

export default function Experience() {
  const { experience } = portfolioData;

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
          className="text-accent-green underline hover:text-accent-green/80 transition-colors"
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
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 90 }
    }
  };

  return (
    <section id="experience" className="py-20 border-b border-border-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="mb-12 font-mono">
          <div className="text-accent-green text-xs mb-2">04 // CAREER_LOGS</div>
          <h2 className="text-3xl font-bold uppercase tracking-wider text-text-primary">
            Kinh Nghiệm Làm Việc
          </h2>
          <div className="w-20 h-1 bg-accent-green mt-3"></div>
        </div>

        {/* Timeline container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative border-l border-border-dark pl-6 md:pl-8 ml-4 space-y-12"
        >
          {experience.map((exp, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="relative space-y-4"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[31px] md:-left-[39px] top-1.5 bg-bg-dark border-2 border-accent-green h-4 w-4 rounded-none rotate-45" />

              {/* Title & Company Metadata */}
              <div className="font-mono space-y-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                  <span className="text-accent-green flex items-center gap-1">
                    <Briefcase className="h-3.5 w-3.5" />
                    {exp.company.toUpperCase()}
                  </span>
                  <span className="text-text-secondary border-l border-border-dark pl-3 flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {exp.period}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-text-primary uppercase tracking-wide">
                  {exp.role}
                </h3>
              </div>

              {/* Bullet points */}
              <ul className="space-y-2.5 max-w-3xl">
                {exp.bulletPoints.map((point, i) => (
                  <li key={i} className="flex items-start text-sm text-text-primary/90 leading-relaxed">
                    <CheckSquare className="h-4 w-4 text-accent-green shrink-0 mt-0.5 mr-3" />
                    <span>{parseMarkdownLinks(point)}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
