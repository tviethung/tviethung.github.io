import React from 'react';
import { motion } from 'framer-motion';
import { Target, HardDrive, Cpu, ShieldCheck } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

export default function Skills() {
  const { skills } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <section id="skills" className="py-20 border-b border-border-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="mb-12 font-mono">
          <div className="text-accent-green text-xs mb-2">01 // SKILLSET_TELEMETRY</div>
          <h2 className="text-3xl font-bold uppercase tracking-wider text-text-primary">
            Hệ thống Kỹ năng & Chuyên môn
          </h2>
          <div className="w-20 h-1 bg-accent-green mt-3"></div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* Core Languages */}
          <motion.div variants={itemVariants} className="border border-border-dark p-6 bg-card-dark/40 font-mono space-y-4 tech-corner-container">
            <div className="flex items-center space-x-2 text-accent-green pb-2 border-b border-border-dark">
              <Cpu className="h-5 w-5" />
              <span className="font-bold text-sm uppercase">Ngôn ngữ Lập trình</span>
            </div>
            <ul className="space-y-2 text-xs text-text-secondary">
              {skills.languages.map((item, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="text-accent-green">&gt;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Engine & Frameworks */}
          <motion.div variants={itemVariants} className="border border-border-dark p-6 bg-card-dark/40 font-mono space-y-4">
            <div className="flex items-center space-x-2 text-accent-green pb-2 border-b border-border-dark">
              <HardDrive className="h-5 w-5" />
              <span className="font-bold text-sm uppercase">Công nghệ & Framework</span>
            </div>
            <ul className="space-y-2 text-xs text-text-secondary">
              {skills.enginesAndFrameworks.map((item, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="text-accent-green">&gt;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Platforms */}
          <motion.div variants={itemVariants} className="border border-border-dark p-6 bg-card-dark/40 font-mono space-y-4">
            <div className="flex items-center space-x-2 text-accent-green pb-2 border-b border-border-dark">
              <Target className="h-5 w-5" />
              <span className="font-bold text-sm uppercase">Nền tảng phát triển</span>
            </div>
            <ul className="space-y-2 text-xs text-text-secondary">
              {skills.platforms.map((item, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="text-accent-green">&gt;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Professional Expertises */}
          <motion.div variants={itemVariants} className="border border-border-dark p-6 bg-card-dark/40 font-mono space-y-4 tech-corner-container">
            <div className="flex items-center space-x-2 text-accent-green pb-2 border-b border-border-dark">
              <ShieldCheck className="h-5 w-5" />
              <span className="font-bold text-sm uppercase">Chuyên môn sâu</span>
            </div>
            <ul className="space-y-2.5 text-xs text-text-secondary">
              {skills.expertises.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-accent-green mt-0.5">&gt;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
