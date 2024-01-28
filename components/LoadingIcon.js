// components/LoadingIcon.js
import React from 'react';

export default function LoadingIcon() {
  // Array of image paths
  const gifs = [
    "/images/insert-sort.gif",
    "/images/heap-sort.gif",
    "/images/merge-sort.gif"
  ];

  // Randomly select an index
  const randomIndex = Math.floor(Math.random() * gifs.length);

  // Select a gif path based on the random index
  const selectedGif = gifs[randomIndex];

  return (
    <div className="fixed bottom-8 right-8 z-50">
        <img src={selectedGif} alt="Loading" width="43" height="43" />
    </div>
  );
}