import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Play, Activity, Gamepad2, Star } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

export default function Projects() {
  const { products, projects } = portfolioData;

  // Filter products marked as isFavorite
  const favoriteProducts = products ? products.filter(p => p.isFavorite) : [];
  const displayList = favoriteProducts.length > 0 ? favoriteProducts : projects;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 80 }
    }
  };

  return (
    <section id="featured" className="py-20 border-b border-border-dark bg-card-dark/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="mb-12 font-mono">
          <div className="text-accent-green text-xs mb-2 flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-accent-green text-accent-green" />
            <span>03 // FEATURED_HIGHLIGHTS</span>
          </div>
          <h2 className="text-3xl font-bold uppercase tracking-wider text-text-primary">
            Dự Án Nổi Bật & Tiêu Biểu
          </h2>
          <div className="w-20 h-1 bg-accent-green mt-3"></div>
        </div>

        {/* Project Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {displayList.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="bg-card-dark border border-border-dark flex flex-col justify-between group hover:border-accent-green/50 transition-all duration-300 relative overflow-hidden tech-corner-container shadow-[0_0_20px_rgba(0,0,0,0.4)]"
              style={{ borderRadius: '0px' }}
            >
              {/* Project Card Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-transparent group-hover:border-accent-green transition-all" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-transparent group-hover:border-accent-green transition-all" />

              <div>
                {/* Header / Banner Wrap */}
                <div className="relative h-44 overflow-hidden border-b border-border-dark bg-bg-dark flex items-center justify-center p-4">
                  {project.icon ? (
                    <img 
                      src={project.icon} 
                      alt={project.title}
                      className="w-24 h-24 object-cover rounded-2xl border border-border-dark shadow-xl transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <img 
                      src={project.imageUrl || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80"} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                  )}
                  <div className="absolute top-3 left-3 bg-amber-500/10 border border-amber-500 font-mono text-[9px] text-amber-400 px-2 py-0.5 uppercase tracking-widest font-bold flex items-center gap-1">
                    ★ FAVORITE
                  </div>
                  {project.genre && (
                    <div className="absolute top-3 right-3 bg-bg-dark/90 border border-border-dark font-mono text-[9px] text-accent-green px-2 py-0.5 uppercase">
                      {project.genre}
                    </div>
                  )}
                </div>

                {/* Info Container */}
                <div className="p-6 space-y-4 font-mono">
                  <h3 className="text-lg font-bold text-text-primary group-hover:text-accent-green transition-colors uppercase tracking-wide">
                    {project.title}
                  </h3>
                  
                  {/* Role & Tech info */}
                  <div className="text-xs space-y-2 text-text-secondary">
                    <div>ROLE: <span className="text-accent-green font-semibold text-xs uppercase">{project.role}</span></div>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="text-[10px] bg-border-dark/40 border border-border-dark px-1.5 py-0.5 text-text-primary">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-text-secondary leading-relaxed font-sans line-clamp-3 pt-1">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Bottom Metrics and Links */}
              <div className="p-6 pt-0 font-mono space-y-3">
                {/* Metrics Callout */}
                {project.metrics && (
                  <div className="border border-accent-green/40 bg-accent-green/5 p-2.5 text-xs text-text-primary flex items-start gap-2">
                    <Activity className="h-4 w-4 text-accent-green shrink-0 mt-0.5" />
                    <div>
                      <span className="text-accent-green font-bold">// METRICS:</span> {project.metrics}
                    </div>
                  </div>
                )}

                {/* Developer Note */}
                {project.note && (
                  <div className="border border-amber-500/30 bg-amber-500/5 p-2.5 text-xs text-text-primary/90">
                    <span className="text-amber-400 font-bold">// NOTE:</span> {project.note}
                  </div>
                )}

                {/* Action Links */}
                <div className="flex items-center justify-between border-t border-border-dark pt-4 text-xs">
                  <span className="text-[10px] text-text-secondary">RELEASE: {project.releaseDate || "N/A"}</span>
                  
                  <div className="flex items-center space-x-2">
                    {project.gameplay && (
                      <a 
                        href={project.gameplay} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="px-2 py-1 border border-border-dark hover:border-accent-green/50 text-text-secondary hover:text-accent-green transition-all flex items-center gap-1 bg-bg-dark/50 text-[10px]"
                        title="Watch Gameplay"
                      >
                        <Play className="h-3 w-3 fill-current" />
                        <span>DEMO</span>
                      </a>
                    )}
                    {project.storeLink && (
                      <a 
                        href={project.storeLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="px-2 py-1 bg-accent-green hover:bg-accent-green/90 text-bg-dark font-bold transition-all flex items-center gap-1 text-[10px]"
                        title="View on Google Play Store"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>STORE</span>
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
