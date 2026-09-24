import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Play, Sparkles, Trophy, Wrench } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getFeaturedProducts } from '../data/portfolioPresentation';

export default function Projects() {
  const { data, ui, language } = useLanguage();
  const { products } = data;
  const displayList = getFeaturedProducts(products);

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

  return (
    <section id="featured" className="py-12 sm:py-16 relative">
      <div className="w-full">
        
        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-green/10 border border-accent-green/25 text-accent-green text-xs font-semibold tracking-wide mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{language === 'en' ? 'FEATURED PRODUCTIONS' : 'DỰ ÁN TIÊU BIỂU'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            {ui.featuredTitle}
          </h2>
          <p className="text-text-secondary text-sm sm:text-base mt-2 max-w-2xl">
            {language === 'en' 
              ? 'Highlighted games demonstrating core gameplay mechanics, 60 FPS mobile optimization, and custom editor tooling.'
              : 'Các tựa game tiêu biểu thể hiện năng lực lập trình core gameplay, tối ưu hóa 60 FPS và xây dựng custom tooling.'}
          </p>
        </div>

        {/* Project Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {displayList.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="glass-panel glass-panel-hover rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-xl group border border-border-subtle"
            >
              <div>
                {/* Header Banner & Game Icon */}
                <div className="relative h-44 overflow-hidden bg-gradient-to-b from-[#131b2e] to-[#0d121f] flex items-center justify-center p-6 border-b border-border-dark/60">
                  {/* Subtle Background Glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.12),transparent_70%)] pointer-events-none" />

                  {project.icon ? (
                    <img 
                      src={project.icon} 
                      alt={project.title}
                      className="w-24 h-24 object-cover rounded-2xl border-2 border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <img 
                      src={project.imageUrl || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80"} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
                    />
                  )}

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold tracking-wider">
                    <Trophy className="h-3 w-3" />
                    <span>FEATURED</span>
                  </div>

                  {project.genre && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#0a0d14]/80 border border-white/10 text-accent-green text-[10px] font-semibold">
                      {project.genre}
                    </div>
                  )}
                </div>

                {/* Info Container */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-accent-green transition-colors tracking-tight">
                      {project.title}
                    </h3>
                    <div className="text-xs font-semibold text-accent-green/90 mt-1">
                      {project.role || 'Unity Developer'}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  {project.technologies && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.technologies.slice(0, 5).map((tech, i) => (
                        <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-text-secondary">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded text-text-muted">
                          +{project.technologies.length - 5}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Technical Highlights Note */}
                  {project.note && (
                    <div className="p-3 rounded-xl bg-accent-green/5 border border-accent-green/20 text-xs text-text-secondary flex items-start gap-2">
                      <Wrench className="h-4 w-4 text-accent-green shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-relaxed text-text-primary/90">{project.note}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Metrics and Action Links */}
              <div className="p-6 pt-0 space-y-4">
                {project.metrics && (
                  <div className="flex items-center gap-2 text-xs font-semibold text-accent-green py-2 px-3 rounded-xl bg-accent-green/10 border border-accent-green/20">
                    <Trophy className="h-3.5 w-3.5 shrink-0" />
                    <span>{project.metrics}</span>
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-border-dark/60 pt-4 text-xs">
                  <span className="text-[11px] text-text-muted">{project.releaseDate || "Live"}</span>
                  
                  <div className="flex items-center space-x-2">
                    {project.gameplay && (
                      <a 
                        href={project.gameplay} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="px-3 py-1.5 rounded-lg border border-border-dark hover:border-accent-green/50 text-text-secondary hover:text-accent-green bg-white/5 hover:bg-white/10 transition-all flex items-center gap-1.5 text-xs font-semibold"
                        title="Watch Gameplay Demo"
                      >
                        <Play className="h-3.5 w-3.5 fill-current" />
                        <span>Demo</span>
                      </a>
                    )}
                    {project.storeLink && (
                      <a 
                        href={project.storeLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="px-3.5 py-1.5 rounded-lg bg-accent-green hover:bg-emerald-400 text-[#0a0d14] font-bold transition-all flex items-center gap-1.5 text-xs shadow-sm hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                        title="Open on Google Play"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>Store</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

