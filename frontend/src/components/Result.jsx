import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Result = ({ score, username }) => {
  const [topScores, setTopScores] = useState([]);
  const [userScores, setUserScores] = useState([]);
  const [showHistory, setShowHistory] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (score !== null && username) {
          // Submit new score
          const submitResponse = await fetch('http://localhost:5000/api/scores', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, score }),
          });

          if (!submitResponse.ok) {
            throw new Error('Failed to submit score');
          }
        }

        // Fetch top scores
        const topScoresResponse = await fetch('http://localhost:5000/api/scores/top');
        if (!topScoresResponse.ok) {
          throw new Error('Failed to fetch top scores');
        }
        const topScoresData = await topScoresResponse.json();
        setTopScores(topScoresData);

        // Fetch user's score history
        if (username) {
          const userScoresResponse = await fetch(`http://localhost:5000/api/scores/${username}`);
          if (!userScoresResponse.ok) {
            throw new Error('Failed to fetch user scores');
          }
          const userScoresData = await userScoresResponse.json();
          setUserScores(userScoresData);
          console.log('User scores loaded:', userScoresData);
        }
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [score, username]);

  const handlePlayAgain = () => {
    navigate('/');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return <div className="result">Loading...</div>;
  }

  if (error) {
    return <div className="result">Error: {error}</div>;
  }

  return (
    <div className="result">
      <h2>Quiz Complete!</h2>
      <p className="current-score">Your current score: {score}</p>
      
      <div className="scores-container">
        <div className="top-scores">
          <h3>Top 10 Scores</h3>
          {topScores.length > 0 ? (
            <ul>
              {topScores.map((scoreData, index) => (
                <li key={scoreData.id}>
                  #{index + 1}. {scoreData.username}: {scoreData.score}
                </li>
              ))}
            </ul>
          ) : (
            <p>No scores yet</p>
          )}
        </div>

        <div className="user-scores">
          <h3>Your Score History</h3>
          <button 
            className="toggle-history-btn"
            onClick={() => setShowHistory(!showHistory)}
          >
            {showHistory ? 'Hide History' : 'Show History'}
          </button>
          
          {showHistory && (
            <div className="score-history">
              {userScores.length > 0 ? (
                <ul>
                  {userScores.map((scoreData) => (
                    <li key={scoreData.id}>
                      Score: {scoreData.score} - {formatDate(scoreData.date)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No previous scores found.</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="stats">
        <h3>Your Statistics</h3>
        <p>Best Score: {Math.max(...userScores.map(s => s.score), score)}</p>
        <p>Average Score: {
          userScores.length > 0 
            ? ((userScores.reduce((acc, curr) => acc + curr.score, 0) + score) / (userScores.length + 1)).toFixed(1)
            : score
        }</p>
        <p>Total Quizzes Taken: {userScores.length + 1}</p>
      </div>

      <button className="play-again-btn" onClick={handlePlayAgain}>
        Play Again
      </button>
    </div>
  );
};

export default Result;