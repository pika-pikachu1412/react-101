import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Timer from './Timer';

const Quiz = ({ setScore, username, setUsername }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showStart, setShowStart] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/questions')
      .then(res => res.json())
      .then(data => setQuestions(data.questions))
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const handleStart = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setShowStart(false);
    }
  };

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      navigate('/result');
    }
  };

  if (showStart) {
    return (
      <div className="start-screen">
        <h2>Enter your name to start the quiz</h2>
        <form onSubmit={handleStart}>
          <input
            type="text"
            placeholder="Your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="submit">Start Quiz</button>
        </form>
      </div>
    );
  }

  if (!questions.length) return <div>Loading...</div>;

  return (
    <div className="quiz">
      <Timer />
      <div className="question-section">
        <h2>Question {currentQuestion + 1} of {questions.length}</h2>
        <p>{questions[currentQuestion].question}</p>
      </div>
      <div className="answer-section">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className="answer-button"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;