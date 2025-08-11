import React from 'react';

interface SkyShotAnimationProps {
  className?: string;
  height?: string;
  count?: number;
}

export default function SkyShotAnimation({ className = '', height = '400px', count = 5 }: SkyShotAnimationProps) {
  return (
    <div 
      className={`skyshot-container ${className}`}
      style={{ height }}
    >
      {/* Multiple Sky Shots */}
      {[...Array(count)].map((_, index) => (
        <div key={index} className="skyshot-group" style={{ animationDelay: `${index * 1.5}s` }}>
          {/* Rocket */}
          <div 
            className="skyshot-rocket"
            style={{ 
              left: `${20 + (index * 15)}%`,
              animationDelay: `${index * 1.5}s`
            }}
          ></div>
          
          {/* Rocket Trail */}
          <div 
            className="skyshot-trail"
            style={{ 
              left: `${20 + (index * 15)}%`,
              animationDelay: `${index * 1.5}s`
            }}
          ></div>
          
          {/* Explosion */}
          <div 
            className="skyshot-explosion"
            style={{ 
              left: `${20 + (index * 15)}%`,
              animationDelay: `${index * 1.5}s`
            }}
          >
            {/* Main Particles */}
            <div className="skyshot-particle"></div>
            <div className="skyshot-particle"></div>
            <div className="skyshot-particle"></div>
            <div className="skyshot-particle"></div>
            <div className="skyshot-particle"></div>
            <div className="skyshot-particle"></div>
            <div className="skyshot-particle"></div>
            <div className="skyshot-particle"></div>
            
            {/* Flower Pot Effects - Left Side */}
            <div className="flowerpot-left">
              <div className="flowerpot-particle"></div>
              <div className="flowerpot-particle"></div>
              <div className="flowerpot-particle"></div>
              <div className="flowerpot-particle"></div>
              <div className="flowerpot-particle"></div>
            </div>
            
            {/* Flower Pot Effects - Right Side */}
            <div className="flowerpot-right">
              <div className="flowerpot-particle"></div>
              <div className="flowerpot-particle"></div>
              <div className="flowerpot-particle"></div>
              <div className="flowerpot-particle"></div>
              <div className="flowerpot-particle"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 