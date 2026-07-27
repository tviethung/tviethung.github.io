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
import portfolioData from './data/portfolio.json';

function App() {
  const { personalInfo } = portfolioData;

  return (
    <div className="hud-scanlines min-h-screen bg-bg-dark text-text-primary selection:bg-accent-green selection:text-bg-dark">
      {/* HUD Navbar */}
      <Navbar />

      {/* Main Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sections */}
        <Hero />
        <Skills />
        <ProductTimeline />
        <Projects />
        <Experience />
        <Education />
        <Hobbies />
        <Contact />

      </main>

      {/* Tech Footer */}
      <footer className="border-t border-border-dark py-8 bg-card-dark/30 font-mono text-[10px] text-text-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            STATUS: SECURE_LINK_ESTABLISHED // TARGET: GITHUB_PAGES
          </div>
          <div>
            © {new Date().getFullYear()} {personalInfo.fullName.toUpperCase()}. ALL RIGHTS RESERVED.
          </div>
          <div>
            BUILT_WITH: REACT_19 + TAILWIND_V4
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
