import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Check,
  Sparkles,
  Box,
  Palette,
  Globe,
  Send,
  MessageCircle,
  Mail,
  Minus,
  Plus,
} from 'lucide-react';

const SERVICES = [
  {
    id: 'logo',
    title: 'Logo & Identity',
    subtitle: 'Brand marks, vectors & visual guidelines',
    icon: Sparkles,
  },
  {
    id: 'product',
    title: 'Product Designer',
    subtitle: '3D product modeling, rendering & industrial visuals',
    icon: Box,
  },
  {
    id: 'artwork',
    title: 'Artwork Design',
    subtitle: 'Visual art, editorial graphics & key visual assets',
    icon: Palette,
  },
  {
    id: 'virtual',
    title: 'Virtual & Spatial Environments',
    subtitle: '3D immersive spaces, digital direction & environments',
    icon: Globe,
  },
];

const BUDGET_TIERS = [
  { id: 't1', label: '< $1,000', desc: 'Starter / Single Asset' },
  { id: 't2', label: '$1,000 – $2,500', desc: 'Standard Project' },
  { id: 't3', label: '$2,500 – $5,000', desc: 'Comprehensive Virtual Design' },
  { id: 't4', label: '$5,000 – $10,000', desc: 'Full Scale Direction' },
  { id: 't5', label: '$10,000+', desc: 'Enterprise / Custom' },
];

