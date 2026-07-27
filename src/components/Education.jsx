import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

export default function Education() {
  const { education, certifications } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
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
    <section id="education" className="py-20 border-b border-border-dark relative bg-card-dark/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="mb-12 font-mono">
          <div className="text-accent-green text-xs mb-2">05 // ACADEMIC_LOGS</div>
          <h2 className="text-3xl font-bold uppercase tracking-wider text-text-primary">
            Học Vấn & Bằng Cấp
          </h2>
          <div className="w-20 h-1 bg-accent-green mt-3"></div>
        </div>

        {/* Education Stack */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-8"
        >
          {education.map((edu, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="border border-border-dark p-6 bg-card-dark/40 font-mono relative overflow-hidden tech-corner-container"
            >
              {/* Corner decor */}
              <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-5 flex items-center justify-center">
                <GraduationCap className="h-12 w-12 text-accent-green" />
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-2">
                  {/* School name */}
                  <h3 className="text-lg font-bold text-text-primary uppercase tracking-wide flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-accent-green shrink-0" />
                    {edu.school}
                  </h3>

                  {/* Degree name */}
                  <p className="text-xs text-accent-green font-bold uppercase tracking-widest flex items-center gap-1.5 pl-7">
                    <Award className="h-4 w-4" />
                    {edu.degree}
                  </p>
                </div>

                {/* Period */}
                <div className="flex items-center gap-2 text-xs text-text-secondary pl-7 md:pl-0">
                  <Calendar className="h-4 w-4 text-accent-green" />
                  <span>{edu.period.toUpperCase()}</span>
                </div>
              </div>

              {/* HUD decoration bar at bottom of card */}
              <div className="w-full h-[1px] bg-border-dark/50 mt-6 relative">
                <div className="absolute top-0 left-0 w-12 h-[1px] bg-accent-green" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications Sub-section */}
        {certifications && certifications.length > 0 && (
          <div className="mt-16 space-y-6">
            <div className="border-b border-border-dark pb-2 flex justify-between items-center text-text-secondary font-mono text-xs">
              <span>CERTIFICATIONS & LICENSES</span>
              <span className="text-accent-green">// VERIFIED_CREDENTIALS</span>
            </div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {certifications.map((cert, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="border border-border-dark p-6 bg-card-dark/30 font-mono relative overflow-hidden flex flex-col justify-between"
                  style={{ borderRadius: '0px' }}
                >
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-text-primary uppercase tracking-wide flex items-center gap-2">
                      <Award className="h-4.5 w-4.5 text-accent-green shrink-0" />
                      {cert.name}
                    </h3>
                    <p className="text-sm text-text-primary/90 pl-6 font-sans">
                      {cert.issuer}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-text-secondary pl-6 mt-4 pt-3 border-t border-border-dark/30">
                    <Calendar className="h-3.5 w-3.5 text-accent-green" />
                    <span>YEAR: {cert.year}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
