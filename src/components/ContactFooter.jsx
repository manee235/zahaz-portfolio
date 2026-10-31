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

            {/* Direct Connect Options: Icons for Email, Phone, WhatsApp, Instagram, Facebook, Behance */}
            <div className="contact-connect-group">
              <span className="contact-connect-label">OR CONNECT WITH US</span>
              
              <div className="contact-icons-grid" role="list" aria-label="Direct contact and social channels">
                {/* 1. Email */}
                <a
                  href={`mailto:${email}`}
                  onClick={handleCopyEmail}
                  className={`contact-icon-pill contact-pill-email ${copiedEmail ? 'is-copied' : ''}`}
                  title={`Email: ${email} (Click to copy & mail)`}
                  role="listitem"
                >
                  <span className="contact-icon-symbol" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </span>
                  <span className="contact-icon-text">Email</span>
                  {copiedEmail && <span className="copy-badge">Copied!</span>}
                </a>

                {/* 2. Phone */}
                <a
                  href={`tel:${phone}`}
                  onClick={handleCopyPhone}
                  className={`contact-icon-pill contact-pill-phone ${copiedPhone ? 'is-copied' : ''}`}
                  title={`Phone: +94 ${phone.replace(/^0/, '')} (Click to copy & call)`}
                  role="listitem"
                >
                  <span className="contact-icon-symbol" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                  <span className="contact-icon-text">Phone</span>
                  {copiedPhone && <span className="copy-badge">Copied!</span>}
                </a>

                {/* 3. WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-icon-pill contact-pill-whatsapp"
                  title="Chat on WhatsApp (+94 753558162)"
                  role="listitem"
                >
                  <span className="contact-icon-symbol" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.49 0-2.95-.4-4.23-1.16l-.3-.18-3.14.82.84-3.06-.2-.31a8.19 8.19 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.01 4.54-3.69 8.23-8.18 8.23zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.17 1.73 2.65 4.2 3.71.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31z"/>
                    </svg>
                  </span>
                  <span className="contact-icon-text">WhatsApp</span>
                </a>

                {/* 4. Instagram */}
                <a
                  href="https://instagram.com/sahasradeshan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-icon-pill contact-pill-instagram"
                  title="Follow on Instagram (@sahasradeshan)"
                  role="listitem"
                >
                  <span className="contact-icon-symbol" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </span>
                  <span className="contact-icon-text">Instagram</span>
                </a>

                {/* 5. Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-icon-pill contact-pill-facebook"
                  title="Connect on Facebook"
                  role="listitem"
                >
                  <span className="contact-icon-symbol" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </span>
                  <span className="contact-icon-text">Facebook</span>
                </a>

                {/* 6. Behance */}
                <a
                  href="https://www.behance.net/sahasradeshan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-icon-pill contact-pill-behance"
                  title="View portfolio on Behance"
                  role="listitem"
                >
                  <span className="contact-icon-symbol" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M22 7h-7v2h7V7zm1.726 10c-.442 1.297-2.029 3-4.726 3-3.666 0-5.772-2.585-5.772-6.059 0-3.684 2.378-6.037 5.702-6.037 3.393 0 5.259 2.298 5.259 5.753 0 .548-.048 1.056-.129 1.543H15.93c.121 1.777 1.344 2.809 3.033 2.809 1.319 0 2.222-.647 2.684-1.554l2.079.545zM8.88 11.455c1.477-.426 2.39-1.579 2.39-2.973 0-2.398-1.89-3.482-4.577-3.482H0v14h7.039c2.81 0 4.88-1.285 4.88-3.953 0-1.743-1.127-3.08-3.039-3.592zm-5.61-4.47h3.197c1.365 0 2.254.516 2.254 1.727 0 1.157-.889 1.696-2.254 1.696H3.27V6.985zm3.486 9.03H3.27v-3.766h3.486c1.553 0 2.508.614 2.508 1.883 0 1.285-.955 1.883-2.508 1.883zm12.355-6.529c-1.397 0-2.39.907-2.541 2.393h5.048c-.067-1.488-1.096-2.393-2.507-2.393z"/>
                    </svg>
                  </span>
                  <span className="contact-icon-text">Behance</span>
                </a>
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

        {/* Bottom Bar: Copyright & Anka Labs Studio Attribution */}
        <div className="contact-footer-bottom">
          <div className="footer-copyright-group">
            <span className="footer-copyright">
              © ZAHAZ 2026. ALL RIGHTS RESERVED.
            </span>
            <span className="footer-dot-divider" aria-hidden="true">·</span>
            <span className="footer-credit">
              Designed &amp; Developed by{' '}
              <span className="anka-labs-badge">Anka Labs</span>
            </span>
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

