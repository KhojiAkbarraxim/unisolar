import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  variant?: 'light' | 'dark'; // 'light' is for light backgrounds, 'dark' is for dark backgrounds
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', iconOnly = false, variant = 'light', size = 'md' }: LogoProps) {
  // Size dimensions
  const dims = {
    sm: { icon: 'w-8 h-8', text: 'text-lg', sub: 'text-[9px]' },
    md: { icon: 'w-11 h-11', text: 'text-2xl', sub: 'text-[10px]' },
    lg: { icon: 'w-16 h-16', text: 'text-3xl', sub: 'text-[12px]' }
  }[size];

  // Colors based on variant
  const titleColor = variant === 'light' ? 'text-slate-900' : 'text-white';
  const sublineColor = variant === 'light' ? 'text-slate-500' : 'text-slate-400';

  // Sun rays dynamic calculation
  const sunCenterY = 46;
  const sunCenterX = 60;
  const startRadius = 23;
  const endRadius = 32;
  const rays = Array.from({ length: 9 }).map((_, i) => {
    // 9 rays distributed from -75 deg to +75 deg
    const angleDeg = -75 + i * 18.75;
    const angleRad = (angleDeg * Math.PI) / 180;
    const x1 = sunCenterX + startRadius * Math.sin(angleRad);
    const y1 = sunCenterY - startRadius * Math.cos(angleRad);
    const x2 = sunCenterX + endRadius * Math.sin(angleRad);
    const y2 = sunCenterY - endRadius * Math.cos(angleRad);
    return { x1, y1, x2, y2, id: i };
  });

  return (
    <div className={`flex items-center space-x-3 select-none ${className}`} id="unisolar-brand-logo">
      {/* Icon Wrapper */}
      <div className={`relative shrink-0 ${dims.icon}`} id="unisolar-logo-icon">
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          <defs>
            {/* Sun Rays & Body Gradient */}
            <linearGradient id="logo-sun-gradient" x1="60" y1="10" x2="60" y2="55" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFD200" />
              <stop offset="100%" stopColor="#FF9000" />
            </linearGradient>

            {/* U-Shape Blue Gradient */}
            <linearGradient id="logo-u-gradient" x1="60" y1="35" x2="60" y2="105" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0A52C5" />
              <stop offset="100%" stopColor="#001B65" />
            </linearGradient>

            {/* Dynamic Transparent Leaf Mask */}
            <mask id="logo-leaf-mask">
              {/* Everything white in the mask is kept */}
              <rect x="0" y="0" width="120" height="120" fill="#FFFFFF" />
              {/* Black shape creates transparent cutout */}
              <path
                d="M 44,42 C 43,58 48,70 60,74 C 72,78 84,68 87,42 C 77,53 62,53 44,42 Z"
                fill="#000000"
              />
            </mask>
          </defs>

          {/* 1. Golden Sun Rays */}
          <g stroke="url(#logo-sun-gradient)" strokeWidth="3" strokeLinecap="round" opacity="0.95">
            {rays.map((ray) => (
              <line
                key={ray.id}
                x1={ray.x1.toFixed(2)}
                y1={ray.y1.toFixed(2)}
                x2={ray.x2.toFixed(2)}
                y2={ray.y2.toFixed(2)}
              />
            ))}
          </g>

          {/* 2. Sun Disk (Overlapped by U but masked/drawn beautifully) */}
          <circle
            cx={sunCenterX}
            cy={sunCenterY}
            r="19"
            fill="url(#logo-sun-gradient)"
          />

          {/* 3. U-Shape (With transparent leaf mask cut-out) */}
          <path
            d="M 29,42 
               L 29,66 
               C 29,86 43,96 60,96 
               C 77,96 91,86 91,66 
               L 91,42 
               L 77,42 
               L 77,66 
               C 77,75 70,82 60,82 
               C 50,82 43,75 43,66 
               L 43,42 
               Z"
            fill="url(#logo-u-gradient)"
            mask="url(#logo-leaf-mask)"
          />
        </svg>
      </div>

      {/* Brand Text Columns */}
      {!iconOnly && (
        <div className="flex flex-col leading-none" id="unisolar-brand-text">
          <span className={`font-display font-black tracking-[-0.03em] ${dims.text} ${titleColor}`}>
            UNISOLAR
          </span>
          <span className={`font-mono font-bold tracking-[0.22em] uppercase mt-1 ${dims.sub} ${sublineColor} flex items-center`}>
            <span className="h-px w-2.5 bg-current opacity-40 mr-1.5 inline-block" />
            MCHJ LLC
            <span className="h-px w-2.5 bg-current opacity-40 ml-1.5 inline-block" />
          </span>
        </div>
      )}
    </div>
  );
}
