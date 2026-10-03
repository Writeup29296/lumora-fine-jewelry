import React from 'react';

export const LumoraCrest = ({ className = "w-6 h-6", color = "#C5A059" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-hidden="true"
    >
      {/* Outer Emerald-Cut Octagonal Frame */}
      <polygon 
        points="30,4 70,4 96,30 96,70 70,96 30,96 4,70 4,30" 
        stroke={color} 
        strokeWidth="2.5" 
        strokeMiterlimit="10"
        fill="none"
      />
      {/* Inner Concentric Hairline Octagon */}
      <polygon 
        points="32,10 68,10 90,32 90,68 68,90 32,90 10,68 10,32" 
        stroke={color} 
        strokeWidth="1" 
        strokeOpacity="0.5"
        strokeMiterlimit="10"
        fill="none"
      />
      {/* Facet Reflection Rays from Vertices */}
      <line x1="30" y1="4" x2="32" y2="10" stroke={color} strokeWidth="1" strokeOpacity="0.6" />
      <line x1="70" y1="4" x2="68" y2="10" stroke={color} strokeWidth="1" strokeOpacity="0.6" />
      <line x1="96" y1="30" x2="90" y2="32" stroke={color} strokeWidth="1" strokeOpacity="0.6" />
      <line x1="96" y1="70" x2="90" y2="68" stroke={color} strokeWidth="1" strokeOpacity="0.6" />
      <line x1="70" y1="96" x2="68" y2="90" stroke={color} strokeWidth="1" strokeOpacity="0.6" />
      <line x1="30" y1="96" x2="32" y2="90" stroke={color} strokeWidth="1" strokeOpacity="0.6" />
      <line x1="4" y1="70" x2="10" y2="68" stroke={color} strokeWidth="1" strokeOpacity="0.6" />
      <line x1="4" y1="30" x2="10" y2="32" stroke={color} strokeWidth="1" strokeOpacity="0.6" />

      {/* Center Radiant Diamond Table */}
      <polygon
        points="50,18 78,50 50,82 22,50"
        stroke={color}
        strokeWidth="1.2"
        strokeOpacity="0.4"
        fill="none"
      />

      {/* Royal Serif Monogram "L" in Centre */}
      <path 
        d="M44 32 H54 V36 H49.5 V63 H62 C64 63 65.5 62.5 66 61 L67 64 H44 V60 H47 V36 H44 V32 Z" 
        fill={color} 
      />

      {/* Top and Bottom Crown Stars */}
      <circle cx="50" cy="14" r="1.5" fill={color} />
      <circle cx="50" cy="86" r="1.5" fill={color} />
    </svg>
  );
};
