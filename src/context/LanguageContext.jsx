import React, { createContext, useContext, useState, useEffect } from 'react';
import portfolioVi from '../data/portfolio.json';
import portfolioEn from '../data/portfolio.en.json';

const LanguageContext = createContext();

const uiVi = {
  skillsTitle: 'HỆ THỐNG KỸ NĂNG & CHUYÊN MÔN',
  skillsLang: 'NGÔN NGỮ & CỐT LÕI',
  skillsEngine: 'ENGINE & FRAMEWORKS',
  skillsPlatform: 'NỀN TẢNG PHÁT HÀNH',
  skillsDomain: 'LĨNH VỰC CHUYÊN SÂU',

  timelineTitle: 'LỊCH SỬ PHÁT HÀNH',
  timelineSearch: 'TÌM SẢN PHẨM...',

  featuredTitle: 'DỰ ÁN NỔI BẬT & TIÊU BIỂU',

  experienceTitle: 'KINH NGHIỆM LÀM VIỆC',

  educationTitle: 'HỌC VẤN & CHỨNG CHỈ',
  degreeTitle: 'BẰNG CẤP CHUYÊN NGÀNH',
  certTitle: 'CHỨNG CHỈ CHUYÊN MÔN',

  hobbiesTitle: 'SỞ THÍCH & ĐAM MÊ',

  contactTitle: 'KẾT NỐI VỚI TÔI',
  contactDesc: 'Sẵn sàng trao đổi về các cơ hội hợp tác phát triển game, vị trí Unity Developer hoặc tư vấn giải pháp kỹ thuật Unity.',
  contactBtn: 'GỬI TIN NHẮN EMAIL',
};

const uiEn = {
  skillsTitle: 'TECHNICAL SKILLS & EXPERTISE',
  skillsLang: 'LANGUAGES & CORE',
  skillsEngine: 'ENGINE & FRAMEWORKS',
  skillsPlatform: 'TARGET PLATFORMS',
  skillsDomain: 'DOMAINS OF EXPERTISE',

  timelineTitle: 'RELEASE TIMELINE',
  timelineSearch: 'FIND PRODUCT...',

  featuredTitle: 'FEATURED HIGHLIGHTS',

  experienceTitle: 'WORK EXPERIENCE',

  educationTitle: 'EDUCATION & CERTIFICATIONS',
  degreeTitle: 'ACADEMIC DEGREE',
  certTitle: 'PROFESSIONAL CERTIFICATIONS',

  hobbiesTitle: 'HOBBIES & INTERESTS',

  contactTitle: 'CONNECT WITH ME',
  contactDesc: 'Open for discussions on new game development opportunities, Unity Developer roles, or technical Unity consultation.',
  contactBtn: 'SEND EMAIL MESSAGE',
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('portfolio_lang') || 'vi';
  });

  useEffect(() => {
    localStorage.setItem('portfolio_lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'vi' ? 'en' : 'vi'));
  };

  const data = language === 'en' ? portfolioEn : portfolioVi;
  const ui = language === 'en' ? uiEn : uiVi;
  const cvLink = language === 'en' ? './cv-en.html' : './cv.html';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, data, ui, cvLink }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
