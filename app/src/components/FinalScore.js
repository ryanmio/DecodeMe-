// components/FinalScore.js
import React from 'react';
import { CircularProgress } from "@nextui-org/react";

const FinalScore = ({ score, questionLimit, sharedAt }) => {
  return (
    <div className="flex justify-center items-center mb-4">
      <CircularProgress
        label="Accuracy"
        size="lg"
        value={score ? (score / questionLimit) * 100 : 0}
        color="success"
        formatOptions={{ style: "percent" }}
        showValueLabel={true}
      />
      <div className="ml-6">
        <p className="text-lg font-semibold text-gray-700">Questions Correct: {score} / {questionLimit}</p>
        <p className="results-shared-at text-sm text-gray-500">Shared: {sharedAt ? new Date(sharedAt).toLocaleString() : 'Loading...'}</p>
      </div>
    </div>
  );
};

export default FinalScore;