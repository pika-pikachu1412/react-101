const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Helper function to read scores file
const readScoresFile = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'scores.json'));
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading scores file:', error);
        return { scores: [] };
    }
};

// Helper function to write scores file
const writeScoresFile = (scores) => {
    try {
        fs.writeFileSync(
            path.join(__dirname, 'scores.json'),
            JSON.stringify(scores, null, 2)
        );
        return true;
    } catch (error) {
        console.error('Error writing scores file:', error);
        return false;
    }
};

// Get questions
app.get('/api/questions', (req, res) => {
    try {
        const questions = JSON.parse(
            fs.readFileSync(path.join(__dirname, 'questions.json'))
        );
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: 'Error reading questions' });
    }
});

// Submit score
app.post('/api/scores', (req, res) => {
    try {
        const { username, score } = req.body;
        const scoresData = readScoresFile();
        
        const newScore = {
            id: Date.now(),
            username,
            score,
            date: new Date().toISOString()
        };
        
        scoresData.scores.push(newScore);
        
        if (writeScoresFile(scoresData)) {
            res.json(newScore);
        } else {
            res.status(500).json({ error: 'Error saving score' });
        }
    } catch (error) {
        console.error('Error in POST /api/scores:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get top scores
app.get('/api/scores/top', (req, res) => {
    try {
        const scoresData = readScoresFile();
        const topScores = scoresData.scores
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);
        res.json(topScores);
    } catch (error) {
        res.status(500).json({ error: 'Error getting top scores' });
    }
});

// Get user's score history
app.get('/api/scores/:username', (req, res) => {
    try {
        const { username } = req.params;
        const scoresData = readScoresFile();
        const userScores = scoresData.scores
            .filter(score => score.username.toLowerCase() === username.toLowerCase())
            .sort((a, b) => new Date(b.date) - new Date(a.date));
        
        console.log(`Found ${userScores.length} scores for user ${username}`);
        res.json(userScores);
    } catch (error) {
        console.error('Error in GET /api/scores/:username:', error);
        res.status(500).json({ error: 'Error getting user scores' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    // Verify scores file exists and is readable
    const scores = readScoresFile();
    console.log(`Loaded ${scores.scores.length} existing scores`);
});