// StrikeIndicator.js
import React from 'react';

export default function StrikeIndicator({ strikes, limit }) {
  return (
    <div>
      {Array.from({ length: limit }, (_, i) => 'X').map((x, index) => (
        <span key={index} style={{ color: index < strikes ? 'red' : 'lightgray' }}>
          {x}
        </span>
      ))}
    </div>
  );
}