export function HireMeModal({ isOpen = false, onClose = () => {} }) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedServices, setSelectedServices] = useState(['product']);
  const [budgetIndex, setBudgetIndex] = useState(1); // default '$1,000 – $2,500'
  const [brief, setBrief] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Reset or close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleService = (id) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const selectedTier = BUDGET_TIERS[budgetIndex] || BUDGET_TIERS[0];

  const handleNext = () => {
    if (step === 1 && (!name.trim() || !email.trim())) return;
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const generateWhatsAppMessage = () => {
    const serviceNames = selectedServices
      .map((id) => SERVICES.find((s) => s.id === id)?.title)
      .filter(Boolean)
      .join(', ');

    const text = `Hi Zahaz! I would like to hire you as Virtual Designer:
• Name: ${name}
• Email: ${email}
${phone ? `• Phone: ${phone}\n` : ''}• Services: ${serviceNames}
• Budget: ${selectedTier.label} (${selectedTier.desc})
${brief ? `• Project Details: ${brief}\n` : ''}
Looking forward to hearing from you!`;

    return `https://wa.me/94753558162?text=${encodeURIComponent(text)}`;
  };

  const generateMailto = () => {
    const serviceNames = selectedServices
      .map((id) => SERVICES.find((s) => s.id === id)?.title)
      .filter(Boolean)
      .join(', ');

    const subject = `[Virtual Design Project] From ${name}`;
    const body = `Hi Zahaz,

I want to discuss a Virtual Design project with you:

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Services: ${serviceNames}
Budget: ${selectedTier.label} (${selectedTier.desc})

Project Details:
${brief || 'Let’s discuss in detail!'}

Best regards,
${name}`;

    return `mailto:s_deshan@icloud.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const progressPercent = ((step - 1) / (totalSteps - 1)) * 100;

  return (
    <div
      className="hire-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="hire-modal-title"
    >
      <div className="hire-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Top Header with Progress Bar */}
        <div className="hire-modal-header">
          <div className="hire-header-top">
            <div className="hire-badge-step">
              <span className="hire-pulse-dot" />
              <span>
                STEP {step} OF {totalSteps}
              </span>
            </div>

            <button
              type="button"
              className="hire-close-btn"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Stepper Progress Bar */}
          <div className="stepper-progress-track">
            <div
              className="stepper-progress-fill"
              style={{ width: `${Math.max(10, progressPercent)}%` }}
            />
          </div>
        </div>

        {/* Modal Body */}
        <div className="hire-modal-body">
          {/* STEP 1: Name & Contact Details */}
          {step === 1 && (
            <div className="stepper-pane animate-fade-in">
              <h3 className="stepper-title" id="hire-modal-title">
                Let's Start With Your Details
              </h3>
              <p className="stepper-desc">
                Tell me about yourself so I can review your inquiry.
              </p>

              <div className="hire-input-group">
                <label className="hire-label" htmlFor="hire-client-name">
                  YOUR NAME <span className="req-star">*</span>
                </label>
                <input
                  id="hire-client-name"
                  type="text"
                  className="hire-text-input"
                  placeholder="e.g. Maneesh Amindu"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="hire-input-group">
                <label className="hire-label" htmlFor="hire-client-email">
                  EMAIL ADDRESS <span className="req-star">*</span>
                </label>
                <input
                  id="hire-client-email"
                  type="email"
                  className="hire-text-input"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="hire-input-group">
                <label className="hire-label" htmlFor="hire-client-phone">
                  WHATSAPP / PHONE (OPTIONAL)
                </label>
                <input
                  id="hire-client-phone"
                  type="tel"
                  className="hire-text-input"
                  placeholder="+94 75 355 8162"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* STEP 2: Service Type */}
          {step === 2 && (
            <div className="stepper-pane animate-fade-in">
              <h3 className="stepper-title">What Service Do You Need?</h3>
              <p className="stepper-desc">
                Select one or more services tailored to your project.
              </p>

              <div className="services-selection-grid">
                {SERVICES.map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedServices.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className={`service-option-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => toggleService(item.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && toggleService(item.id)}
                    >
                      <div className="service-card-icon">
                        <Icon size={20} />
                      </div>
                      <div className="service-card-text">
                        <h4 className="service-card-title">{item.title}</h4>
                        <p className="service-card-sub">{item.subtitle}</p>
                      </div>
                      <div className="service-card-check">
                        {isSelected && <Check size={16} strokeWidth={3} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Budget Selection by Stepper / Stripper */}
          {step === 3 && (
            <div className="stepper-pane animate-fade-in">
              <h3 className="stepper-title">Select Your Budget Range</h3>
              <p className="stepper-desc">
                Use the budget strip or stepper controls to select your scope.
              </p>

              {/* Active Selected Budget Highlight */}
              <div className="budget-highlight-display">
                <span className="budget-badge-pill">ESTIMATED BUDGET</span>
                <div className="budget-hero-amount">{selectedTier.label}</div>
                <div className="budget-hero-sub">{selectedTier.desc}</div>
              </div>

              {/* Interactive Budget Stripper (Segment Strip) */}
              <div className="budget-strip-container">
                <div className="budget-strip-track">
                  {BUDGET_TIERS.map((tier, idx) => {
                    const isCurrent = budgetIndex === idx;
                    const isPassed = budgetIndex >= idx;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        className={`budget-strip-step ${isCurrent ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
                        onClick={() => setBudgetIndex(idx)}
                        title={tier.label}
                      >
                        <span className="strip-step-dot" />
                        <span className="strip-step-label">{tier.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Incremental Stepper Controls */}
              <div className="budget-stepper-controls">
                <button
                  type="button"
                  className="stepper-ctrl-btn"
                  onClick={() => setBudgetIndex(Math.max(0, budgetIndex - 1))}
                  disabled={budgetIndex === 0}
                  aria-label="Decrease budget tier"
                >
                  <Minus size={16} />
                  <span>Lower</span>
                </button>

                <div className="stepper-level-indicator">
                  Tier {budgetIndex + 1} of {BUDGET_TIERS.length}
                </div>

                <button
                  type="button"
                  className="stepper-ctrl-btn"
                  onClick={() => setBudgetIndex(Math.min(BUDGET_TIERS.length - 1, budgetIndex + 1))}
                  disabled={budgetIndex === BUDGET_TIERS.length - 1}
                  aria-label="Increase budget tier"
                >
                  <span>Higher</span>
                  <Plus size={16} />
                </button>
              </div>

              {/* Optional Brief Details */}
              <div className="hire-input-group" style={{ marginTop: '20px' }}>
                <label className="hire-label" htmlFor="hire-client-brief">
                  PROJECT BRIEF / NOTES (OPTIONAL)
                </label>
                <textarea
                  id="hire-client-brief"
                  className="hire-textarea"
                  rows={2}
                  placeholder="Briefly describe what you're looking to build or design..."
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* STEP 4: Review & Direct Dispatch */}
          {step === 4 && (
            <div className="stepper-pane animate-fade-in">
              <h3 className="stepper-title">Review & Submit Your Project</h3>
              <p className="stepper-desc">
                Choose how you'd like to deliver your brief to Zahaz.
              </p>

              {/* Summary Card */}
              <div className="review-summary-card">
                <div className="summary-item">
                  <span className="summary-label">CLIENT</span>
                  <span className="summary-val">{name || 'Client'}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">EMAIL</span>
                  <span className="summary-val">{email || 'Not specified'}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">SERVICES</span>
                  <div className="summary-tags">
                    {selectedServices.map((id) => (
                      <span key={id} className="service-tag-pill">
                        {SERVICES.find((s) => s.id === id)?.title}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="summary-item">
                  <span className="summary-label">BUDGET</span>
                  <span className="summary-val budget-highlight">
                    {selectedTier.label}
                  </span>
                </div>
              </div>

              {/* Send Actions */}
              <div className="dispatch-actions-grid">
                {/* Send via WhatsApp */}
                <a
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dispatch-btn dispatch-whatsapp"
                  onClick={() => setIsSubmitted(true)}
                >
                  <MessageCircle size={18} />
                  <span>Send via WhatsApp</span>
                  <ChevronRight size={16} />
                </a>

                {/* Send via Email */}
                <a
                  href={generateMailto()}
                  className="dispatch-btn dispatch-email"
                  onClick={() => setIsSubmitted(true)}
                >
                  <Mail size={18} />
                  <span>Send via Email</span>
                  <ChevronRight size={16} />
                </a>
              </div>

              {isSubmitted && (
                <div className="submitted-notice">
                  <Check size={16} color="#38bdf8" />
                  <span>Thank you! Your inquiry is ready and dispatched.</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="hire-modal-footer">
          {step > 1 ? (
            <button
              type="button"
              className="stepper-back-btn"
              onClick={handlePrev}
            >
              <ChevronLeft size={16} />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <button
              type="button"
              className="stepper-next-btn"
              onClick={handleNext}
              disabled={step === 1 && (!name.trim() || !email.trim())}
            >
              <span>Next Step</span>
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              className="stepper-done-btn"
              onClick={onClose}
            >
              <span>Done</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default HireMeModal;
