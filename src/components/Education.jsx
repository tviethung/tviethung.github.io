import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Education() {
  const { data, ui, language } = useLanguage();
  const { education, certifications } = data;

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
    <section id="education" className="py-12 sm:py-16 relative">
      <div className="w-full">
        
        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-green/10 border border-accent-green/25 text-accent-green text-xs font-semibold tracking-wide mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{language === 'en' ? 'EDUCATION & CREDENTIALS' : 'HỌC VẤN & CHỨNG CHỈ'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            {ui.educationTitle}
          </h2>
          <p className="text-text-secondary text-sm sm:text-base mt-2 max-w-2xl">
            {language === 'en'
              ? 'Academic background in Information Technology and certified software engineering expertise.'
              : 'Nền tảng đào tạo chính quy chuyên ngành Công nghệ thông tin cùng các chứng chỉ kỹ thuật.'}
          </p>
        </div>

        {/* Education Stack */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-6"
        >
          {education.map((edu, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="glass-panel glass-panel-hover p-6 sm:p-7 rounded-2xl border border-border-subtle shadow-xl"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-accent-green/10 text-accent-green">
                      <GraduationCap className="h-5 w-5 shrink-0" />
                    </div>
                    {edu.school || edu.institution}
                  </h3>

                  <p className="text-xs sm:text-sm text-accent-green font-semibold flex items-center gap-2 pl-12">
                    <Award className="h-4 w-4" />
                    {edu.degree}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-text-muted pl-12 md:pl-0">
                  <Calendar className="h-4 w-4 text-accent-green" />
                  <span>{edu.period}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications Sub-section */}
        {certifications && certifications.length > 0 && (
          <div className="mt-12 sm:mt-16 space-y-6">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Award className="h-4 w-4 text-accent-green" />
              <span>{language === 'en' ? 'Verified Certifications' : 'Chứng Chỉ Đã Xác Thực'}</span>
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
                  className="glass-panel glass-panel-hover p-6 rounded-2xl border border-border-subtle shadow-lg flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent-green shrink-0" />
                      {cert.name}
                    </h3>
                    <p className="text-xs text-text-secondary pl-6">
                      {cert.issuer}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-text-muted pl-6 mt-4 pt-3 border-t border-border-dark/40">
                    <Calendar className="h-3.5 w-3.5 text-accent-green" />
                    <span>{cert.year}</span>
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

