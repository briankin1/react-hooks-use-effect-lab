import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // Set up the timer
    const timer = setTimeout(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          // When time hits 0, reset and call onAnswered with false
          onAnswered(false);
          return 10; // Reset to 10 seconds for the next question
        }
        return prevTime - 1; // Decrease time remaining by 1
      });
    }, 1000); // Run every 1 second

    // Cleanup function to clear the timer
    return () => clearTimeout(timer);
  }, [timeRemaining, onAnswered]); // Dependencies array

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset timer when an answer is selected
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
