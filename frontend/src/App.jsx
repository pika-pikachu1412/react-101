import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Quiz from './components/Quiz';
import Result from './components/Result';
import './App.css';

function App() {
  const [score, setScore] = useState(0);
  const [username, setUsername] = useState('');

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route 
            path="/" 
            element={
              <Quiz 
                setScore={setScore} 
                username={username} 
                setUsername={setUsername} 
              />
            } 
          />
          <Route 
            path="/result" 
            element={
              <Result 
                score={score} 
                username={username} 
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;