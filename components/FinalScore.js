// components/FinalScore.js
import React from 'react';
import { CircularProgress } from "@nextui-org/react";

const FinalScore = ({ score, questionsAnswered, sharedAt }) => {
  const finalScore = Math.round((score / questionsAnswered) * 100);
  const isFirestoreTimestamp = sharedAt && sharedAt.hasOwnProperty('seconds') && sharedAt.hasOwnProperty('nanoseconds');
  const date = isFirestoreTimestamp ? sharedAt.toDate().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Loading...';
  return (
    <div className="flex justify-center items-center mb-4">
      <CircularProgress
        label="Accuracy"
        size="lg"
        value={finalScore}
        color="success"
        formatOptions={{ style: "percent" }}
        showValueLabel={true}
      />
      <div className="ml-6 text-left">
        <p className="text-lg font-semibold text-gray-700">Questions Correct: {score} / {questionsAnswered}</p>
        <p className="results-shared-at text-sm text-gray-500">{date}</p>
      </div>
    </div>
  );
};

export default FinalScore;