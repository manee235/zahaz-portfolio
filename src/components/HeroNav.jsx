import React, { useState, useRef, useEffect } from 'react';

export function HeroNav() {
  const [activeTab, setActiveTab] = useState('home');
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef(null);
  const linksRef = useRef({});

  const navItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'studio', label: 'Studio', href: '#studio' },
    { id: 'works', label: 'Works', href: '#works' },
    { id: 'blog', label: 'Blog', href: '#blog' },
  ];

  const updateSlider = (id) => {
    const el = linksRef.current[id];
    const nav = navRef.current;
    if (el && nav) {
      const navRect = nav.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setSliderStyle({
        left: elRect.left - navRect.left,
        width: elRect.width,
      });
    }
  };

  useEffect(() => {
    updateSlider(activeTab);
    const handleResize = () => updateSlider(activeTab);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab]);

  return (
    <div className="hero-top-row">
      <nav className="hero-nav" ref={navRef} aria-label="Main navigation" onMouseLeave={() => updateSlider(activeTab)}>
        <div
          className="nav-slider"
          style={{
            transform: `translateX(${sliderStyle.left}px)`,
            width: `${sliderStyle.width}px`,
          }}
        />
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            ref={(el) => (linksRef.current[item.id] = el)}
            className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab(item.id);
              const target = document.querySelector(item.href) || document.getElementById(item.id);
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            onMouseEnter={() => updateSlider(item.id)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="hero-date">Sunday / 17.06 – 27 June 2026</div>

      <a href="#contact" className="btn-contact" aria-label="Contact Us">
        <span className="btn-contact-text">Contact Us</span>
        <span className="btn-contact-arrow">↗</span>
      </a>
    </div>
  );
}

