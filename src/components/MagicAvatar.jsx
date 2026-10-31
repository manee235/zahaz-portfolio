import React from 'react';
import { MEDIA } from '../constants/media';

export function MagicAvatar({
  className = '',
  style = {},
  driftY = 0,
  tiltStyle = {},
}) {
  return (
    <div
      className={`magic-avatar-container ${className}`}
      style={{
        ...style,
        ...tiltStyle,
        '--drift-y': `${driftY}px`,
      }}
    >
      {/* Clean Portrait */}
      <img
        className="magic-avatar-img magic-avatar-base"
        src={MEDIA.heroPhoto}
        alt="Sahas - Creative Director & Founder"
        loading="eager"
      />
    </div>
  );
}
