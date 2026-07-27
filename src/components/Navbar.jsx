import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

export default function Navbar() {
  const { personalInfo } = portfolioData;
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('prologue');
  const [ping, setPing] = useState(12);

  const navItems = [
    { id: 'prologue', label: 'PROLOGUE' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'products', label: 'TIMELINE' },
    { id: 'projects', label: 'FEATURED' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'education', label: 'EDUCATION' },
    { id: 'hobbies', label: 'HOBBIES' },
    { id: 'contact', label: 'CONTACT' }
  ];

  useEffect(() => {
    // Simulated ping updates for tech/HUD flavor
    const interval = setInterval(() => {
      setPing(prev => {
        const diff = Math.floor(Math.random() * 5) - 2;
        const next = prev + diff;
        return next > 4 && next < 30 ? next : prev;
      });
    }, 3000);

    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let section of sections) {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  const getLogoName = () => {
    const parts = personalInfo.fullName.split(' ');
    if (parts.length >= 2) {
      const lastName = parts[parts.length - 1]; // Hùng
      const firstName = parts[0]; // Tạ
      const middleName = parts[1] || ''; // Việt
      const clean = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
      return `${clean(lastName)}.${clean(firstName[0])}${middleName ? clean(middleName[0]) : ''}`;
    }
    return personalInfo.fullName.toUpperCase();
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-bg-dark/85 backdrop-blur-md border-b border-border-dark font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Name */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Cpu className="h-6 w-6 text-accent-green animate-pulse" />
            <span className="text-lg font-bold tracking-widest text-text-primary">
              {getLogoName()} <span className="text-accent-green">//</span> DEV
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm px-3 py-1 transition-all duration-300 relative border-b-2 hover:text-accent-green hover:border-accent-green/50 ${
                  activeSection === item.id 
                    ? 'text-accent-green border-accent-green font-bold' 
                    : 'text-text-secondary border-transparent'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* HUD System Status */}
          <div className="hidden lg:flex items-center space-x-4 text-xs text-text-secondary border border-border-dark px-3 py-1.5 bg-card-dark/50">
            <span className="flex items-center space-x-1.5">
              <span className="h-2 w-2 bg-accent-green rounded-full animate-ping"></span>
              <span className="text-accent-green font-semibold">ONLINE</span>
            </span>
            <span className="border-l border-border-dark pl-2">PING: <span className="text-text-primary">{ping}ms</span></span>
            <span className="border-l border-border-dark pl-2">FPS: <span className="text-text-primary">60.0</span></span>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-secondary hover:text-text-primary p-2 border border-border-dark hover:border-accent-green/50 transition-colors"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-card-dark border-b border-border-dark py-4 px-6 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left py-2 px-3 text-sm transition-all duration-200 border-l-2 ${
                activeSection === item.id 
                  ? 'text-accent-green border-accent-green bg-accent-green/5 font-bold' 
                  : 'text-text-secondary border-transparent hover:text-accent-green hover:border-accent-green/30'
              }`}
            >
              {item.label}
            </button>
          ))}
          {/* Mobile HUD status */}
          <div className="flex items-center space-x-4 text-[10px] text-text-secondary pt-3 border-t border-border-dark">
            <span className="flex items-center space-x-1">
              <span className="h-1.5 w-1.5 bg-accent-green rounded-full animate-ping"></span>
              <span className="text-accent-green">ONLINE</span>
            </span>
            <span>PING: {ping}ms</span>
            <span>UNITY: 2022.3 LTS</span>
          </div>
        </div>
      )}
    </nav>
  );
}
