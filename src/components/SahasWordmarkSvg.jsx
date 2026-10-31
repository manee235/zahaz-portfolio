import React from 'react';

/**
 * SahasWordmarkSvg
 * Vector wordmark extracted from sahas-wordmark.svg.svg
 * ViewBox: 0 0 715.1 113.54 (spells Z A H A Z)
 */
export function SahasWordmarkSvg({ className = '', fill = '#000000', style = {} }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 715.1 113.54"
      className={className}
      style={{ display: 'block', width: '100%', height: 'auto', ...style }}
      aria-label="ZAHAS"
      role="img"
    >
      <g fill={fill}>
        {/* Z */}
        <path d="M0,113.54v-26.49L77.36,26.53H14.41L0,0h119.23l-.44,26.08-76.03,61.18,64.28-.21,14.41,26.49H0Z" />
        {/* A */}
        <path d="M244.3,113.54l-39.24-77.76-39.89,77.76h-29.54L193.61,0h22.49l57.74,113.54h-29.54Z" />
        {/* H */}
        <path d="M399.74,113.54v-43.52h-86.39v43.52h-26.47V0h26.47v43.49h86.39V0h26.91v113.54h-26.91Z" />
        {/* A */}
        <path d="M551.07,113.54l-39.24-77.76-39.89,77.76h-29.54L500.38,0h22.49l57.74,113.54h-29.54Z" />
        {/* Z */}
        <path d="M593.65,113.54v-26.49l77.36-60.52h-62.96l-14.41-26.53h119.23l-.44,26.08-76.03,61.18,64.28-.21,14.41,26.49h-121.44Z" />
      </g>
    </svg>
  );
}

export default SahasWordmarkSvg;

