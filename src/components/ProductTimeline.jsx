import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Play, ExternalLink, Calendar, Search, AlertTriangle, LayoutGrid, GitCommit } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

export default function ProductTimeline() {
  const { products } = portfolioData;
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL', 'LIVE', 'REMOVED'
  const [viewMode, setViewMode] = useState('GRID'); // 'GRID', 'TIMELINE'
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filter products based on search term & status
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.genre && product.genre.toLowerCase().includes(searchTerm.toLowerCase()));
    const isLive = product.status.toLowerCase() === 'live';
    
    if (statusFilter === 'LIVE') {
      return matchesSearch && isLive;
    } else if (statusFilter === 'REMOVED') {
      return matchesSearch && !isLive;
    }
    return matchesSearch;
  });

  const formatShortRole = (role) => {
    if (!role) return '';
    return role
      .replace(/Lead Developer/i, 'LEAD DEV')
      .replace(/Game Developer/i, 'GAME DEV')
      .toUpperCase();
  };

  const getStatusBadge = (status) => {
    const s = status.toLowerCase();
    if (s === 'live') {
      return (
        <span className="px-2 py-0.5 text-[10px] font-bold bg-accent-green/10 border border-accent-green text-accent-green tracking-widest shadow-[0_0_10px_rgba(0,255,102,0.1)]">
          LIVE // ONLINE
        </span>
      );
    } else if (s.includes('reup')) {
      return (
        <span className="px-2 py-0.5 text-[10px] font-bold bg-yellow-500/10 border border-yellow-500 text-yellow-500 tracking-widest">
          RE-UP
        </span>
      );
    } else {
      return (
        <span className="px-2 py-0.5 text-[10px] font-bold bg-red-500/10 border border-red-500 text-red-400/90 tracking-widest">
          REMOVED
        </span>
      );
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const renderCardContent = (product) => {
    return (
      <div className="flex flex-col justify-between h-full">
        <div>
          {/* Top info and status badge */}
          <div className="flex justify-between items-start gap-4 mb-4">
            <span className="text-[10px] text-text-secondary">
              ID: #{product.id.toString().padStart(3, '0')}
            </span>
            <div className="flex items-center gap-2">
              {product.isFavorite && (
                <span className="px-2 py-0.5 text-[9px] font-bold bg-amber-500/10 border border-amber-500 text-amber-400 tracking-widest flex items-center gap-1 shadow-[0_0_8px_rgba(245,158,11,0.2)]">
                  ★ FAVORITE
                </span>
              )}
              {getStatusBadge(product.status)}
            </div>
          </div>

          <div className="flex items-start gap-4">
            {/* Game Icon */}
            <div className="w-16 h-16 bg-bg-dark border border-border-dark rounded-xl flex-shrink-0 relative overflow-hidden group-hover:border-accent-green/40 transition-colors shadow-inner flex items-center justify-center">
              {product.icon ? (
                <img 
                  src={product.icon} 
                  alt={product.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = `<span class="text-accent-green text-lg font-bold">${product.title[0]}</span>`;
                  }}
                />
              ) : (
                <Gamepad2 className="h-7 w-7 text-accent-green/60" />
              )}
            </div>

            {/* Game Metadata */}
            <div className="space-y-1 text-left">
              <h3 className="font-bold text-sm text-text-primary uppercase tracking-wide group-hover:text-accent-green transition-colors leading-tight">
                {product.title}
              </h3>
              {product.genre && (
                <div className="text-[10px] text-accent-green/80 uppercase tracking-wider font-semibold">
                  {product.genre}
                </div>
              )}
              {product.role && (
                <div className="pt-1 pb-0.5">
                  <span className="inline-flex items-center px-2 py-0.5 text-[9.5px] font-extrabold bg-cyan-950/80 border border-cyan-400 text-cyan-300 uppercase tracking-wider shadow-[0_0_12px_rgba(6,182,212,0.25)]">
                    {formatShortRole(product.role)}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-[10px] text-text-secondary">
                <Calendar className="h-3 w-3 text-accent-green" />
                <span>RELEASE: {product.releaseDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Action Buttons */}
        <div className="flex items-center justify-end gap-3 mt-5 pt-3 border-t border-border-dark/40 text-[10px]">
          {product.gameplay && (
            <a 
              href={product.gameplay}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-2.5 py-1.5 border border-border-dark hover:border-accent-green/50 text-text-secondary hover:text-accent-green transition-all flex items-center gap-1 bg-bg-dark/50"
              style={{ borderRadius: '0px' }}
            >
              <Play className="h-3 w-3 fill-current" />
              <span>GAMEPLAY</span>
            </a>
          )}
          {product.storeLink && (
            <a 
              href={product.storeLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-2.5 py-1.5 bg-accent-green hover:bg-accent-green/90 text-bg-dark font-bold transition-all flex items-center gap-1"
              style={{ borderRadius: '0px' }}
            >
              <ExternalLink className="h-3 w-3" />
              <span>STORE</span>
            </a>
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="products" className="py-20 border-b border-border-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="font-mono">
            <div className="text-accent-green text-xs mb-2">02 // RELEASE_TIMELINE</div>
            <h2 className="text-3xl font-bold uppercase tracking-wider text-text-primary">
              Lịch Sử Phát Hành
            </h2>
            <div className="w-20 h-1 bg-accent-green mt-3"></div>
          </div>

          {/* Filtering, Search & Layout Switcher */}
          <div className="flex flex-col sm:flex-row gap-4 font-mono text-xs w-full md:w-auto items-stretch sm:items-center">
            {/* Search Input */}
            <div className="relative flex-grow sm:flex-grow-0">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-secondary" />
              <input 
                type="text"
                placeholder="FIND_PRODUCT..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-60 pl-9 pr-4 py-2 bg-card-dark/40 border border-border-dark text-text-primary focus:outline-none focus:border-accent-green/80 transition-all font-mono"
                style={{ borderRadius: '0px' }}
              />
            </div>

            <div className="flex gap-2">
              {/* Filter Tabs */}
              <div className="flex border border-border-dark bg-card-dark/20 p-0.5">
                {['ALL', 'LIVE', 'REMOVED'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setStatusFilter(filter)}
                    className={`px-3 py-1.5 transition-all uppercase font-bold tracking-wider ${
                      statusFilter === filter 
                        ? 'bg-accent-green text-bg-dark font-bold' 
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                    style={{ borderRadius: '0px' }}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* View Switcher */}
              <div className="flex border border-border-dark bg-card-dark/20 p-0.5">
                <button
                  onClick={() => setViewMode('GRID')}
                  className={`px-2.5 transition-all flex items-center justify-center ${
                    viewMode === 'GRID' 
                      ? 'bg-accent-green text-bg-dark font-bold' 
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                  title="Grid View"
                  style={{ borderRadius: '0px' }}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('TIMELINE')}
                  className={`px-2.5 transition-all flex items-center justify-center ${
                    viewMode === 'TIMELINE' 
                      ? 'bg-accent-green text-bg-dark font-bold' 
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                  title="Timeline View"
                  style={{ borderRadius: '0px' }}
                >
                  <GitCommit className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Display Layout */}
        {viewMode === 'GRID' ? (
          /* Grid View */
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setSelectedProduct(product)}
                  className="border border-border-dark p-5 bg-card-dark/40 font-mono relative overflow-hidden flex flex-col justify-between tech-corner-container hover:border-accent-green/30 cursor-pointer group transition-all duration-300"
                >
                  {renderCardContent(product)}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Timeline View (Vertical Alternating) */
          <div className="relative py-8 max-w-5xl mx-auto overflow-hidden">
            {/* Center Vertical Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-border-dark/80 -translate-x-1/2" />

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="space-y-12 relative"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <motion.div
                      layout
                      key={product.id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="relative grid grid-cols-1 md:grid-cols-2 gap-0 items-start group"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-6 md:left-1/2 top-[44px] -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rotate-45 bg-bg-dark border-2 border-accent-green z-20 shadow-[0_0_8px_rgba(0,255,102,0.3)] group-hover:bg-accent-green group-hover:scale-110 transition-all duration-300" />
                      
                      {/* Card Container with Alternating alignment */}
                      <div className={`pl-12 pr-4 md:px-0 w-full flex ${
                        isEven 
                          ? 'md:col-start-1 md:pr-10 md:justify-end' 
                          : 'md:col-start-2 md:pl-10 md:justify-start'
                      }`}>
                        <div 
                          onClick={() => setSelectedProduct(product)}
                          className="w-full max-w-md border border-border-dark p-5 bg-card-dark/40 font-mono relative overflow-hidden flex flex-col justify-between tech-corner-container hover:border-accent-green/30 cursor-pointer group transition-all duration-300"
                        >
                          {renderCardContent(product)}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 border border-dashed border-border-dark/50 font-mono text-text-secondary">
            <AlertTriangle className="h-8 w-8 text-accent-green/60 mx-auto mb-3" />
            <p className="text-xs uppercase tracking-widest">
              NO_PRODUCTS_MATCH_FILTER_CRITERIA
            </p>
          </div>
        )}

      </div>

      {/* Futuristic HUD Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-dark/85 backdrop-blur-md font-mono"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-2xl bg-card-dark border-2 border-accent-green p-6 relative overflow-hidden tech-corner-container shadow-[0_0_50px_rgba(0,255,102,0.2)] space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-text-secondary hover:text-accent-green transition-colors text-xs cursor-pointer font-bold"
              >
                [ CLOSE_SYS_X ]
              </button>

              {/* Header Info */}
              <div className="flex gap-4 items-start border-b border-border-dark pb-5">
                <div className="w-16 h-16 border border-border-dark bg-card-dark flex items-center justify-center overflow-hidden rounded-xl shrink-0">
                  {selectedProduct.icon ? (
                    <img src={selectedProduct.icon} alt={selectedProduct.title} className="w-full h-full object-cover" />
                  ) : (
                    <Gamepad2 className="h-8 w-8 text-accent-green/60" />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-accent-green uppercase tracking-widest font-semibold">
                    {selectedProduct.genre || "GENRE_UNDEFINED"}
                  </div>
                  <h3 className="text-xl font-bold text-text-primary uppercase tracking-wide">
                    {selectedProduct.title}
                  </h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-text-secondary">
                    <span>ID: #{selectedProduct.id.toString().padStart(3, '0')}</span>
                    <span>•</span>
                    <span>RELEASE: {selectedProduct.releaseDate}</span>
                    <span>•</span>
                    <span className="uppercase">STATUS: {selectedProduct.status}</span>
                  </div>
                </div>
              </div>

                  {selectedProduct.description && (
                <div className="text-xs text-text-secondary leading-relaxed bg-bg-dark/20 border border-border-dark/30 p-3 italic">
                  &ldquo; {selectedProduct.description} &rdquo;
                </div>
              )}

              {/* Metrics & Developer Note callout boxes */}
              {(selectedProduct.metrics || selectedProduct.note) && (
                <div className="space-y-2 text-xs font-mono">
                  {selectedProduct.metrics && (
                    <div className="border border-accent-green/40 bg-accent-green/5 p-2.5 text-text-primary flex items-start gap-2">
                      <span className="text-accent-green font-bold shrink-0">// METRICS:</span>
                      <span className="text-accent-green">{selectedProduct.metrics}</span>
                    </div>
                  )}
                  {selectedProduct.note && (
                    <div className="border border-amber-500/40 bg-amber-500/5 p-2.5 text-text-primary flex items-start gap-2">
                      <span className="text-amber-400 font-bold shrink-0">// NOTE:</span>
                      <span className="text-text-primary/90">{selectedProduct.note}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Project Specifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                {/* Left Column: Role & Tech */}
                <div className="space-y-4">
                  <div>
                    <div className="text-text-secondary uppercase font-bold mb-1 tracking-wider text-[10px]">
                      // ROLE_SPECIFICATION
                    </div>
                    <div className="text-accent-green font-semibold bg-accent-green/5 border border-accent-green/20 px-3 py-2 uppercase font-mono">
                      {selectedProduct.role || "Awaiting Data Input..."}
                    </div>
                  </div>

                  {selectedProduct.teamSize && (
                    <div>
                      <div className="text-text-secondary uppercase font-bold mb-1 tracking-wider text-[10px]">
                        // TEAM_SIZE
                      </div>
                      <div className="text-text-primary bg-card-dark/60 border border-border-dark px-3 py-2 font-mono">
                        {selectedProduct.teamSize}
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="text-text-secondary uppercase font-bold mb-1.5 tracking-wider text-[10px]">
                      // TECHNOLOGIES_UTILIZED
                    </div>
                    {selectedProduct.technologies && selectedProduct.technologies.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {selectedProduct.technologies.map((tech, idx) => (
                          <span 
                            key={idx} 
                            className="px-2 py-1 bg-card-dark/60 border border-border-dark text-[10px] text-text-primary font-mono uppercase"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="text-text-secondary/70 italic px-1 font-mono">No tags configured. Update Project.txt to sync.</div>
                    )}
                  </div>
                </div>

                {/* Right Column: Achievements */}
                <div className="flex flex-col">
                  <div className="text-text-secondary uppercase font-bold mb-1 tracking-wider text-[10px]">
                    // CORE_PERFORMANCE_METRICS_AND_ACHIEVEMENTS
                  </div>
                  <div className="bg-bg-dark/40 border border-border-dark p-3.5 leading-relaxed text-text-primary/90 flex-grow font-sans min-h-[140px] max-h-[180px] overflow-y-auto">
                    {selectedProduct.achievements ? (
                      <div className="whitespace-pre-line text-xs">
                        {selectedProduct.achievements}
                      </div>
                    ) : (
                      <div className="text-text-secondary/70 italic font-mono text-xs">Awaiting metrics input in Project.txt ...</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between border-t border-border-dark pt-5 text-[10px]">
                <div className="text-[9px] text-text-secondary font-mono">
                  SYS_STATUS: DETAIL_TELEMETRY_ONLINE
                </div>
                <div className="flex items-center gap-3">
                  {selectedProduct.gameplay && (
                    <a 
                      href={selectedProduct.gameplay}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 border border-border-dark hover:border-accent-green/50 text-text-secondary hover:text-accent-green transition-all flex items-center gap-1.5 bg-bg-dark/50"
                      style={{ borderRadius: '0px' }}
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>GAMEPLAY_RECORDING</span>
                    </a>
                  )}
                  {selectedProduct.storeLink && (
                    <a 
                      href={selectedProduct.storeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-accent-green hover:bg-accent-green/90 text-bg-dark font-bold transition-all flex items-center gap-1.5"
                      style={{ borderRadius: '0px' }}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>ACCESS_STORE</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
