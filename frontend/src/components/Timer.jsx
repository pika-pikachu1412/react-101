import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Timer = () => {
  const [time, setTime] = useState(300); // 5 minutes in seconds
  const navigate = useNavigate();

  useEffect(() => {
    if (time <= 0) {
      navigate('/result');
      return;
    }

    const timer = setInterval(() => {
      setTime(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time, navigate]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="timer">
      Time remaining: {minutes}:{seconds.toString().padStart(2, '0')}
    </div>
  );
};

export default Timer;