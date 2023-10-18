import React, { useState, useEffect } from 'react';
import Auth from '../components/Auth';
import GameModeSelection from '../components/GameModeSelection';
import CodeSnippetDisplay from '../components/CodeSnippetDisplay';
import UserAnswerInput from '../components/UserAnswerInput';

console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

export default function Home() {
  const [user, setUser] = useState(null);
  const [gameMode, setGameMode] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState([]);
  const [result, setResult] = useState(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const questionLimit = 10;

  const handleUserAuth = (user) => {
    setUser(user);
  };

  const handleGameModeSelect = (mode) => {
    setGameMode(mode);
  };

  const handleAnswerSubmit = (answer) => {
    console.log(`User's answer: ${answer}`);
    if (answer === correctAnswer) {
      setScore(score + 1);
      setResult('Correct!');
    } else {
      setResult('Incorrect. Try again.');
    }
    setQuestionsAnswered(questionsAnswered + 1);
    if (questionsAnswered < questionLimit - 1) {
      // Fetch a new code snippet after the user answers a question
      handleCodeSnippetFetch();
    }
  };

  const handleCodeSnippetFetch = async () => {
    const response = await fetch(`/api/code-snippets?gameMode=${gameMode}`);
    const data = await response.json();
    setCorrectAnswer(data.correctAnswer);
    setOptions(data.options);
    setResult(null); // Clear the result when a new question is fetched
  };

  // Fetch the first code snippet when the game mode is selected
  useEffect(() => {
    if (gameMode) {
      handleCodeSnippetFetch();
    }
  }, [gameMode]);

  return (
    <div>
      <h1>DecodeMe! Score: {score}</h1>
      {!user ? (
        <Auth onUserAuth={handleUserAuth} />
      ) : !gameMode ? (
        <GameModeSelection onGameModeSelect={handleGameModeSelect} />
      ) : questionsAnswered >= questionLimit ? (
        <p>Game over! Your final score is {score} out of {questionLimit}.</p>
      ) : (
        <>
          <CodeSnippetDisplay gameMode={gameMode} />
          <UserAnswerInput options={options} onAnswerSubmit={handleAnswerSubmit} />
          {result && <p>{result}</p>}
        </>
      )}
    </div>
  );
}