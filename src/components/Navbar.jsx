import React, { useState, useEffect, useMemo } from 'react';
import { Menu, X, Gamepad2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { data, language, setLanguage } = useLanguage();
  const { personalInfo } = data;
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('prologue');

  const navItems = useMemo(() => [
    { id: 'prologue', label: language === 'en' ? 'Overview' : 'Tổng quan' },
    { id: 'skills', label: language === 'en' ? 'Skills' : 'Kỹ năng' },
    { id: 'featured', label: language === 'en' ? 'Showcase' : 'Dự án tiêu biểu' },
    { id: 'products', label: language === 'en' ? 'Timeline' : 'Sản phẩm' },
    { id: 'experience', label: language === 'en' ? 'Experience' : 'Kinh nghiệm' },
    { id: 'contact', label: language === 'en' ? 'Contact' : 'Liên hệ' }
  ], [language]);

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      const scrollPosition = window.scrollY + 150;
      const sections = navItems
        .map(item => document.getElementById(item.id))
        .filter(Boolean);

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (scrollPosition >= section.offsetTop) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navItems]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 75,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0d14]/80 backdrop-blur-xl border-b border-border-dark transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand / Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-9 h-9 rounded-xl bg-accent-green/10 border border-accent-green/30 flex items-center justify-center text-accent-green group-hover:scale-105 group-hover:bg-accent-green/20 transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <Gamepad2 className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-extrabold tracking-tight text-text-primary group-hover:text-accent-green transition-colors">
                {personalInfo.fullName.toUpperCase()}
              </div>
              <div className="text-[10px] font-medium text-accent-green tracking-wider uppercase">
                {personalInfo.title || 'Unity Developer'}
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 ${
                  activeSection === item.id 
                    ? 'text-accent-green bg-accent-green/10 border border-accent-green/30 font-bold shadow-[0_0_12px_rgba(16,185,129,0.1)]' 
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Language Switcher */}
          <div className="hidden sm:flex items-center gap-1.5 p-1 rounded-xl bg-card-dark border border-border-dark">
            <button
              onClick={() => setLanguage('vi')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                language === 'vi' 
                  ? 'bg-accent-green text-[#0a0d14] font-bold shadow-sm' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              🇻🇳 VI
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                language === 'en' 
                  ? 'bg-accent-green text-[#0a0d14] font-bold shadow-sm' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              🇬🇧 EN
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="flex sm:hidden items-center gap-1 p-0.5 rounded-lg bg-card-dark border border-border-dark text-xs">
              <button
                onClick={() => setLanguage('vi')}
                className={`px-2 py-0.5 rounded ${language === 'vi' ? 'bg-accent-green text-[#0a0d14] font-bold' : 'text-text-secondary'}`}
              >
                VI
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded ${language === 'en' ? 'bg-accent-green text-[#0a0d14] font-bold' : 'text-text-secondary'}`}
              >
                EN
              </button>
            </div>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-secondary hover:text-text-primary p-2 rounded-lg bg-card-dark border border-border-dark transition-colors"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-card-dark/95 backdrop-blur-xl border-b border-border-dark py-4 px-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left py-2.5 px-4 text-sm rounded-lg transition-all ${
                activeSection === item.id 
                  ? 'text-accent-green bg-accent-green/10 border border-accent-green/30 font-bold' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

