// components/FinalScore.js
import React, { useState, useEffect } from 'react';
import { CircularProgress } from "@nextui-org/react";
import { format } from 'date-fns';

const FinalScore = ({ score, questionsAnswered, sharedAt }) => {
  const [date, setDate] = useState('Loading...');

  useEffect(() => {
    if (sharedAt) {
      setDate(format(new Date(sharedAt), 'MMM dd, yyyy'));
    }
  }, [sharedAt]);

  console.log('sharedAt:', sharedAt);
  const finalScore = Math.round((score / questionsAnswered) * 100);
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