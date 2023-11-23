// StrikeIndicator.js
import React from 'react';
import { HeartIcon } from '@heroicons/react/24/solid'; // Ensure you're using the correct version of heroicons

export default function StrikeIndicator({ strikes, limit }) {
  return (
    <div className="flex items-center">
      {Array.from({ length: limit }, (_, index) => (
        <HeartIcon
          key={index}
          className={`h-6 w-6 ${index < (limit - strikes) ? 'text-red-500' : 'text-gray-300'} mx-1`}
          style={{ display: index < (limit - strikes) ? 'block' : 'none' }} // Hide the heart if it's a strike
        />
      ))}
    </div>
  );
}
