import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ProductTimeline from './components/ProductTimeline';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Education from './components/Education';
import Hobbies from './components/Hobbies';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

function MainContent() {
  const { data } = useLanguage();
  const { personalInfo } = data;

  return (
    <div className="game-backdrop min-h-screen bg-bg-dark text-text-primary selection:bg-accent-green selection:text-bg-dark font-sans relative">
      <div className="fixed inset-0 game-grid-pattern pointer-events-none z-0 opacity-40" />
      
      {/* Modern Navbar */}
      <Navbar />

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-20">
        <Hero />
        <Skills />
        <Projects />
        <ProductTimeline />
        <Experience />
        <Education />
        <Hobbies />
        <Contact />
      </main>

      {/* Modern Game Studio Footer */}
      <footer className="border-t border-border-dark mt-20 py-10 bg-card-dark/60 backdrop-blur-md relative z-10 text-xs text-text-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            <span className="font-semibold text-text-primary">{personalInfo.fullName}</span>
            <span className="text-text-muted">•</span>
            <span>{personalInfo.title || 'Unity Developer'}</span>
          </div>
          <div>
            © {new Date().getFullYear()} Ta Viet Hung. Built with React & Tailwind CSS.
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}

export default App;
