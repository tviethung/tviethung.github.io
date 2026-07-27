import React from 'react';
import { Mail, Terminal, Send } from 'lucide-react';
import { Gitlab } from './BrandIcons';
import portfolioData from '../data/portfolio.json';

export default function Contact() {
  const { personalInfo } = portfolioData;

  return (
    <section id="contact" className="py-20 bg-card-dark/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="mb-12 font-mono text-center">
          <div className="text-accent-green text-xs mb-2">06 // OUTGOING_SIGNAL</div>
          <h2 className="text-3xl font-bold uppercase tracking-wider text-text-primary">
            Liên hệ
          </h2>
          <div className="w-20 h-1 bg-accent-green mt-3 mx-auto"></div>
        </div>

        <div className="max-w-2xl mx-auto font-mono">
          {/* Metadata Contact Info */}
          <div className="border border-border-dark p-8 bg-card-dark/40 space-y-6 tech-corner-container">
            <div className="flex items-center space-x-2 text-accent-green pb-2 border-b border-border-dark">
              <Terminal className="h-5 w-5" />
              <span className="font-bold text-sm uppercase">Thông tin liên lạc</span>
            </div>


            <div className="space-y-4 text-xs">
              <div className="flex items-center space-x-3 text-text-secondary border-b border-border-dark/50 pb-3">
                <Mail className="h-4 w-4 text-accent-green shrink-0" />
                <div>
                  <span className="block text-[9px] text-text-secondary/60">EMAIL_ADDRESS</span>
                  <a href={`mailto:${personalInfo.email}`} className="text-text-primary hover:text-accent-green transition-colors">
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              {personalInfo.telegram && (
                <div className="flex items-center space-x-3 text-text-secondary border-b border-border-dark/50 pb-3">
                  <Send className="h-4 w-4 text-accent-green shrink-0" />
                  <div>
                    <span className="block text-[9px] text-text-secondary/60">TELEGRAM</span>
                    <a href={personalInfo.telegram} target="_blank" rel="noopener noreferrer" className="text-text-primary hover:text-accent-green transition-colors break-all">
                      {personalInfo.telegram}
                    </a>
                  </div>
                </div>
              )}

              {personalInfo.gitlab && (
                <div className="flex items-center space-x-3 text-text-secondary">
                  <Gitlab className="h-4 w-4 text-accent-green shrink-0" />
                  <div>
                    <span className="block text-[9px] text-text-secondary/60">GITLAB_PROFILE</span>
                    <a href={personalInfo.gitlab} target="_blank" rel="noopener noreferrer" className="text-text-primary hover:text-accent-green transition-colors break-all">
                      {personalInfo.gitlab}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
