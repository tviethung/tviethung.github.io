import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Gamepad2, Smartphone, Zap, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Skills() {
  const { data, ui, language } = useLanguage();
  const { skills } = data;

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
    <section id="skills" className="py-12 sm:py-16 relative">
      <div className="w-full">
        
        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-green/10 border border-accent-green/25 text-accent-green text-xs font-semibold tracking-wide mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{language === 'en' ? 'TECHNICAL EXPERTISE' : 'NĂNG LỰC CHUYÊN MÔN'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            {ui.skillsTitle}
          </h2>
          <p className="text-text-secondary text-sm sm:text-base mt-2 max-w-2xl">
            {language === 'en'
              ? 'Proven technical foundation across Unity game engine, C# architecture, mobile optimization, and custom tooling.'
              : 'Nền tảng kỹ thuật vững chắc trên Unity Engine, kiến trúc C#, tối ưu hiệu năng mobile và hệ thống custom tools.'}
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Core Languages */}
          <motion.div variants={itemVariants} className="glass-panel glass-panel-hover p-6 rounded-2xl space-y-4 border border-border-subtle shadow-lg">
            <div className="flex items-center gap-3 pb-3 border-b border-border-dark/60">
              <div className="p-2 rounded-xl bg-accent-green/10 text-accent-green">
                <Code2 className="h-5 w-5" />
              </div>
              <span className="font-bold text-sm text-white">{ui.skillsLang}</span>
            </div>
            <ul className="space-y-2.5 text-xs text-text-secondary">
              {skills.languages.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent-green shrink-0 mt-0.5" />
                  <span className="leading-tight text-text-primary/90">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Engine & Frameworks */}
          <motion.div variants={itemVariants} className="glass-panel glass-panel-hover p-6 rounded-2xl space-y-4 border border-border-subtle shadow-lg">
            <div className="flex items-center gap-3 pb-3 border-b border-border-dark/60">
              <div className="p-2 rounded-xl bg-accent-cyan/10 text-accent-cyan">
                <Gamepad2 className="h-5 w-5" />
              </div>
              <span className="font-bold text-sm text-white">{ui.skillsEngine}</span>
            </div>
            <ul className="space-y-2.5 text-xs text-text-secondary">
              {skills.enginesAndFrameworks.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent-cyan shrink-0 mt-0.5" />
                  <span className="leading-tight text-text-primary/90">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Platforms & SDKs */}
          <motion.div variants={itemVariants} className="glass-panel glass-panel-hover p-6 rounded-2xl space-y-4 border border-border-subtle shadow-lg">
            <div className="flex items-center gap-3 pb-3 border-b border-border-dark/60">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                <Smartphone className="h-5 w-5" />
              </div>
              <span className="font-bold text-sm text-white">{ui.skillsPlatform}</span>
            </div>
            <ul className="space-y-2.5 text-xs text-text-secondary">
              {skills.platforms.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="leading-tight text-text-primary/90">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Specializations & Architecture */}
          <motion.div variants={itemVariants} className="glass-panel glass-panel-hover p-6 rounded-2xl space-y-4 border border-border-subtle shadow-lg">
            <div className="flex items-center gap-3 pb-3 border-b border-border-dark/60">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                <Zap className="h-5 w-5" />
              </div>
              <span className="font-bold text-sm text-white">{ui.skillsDomain}</span>
            </div>
            <ul className="space-y-2.5 text-xs text-text-secondary">
              {skills.expertises.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-purple-400 shrink-0 mt-0.5" />
                  <span className="leading-tight text-text-primary/90">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

