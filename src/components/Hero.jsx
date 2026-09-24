import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles, MapPin, Gamepad2, FileText, ArrowRight, Layers, Cpu, Zap, Trophy } from 'lucide-react';
import { Gitlab } from './BrandIcons';
import { useLanguage } from '../context/LanguageContext';
import avatarImg from '../data/avatar.png';

export default function Hero() {
  const { data, cvLink, language } = useLanguage();
  const { personalInfo } = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
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

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 75, behavior: 'smooth' });
  };

  return (
    <section 
      id="prologue" 
      className="min-h-[85vh] flex items-center pt-24 sm:pt-28 pb-16 relative overflow-hidden"
    >
      <div className="w-full">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Main Info Columns */}
          <div className="lg:col-span-7 space-y-7">
            {/* Specialization Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-green/10 border border-accent-green/30 text-accent-green text-xs font-semibold tracking-wide shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>UNITY DEVELOPER</span>
            </motion.div>

            {/* Name & Title */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-sans">
                {personalInfo.fullName}
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-gradient-emerald flex items-center gap-2.5">
                <Gamepad2 className="h-6 w-6 text-accent-green inline" />
                {personalInfo.title}
              </p>

              {/* Core Skill Chips */}
              <div className="flex flex-wrap gap-2 pt-2 text-xs font-medium">
                <span className="px-3 py-1 rounded-lg bg-card-dark border border-accent-green/30 text-accent-green font-semibold">
                  Unity 2D / 3D
                </span>
                <span className="px-3 py-1 rounded-lg bg-card-dark border border-border-dark text-text-secondary">
                  C# Clean Architecture
                </span>
                <span className="px-3 py-1 rounded-lg bg-card-dark border border-border-dark text-text-secondary">
                  60 FPS Mobile Optimization
                </span>
                <span className="px-3 py-1 rounded-lg bg-card-dark border border-border-dark text-text-secondary">
                  Custom Editor Tools
                </span>
                <span className="px-3 py-1 rounded-lg bg-card-dark border border-border-dark text-text-secondary">
                  Addressables & CDN
                </span>
              </div>
            </motion.div>

            {/* Summary */}
            <motion.div variants={itemVariants} className="text-text-secondary leading-relaxed text-sm sm:text-base border-l-2 border-accent-green/40 pl-4 py-1">
              {personalInfo.summary}
            </motion.div>

            {/* Key Impact Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div className="glass-panel p-3.5 rounded-xl text-center">
                <div className="text-2xl font-extrabold text-white">19+</div>
                <div className="text-[11px] font-medium text-text-muted mt-0.5">{language === 'en' ? 'Games Shipped' : 'Game Đã Ra Mắt'}</div>
              </div>
              <div className="glass-panel p-3.5 rounded-xl text-center">
                <div className="text-2xl font-extrabold text-accent-green">4M+</div>
                <div className="text-[11px] font-medium text-text-muted mt-0.5">{language === 'en' ? 'Total Downloads' : 'Lượt Tải Toàn Cầu'}</div>
              </div>
              <div className="glass-panel p-3.5 rounded-xl text-center">
                <div className="text-2xl font-extrabold text-accent-cyan">60 FPS</div>
                <div className="text-[11px] font-medium text-text-muted mt-0.5">{language === 'en' ? 'Low-End Optimized' : 'Tối Ưu Máy Yếu'}</div>
              </div>
              <div className="glass-panel p-3.5 rounded-xl text-center">
                <div className="text-2xl font-extrabold text-amber-400">10+ Yrs</div>
                <div className="text-[11px] font-medium text-text-muted mt-0.5">{language === 'en' ? 'Software Eng.' : 'Kỹ Thuật Phần Mềm'}</div>
              </div>
            </motion.div>

            {/* Contact Quick Meta */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 text-xs text-text-secondary">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-accent-green" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="h-4 w-4 text-accent-green" />
                <span>{personalInfo.email}</span>
              </div>
            </motion.div>

            {/* CTA Actions */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3.5 pt-2">
              <button 
                onClick={() => scrollToSection('featured')}
                className="px-6 py-3 rounded-xl bg-accent-green hover:bg-emerald-400 text-[#0a0d14] font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
              >
                <span>{language === 'en' ? 'Explore Showcase' : 'Khám Phá Dự Án'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <a 
                href={cvLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl border border-border-dark hover:border-accent-green/50 bg-card-dark text-text-primary hover:text-accent-green font-semibold text-sm transition-all duration-300 flex items-center gap-2 shadow-sm"
              >
                <FileText className="h-4 w-4" />
                <span>{language === 'en' ? 'View Resume (PDF)' : 'Xem CV (PDF)'}</span>
              </a>

              <a 
                href={personalInfo.gitlab} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-xl border border-border-dark hover:border-accent-green/50 bg-card-dark text-text-secondary hover:text-accent-green transition-all"
                title="GitLab Profile"
              >
                <Gitlab className="h-5 w-5" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Game Developer Showcase Card */}
          <div className="lg:col-span-5 space-y-4">
            <motion.div 
              variants={itemVariants}
              className="glass-panel p-6 rounded-2xl relative overflow-hidden border border-border-subtle shadow-2xl space-y-6"
            >
              {/* Profile Card Header with Enchanced Avatar */}
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-accent-green/50 shadow-[0_0_25px_rgba(16,185,129,0.25)] flex-shrink-0 group">
                  <img 
                    src={avatarImg} 
                    alt="Tạ Việt Hùng Avatar" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14]/50 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="space-y-1.5 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <h3 className="text-xl font-bold text-white tracking-tight">{personalInfo.fullName}</h3>
                    <span className="w-2.5 h-2.5 rounded-full bg-accent-green animate-ping" />
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-accent-green">Unity Developer</div>
                  <div className="text-xs text-text-muted mt-0.5">Ex-Samsung R&D • 19+ Android Games</div>
                  <div className="pt-1 flex flex-wrap justify-center sm:justify-start gap-1.5 text-[10px]">
                    <span className="px-2 py-0.5 rounded-full bg-accent-green/10 text-accent-green border border-accent-green/30 font-medium">Hà Nội, VN</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/5 text-text-secondary border border-white/10">4M+ Downloads</span>
                  </div>
                </div>
              </div>

              {/* Technical Highlights Box */}
              <div className="space-y-3 pt-2 border-t border-border-dark/60 text-xs">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-accent-green/10 text-accent-green shrink-0 mt-0.5">
                    <Cpu className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{language === 'en' ? 'Core Architecture' : 'Kiến Trúc Game Cốt Lõi'}</div>
                    <div className="text-text-secondary text-[11px]">OOP, Design Patterns, EventBus, UniTask, ScriptableObject</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-accent-cyan/10 text-accent-cyan shrink-0 mt-0.5">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{language === 'en' ? '60 FPS Optimization' : 'Tối Ưu Hiệu Năng Mobile'}</div>
                    <div className="text-text-secondary text-[11px]">Profiling RAM/CPU, Draw Calls reduction, ASTC compression, Zero GC</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                    <Layers className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{language === 'en' ? 'Custom Studio Tooling' : 'Custom Editor Tools Cho Studio'}</div>
                    <div className="text-text-secondary text-[11px]">{language === 'en' ? 'Level Editors, Level Config Generators, Workflow Tooling' : 'Custom Level Editors, Level Config Generators, Workflow Tooling'}</div>
                  </div>
                </div>
              </div>

              {/* Verified Product Badge Banner */}
              <div className="p-3 rounded-xl bg-accent-green/5 border border-accent-green/20 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-accent-green" />
                  <span className="font-semibold text-text-primary">
                    {language === 'en' ? 'Top Hits: 2M+ & 1.8M+ Downloads' : 'Sản Phẩm Tiêu Biểu: 2M+ & 1.8M+ Tải'}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-accent-green text-[#0a0d14]">
                  VERIFIED
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

