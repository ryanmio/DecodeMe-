// StrikeIndicator.js
import React from 'react';
import { IoHeart } from "react-icons/io5";
import { Tooltip } from "@nextui-org/react";

export default function StrikeIndicator({ strikes, limit }) {
  return (
    <Tooltip content={`${limit - strikes} lives remaining`} placement="bottom">
      <div className="flex items-center">
        {Array.from({ length: limit }, (_, index) => (
          <IoHeart
            key={index}
            className={`h-6 w-6 ${index < (limit - strikes) ? 'text-red-500' : 'text-gray-300'} mx-1`}
            style={{ display: index < (limit - strikes) ? 'block' : 'none' }}
          />
        ))}
      </div>
    </Tooltip>
  );
}