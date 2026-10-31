import React, { useState, useEffect } from 'react';

export function HeroNav({ isLoaded = true }) {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      href: '#home',
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3.5L4 10v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9l-8-6.5z" />
          <path d="M9.5 14.5c.8 1 2.2 1 3 0" />
        </svg>
      ),
    },
    {
      id: 'studio',
      label: 'Studio',
      href: '#studio',
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="4.5" />
          <circle cx="8" cy="8.5" r="0.8" fill="currentColor" />
          <line x1="11.5" y1="8.5" x2="16" y2="8.5" />
          <circle cx="8" cy="12" r="0.8" fill="currentColor" />
          <line x1="11.5" y1="12" x2="16" y2="12" />
          <circle cx="8" cy="15.5" r="0.8" fill="currentColor" />
          <line x1="11.5" y1="15.5" x2="16" y2="15.5" />
        </svg>
      ),
    },
    {
      id: 'works',
      label: 'Works',
      href: '#works',
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10.5" cy="10.5" r="6" />
          <line x1="15" y1="15" x2="20" y2="20" />
        </svg>
      ),
    },
    {
      id: 'trust',
      label: 'Reviews',
      href: '#contact',
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3.5" y="6" width="16" height="14" rx="4" />
          <line x1="7.5" y1="11" x2="13.5" y2="11" />
          <line x1="7.5" y1="15" x2="11.5" y2="15" />
          <circle cx="18" cy="6" r="2.5" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      id: 'action',
      label: 'Hire Me',
      href: '#contact',
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="4.5" />
          <line x1="12" y1="8.5" x2="12" y2="15.5" />
          <line x1="8.5" y1="12" x2="15.5" y2="12" />
        </svg>
      ),
    },
  ];

  // Active section tracking on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      const sections = [
        { id: 'action', el: document.getElementById('book-call') },
        { id: 'trust', el: document.getElementById('contact') || document.querySelector('.section-trust') },
        { id: 'works', el: document.getElementById('works') || document.querySelector('.projects-fullscreen-section') },
        { id: 'studio', el: document.getElementById('studio') || document.querySelector('.section-manifesto') },
        { id: 'home', el: document.getElementById('home') || document.querySelector('.hero-wrapper') },
      ];

      for (const sec of sections) {
        if (sec.el) {
          const top = sec.el.offsetTop;
          if (scrollPos >= top) {
            setActiveTab(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, item) => {
    e.preventDefault();
    setActiveTab(item.id);
    let target = null;
    if (item.id === 'home') target = document.getElementById('home') || document.querySelector('.hero-wrapper');
    else if (item.id === 'studio') target = document.getElementById('studio') || document.querySelector('.section-manifesto');
    else if (item.id === 'works') target = document.getElementById('works') || document.querySelector('.projects-fullscreen-section');
    else if (item.id === 'trust') target = document.getElementById('contact') || document.querySelector('.section-trust');
    else if (item.id === 'action') target = document.getElementById('book-call') || document.querySelector('.btn-book-call') || document.getElementById('contact');

    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isLoaded) return null;

  return (
    <nav className="floating-dock-nav" aria-label="Main Navigation">
      <div className="dock-pill-track">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              className={`dock-btn ${isActive ? 'active' : ''}`}
              onClick={(e) => handleClick(e, item)}
              aria-label={item.label}
              title={item.label}
            >
              <span className="dock-icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="dock-label">{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
