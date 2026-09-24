import React, { useState } from 'react';
import { Mail, Send, Phone, Sparkles, Check, Copy, ExternalLink } from 'lucide-react';
import { Gitlab } from './BrandIcons';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { data, ui, language } = useLanguage();
  const { personalInfo } = data;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-12 sm:py-20 relative">
      <div className="w-full max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-green/10 border border-accent-green/25 text-accent-green text-xs font-semibold tracking-wide mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{language === 'en' ? 'GET IN TOUCH' : 'KẾT NỐI & LIÊN HỆ'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            {ui.contactTitle}
          </h2>
          <p className="text-text-secondary text-sm sm:text-base mt-2 max-w-xl mx-auto">
            {language === 'en' 
              ? 'Open to Unity Developer roles, technical consulting, and high-impact game productions.' 
              : 'Sẵn sàng trao đổi cơ hội việc làm Unity Developer và hợp tác phát triển game.'}
          </p>
        </div>

        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-border-subtle shadow-2xl space-y-8">
          {/* Quick Action Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Email Card */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="p-2.5 rounded-xl bg-accent-green/10 text-accent-green w-fit">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="text-xs text-text-muted font-medium pt-1">Email</div>
                <div className="text-sm font-bold text-white break-all">
                  {personalInfo.email}
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <a 
                  href={`mailto:${personalInfo.email}`} 
                  className="flex-1 px-3 py-1.5 rounded-lg bg-accent-green hover:bg-emerald-400 text-[#0a0d14] text-xs font-bold transition-all text-center flex items-center justify-center gap-1 shadow-sm"
                >
                  <Send className="h-3 w-3" />
                  <span>Gửi Mail</span>
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white text-xs transition-colors flex items-center justify-center cursor-pointer"
                  title="Copy email"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-accent-green" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            {/* Phone Card */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="p-2.5 rounded-xl bg-accent-cyan/10 text-accent-cyan w-fit">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="text-xs text-text-muted font-medium pt-1">Phone / Zalo</div>
                <div className="text-sm font-bold text-white">
                  {personalInfo.phone || '0398 962 424'}
                </div>
              </div>
              <a 
                href={`tel:${personalInfo.phone || '0398962424'}`} 
                className="w-full px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-colors text-center flex items-center justify-center gap-1.5 border border-white/10"
              >
                <Phone className="h-3 w-3 text-accent-cyan" />
                <span>Gọi điện</span>
              </a>
            </div>

            {/* GitLab Profile Card */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 w-fit">
                  <Gitlab className="h-5 w-5" />
                </div>
                <div className="text-xs text-text-muted font-medium pt-1">GitLab Repositories</div>
                <div className="text-sm font-bold text-white">
                  gitlab.com/tviethung20
                </div>
              </div>
              <a 
                href={personalInfo.gitlab} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-colors text-center flex items-center justify-center gap-1.5 border border-white/10"
              >
                <ExternalLink className="h-3 w-3 text-purple-400" />
                <span>Xem Profile</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

