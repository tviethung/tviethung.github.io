import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MapPin, Gamepad2 } from 'lucide-react';
import { Gitlab } from './BrandIcons';
import portfolioData from '../data/portfolio.json';

export default function Hero() {
  const { personalInfo, telemetry, products } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  return (
    <section 
      id="prologue" 
      className="min-h-[80vh] flex items-center pt-24 pb-16 relative overflow-hidden hud-grid border-b border-border-dark"
    >
      {/* HUD scanline effect container */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,rgba(0,255,102,0.05),transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Main Info Columns (90/10 layout tension - aligned left) */}
          <div className="lg:col-span-8 space-y-8">
            {/* System Initialize Header */}
            <motion.div variants={itemVariants} className="font-mono text-xs text-accent-green flex items-center space-x-2">
              <span className="inline-block w-2 h-2 bg-accent-green animate-pulse" />
              <span>SYS_INIT // SUCCESSFUL_STABLE_VERSION_ACTIVE</span>
            </motion.div>

            {/* Huge Monospace Name */}
            <motion.div variants={itemVariants} className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">SUBJECT IDENTIFICATION:</span>
              <h1 className="text-5xl sm:text-7xl font-mono font-bold tracking-tight text-text-primary uppercase">
                {personalInfo.fullName}
                <span className="text-accent-green animate-blink">_</span>
              </h1>
              <p className="text-xl sm:text-2xl font-mono text-accent-green uppercase font-semibold flex items-center gap-2">
                <Gamepad2 className="h-5 w-5 text-accent-green inline" />
                {personalInfo.title}
              </p>
            </motion.div>

            {/* Summary */}
            <motion.div variants={itemVariants} className="max-w-2xl text-text-primary/90 leading-relaxed text-base border-l-2 border-border-dark pl-6">
              {personalInfo.summary}
            </motion.div>

            {/* Meta Tags (Location, Contacts) */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 text-xs font-mono text-text-secondary">
              <div className="flex items-center space-x-2 border border-border-dark px-3 py-1.5 bg-card-dark/30">
                <MapPin className="h-3.5 w-3.5 text-accent-green" />
                <span>LOC: {personalInfo.location.toUpperCase()}</span>
              </div>
              <div className="flex items-center space-x-2 border border-border-dark px-3 py-1.5 bg-card-dark/30">
                <Mail className="h-3.5 w-3.5 text-accent-green" />
                <span>EMAIL: {personalInfo.email.toUpperCase()}</span>
              </div>
            </motion.div>

            {/* CTA Buttons & Social Links */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6 pt-4">
              <button 
                onClick={() => {
                  const contactSec = document.getElementById('contact');
                  if (contactSec) window.scrollTo({ top: contactSec.offsetTop - 80, behavior: 'smooth' });
                }}
                className="font-mono text-sm px-6 py-3 bg-accent-green hover:bg-accent-green/95 text-bg-dark font-bold transition-all duration-300 relative border-2 border-accent-green hover:border-glow-green shadow-[0_0_15px_rgba(0,255,102,0.2)] hover:shadow-[0_0_25px_rgba(0,255,102,0.4)] flex items-center gap-2"
                style={{ borderRadius: '0px' }}
              >
                <span>INITIATE_CONTACT</span>
                <Send className="h-4 w-4" />
              </button>

              <div className="flex items-center space-x-4">
                <a 
                  href={personalInfo.gitlab} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 border border-border-dark hover:border-accent-green/50 text-text-secondary hover:text-accent-green transition-all bg-card-dark/30"
                  style={{ borderRadius: '0px' }}
                  title="GitLab Profile"
                >
                  <Gitlab className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Graphical/Interactive HUD Panel on the right (30% space visual) */}
          <div className="lg:col-span-4 hidden lg:block">
            <motion.div 
              variants={itemVariants}
              className="border border-border-dark p-6 bg-card-dark/40 font-mono text-xs space-y-4 tech-corner-container"
            >
              <div className="border-b border-border-dark pb-2 flex justify-between items-center text-text-secondary">
                <span>SYSTEM_TELEMETRY</span>
                <span className="text-accent-green text-[10px]">v2.6.4</span>
              </div>
              <div className="space-y-2">
                {telemetry?.stats.map((stat, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="text-text-secondary">{stat.name}</span>
                      <span className="text-accent-green">{stat.value}</span>
                    </div>
                    <div className="w-full bg-border-dark h-1">
                      <div className="bg-accent-green h-full" style={{ width: `${stat.progress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-border-dark pt-4 mt-2 space-y-1.5 text-[10px] text-text-secondary">
                <div>PROJECT_COUNT: <span className="text-text-primary">{products?.length || 0}</span></div>
                <div>LATEST_PLATFORM: <span className="text-text-primary">{telemetry?.latestPlatform}</span></div>
                <div>MEMORY_STATUS: <span className="text-text-primary">{telemetry?.memoryStatus}</span></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
