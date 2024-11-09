import './App.css';
import React, { useState } from 'react';
// Import the logo image
import logo from './quiz-logo.png';
const questions = [
  {
    question: "Quelle est la planète la plus proche du Soleil ?",
    options: [
      { option: "Mercure", isRight: true },
      { option: "Vénus", isRight: false },
      { option: "Terre", isRight: false },
      { option: "Mars", isRight: false }
    ]
  },
  {
    question: "Quel est l'élément chimique dont le symbole est O ?",
    options: [
      { option: "Oxygène", isRight: true },
      { option: "Or", isRight: false },
      { option: "Osmium", isRight: false },
      { option: "Oganesson", isRight: false }
    ]
  },
  {
    question: "Qui a peint la Joconde ?",
    options: [
      { option: "Léonard de Vinci", isRight: true },
      { option: "Pablo Picasso", isRight: false },
      { option: "Vincent van Gogh", isRight: false },
      { option: "Claude Monet", isRight: false }
    ]
  }
];


function App() {
  const [number, setNumber] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleClick = (isRight) => {
    if (isRight) {
      setScore(score + 1);
    }
    const nextQues = number + 1;
    if (nextQues < questions.length) {
      setNumber(nextQues);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div>
      <img src={logo} alt="Quiz Logo" className="quiz-logo" />
      {showResult ? (
        <div className="result-container">
          Your Score: {score} / {questions.length}
        </div>
      ) : (
        <div className="app-container">
          <div>
            <div className="question-text">
              Question {number + 1}) {questions[number].question}
            </div>
            {questions[number].options.map((val, index) => (
              <div key={index} style={{ marginTop: '10px' }}>
                <button
                  onClick={() => handleClick(val.isRight)}
                  className="option-button"
                >
                  {val.option}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

