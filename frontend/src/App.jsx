import React, { useState, useEffect } from 'react';
import axios from './api';
import Header from './components/Header';
import QuestionCard from './components/QuestionCard';
import Result from './components/Result';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get('/questions');
      setQuestions(response.data);
    };
    fetchQuestions();
  }, []);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div>
      <Header />
      {showResult ? (
        <Result score={score} total={questions.length} />
      ) : (
        questions.length > 0 && (
          <QuestionCard
            question={questions[currentQuestion]}
            handleAnswer={handleAnswer}
          />
        )
      )}
    </div>
  );
}

export default App;
