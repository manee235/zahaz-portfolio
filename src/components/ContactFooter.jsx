import React, { useState } from 'react';

export function ContactFooter({ onOpenHireMe }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const email = 's_deshan@icloud.com';
  const phone = '0753558162';
  const whatsappUrl = `https://wa.me/94753558162?text=${encodeURIComponent(
    "Hi Zahaz, I'm reaching out regarding a Virtual Design project!"
  )}`;

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard?.writeText?.(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleCopyPhone = (e) => {
    e.preventDefault();
    navigator.clipboard?.writeText?.(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2400);
  };

  return (
    <footer className="site-contact-footer" id="contact">
      <div className="contact-footer-container">
        {/* Main 3-Column Content Row */}
        <div className="contact-footer-grid">
          {/* Column 1: Contact Us & Direct Action */}
          <div className="contact-col-primary">
            <span className="contact-meta-tag">CONTACT US</span>
            <h2 className="contact-main-heading">
              Let’s Discuss Your<br />
              Vision. With Us
            </h2>

            {/* Primary CTA: Hire Me Stepper Modal Trigger */}
            <div className="contact-cta-wrap">
              <button
                type="button"
                className="btn-hire-me"
                id="book-call"
                onClick={onOpenHireMe}
              >
                <span>Hire Me</span>
                <span className="cta-arrow" aria-hidden="true">→</span>
              </button>
            </div>

            {/* Direct Connect Options: Email & WhatsApp */}
            <div className="contact-direct-links">
              {/* Email Pill */}
              <div className="direct-link-block">
                <span className="direct-link-label">OR EMAIL US AT</span>
                <div
                  className="contact-pill-btn"
                  onClick={handleCopyEmail}
                  title="Click to copy email address"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleCopyEmail(e)}
                >
                  <a href={`mailto:${email}`} className="pill-text-link" onClick={(e) => e.stopPropagation()}>
                    {email}
                  </a>
                  <button
                    type="button"
                    className="pill-action-icon"
                    aria-label="Copy email"
                    onClick={handleCopyEmail}
                  >
                    {copiedEmail ? (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#38bdf8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    )}
                  </button>
                  {copiedEmail && <span className="copy-badge">Copied!</span>}
                </div>
              </div>

              {/* WhatsApp Phone Pill */}
              <div className="direct-link-block">
                <span className="direct-link-label">OR CHAT ON WHATSAPP</span>
                <div
                  className="contact-pill-btn"
                  onClick={handleCopyPhone}
                  title="Click to copy phone number or click link to open WhatsApp"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleCopyPhone(e)}
                >
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill-text-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    +94 {phone.replace(/^0/, '')}
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill-action-icon"
                    aria-label="Open WhatsApp chat"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                  {copiedPhone && <span className="copy-badge">Copied!</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="contact-col-nav">
            <span className="contact-meta-tag">QUICK LINKS</span>
            <ul className="footer-nav-list">
              <li><a href="#home">Home</a></li>
              <li><a href="#studio">Studio</a></li>
              <li><a href="#works">Case Studies</a></li>
              <li><a href="#works">Gallery</a></li>
              <li><a href="#contact">About Me</a></li>
            </ul>
          </div>

          {/* Column 3: Information & Virtual Design Services */}
          <div className="contact-col-nav">
            <span className="contact-meta-tag">INFORMATION</span>
            <ul className="footer-nav-list">
              <li><a href="#studio">Virtual Design</a></li>
              <li><a href="#studio">3D Environments</a></li>
              <li><a href="#works">Spatial Direction</a></li>
              <li><a href="#contact">Terms of Service</a></li>
              <li><a href="#contact">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="contact-footer-bottom">
          <div className="footer-copyright">
            © ZAHAZ 2026. ALL RIGHTS RESERVED. · VIRTUAL DESIGNER
          </div>

          <div className="footer-social-links" aria-label="Social media profiles">
            {/* Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>

            {/* X / Twitter */}
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
              </svg>
            </a>

            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default ContactFooter;

