import React from 'react';

export default function RocketAnimation() {
  return (
    <div className="rocket-animation-container">
      <div className="rocket-body">
        <div className="rocket-head" />
        <div className="rocket-tail" />
      </div>
      <div className="rocket-trail" />
      <div className="rocket-explosion">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`rocket-spark rocket-spark-${i + 1}`} />
        ))}
      </div>
    </div>
  );
} 