// app/src/components/ChallengeSection.js
import React from 'react';
import Link from 'next/link';

const ChallengeSection = () => {
  return (
    <div className="challenge-section text-center py-6">
      <h2 className="text-2xl font-bold mb-4">Think You Can Beat Me? Prove It!</h2>
      <p className="text-lg mb-4">Take the DecodeMe Challenge!</p>
      <Link href="/play" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">
        Play
      </Link>
    </div>
  );
};

export default ChallengeSection;