import React from 'react';

const lanternColors = [
  '#FFD700', // gold
  '#FF6B35', // orange
  '#FFB347', // light orange
  '#FFF8DC', // cream
  '#FF6347', // red-orange
  '#F9A602', // deep yellow
];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function FloatingLanterns({ count = 7 }: { count?: number }) {
  return (
    <div className="floating-lanterns-container pointer-events-none absolute inset-0 z-20">
      {Array.from({ length: count }).map((_, i) => {
        // Only left (0-25%) and right (75-100%)
        const isLeft = i % 2 === 0;
        const left = isLeft
          ? randomBetween(2, 22) // left side
          : randomBetween(78, 98); // right side
        const duration = randomBetween(8, 16);
        const delay = randomBetween(0, 8);
        const size = randomBetween(36, 60);
        const color = lanternColors[i % lanternColors.length];
        return (
          <div
            key={i}
            className="floating-lantern"
            style={{
              left: `${left}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              width: `${size}px`,
              height: `${size * 1.3}px`,
              zIndex: 20,
            }}
          >
            {/* Lantern body */}
            <div
              style={{
                width: '100%',
                height: '80%',
                background: color,
                borderRadius: '50% 50% 40% 40% / 60% 60% 100% 100%',
                boxShadow: `0 0 16px 4px ${color}99, 0 8px 24px 0 #0002`,
                border: '2px solid #fff8',
                position: 'relative',
              }}
            >
              {/* Glow */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60%',
                  height: '18px',
                  background: 'radial-gradient(circle, #fffbe6 60%, transparent 100%)',
                  opacity: 0.7,
                  borderRadius: '50%',
                  filter: 'blur(2px)',
                }}
              />
            </div>
            {/* Lantern tail */}
            <div
              style={{
                width: '18%',
                height: '18%',
                background: '#fffbe6',
                margin: '0 auto',
                borderRadius: '0 0 8px 8px',
                marginTop: '-6px',
                boxShadow: `0 2px 8px 0 #fffbe6cc`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
} 