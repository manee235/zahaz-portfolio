import React, { useState, useEffect, useRef, useCallback } from 'react';

export function HeroNav({ isLoaded = true, onOpenHireMe }) {
  const [activeTab, setActiveTab] = useState('home');
  const [sliderStyle, setSliderStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });

  const trackRef = useRef(null);
  const itemRefs = useRef({});

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      href: '#home',
      icon: (
        <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3.5L4 10v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9l-8-6.5z" />
          <path d="M9.5 14.5c.8 1 2.2 1 3 0" />
        </svg>
      ),
    },
    {
      id: 'about',
      label: 'About',
      href: '#about',
      icon: (
        <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      id: 'studio',
      label: 'Studio',
      href: '#studio',
      icon: (
        <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
        <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10.5" cy="10.5" r="6" />
          <line x1="15" y1="15" x2="20" y2="20" />
        </svg>
      ),
    },
    {
      id: 'contact',
      label: 'Contact',
      href: '#contact',
      icon: (
        <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      ),
    },
  ];

  // Update position of the sliding push indicator pill
  const updateSlider = useCallback((tabId) => {
    const node = itemRefs.current[tabId];
    const track = trackRef.current;
    if (node && track) {
      const nodeRect = node.getBoundingClientRect();
      const trackRect = track.getBoundingClientRect();
      setSliderStyle({
        left: Math.round(nodeRect.left - trackRect.left),
        top: Math.round(nodeRect.top - trackRect.top),
        width: Math.round(nodeRect.width),
        height: Math.round(nodeRect.height),
        opacity: 1,
      });
    }
  }, []);

  useEffect(() => {
    updateSlider(activeTab);
  }, [activeTab, updateSlider]);

  useEffect(() => {
    const handleResize = () => updateSlider(activeTab);
    window.addEventListener('resize', handleResize, { passive: true });
    const timer = setTimeout(() => updateSlider(activeTab), 150);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [activeTab, updateSlider]);

  // Active section tracking on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.38;
      const sections = [
        { id: 'contact', el: document.getElementById('contact') },
        { id: 'works', el: document.getElementById('works') || document.querySelector('.projects-fullscreen-section') },
        { id: 'studio', el: document.getElementById('studio') || document.querySelector('.section-manifesto') },
        { id: 'about', el: document.getElementById('about') || document.querySelector('.section-about') },
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
    else if (item.id === 'about') target = document.getElementById('about') || document.querySelector('.section-about');
    else if (item.id === 'studio') target = document.getElementById('studio') || document.querySelector('.section-manifesto');
    else if (item.id === 'works') target = document.getElementById('works') || document.querySelector('.projects-fullscreen-section');
    else if (item.id === 'contact') target = document.getElementById('contact');

    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isLoaded) return null;

  return (
    <nav className="floating-dock-nav" aria-label="Main Navigation">
      {/* Main Navigation Track Pill with Sliding Transition */}
      <div className="dock-nav-pill">
        <div className="dock-pill-track" ref={trackRef}>
          {/* Animated Sliding Push Pill Indicator */}
          <div
            className="dock-slider-pill"
            style={{
              transform: `translate3d(${sliderStyle.left}px, ${sliderStyle.top}px, 0)`,
              width: `${sliderStyle.width}px`,
              height: `${sliderStyle.height}px`,
              opacity: sliderStyle.opacity,
            }}
            aria-hidden="true"
          />

          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <a
                key={item.id}
                ref={(el) => {
                  if (el) itemRefs.current[item.id] = el;
                }}
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
      </div>

      {/* Standalone Separated "Hire Me" Pill */}
      <button
        type="button"
        className="dock-hire-separated-pill"
        onClick={onOpenHireMe}
        aria-label="Open Hire Me inquiry"
        title="Hire Me"
      >
        <span className="dock-hire-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="4" width="16" height="16" rx="4.5" />
            <line x1="12" y1="8.5" x2="12" y2="15.5" />
            <line x1="8.5" y1="12" x2="15.5" y2="12" />
          </svg>
        </span>
        <span className="dock-hire-label">Hire Me</span>
      </button>
    </nav>
  );
}

export default HeroNav;
