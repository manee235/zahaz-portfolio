import React from 'react';
import { Star } from 'lucide-react';

export function HeroStatsCluster() {
  return (
    <div className="hero-stats-cluster" aria-label="Key Performance Metrics">
      {/* Card 1: Satisfaction 99% (Tall Card) */}
      <div className="hero-stat-card hero-card-satisfaction">
        {/* Ambient Mint/Cyan Aura */}
        <div className="hero-stat-ambient-aura" aria-hidden="true" />
        
        <div className="hero-card-tag">
          <span className="hero-pill-tag">SATISFACTION</span>
        </div>

        <div className="hero-card-hero-num">
          <span className="hero-stat-large">99%</span>
        </div>

        <p className="hero-card-desc">
          Delivering high-performance virtual, 3D & product design solutions for international clients.
        </p>
      </div>

      {/* Card 2: Projects 99+ (Wide Card with Rising Bars) */}
      <div className="hero-stat-card hero-card-projects">
        <div className="hero-card-projects-meta">
          <span className="hero-tag-plain">PROJECTS</span>
          <span className="hero-stat-mid">99+</span>
        </div>

        {/* 9 Rising Bars Graphic */}
        <div className="hero-rising-bars" aria-hidden="true" title="Project delivery growth">
          <span className="hero-bar b1" />
          <span className="hero-bar b2" />
          <span className="hero-bar b3" />
          <span className="hero-bar b4" />
          <span className="hero-bar b5" />
          <span className="hero-bar b6" />
          <span className="hero-bar b7" />
          <span className="hero-bar b8" />
          <span className="hero-bar b9" />
        </div>
      </div>

      {/* Card 3: Years Exp (Square Card) */}
      <div className="hero-stat-card hero-card-experience">
        <span className="hero-stat-mid">4+</span>
        <span className="hero-stat-sublabel">YEARS EXP</span>
      </div>

      {/* Card 4: Client Reviews (Square Card with Star Badge) */}
      <div className="hero-stat-card hero-card-reviews">
        <div className="hero-star-badge" aria-hidden="true">
          <Star className="size-3.5 fill-white text-white" />
        </div>
        <div className="hero-reviews-info">
          <span className="hero-reviews-score">4.9 / 5.0</span>
          <span className="hero-reviews-label">Client Reviews</span>
        </div>
      </div>
    </div>
  );
}

export default HeroStatsCluster;

