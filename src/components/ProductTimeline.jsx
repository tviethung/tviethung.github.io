import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Play, ExternalLink, Search, AlertTriangle, LayoutGrid, GitCommit, Sparkles, X, Trophy, Wrench, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getFeaturedProducts, getTimelineProducts, timelineFilters } from '../data/portfolioPresentation';

export default function ProductTimeline() {
  const { data, ui, language } = useLanguage();
  const { products } = data;
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState('GRID'); // 'GRID', 'TIMELINE'
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = getTimelineProducts(products, statusFilter).filter((product) => {
    const matchesSearch = 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.genre && product.genre.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSearch;
  });

  const getPresentationStatus = (status) =>
    status.toLowerCase() === 'removed' ? 'Archived' : status;

  const getStatusBadge = (status) => {
    const s = status.toLowerCase();
    if (s === 'live') {
      return (
        <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-accent-green/10 border border-accent-green/30 text-accent-green">
          Live
        </span>
      );
    } else if (s.includes('reup')) {
      return (
        <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400">
          Re-up
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-slate-500/10 border border-slate-500/30 text-slate-400">
        Archived
      </span>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 }
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
      <div className="flex flex-col justify-between h-full space-y-4">
        <div>
          {/* Top ID & Status Badge */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-[11px] font-medium text-text-muted">
              #{product.id.toString().padStart(2, '0')}
            </span>
            <div className="flex items-center gap-1.5">
              {getFeaturedProducts(products).some(({ id }) => id === product.id) && (
                <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center gap-1">
                  ★ Featured
                </span>
              )}
              {getStatusBadge(product.status)}
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            {/* Game Icon */}
            <div className="w-14 h-14 bg-gradient-to-br from-[#162035] to-[#0d1320] border border-white/10 rounded-xl flex-shrink-0 relative overflow-hidden flex items-center justify-center shadow-md">
              {product.icon ? (
                <img 
                  src={product.icon} 
                  alt={product.title} 
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = `<span class="text-accent-green text-base font-bold">${product.title[0]}</span>`;
                  }}
                />
              ) : (
                <Gamepad2 className="h-6 w-6 text-accent-green/70" />
              )}
            </div>

            <div className="flex-grow min-w-0">
              <h3 className="font-bold text-white group-hover:text-accent-green transition-colors text-sm truncate">
                {product.title}
              </h3>
              <div className="text-[11px] text-accent-green/90 font-medium truncate mt-0.5">
                {product.genre || 'Mobile Game'}
              </div>
              <div className="text-[10px] text-text-muted mt-1">
                {product.role || 'Senior Unity Developer'}
              </div>
            </div>
          </div>

          {/* Release Date */}
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-text-muted border-t border-border-dark/50 pt-2.5">
            <Clock className="h-3 w-3 text-accent-green" />
            <span>{product.releaseDate || '2023 - 2025'}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-border-dark/40 flex items-center justify-end gap-2">
          {product.gameplay && (
            <a
              href={product.gameplay}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-accent-green/10 text-text-secondary hover:text-accent-green border border-border-dark hover:border-accent-green/30 transition-all text-xs flex items-center gap-1 font-semibold"
            >
              <Play className="h-3 w-3 fill-current" />
              <span>Demo</span>
            </a>
          )}
          {product.storeLink && (
            <a
              href={product.storeLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-3 py-1 rounded-lg bg-accent-green/10 hover:bg-accent-green text-accent-green hover:text-[#0a0d14] border border-accent-green/30 hover:border-accent-green transition-all text-xs flex items-center gap-1 font-bold shadow-sm"
            >
              <ExternalLink className="h-3 w-3" />
              <span>Store</span>
            </a>
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="products" className="py-12 sm:py-16 relative">
      <div className="w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-green/10 border border-accent-green/25 text-accent-green text-xs font-semibold tracking-wide mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{language === 'en' ? 'RELEASE TIMELINE' : 'LỊCH SỬ SẢN PHẨM'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
              {ui.timelineTitle}
            </h2>
            <p className="text-text-secondary text-sm mt-2 max-w-xl">
              {language === 'en' 
                ? 'Comprehensive catalog of 19+ mobile games developed and published on Android. Archived titles are prototypes retired after market testing (CPI/retention below benchmark) — a rapid 2–3 month release cycle.' 
                : 'Toàn bộ danh mục 19+ game di động đã phát triển và phát hành trên Google Play. Các game Archived là prototype dừng sau market-test (CPI/retention chưa đạt benchmark) — chu kỳ phát hành nhanh 2–3 tháng/game.'}
            </p>
          </div>

          {/* Filtering, Search & Layout Switcher */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-stretch sm:items-center">
            {/* Search Input */}
            <div className="relative flex-grow sm:flex-grow-0">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-muted" />
              <input 
                type="text"
                placeholder={ui.timelineSearch}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-56 pl-9 pr-4 py-2 bg-card-dark border border-border-dark rounded-xl text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-green/60 transition-all font-sans"
              />
            </div>

            <div className="flex gap-2">
              {/* Filter Tabs */}
              <div className="flex p-1 rounded-xl bg-card-dark border border-border-dark">
                {timelineFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setStatusFilter(filter)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                      statusFilter === filter 
                        ? 'bg-accent-green text-[#0a0d14] font-bold shadow-sm' 
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* View Mode Switcher */}
              <div className="flex p-1 rounded-xl bg-card-dark border border-border-dark">
                <button
                  onClick={() => setViewMode('GRID')}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'GRID' 
                      ? 'bg-accent-green text-[#0a0d14]' 
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('TIMELINE')}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'TIMELINE' 
                      ? 'bg-accent-green text-[#0a0d14]' 
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                  title="Timeline View"
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => setSelectedProduct(product)}
                  className="glass-panel glass-panel-hover p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between cursor-pointer group border border-border-subtle"
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
              className="space-y-8 relative"
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
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="relative grid grid-cols-1 md:grid-cols-2 gap-0 items-start group"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-6 md:left-1/2 top-[30px] -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-bg-dark border-2 border-accent-green z-20 shadow-[0_0_10px_rgba(16,185,129,0.4)] group-hover:scale-125 transition-all duration-300" />
                      
                      {/* Card Container with Alternating alignment */}
                      <div className={`pl-12 pr-4 md:px-0 w-full flex ${
                        isEven 
                          ? 'md:col-start-1 md:pr-8 md:justify-end' 
                          : 'md:col-start-2 md:pl-8 md:justify-start'
                      }`}>
                        <div 
                          onClick={() => setSelectedProduct(product)}
                          className="w-full max-w-md glass-panel glass-panel-hover p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between cursor-pointer group border border-border-subtle"
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
          <div className="text-center py-16 rounded-2xl glass-panel border border-dashed border-border-dark text-text-secondary">
            <AlertTriangle className="h-8 w-8 text-accent-green mx-auto mb-3" />
            <p className="text-xs font-semibold">
              {language === 'en' ? 'No games found matching filter criteria' : 'Không tìm thấy sản phẩm phù hợp bộ lọc'}
            </p>
          </div>
        )}

      </div>

      {/* Modern Game Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0d14]/80 backdrop-blur-xl"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-2xl bg-card-dark border border-white/10 p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Header Info */}
              <div className="flex gap-4 items-start border-b border-border-dark/60 pb-5">
                <div className="w-18 h-18 border border-white/10 bg-bg-dark rounded-2xl flex items-center justify-center overflow-hidden shrink-0 shadow-lg">
                  {selectedProduct.icon ? (
                    <img src={selectedProduct.icon} alt={selectedProduct.title} className="w-full h-full object-cover" />
                  ) : (
                    <Gamepad2 className="h-8 w-8 text-accent-green" />
                  )}
                </div>
                <div className="space-y-1.5 pr-8">
                  <div className="text-xs text-accent-green font-semibold uppercase tracking-wider">
                    {selectedProduct.genre || "Mobile Game"}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {selectedProduct.title}
                  </h3>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-text-muted">
                    <span>Release: {selectedProduct.releaseDate}</span>
                    <span>•</span>
                    <span>Status: {getPresentationStatus(selectedProduct.status)}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              {selectedProduct.description && (
                <div className="text-xs sm:text-sm text-text-secondary leading-relaxed p-4 rounded-xl bg-white/[0.03] border border-white/5">
                  {selectedProduct.description}
                </div>
              )}

              {/* Metrics & Technical Highlights Note */}
              {(selectedProduct.metrics || selectedProduct.note) && (
                <div className="space-y-2.5 text-xs">
                  {selectedProduct.metrics && (
                    <div className="p-3 rounded-xl bg-accent-green/10 border border-accent-green/20 text-accent-green flex items-start gap-2.5 font-semibold">
                      <Trophy className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{selectedProduct.metrics}</span>
                    </div>
                  )}
                  {selectedProduct.note && (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-text-primary flex items-start gap-2.5">
                      <Wrench className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-relaxed text-text-secondary">{selectedProduct.note}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Project Specifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                  <div>
                    <div className="text-[10px] text-text-muted uppercase font-bold tracking-wider mb-1">
                      {language === 'en' ? 'ROLE IN PROJECT' : 'VAI TRÒ TRONG DỰ ÁN'}
                    </div>
                    <div className="font-semibold text-accent-green">
                      {selectedProduct.role || "Senior Unity Developer"}
                    </div>
                  </div>

                  {selectedProduct.teamSize && (
                    <div>
                      <div className="text-[10px] text-text-muted uppercase font-bold tracking-wider mb-1">
                        {language === 'en' ? 'TEAM SIZE' : 'QUY MÔ ĐỘI NGŨ'}
                      </div>
                      <div className="text-text-primary">
                        {selectedProduct.teamSize}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-[10px] text-text-muted uppercase font-bold tracking-wider mb-2">
                    {language === 'en' ? 'TECHNOLOGY STACK' : 'CÔNG NGHỆ ÁP DỤNG'}
                  </div>
                  {selectedProduct.technologies && selectedProduct.technologies.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.technologies.map((tech, idx) => (
                        <span 
                          key={idx} 
                          className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] text-text-secondary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-text-muted text-[11px]">Unity, C#, Mobile SDKs</div>
                  )}
                </div>
              </div>

              {/* Achievements / Technical Contributions */}
              {selectedProduct.achievements && (
                <div className="space-y-1.5 text-xs">
                  <div className="text-[10px] text-text-muted uppercase font-bold tracking-wider">
                    {language === 'en' ? 'TECHNICAL CONTRIBUTIONS & RESULTS' : 'ĐÓNG GÓP KỸ THUẬT & KẾT QUẢ'}
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-text-secondary leading-relaxed whitespace-pre-line text-xs">
                    {selectedProduct.achievements}
                  </div>
                </div>
              )}

              {/* Actions Footer */}
              <div className="flex items-center justify-end gap-3 border-t border-border-dark/60 pt-5">
                {selectedProduct.gameplay && (
                  <a 
                    href={selectedProduct.gameplay}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl border border-border-dark hover:border-accent-green/40 text-text-secondary hover:text-accent-green bg-white/5 transition-all flex items-center gap-2 text-xs font-semibold"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    <span>Gameplay Video</span>
                  </a>
                )}
                {selectedProduct.storeLink && (
                  <a 
                    href={selectedProduct.storeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-accent-green hover:bg-emerald-400 text-[#0a0d14] font-bold transition-all flex items-center gap-2 text-xs shadow-md"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Open on Google Play</span>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

