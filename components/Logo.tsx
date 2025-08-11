import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export default function Logo({ className = '', size = 'md', onClick }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  return (
    <div 
      className={`flex items-center space-x-3 ${className} ${onClick ? 'cursor-pointer hover:scale-105 transition-transform duration-200' : ''}`}
      onClick={onClick}
    >
      {/* Logo Icon */}
      <div className={`${sizeClasses[size]} flex-shrink-0`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Firework burst background */}
          <circle cx="24" cy="24" r="20" fill="url(#fireworkGradient)" />
          
          {/* Central star */}
          <path
            d="M24 8L26.5 18.5L37 21L26.5 23.5L24 34L21.5 23.5L11 21L21.5 18.5L24 8Z"
            fill="#FFD700"
            stroke="#FF6B35"
            strokeWidth="1"
          />
          
          {/* Sparkle particles */}
          <circle cx="12" cy="12" r="2" fill="#FFD700" />
          <circle cx="36" cy="12" r="2" fill="#FFD700" />
          <circle cx="12" cy="36" r="2" fill="#FFD700" />
          <circle cx="36" cy="36" r="2" fill="#FFD700" />
          
          {/* Diagonal sparkles */}
          <circle cx="18" cy="18" r="1.5" fill="#FF6B35" />
          <circle cx="30" cy="18" r="1.5" fill="#FF6B35" />
          <circle cx="18" cy="30" r="1.5" fill="#FF6B35" />
          <circle cx="30" cy="30" r="1.5" fill="#FF6B35" />
          
          {/* Gradients */}
          <defs>
            <radialGradient id="fireworkGradient" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#FF6B35" />
              <stop offset="50%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#991B1B" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      
      {/* Company Name */}
      <div className="hidden sm:block">
        <h1 className="text-xl font-bold text-gradient leading-tight">
          SIVAKASI
        </h1>
        <h2 className="text-sm font-semibold text-gray-700 leading-tight">
          KARGIL CRACKERS
        </h2>
      </div>
    </div>
  );
}
