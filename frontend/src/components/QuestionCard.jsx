import React from 'react';

function QuestionCard({ question, handleAnswer }) {
  return (
    <div>
      <h2>{question.question}</h2>
      {question.options.map((option, index) => (
        <button key={index} onClick={() => handleAnswer(option.isRight)}>
          {option.option}
        </button>
      ))}
    </div>
  );
}

export default QuestionCard;
